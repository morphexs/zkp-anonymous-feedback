package org.example.controller;

import org.example.entity.Feedback;
import org.example.entity.FeedbackRepository;
import org.example.entity.FeedbackRequest;
import org.example.service.ZkpVerificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/feedback")
public class FeedbackController {

    private final ZkpVerificationService verificationService;
    private final FeedbackRepository feedbackRepository; // standard JPA/Mongo repository

    public FeedbackController(ZkpVerificationService verificationService, FeedbackRepository feedbackRepository) {
        this.verificationService = verificationService;
        this.feedbackRepository = feedbackRepository;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackRequest request) {

        boolean isValid = verificationService.verifyProof(request.proof(), request.publicSignals());

        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Zero-Knowledge Proof. Feedback rejected.");
        }

        Feedback entity = new Feedback();
        entity.setText(request.feedbackText());
        entity.setSubmittedAt(Instant.now());
        feedbackRepository.save(entity);

        return ResponseEntity.ok("Feedback securely and anonymously submitted.");
    }
}

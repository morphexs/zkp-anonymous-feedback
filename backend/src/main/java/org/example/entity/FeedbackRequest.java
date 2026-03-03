package org.example.entity;

import java.util.List;

public record FeedbackRequest(
        String feedbackText,
        List<String> publicSignals, // This contains the Poseidon hash
        ZKProof proof
) {}

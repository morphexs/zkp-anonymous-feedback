package org.example.service;

import org.example.entity.ZKProof;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class ZkpVerificationService {

    private final RestClient restClient;

    public ZkpVerificationService() {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:3001")
                .build();
    }

    public boolean verifyProof(ZKProof proof, List<String> publicSignals) {
        try {
            Map<String, Object> payload = Map.of(
                    "proof", proof,
                    "publicSignals", publicSignals
            );

            VerificationResponse response = restClient.post()
                    .uri("/verify")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .body(VerificationResponse.class);

            return response != null && response.valid();

        } catch (Exception e) {
            System.err.println("Failed to connect to Verifier Microservice: " + e.getMessage());
            return false;
        }
    }

    private record VerificationResponse(boolean valid, String error) {
    }
}

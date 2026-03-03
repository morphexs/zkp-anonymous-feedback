package org.example.entity;

import java.util.List;

public record ZKProof(
        List<String> pi_a,
        List<List<String>> pi_b,
        List<String> pi_c,
        String protocol,
        String curve
) {}


package org.example.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "anonymous_feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 2000)
    private String text;

    @Column(nullable = false, updatable = false)
    private Instant submittedAt;

    // Constructors
    public Feedback() {}

    // Getters and Setters
    public UUID getId() { return id; }
    public String getText() { return text; }
    public void setText(String text) { this. text = text; }
    public Instant getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
}

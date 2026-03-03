# ZK-Whisper: Zero-Knowledge Corporate Feedback Protocol

A cryptographically secure, fully anonymous feedback system designed for enterprise environments. 

Traditional "anonymous" feedback forms often rely on trusting the database administrator not to log IP addresses, session tokens, or timestamps. ZK-Whisper solves this fundamentally using **Zero-Knowledge Proofs (ZK-SNARKs)**. It mathematically guarantees identity obfuscation—allowing a user to prove they are an authorized employee without ever revealing *which* employee they are.

## Architecture Overview

This project operates across three distinct layers to ensure maximum security and separation of concerns:

1. **Client-Side Proving (Next.js):** The frontend downloads a compiled WebAssembly (`.wasm`) cryptographic circuit. When an employee enters their ID, the browser generates a Groth16 proof locally. The plain-text ID **never** leaves the user's device.
2. **Verification Microservice (Node.js):** A lightweight, isolated Express server dedicated entirely to solving cryptographic math. It receives the proof and validates it against a public verification key.
3. **Enterprise Backend (Spring Boot):** The main API layer orchestrates the system. It receives the payload, asks the Node microservice to verify the proof, and only commits the feedback to the database if the math perfectly checks out.

## Tech Stack

* **Cryptography:** Circom, SnarkJS (Groth16, Poseidon Hash)
* **Frontend:** Next.js, React, Tailwind CSS
* **Backend API:** Java 21, Spring Boot 3, Spring Data JPA
* **Verification Node:** Node.js, Express.js
* **Database:** H2 In-Memory Database (for easy local testing)

---

## Getting Started

To run this full-stack application locally, you will need to spin up all three environments. Follow these steps in order.

### Prerequisites

* Node.js (v18+)
* Java 21+
* Maven

### Step 1: Start the Verification Microservice
* This service must be running for the backend to validate proofs.

```bash
cd verifier
npm install
node verifier_service.js
```

(Runs on http://localhost:3001)

### Step 2: Start the Spring Boot Backend
* This is the main API and database layer.

```bash
cd backend
mvn spring-boot:run
```

(Runs on http://localhost:8080)

### Step 3: Start the Next.js Frontend
* This is the client interface where proofs are generated.

```bash
cd frontend
npm install
npm run dev
```

(Runs on http://localhost:3000)

## How to Test and Use
* Submit Feedback: Open your browser and navigate to http://localhost:3000.
* Generate Proof: Enter a mock secret Employee ID (e.g., 123456789) and type your feedback. Click submit. You will see the local proof generation process happen in the browser before it is sent to the server.
* Verify Anonymity: Open the backend database console to verify that your identity was completely stripped.
* URL: http://localhost:8080/h2-console
* JDBC URL: jdbc:h2:mem:zkpdb
* Username: sa
* Password: (leave blank)
* Query the anonymous_feedback table. You will see your plain-text feedback securely stored with a UUID, proving the system works purely on mathematical trust!

## Repository Structure
* /backend - Java Spring Boot application and database entities.
* /circuits - Raw employee_auth.circom code and compilation scripts.
* /frontend - Next.js UI and client-side Wasm proving logic.
* /verifier - Node.js microservice handling SnarkJS validation.
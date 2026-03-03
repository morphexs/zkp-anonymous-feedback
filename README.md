# ZK-Whisper: Zero-Knowledge Corporate Feedback Protocol

A cryptographically secure, fully anonymous feedback system for enterprise environments.

Unlike traditional "anonymous" forms that still log IP addresses, session tokens, or timestamps in a database, this protocol uses Zero-Knowledge Proofs (ZK-SNARKs) to mathematically guarantee identity obfuscation.

### How It Works
1. **The Circuit:** A custom `circom` circuit enforces that a user possesses a valid employee hash.
2. **Client-Side Proving:** The Next.js frontend downloads the WebAssembly circuit and generates a Groth16 cryptographic proof locally in the browser. The user's plain-text ID never leaves their machine.
3. **Microservice Verification:** A dedicated Node.js/Express service mathematically verifies the cryptographic proof.
4. **Secure Storage:** A Java 21 / Spring Boot backend orchestrates the API layer, securely saving the payload only if the verification microservice returns a valid proof.

### Tech Stack
* **Cryptography:** Circom, SnarkJS (Groth16, Poseidon Hash)
* **Backend API:** Java 21, Spring Boot 3, Spring Data JPA
* **Verification Node:** Node.js, Express
* **Frontend:** Next.js, React, Tailwind CSS
"use client";

import { useState } from "react";
import * as snarkjs from "snarkjs";

export default function Home() {
  const [employeeId, setEmployeeId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Generating cryptographic proof locally...");

    try {
      // 1. Generate the ZK Proof in the browser
      // It fetches the wasm and zkey from the public folder
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { secretEmployeeId: employeeId },
        "/employee_auth.wasm",
        "/employee_auth_final.zkey"
      );

      setStatus("Proof generated! Submitting anonymously to server...");

      // 2. Send the Proof to your Spring Boot API
      const response = await fetch("http://localhost:8080/api/v1/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedbackText: feedback,
          publicSignals: publicSignals,
          proof: proof,
        }),
      });

      if (response.ok) {
        setStatus("✅ Success! Feedback submitted anonymously.");
        setEmployeeId("");
        setFeedback("");
      } else {
        setStatus("❌ Server rejected the proof. Are you an authorized employee?");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error generating proof. Check the console.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Anonymous Feedback</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Secret Employee ID</label>
            <input
              type="password"
              required
              className="w-full border p-2 rounded"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="e.g. 123456789"
            />
            <p className="text-xs text-gray-500 mt-1">
              This never leaves your device. We only send a mathematical proof.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Feedback</label>
            <textarea
              required
              className="w-full border p-2 rounded h-32"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Generate Proof & Submit
          </button>
        </form>

        {status && (
          <div className="mt-4 p-3 bg-gray-50 border rounded text-sm text-center font-mono">
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
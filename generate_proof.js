const snarkjs = require("snarkjs");

async function run() {
    console.log("Starting proof generation...");

    // 1. Define the Private Input
    // In a real application, the employee types this into the frontend browser. 
    // This value NEVER leaves their machine.
    const input = { secretEmployeeId: "123456789" };

    // 2. Define the paths to the generated Wasm and Zkey files 
    const wasmPath = "employee_auth_js/employee_auth.wasm";
    const zkeyPath = "employee_auth_final.zkey";

    // 3. Generate the Proof
    // This runs the local inputs through the WebAssembly circuit and proving key
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasmPath, zkeyPath);

    console.log("\n--- SUCCESS ---");
    console.log("\nPublic Hash:", publicSignals[0]);
    console.log("\nProof Object:");
    console.log(JSON.stringify(proof, null, 2));
}

run().then(() => {
    process.exit(0);
}).catch((err) => {
    console.error("Error generating proof:", err);
    process.exit(1);
});
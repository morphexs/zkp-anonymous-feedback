pragma circom 2.0.0;

include "node_modules/circomlib/circuits/poseidon.circom";

template EmployeeAuth() {
    signal input secretEmployeeId; // Private by default. The user inputs this locally.
    signal output publicHash;      // Public. This is what the verifier sees.
    component hasher = Poseidon(1);     
    hasher.inputs[0] <== secretEmployeeId; 
    publicHash <== hasher.out;
}

component main = EmployeeAuth();
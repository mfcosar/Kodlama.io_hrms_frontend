import React from 'react';
import CandidateSignUp from "./userSignUp/CandidateSignUp";
import EmployerSignUp from "./userSignUp/EmployerSignUp";

export default function SignUp() {
    return (
        <div>
        <CandidateSignUp />
        <EmployerSignUp />
        </div>
    )
}
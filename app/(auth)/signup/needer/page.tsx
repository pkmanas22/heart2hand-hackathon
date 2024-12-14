import React from "react";
import { SignupComponent } from "@/components/SignupComponent";
import Header from "@/components/landing/Header";

export default function NeederSignup() {
  return (
    <div>
      <Header />
      <SignupComponent role="needer" />
    </div>
  );
}

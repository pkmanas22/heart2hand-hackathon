import React from "react";
import { SignupComponent } from "@/components/SignupComponent";
import Header from "@/components/landing/Header";

export default function HelperSignup() {
  return (
    <div>
      <Header />
      <SignupComponent role="helper" />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image"

export function SignupComponent({ role }: { role: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !name) {
      alert("Name, Email & Password are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert("Password must be greater than 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      setLoading(false);

      if (res.ok) {
        alert("Signup successful! You can now log in.");
        router.push("/signin");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.message);
      setLoading(false);
    }

    // console.log("Form submitted");
  };

  // const handleGoogleLogin = () => {};

  return (
    <Card className="mx-auto max-w-sm my-16">
      <CardHeader className="flex flex-col items-center text-center">
        <Image src="/logo.png" alt="Heart2Hand" width={60} height={60} />
        <CardTitle className="text-3xl font-bold">
          Create an account
        </CardTitle>
        <CardDescription>
          Welcome to Heart2Hand!{" "}
          {role === "needer" ?"Please sign up to create a request." : "Please sign up to donate to a request."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? "Signing up..." : "Signup"}
          </Button>
          {/* <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
          >
            <IconBrandGoogle />
            Signup with Google
          </Button> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Signin
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

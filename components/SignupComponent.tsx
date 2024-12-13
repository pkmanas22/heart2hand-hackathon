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
import { IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, userCollection } from "@/lib/firebase/config";
import { doc, setDoc } from "firebase/firestore";

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
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      if (!user.uid) {
        alert("Something went wrong");
        return;
      }

      await setDoc(doc(userCollection, user.uid), {
        name,
        email,
        role,
      });

      router.push(`/${role}`);
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
    console.log("Form submitted");
  };

  const handleGoogleLogin = () => {};

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Create a new account as {role}
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

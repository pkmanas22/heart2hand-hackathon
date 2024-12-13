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
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, userCollection } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function UserSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("Email & Password are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert("Password must be greater than 6 characters");
      setLoading(false);
      return;
    }

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user;

      if (!user.uid) {
        alert("Something went wrong");
        return;
      }
      const userDoc = await getDoc(doc(userCollection, user.uid));

      if (!userDoc.exists()) {
        alert("You don't have an active account. Kindly create one");
        return;
      }

      const role = userDoc.data().role;
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
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your existing account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
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
            {loading ? "Signing in..." : "Sign in"}
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
          Don&apos;t have an account? Create one
          <br /> as a {" "}
          <Link href="/signup/helper" className="underline">
            Helper
          </Link>
          <br /> as a {" "}
          <Link href="/signup/needer" className="underline">
            Needer
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

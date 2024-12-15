"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Lock, Home } from "lucide-react";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <Lock className="w-20 h-20 text-yellow-500 mb-8" />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Unauthorized Access
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        You don&apos;t have permission to view this page. Please log in or check
        your access level.
      </p>
      <div className="flex space-x-4">
        <Button
          variant={"outline"}
          onClick={() => router.push("/signin")}
          className="flex items-center space-x-2 rounded-md"
        >
          <Lock className="w-4 h-4" />
          <span>Go to Sign In</span>
        </Button>
        <Button
          variant={"outline"}
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 rounded-md"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Button>
      </div>
    </div>
  );
}

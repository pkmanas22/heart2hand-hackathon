'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AlertCircle, Home } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <AlertCircle className="w-20 h-20 text-red-500 mb-8" />
      <h1 className="text-4xl font-bold mb-4 text-gray-800 ">
        404 - Page Not Found
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button
        variant={"outline"}
        onClick={() => router.push("/")}
        className="flex items-center space-x-2 rounded-md"
      >
        <Home className="w-4 h-4" />
        <span>Go to Homepage</span>
      </Button>
    </div>
  );
}


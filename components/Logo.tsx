import React from "react";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

// Instantiate the Nunito font
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"], // Define the weights you need
});

export default function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Heart2Hand"
        width={40}
        height={40}
        />
      <h2 className={`text-4xl font-extrabold ${dancingScript.className}`}>
        <span className="text-orange-500">Heart</span>
        <span className="text-blue-800 text-5xl">2</span>
        <span className="text-orange-500">Hand</span>
      </h2>
    </Link>
  );
}

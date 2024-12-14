import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-transparent shadow-md bg-gray-700 bg-opacity-40">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold text-orange-600">
            Heart2Hand
          </Link>
          <div className="hidden sm:flex space-x-4 text-xl font-semibold">
            {/* <Link href="/" className="text-black hover:text-blue-900 hover:underline transition-all">
              About
            </Link>
            <Link
              href="/"
              className="text-black hover:text-blue-900 hover:underline transition-all"
            >
              How It Works
            </Link> */}
            <button className="px-4 py-2 text-black backdrop-blur-sm  rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
              <Link href="#highlights">Highlights</Link>
            </button>
            <button className="px-4 py-2 text-black backdrop-blur-sm  rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
              <Link href="#whatWeDo">What We Do</Link>
            </button>
            <button className="px-4 py-2 text-black backdrop-blur-sm  rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
              <Link href="#team">Team Members</Link>
            </button>
            <button className="px-4 py-2 text-black backdrop-blur-sm  rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
              <Link href="#testimonials">Testimonials</Link>
            </button>
          </div>
          <div className="flex space-x-2">
            <Button asChild>
              <Link href="/signup/helper">Donate Now</Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href="/signup/needer">Create Request</Link>
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-600" asChild>
              <Link href="/signin">Login</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
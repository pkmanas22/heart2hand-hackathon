import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#c9c9c9] text-gray-800 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Heart2Hand connects donors with those in need, making a positive
              impact on lives around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" asChild>
                  <Link href="/" className="text-sm">
                    About
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="/" className="text-sm">
                    How It Works
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="/" className="text-sm">
                    Contact
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="/" className="text-sm">
                    Privacy Policy
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@heart2hand.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
            <p className="text-sm">
              Address: Ghatikia, Bhubaneswar, 756019
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#">
                  <Facebook size={24} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#">
                  <Twitter size={24} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#">
                  <Instagram size={24} />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#">
                  <Linkedin size={24} />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-500 mt-5 pt-5 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Heart2Hand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Features from "@/components/landing/Features";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Highlights from "@/components/landing/Highlights";
import TeamSection from "@/components/landing/TeamSection";
import { Testimonials } from "@/components/landing/Testimonials";
import VideoSection from "@/components/landing/VideoSection";
import WhatWeDo from "@/components/landing/WhatWeDo";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Highlights />
      <WhatWeDo />
      {/* <Features /> */}
      <TeamSection />
      <Testimonials />
    </>
  );
}

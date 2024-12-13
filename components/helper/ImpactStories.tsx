"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image"

const mockStories = [
  {
    id: 1,
    title: "Sarah's Recovery Journey",
    summary:
      "Thanks to your donations, Sarah received the medical treatment she needed and is now on the path to recovery.",
    image: "/next.svg",
  },
  {
    id: 2,
    title: "Empowering Education",
    summary:
      "Your contributions provided school supplies to 100 underprivileged children, giving them the tools they need to succeed.",
    image: "/window.svg",
  },
  // Add more mock stories here
];

export default function ImpactStories() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % mockStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex(
      (prevIndex) => (prevIndex - 1 + mockStories.length) % mockStories.length
    );
  };

  const currentStory = mockStories[currentStoryIndex];

  return (
    <div className="relative">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{currentStory.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            width={50}
            height={50}
            src={currentStory.image}
            alt={currentStory.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <p>{currentStory.summary}</p>
        </CardContent>
      </Card>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <Button variant="outline" size="icon" onClick={prevStory}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <Button variant="outline" size="icon" onClick={nextStory}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

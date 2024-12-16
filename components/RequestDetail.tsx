"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Twitter, Share2 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { requestCollection } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RequestDetails } from "./admin/ManageRequests";
import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "./ui/carousel";
import Link from "next/link";

export default function RequestDetail({ id }: { id: string }) {
  const [request, setRequest] = useState<RequestDetails>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const requestDoc = await getDoc(doc(requestCollection, id));
  
        if (!requestDoc.exists) {
          alert("Invalid id! No data found");
          router.push("/dashboard");
        }

        const data = requestDoc.data()

        if (!data) {
          alert("No data found");
          return;
        }
        // console.log("data", requestDoc)

       const filteredData: RequestDetails = {
         id: requestDoc.id,
         youtubeVideoId: data.youtubeVideoId || "",
         story: data.story || "",
         name: data.name || "Unknown",
         amount: data.amount || 0,
         amountCollected: data.amountCollected || 0,
         userId: data.userId || "",
         address: data.address || "",
         status: data.status || "pending",
         createdAt: data.createdAt || new Date().toISOString(),
         supportingDocuments: data.supportingDocuments || [],
         age: data.age || 0,
         category: data.category || "uncategorized",
         phone: data.phone || "",
         title: data.title || "",
         remark: data.remark || "",
        };
        
        // console.log(filteredData)
        setRequest(filteredData);
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [id, router]);

  if (!request) {
    return <div>Loading</div>;
  }

  // console.log(request)
  const percentageAchieved = (request.amountCollected / request.amount) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{request.title}</h1>
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarFallback>
                {request.name.charAt(0).toUpperCase() || ""}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg">{request.name}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{request.category}</Badge>
            <Badge variant="outline">Created on {request.createdAt}</Badge>
            <Badge variant="default">{request.status}</Badge>
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={percentageAchieved} className="mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>INR {request.amountCollected} raised</span>
                <span>
                  {percentageAchieved.toFixed(0)}% of INR {request.amount}
                </span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="story" className="mb-8">
            <TabsList>
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="gratitude">Gratitude</TabsTrigger>
            </TabsList>
            <TabsContent value="story">
              <Card>
                <CardHeader>
                  <CardTitle>Full Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="break-words">{request.story}</p>
                  <div>
                    <h2 className="font-semibold mb-2">Supporting Documents</h2>
                    <div className="m-auto ml-12">
                      <Carousel className="max-w-xs">
                        <CarouselPrevious />
                        <CarouselContent>
                          {request.supportingDocuments.map((doc, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <Image
                                  src={doc}
                                  alt={`Supporting document ${index + 1}`}
                                  width={300}
                                  height={200}
                                  className="rounded-lg object-cover w-full h-48"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselNext />
                      </Carousel>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Video Submission</h3>
                    <div className="aspect-video">
                      <iframe
                        width="70%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${request.youtubeVideoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="updates">
              <Card>
                <CardHeader>
                  <CardTitle>Request Timeline</CardTitle>
                </CardHeader>
                {/* <CardContent>
                  <Timeline>
                    {request.updates.map((update, index) => (
                      <TimelineItem key={index}>
                        <TimelineItemIndicator />
                        <TimelineItemContent>
                          <p className="font-semibold">{update.content}</p>
                          <p className="text-sm text-muted-foreground">
                            {update.date}
                          </p>
                        </TimelineItemContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </CardContent> */}
              </Card>
            </TabsContent>
            <TabsContent value="gratitude">
              <Card>
                <CardHeader>
                  <CardTitle>Thank You Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/Xaj4ZsKMD4g"
                      title="Thank You Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Make a Difference</CardTitle>
              <CardDescription>Your support can change a life</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-4" size="lg">
                <Link href={`/payment/${request.id}`}>Donate Now</Link>
              </Button>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground text-center">
                Share this story to help spread the word
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

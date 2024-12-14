import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline, TimelineItem, TimelineItemContent, TimelineItemIndicator } from "@/components/ui/timeline"
import { Facebook, Twitter, Share2 } from 'lucide-react'

// Mock data for the request
const requestData = {
    id: '1234',
    title: 'Help Fund My Cancer Treatment',
    requesterName: 'John Doe',
    category: 'Medical',
    dateCreated: '2023-05-15',
    status: 'Verified',
    amountNeeded: 50000,
    amountAchieved: 35000,
    story: 'I was recently diagnosed with stage 3 cancer and need help funding my treatment...',
    updates: [
        { type: 'created', date: '2023-05-15', content: 'Request submitted' },
        { type: 'verified', date: '2023-05-16', content: 'Request verified by admin' },
        { type: 'donation', date: '2023-05-18', content: 'Received $5000 from Anonymous' },
        { type: 'gratitude', date: '2023-05-20', content: 'Thank you video posted' },
    ],
    gratitudeVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
}

export default function RequestDetailsPage() {
    const percentageAchieved = (requestData.amountAchieved / requestData.amountNeeded) * 100

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold mb-4">{requestData.title}</h1>
                    <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-2">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={requestData.requesterName} />
                            <AvatarFallback>{requestData.requesterName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-lg">{requestData.requesterName}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{requestData.category}</Badge>
                        <Badge variant="outline">Created on {requestData.dateCreated}</Badge>
                        <Badge variant="default">{requestData.status}</Badge>
                    </div>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Funding Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={percentageAchieved} className="mb-2" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>${requestData.amountAchieved} raised</span>
                                <span>{percentageAchieved.toFixed(0)}% of ${requestData.amountNeeded}</span>
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
                                    <p>{requestData.story}</p>
                                    <Image
                                        src="/globe.svg"
                                        alt="Story Image"
                                        width={500}
                                        height={300}
                                        className="mt-4 rounded-lg object-contain"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="updates">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Request Timeline</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Timeline>
                                        {requestData.updates.map((update, index) => (
                                            <TimelineItem key={index}>
                                                <TimelineItemIndicator />
                                                <TimelineItemContent>
                                                    <p className="font-semibold">{update.content}</p>
                                                    <p className="text-sm text-muted-foreground">{update.date}</p>
                                                </TimelineItemContent>
                                            </TimelineItem>
                                        ))}
                                    </Timeline>
                                </CardContent>
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
                                            src={requestData.gratitudeVideo}
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
                            <Button className="w-full mb-4" size="lg">Donate Now</Button>
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
    )
}


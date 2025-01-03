"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestSchema } from "@/lib/zod";
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";

type FormData = {
  name: string;
  age: number;
  address: string;
  phone: string;
  story: string;
  amount: number;
  category: string;
  supporting: string;
};

const uploadImagesToCloudinary = async (files: File[], userId: string) => {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload image.");
      }

      if (result.secureUrl) {
        uploadedUrls.push(result.secureUrl);
      }
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, (error as Error).message);
      alert(`Failed to upload ${file.name}: ${(error as Error).message}`);
    }
  }

  return uploadedUrls;
};

export function CreateNewRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const { data: session } = useSession();

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      age: 0,
      address: "",
      phone: "",
      story: "",
      amount: 0,
      category: "",
      supporting: "",
    },
    resolver: zodResolver(requestSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    console.log(values)
    try {
      const imgUrls = await uploadImagesToCloudinary(
        imageFiles,
        session?.user?.id || ""
      );

      const formBody = {
        ...values,
        supportingDocuments: imgUrls,
        youtubeVideoId: getYoutubeVideoId(youtubeUrl),
        userId: session?.user?.id || "",
      };

      const response = await fetch("/api/create-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit the request.");
      }

      alert(
        "Your request has been successfully submitted. Our team will review it shortly."
      );
      form.reset();
      setImageFiles([]);
      setYoutubeUrl("");
    } catch (error) {
      console.error("Submission error:", (error as Error).message);
      alert(
        (error as Error).message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const validFiles = files.filter((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} exceeds the 2MB file size limit.`);
        return false;
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert(`${file.name} is not a valid image type (JPEG or PNG).`);
        return false;
      }

      return true;
    });

    if (validFiles.length + imageFiles.length <= 5) {
      setImageFiles((prev) => [...prev, ...validFiles]);
    } else {
      alert("You can upload a maximum of 5 images.");
    }

    event.target.value = "";
  };

  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Submit Your Request for Assistance
          </CardTitle>
          <CardDescription>
            Share your story, and let the world lend a hand.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Needers Full Name (as per ID proof)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter needers full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Needers age (as per ID proof)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter needers age"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Needers address (as per ID proof)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter needers address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="housing">Housing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How much do you want to raise (in INR)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the amount you need in INR"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Story</FormLabel>
                    <FormControl>
                      <Textarea
                        minLength={100}
                        placeholder="Write a brief description of your story and why you need assistance."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Minimum 100 words</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="supporting"
                  render={() => (
                    <FormItem>
                      <FormLabel>Supporting Documents</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="imageUpload">
                              Upload Images (Max 5, JPEG/PNG, 2MB each)
                            </Label>
                            <Input
                              id="imageUpload"
                              type="file"
                              accept="image/jpeg, image/png"
                              multiple
                              onChange={handleImageUpload}
                            />
                          </div>
                          {imageFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {imageFiles.map((file, index) => (
                                <div key={index} className="relative">
                                  <Image
                                    width={80}
                                    height={80}
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          <div>
                            <Label htmlFor="youtubeUrl">
                              YouTube Video URL
                            </Label>
                            <Input
                              id="youtubeUrl"
                              type="url"
                              placeholder="https://www.youtube.com/watch?v=..."
                              value={youtubeUrl}
                              onChange={(e) => setYoutubeUrl(e.target.value)}
                            />
                          </div>
                          {youtubeUrl && getYoutubeVideoId(youtubeUrl) && (
                            <div className="aspect-w-16 aspect-h-9">
                              <iframe
                                src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                                  youtubeUrl
                                )}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              ></iframe>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload up to 5 images and provide a YouTube video URL to
                        support your request. (Recommend to provide for early
                        approval)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

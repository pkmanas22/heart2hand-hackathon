import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Shield, Globe } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: "Verified Requests",
      description:
        "We thoroughly verify all requests to ensure authenticity and transparency.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Community-Driven",
      description:
        "Our platform fosters a supportive community of donors and recipients.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Secure Transactions",
      description:
        "Your donations are protected with state-of-the-art security measures.",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      title: "Global Reach",
      description: "Connect with people in need from all around the world.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {feature.icon}
                  <span className="ml-2">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

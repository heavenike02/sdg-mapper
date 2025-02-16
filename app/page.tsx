"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold"> SDG Assessment</CardTitle>
          <p className="text-muted-foreground">
            Align your projects with Sustainable Development Goals and measure their impact
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert mx-auto">
            <p className="text-center">
              Our assessment tool helps you evaluate and align your projects with specific social,
              economic, and environmental goals through a simple three-step process.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">1. Project Details</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Enter your project and assessment information
                </p>
              </CardHeader>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">2. Impact Tags</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select relevant tags for your project
                </p>
              </CardHeader>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">3. SDG Mapping</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review and confirm SDG recommendations
                </p>
              </CardHeader>
            </Card>
          </div>
          <div className="flex justify-center mt-6">
            <Link href="/assessment">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Assessment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
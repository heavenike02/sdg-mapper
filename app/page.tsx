"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Home() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold"> Showcase Site Information Collection</CardTitle>
          <p className="text-muted-foreground">
            Showcase the impact of your research on SDG goals
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert mx-auto">
            <p className="text-center">
              Our information collection tool enable us to help you to onboard your personal and research profile onto the SDG showcase site, allowing you to showcase the impact of your research on SDG goals.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">1. Project Details</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Enter your research information
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
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <div className="flex items-center">
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the 
                </label>
                <Link 
                  href="/terms-of-service" 
                  className="text-sm text-primary hover:underline ml-1"
                  target="_blank"
                >
                  Terms of Service
                </Link>
                
              </div>
            </div>
            <Link 
              href={termsAccepted ? "/assessment" : "#"}
              onClick={(e) => !termsAccepted && e.preventDefault()}
              className={!termsAccepted ? "pointer-events-none" : ""}
            >
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!termsAccepted}
              >
                Start
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
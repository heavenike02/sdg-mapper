"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FC } from 'react';

const TermsOfService: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the SDG Assessment tool, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use this service.
            </p>
            
            <h2>2. Fork and Explicit Use</h2>
            <p>
              This tool is provided as an open resource. You are permitted to fork this project and use it 
              for your own purposes, provided that:
            </p>
            <ul>
              <li>You acknowledge the original source</li>
              <li>You do not represent the forked version as the original</li>
              <li>You maintain all original licensing requirements</li>
            </ul>
            
            <h2>3. Data Usage</h2>
            <p>
              Information provided during assessments is used to generate SDG mappings and recommendations.
              We do not share your project details with third parties without your explicit consent.
            </p>
            
            <h2>4. Disclaimer</h2>
            <p>
              This tool provides recommendations based on the information you provide. The accuracy and
              relevance of these recommendations depend on the quality and completeness of your input.
              We do not guarantee specific outcomes from using this tool.
            </p>
            
            <h2>5. Contact</h2>
            <p>
              For questions about these terms, please contact support@sdgassessment.org.
            </p>
          </div>
          
          <div className="flex justify-center mt-6">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TermsOfService; 
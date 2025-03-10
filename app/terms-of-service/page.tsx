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
            Last updated: {"10 March 2025"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">            
            <div className="space-y-4">
              <h2 className="font-bold text-xl">Privacy Policy</h2>
              <p>
                This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website. 
                We are committed to ensuring that your privacy is respected and protected in accordance with the General Data Protection Regulation (GDPR).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">Types of Personal Data Collected</h2>
              <p>We collect the following personal data from you:</p>
              <ul>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Workplace</li>
                <li>Email Address</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">Purpose and Legal Basis for Processing</h2>
              <p>
                We process your personal data for the purpose of creating a showcase site profile on your behalf. 
                The legal basis for this processing is your consent, which you provide by submitting your information through our website. 
                You have the right to withdraw your consent at any time by contacting us at the email address provided above.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">Data Retention</h2>
              <p>
                We will retain your personal data for as long as necessary to fulfill the purpose of creating the showcase site. 
                Once the site is created and no longer requires your data, we will securely delete it.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">Data Sharing</h2>
              <p>
                Your personal data will not be shared with any third parties except as necessary for the creation of the showcase site. 
                If any data sharing is required, we will ensure that appropriate safeguards are in place to protect your data.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">International Data Transfers</h2>
              <p>
                We do not anticipate transferring your personal data outside the EU. However, if such a transfer becomes necessary, 
                we will ensure that it is done in compliance with GDPR requirements, using appropriate safeguards such as Standard Contractual Clauses.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">Data Subject Rights</h2>
              <p>Under the GDPR, you have the following rights:</p>
              <ul>
                <li>Right to Access: You can request access to your personal data</li>
                <li>Right to Rectification: You can request that we correct any inaccuracies in your personal data</li>
                <li>Right to Erasure: You can request that we delete your personal data</li>
                <li>Right to Restrict Processing: You can request that we restrict how we process your personal data</li>
                <li>Right to Object: You can object to the processing of your personal data</li>
              </ul>
              <p>To exercise these rights, please contact us at <a href="mailto:W.Ng2@universityofgalway.ie" className="text-blue-600 hover:underline">W.Ng2@universityofgalway.ie</a></p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">Changes to This Privacy Policy</h2>
              <p>
                We reserve the right to update this Privacy Policy at any time. Changes will be communicated through this webpage.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-xl">Consent</h2>
              <p>
                By using our website and submitting your personal data, you consent to the terms outlined in this Privacy Policy.
              </p>
            </div>
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
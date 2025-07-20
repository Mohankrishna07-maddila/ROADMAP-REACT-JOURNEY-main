import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertTriangle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  const lastUpdated = "January 15, 2024";

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="h-5 w-5" />,
      content: [
        "By accessing and using CareerPath, you accept and agree to be bound by these terms",
        "If you disagree with any part of these terms, you may not access the service",
        "These terms apply to all visitors, users, and others who access or use the service"
      ]
    },
    {
      title: "Use License",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "Permission is granted to temporarily access CareerPath for personal, non-commercial use",
        "You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from CareerPath",
        "This license shall automatically terminate if you violate any of these restrictions"
      ]
    },
    {
      title: "User Responsibilities",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "Provide accurate and complete information when creating an account",
        "Maintain the security of your account credentials",
        "Use the service in compliance with applicable laws and regulations",
        "Respect the intellectual property rights of others"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: <XCircle className="h-5 w-5" />,
      content: [
        "Using the service for any unlawful purpose",
        "Attempting to gain unauthorized access to our systems",
        "Interfering with or disrupting the service",
        "Sharing inappropriate or harmful content",
        "Impersonating another person or entity"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              The terms and conditions governing your use of CareerPath
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These Terms of Service ("Terms") govern your use of CareerPath, operated by CareerPathTeam. 
                  By accessing or using our service, you agree to be bound by these Terms.
                </p>
                <p className="text-muted-foreground">
                  CareerPath provides learning roadmaps, skill assessments, and career guidance services. 
                  These Terms outline your rights and responsibilities as a user of our platform.
                </p>
              </CardContent>
            </Card>

            {/* Terms Sections */}
            {termsSections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {section.icon}
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Service Description */}
            <Card>
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
                <CardDescription>
                  What CareerPath provides to its users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Learning Roadmaps</Badge>
                      <span className="text-sm text-muted-foreground">Structured learning paths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Skill Assessments</Badge>
                      <span className="text-sm text-muted-foreground">Evaluate your skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Career Guidance</Badge>
                      <span className="text-sm text-muted-foreground">Professional advice</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Community</Badge>
                      <span className="text-sm text-muted-foreground">Connect with peers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Resources</Badge>
                      <span className="text-sm text-muted-foreground">Learning materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Progress Tracking</Badge>
                      <span className="text-sm text-muted-foreground">Monitor your journey</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle>Disclaimers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Service Availability</h4>
                  <p className="text-sm text-muted-foreground">
                    We strive to maintain high availability but do not guarantee uninterrupted access to the service. 
                    We may temporarily suspend or restrict access for maintenance or updates.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Content Accuracy</h4>
                  <p className="text-sm text-muted-foreground">
                    While we work to provide accurate and up-to-date information, we cannot guarantee the completeness, 
                    accuracy, or reliability of any content on our platform.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Career Outcomes</h4>
                  <p className="text-sm text-muted-foreground">
                    CareerPath provides guidance and resources, but individual career outcomes depend on various factors 
                    including personal effort, market conditions, and other external circumstances.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In no event shall CareerPathTeam be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses, resulting from your use of the service.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                  we will provide at least 30 days notice prior to any new terms taking effect. What constitutes 
                  a material change will be determined at our sole discretion.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  If you have any questions about these Terms of Service, please contact us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Email</h4>
                    <a 
                      href="mailto:maddilamohankrishna32@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      maddilamohankrishna32@gmail.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">WhatsApp</h4>
                    <a 
                      href="https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Join our community
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 
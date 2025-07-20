import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const lastUpdated = "January 15, 2024";

  const policySections = [
    {
      title: "Information We Collect",
      icon: <Database className="h-5 w-5" />,
      content: [
        "Personal information (name, email, profile data)",
        "Usage data and analytics",
        "Device and browser information",
        "Cookies and tracking technologies"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="h-5 w-5" />,
      content: [
        "Provide personalized learning recommendations",
        "Improve our services and user experience",
        "Send important updates and notifications",
        "Analyze usage patterns and trends"
      ]
    },
    {
      title: "Data Protection",
      icon: <Lock className="h-5 w-5" />,
      content: [
        "Encryption of sensitive data",
        "Secure data storage and transmission",
        "Regular security audits and updates",
        "Limited access to personal information"
      ]
    },
    {
      title: "Data Sharing",
      icon: <Users className="h-5 w-5" />,
      content: [
        "We do not sell your personal data",
        "Limited sharing with trusted service providers",
        "Compliance with legal requirements",
        "Your explicit consent for any additional sharing"
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
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              How we protect and handle your personal information
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
                  At CareerPath, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
                </p>
                <p className="text-muted-foreground">
                  By using CareerPath, you agree to the collection and use of information in accordance with this policy. 
                  We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Policy Sections */}
            {policySections.map((section, index) => (
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

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
                <CardDescription>
                  You have the following rights regarding your personal data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Access</Badge>
                      <span className="text-sm text-muted-foreground">Request a copy of your data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Rectification</Badge>
                      <span className="text-sm text-muted-foreground">Correct inaccurate data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Erasure</Badge>
                      <span className="text-sm text-muted-foreground">Request data deletion</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Portability</Badge>
                      <span className="text-sm text-muted-foreground">Export your data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Objection</Badge>
                      <span className="text-sm text-muted-foreground">Object to data processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Withdrawal</Badge>
                      <span className="text-sm text-muted-foreground">Withdraw consent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  If you have any questions about this Privacy Policy, please contact us
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

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
                  this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 
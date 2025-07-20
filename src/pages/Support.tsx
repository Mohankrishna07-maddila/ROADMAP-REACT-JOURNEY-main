import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  HelpCircle, 
  Mail, 
  Shield, 
  FileText, 
  MessageCircle, 
  Phone, 
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const faqData = [
  {
    question: "How do I get started with a career roadmap?",
    answer: "Start by taking our skill assessment to get personalized recommendations, then explore roadmaps that match your interests and current skill level."
  },
  {
    question: "Are the courses and projects free?",
    answer: "We provide a mix of free and paid resources. Many courses offer free previews, and we always indicate pricing clearly on each recommendation."
  },
  {
    question: "How often are roadmaps updated?",
    answer: "Our roadmaps are updated monthly to reflect the latest industry trends and technology changes."
  },
  {
    question: "Can I track my learning progress?",
    answer: "Currently, we provide learning recommendations. Progress tracking features are coming soon!"
  },
  {
    question: "How do I report a broken link or incorrect information?",
    answer: "Use our contact form below or email us directly at support@careerpath.com. We'll fix it within 24 hours."
  },
  {
    question: "Is my personal data secure?",
    answer: "Yes! We follow strict data protection guidelines. Read our Privacy Policy for detailed information about how we handle your data."
  }
];

export default function Support() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-xl text-muted-foreground">
              Get help, contact us, and learn about our policies
            </p>
          </div>

          <Tabs defaultValue="help" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="help" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Help Center
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </TabsTrigger>
              <TabsTrigger value="terms" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Terms of Service
              </TabsTrigger>
            </TabsList>

            {/* Help Center */}
            <TabsContent value="help" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Frequently Asked Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {faqData.map((faq, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <Link to="/assessment">
                          <Button variant="outline" className="w-full justify-start">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Take Skill Assessment
                          </Button>
                        </Link>
                        <Link to="/explore">
                          <Button variant="outline" className="w-full justify-start">
                            <Info className="mr-2 h-4 w-4" />
                            Explore Roadmaps
                          </Button>
                        </Link>
                        <Link to="/recommendations">
                          <Button variant="outline" className="w-full justify-start">
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Learning Recommendations
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        Common Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Page not loading?</p>
                          <p className="text-xs text-muted-foreground">Try refreshing the page or clearing your browser cache.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Links not working?</p>
                          <p className="text-xs text-muted-foreground">External links open in new tabs. Check your popup blocker settings.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Assessment not saving?</p>
                          <p className="text-xs text-muted-foreground">Complete all questions to see your results. Progress is saved automatically.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Contact Us */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Name</label>
                          <Input
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <Input
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Message</label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                        <Mail className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">support@careerpath.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Response Time</p>
                          <p className="text-sm text-muted-foreground">Within 24 hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Office Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        CareerPath Team<br />
                        123 Tech Street<br />
                        Silicon Valley, CA 94025<br />
                        United States
                      </p>
                      <Badge variant="outline">Remote-First Company</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Privacy Policy */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy Policy
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Last updated: December 2024</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Information We Collect</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      We collect information you provide directly to us, such as when you take our skill assessment, 
                      explore roadmaps, or contact us for support.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                      <li>• Assessment responses and results</li>
                      <li>• Contact information when you reach out to us</li>
                      <li>• Usage data to improve our services</li>
                      <li>• Technical information about your device and browser</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">How We Use Your Information</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      We use the information we collect to provide, maintain, and improve our services.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                      <li>• Generate personalized learning recommendations</li>
                      <li>• Respond to your questions and support requests</li>
                      <li>• Analyze usage patterns to improve our platform</li>
                      <li>• Send important updates about our services</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Data Security</h3>
                    <p className="text-sm text-muted-foreground">
                      We implement appropriate security measures to protect your personal information 
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Your Rights</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You have the right to access, correct, or delete your personal information. 
                      Contact us at privacy@careerpath.com to exercise these rights.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Terms of Service */}
            <TabsContent value="terms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Terms of Service
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Last updated: December 2024</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Acceptance of Terms</h3>
                    <p className="text-sm text-muted-foreground">
                      By accessing and using CareerPath, you accept and agree to be bound by the terms 
                      and provision of this agreement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Use License</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permission is granted to temporarily access CareerPath for personal, non-commercial 
                      transitory viewing only.
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">This license shall automatically terminate if you violate any of these restrictions and may be terminated by CareerPath at any time.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">User Responsibilities</h3>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                      <li>• Provide accurate information in assessments</li>
                      <li>• Use the platform for educational purposes only</li>
                      <li>• Respect intellectual property rights</li>
                      <li>• Not attempt to gain unauthorized access to our systems</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">External Links</h3>
                    <p className="text-sm text-muted-foreground">
                      CareerPath contains links to external websites. We are not responsible for the 
                      content or privacy practices of these external sites.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
                    <p className="text-sm text-muted-foreground">
                      CareerPath shall not be liable for any indirect, incidental, special, consequential, 
                      or punitive damages resulting from your use of the service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Changes to Terms</h3>
                    <p className="text-sm text-muted-foreground">
                      We reserve the right to modify these terms at any time. Continued use of the 
                      platform constitutes acceptance of updated terms.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
} 
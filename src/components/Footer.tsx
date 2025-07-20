import { Target, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CareerPath</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering your career journey with personalized roadmaps and skill-based guidance.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Mohankrishna07-maddila" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <svg className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/maddila-mohankrishna?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              </a>
              <a href="mailto:maddilamohankrishna32@gmail.com">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Roadmaps */}
          <div className="space-y-4">
            <h3 className="font-semibold">Roadmaps</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/roadmap/frontend" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Frontend Development</Link></li>
              <li><Link to="/roadmap/backend" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Backend Development</Link></li>
              <li><Link to="/roadmap/data-science" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Data Science</Link></li>
              <li><Link to="/roadmap/uiux" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">UI/UX Design</Link></li>
              <li><Link to="/roadmap/mobile" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Mobile Development</Link></li>
              <li><Link to="/roadmap/devops" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">DevOps Engineering</Link></li>
              <li><Link to="/roadmap/cybersecurity" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Cybersecurity</Link></li>
              <li><Link to="/roadmap/ml-engineer" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Machine Learning</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/assessment" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Skill Assessment</Link></li>
              <li><Link to="/recommendations" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Learning Recommendations</Link></li>
              <li><Link to="/explore" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">All Roadmaps</Link></li>
              <li><Link to="/google-workspace" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Google Workspace</Link></li>
              <li><a href="https://github.com/Mohankrishna07-maddila" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/support" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" onClick={scrollToTop} className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CareerPathTeam. All rights reserved. Built with ❤️ for career growth.</p>
        </div>
      </div>
    </footer>
  );
}
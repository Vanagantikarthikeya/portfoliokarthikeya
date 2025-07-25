import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, FileText, Award, Briefcase } from 'lucide-react';

const Resume = () => {
  return (
    <section id="resume" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download my complete resume to learn more about my experience and qualifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Resume Preview Card */}
            <Card className="p-8 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth animate-slide-up">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 hero-gradient rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gradient mb-2">Professional Resume</h3>
                  <p className="text-muted-foreground">
                    Complete overview of my education, experience, skills, and achievements
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm">6+ Professional Certifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="text-sm">AI Development Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm">3+ Featured Projects</span>
                  </div>
                </div>

                <Button className="w-full hero-gradient shadow-glow hover:shadow-hero transition-bounce">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </Card>

            {/* Quick Summary */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Card className="p-6 card-gradient border-gradient shadow-card">
                <h4 className="text-lg font-semibold mb-4 text-gradient">Education</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">B.Tech - Computer Science</p>
                    <p className="text-sm text-muted-foreground">Pallavi Engineering College</p>
                    <p className="text-sm text-muted-foreground">2020 - 2024 (4th Year)</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 card-gradient border-gradient shadow-card">
                <h4 className="text-lg font-semibold mb-4 text-gradient">Experience</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">AI Developer</p>
                    <p className="text-sm text-muted-foreground">IIIT Hyderabad</p>
                    <p className="text-sm text-muted-foreground">Working on Viswam AI - Telugu LLM</p>
                  </div>
                  <div>
                    <p className="font-medium">Project Point of Contact</p>
                    <p className="text-sm text-muted-foreground">Pallavi Engineering College</p>
                    <p className="text-sm text-muted-foreground">Viswam AI Project Coordination</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 card-gradient border-gradient shadow-card">
                <h4 className="text-lg font-semibold mb-4 text-gradient">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['.NET', 'C#', 'AI/ML', 'Prompt Engineering', 'ASP.NET', 'Microsoft Fabric'].map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Resume Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            {[
              { label: 'Projects Built', value: '3+', icon: '🚀' },
              { label: 'Certifications', value: '6+', icon: '🏆' },
              { label: 'Technologies', value: '10+', icon: '💻' }
            ].map((stat) => (
              <Card key={stat.label} className="p-4 text-center card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth">
                <div className="space-y-2">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Alternative Contact */}
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <p className="text-muted-foreground mb-4">
              Want to know more? Let's connect and discuss opportunities!
            </p>
            <Button 
              variant="outline" 
              className="border-gradient hover:bg-primary/10 transition-bounce"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
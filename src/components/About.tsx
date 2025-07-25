import { GraduationCap, MapPin, Target, Heart } from 'lucide-react';
import { Card } from './ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate AI developer on a mission to build intelligent systems that make a difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                <p className="text-lg">
                  <span className="font-semibold">B.Tech 4th-year student</span> at Pallavi Engineering College, Hyderabad
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-primary" />
                <p className="text-lg">
                  <span className="font-semibold">AI Developer</span> at IIIT Hyderabad working on "Viswam AI"
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-primary" />
                <p className="text-lg">
                  <span className="font-semibold">POC of college</span> for Viswam AI project
                </p>
              </div>
            </div>

            <div className="bg-card/50 p-6 rounded-lg border-gradient">
              <h3 className="text-xl font-semibold mb-3 text-gradient">About Viswam AI</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm currently working on "Viswam AI", a groundbreaking Telugu Large Language Model at IIIT Hyderabad. 
                This project focuses on creating a regional LLM that understands and processes native Telugu language, 
                making AI more accessible to Telugu-speaking communities.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Learning new technologies</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Building intelligent chatbots</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Prompt engineering and optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">Exploring AI applications</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="p-6 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mx-auto">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">2024</h3>
                <p className="text-sm text-muted-foreground">Graduation Year</p>
              </div>
            </Card>

            <Card className="p-6 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 accent-gradient rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">IIIT</h3>
                <p className="text-sm text-muted-foreground">Research Work</p>
              </div>
            </Card>

            <Card className="p-6 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">AI</h3>
                <p className="text-sm text-muted-foreground">Passion</p>
              </div>
            </Card>

            <Card className="p-6 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 accent-gradient rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient">HYD</h3>
                <p className="text-sm text-muted-foreground">Based in</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
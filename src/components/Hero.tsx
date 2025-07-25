import { Button } from './ui/button';
import { Download, ArrowRight } from 'lucide-react';
import profileImage from '../assets/profile-image.jpg';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-left space-y-6 animate-slide-up">
            <div className="space-y-2">
              <p className="text-primary font-medium text-lg">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-gradient leading-tight">
                Vanaganti Karthikeya
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
                AI Developer | .NET Enthusiast | Tech Explorer
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Passionate about building intelligent systems with AI, .NET, and modern web technologies. 
              Currently developing cutting-edge solutions and exploring the frontiers of artificial intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => scrollToSection('projects')} 
                className="hero-gradient shadow-glow hover:shadow-hero transition-bounce text-lg px-8 py-6"
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('resume')}
                className="border-gradient text-lg px-8 py-6 hover:bg-primary/10 transition-bounce"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-8 text-center md:text-left">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gradient">3+</p>
                <p className="text-sm text-muted-foreground">Projects Built</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gradient">6+</p>
                <p className="text-sm text-muted-foreground">Certifications</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gradient">B.Tech</p>
                <p className="text-sm text-muted-foreground">4th Year</p>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute inset-0 hero-gradient rounded-full blur-2xl opacity-50 animate-glow"></div>
              <img
                src={profileImage}
                alt="Vanaganti Karthikeya"
                className="relative w-80 h-80 rounded-full object-cover shadow-hero border-4 border-primary/20 animate-float"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 hero-gradient rounded-full flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
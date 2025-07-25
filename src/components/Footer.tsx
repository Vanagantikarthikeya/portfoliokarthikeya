import { Linkedin, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/vanaganti-karthikeya-10a246350'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Vanagantikarthikeya'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border/50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Logo and Name */}
          <div className="space-y-4">
            <div 
              className="inline-flex items-center space-x-3 cursor-pointer group"
              onClick={scrollToTop}
            >
              <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">VK</span>
              </div>
              <span className="text-2xl font-bold text-gradient">Vanaganti Karthikeya</span>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              AI Developer passionate about building intelligent systems and innovative solutions.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { name: 'About', id: 'about' },
              { name: 'Skills', id: 'skills' },
              { name: 'Projects', id: 'projects' },
              { name: 'Resume', id: 'resume' },
              { name: 'Contact', id: 'contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  const element = document.getElementById(link.id);
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Vanaganti Karthikeya. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>using React & AI</span>
            </div>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full hero-gradient shadow-glow hover:shadow-hero transition-bounce mx-auto"
            aria-label="Back to top"
          >
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
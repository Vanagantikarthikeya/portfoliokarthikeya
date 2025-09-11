import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-card' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">VK</span>
            </div>
            <span className="font-bold text-xl text-gradient">Karthikeya</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Skills', path: '/skills' },
              { name: 'Projects', path: '/projects' },
              { name: 'Certifications', path: '/certifications' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-foreground hover:text-primary transition-smooth relative group ${
                  location.pathname === item.path ? 'text-primary' : ''
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <Link to="/contact">
            <Button className="hidden md:block hero-gradient shadow-glow hover:shadow-hero transition-bounce">
              Let's Talk
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden border-gradient"
          >
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled ? 'bg-background/95 backdrop-blur-md electric-nav' : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center logo-electric bg-background">
              <span className="font-bold text-lg" style={{ color: 'var(--electric-cyan)' }}>VK</span>
            </div>
            <span className="font-bold text-xl" style={{ color: 'var(--electric-cyan)' }}>Karthikeya</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link-electric font-medium ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                style={{ color: location.pathname === item.path ? 'var(--electric-cyan)' : 'inherit' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <Link to="/contact">
            <Button 
              className="hidden md:block transition-bounce border-2 bg-background/50 hover:bg-background"
              style={{ 
                borderColor: 'var(--electric-cyan)',
                color: 'var(--electric-cyan)',
                boxShadow: '0 0 15px rgba(0, 255, 251, 0.5)'
              }}
            >
              Let's Talk
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="md:hidden border-gradient"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg py-2 px-4 rounded-lg transition-smooth ${
                      location.pathname === item.path 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full hero-gradient shadow-glow">
                    Let's Talk
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { MapPin, Phone, Mail, Send, Linkedin, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Gowlipura, Hyderabad, Telangana, India',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9059422950',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'vanagantikarthik@gmail.com',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'http://www.linkedin.com/in/vanaganti-karthikeya-10a246350',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Vanagantikarthikeya',
      color: 'from-gray-700 to-gray-900'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth animate-slide-up">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gradient mb-2">Send a Message</h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="bg-background/50 border-gradient focus:shadow-glow transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="bg-background/50 border-gradient focus:shadow-glow transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hello!"
                      rows={5}
                      className="bg-background/50 border-gradient focus:shadow-glow transition-all resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full hero-gradient shadow-glow hover:shadow-hero transition-bounce text-lg py-6"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Contact Details */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gradient mb-6">Get in Touch</h3>
                
                {contactInfo.map((info, index) => (
                  <Card 
                    key={info.label} 
                    className="p-6 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth group cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform`}>
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground text-sm">{info.label}</p>
                        <p className="font-semibold text-lg">{info.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gradient">Follow Me</h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <Card 
                      key={social.name} 
                      className="p-4 card-gradient border-gradient shadow-card hover:shadow-glow transition-bounce group cursor-pointer"
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <social.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {social.name}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <Card className="p-6 card-gradient border-gradient shadow-card">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gradient">Availability</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-muted-foreground">
                      Available for new opportunities and collaborations
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Looking for AI development roles, .NET projects, and innovative tech opportunities.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
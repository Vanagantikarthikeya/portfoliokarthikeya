import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { MapPin, Phone, Mail, Send, Linkedin, Github, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must be less than 500 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Call the edge function to send email
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          message: data.message
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      toast({
        title: "Message Sent Successfully! ✉️",
        description: `Thank you ${data.name}! I'll get back to you at ${data.email} soon.`,
      });

      // Reset form
      form.reset();
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to Send Message",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              className="bg-background/50 border-gradient focus:shadow-glow transition-all"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className="bg-background/50 border-gradient focus:shadow-glow transition-all"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project or just say hello!"
                              rows={5}
                              className="bg-background/50 border-gradient focus:shadow-glow transition-all resize-none"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full hero-gradient shadow-glow hover:shadow-hero transition-bounce text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
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
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/portfolio';

const Projects = () => {

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="group overflow-hidden card-gradient border-gradient shadow-card hover:shadow-glow transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Project Icon & Status */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                        <project.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <Badge 
                          variant="secondary" 
                          className={`bg-gradient-to-r ${project.color} text-white border-0`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="text-xs border-primary/20 hover:border-primary/50 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-gradient group-hover:scale-105 transition-transform duration-300 origin-left">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold">Key Highlights</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {project.title === 'Console Chatbot with Gemini API' ? (
                        <Button 
                          variant="outline" 
                          className="border-gradient hover:bg-primary/10 transition-all duration-300 group/btn"
                          onClick={() => window.open('https://github.com/Vanagantikarthikeya/Console.Chatbot.Gemini/blob/main/README.md', '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          View Demo
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="border-gradient hover:bg-primary/10 transition-all duration-300 group/btn"
                        >
                          <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          View Demo
                        </Button>
                      )}
                      {project.title === 'Console Chatbot with Gemini API' ? (
                        <Button 
                          variant="outline" 
                          className="border-gradient hover:bg-primary/10 transition-all duration-300 group/btn"
                          onClick={() => window.open('https://github.com/Vanagantikarthikeya/Console.Chatbot.Gemini.git', '_blank')}
                        >
                          <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Source Code
                        </Button>
                      ) : project.title === 'Viswam AI - Telugu LLM' ? (
                        <div className="text-sm text-muted-foreground italic">
                          Presently working on it with Swecha Organization
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="border-gradient hover:bg-primary/10 transition-all duration-300 group/btn"
                        >
                          <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          Source Code
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Gradient Border Effect */}
              <div className={`h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </Card>
          ))}
        </div>

        {/* Additional Projects CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground mb-6">
            More exciting projects coming soon! Follow my journey on GitHub.
          </p>
          <Button 
            className="hero-gradient shadow-glow hover:shadow-hero transition-bounce"
            onClick={() => window.open('https://github.com/Vanagantikarthikeya?tab=repositories', '_blank')}
          >
            <Github className="h-4 w-4 mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
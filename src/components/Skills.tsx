import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Code2, Brain, Globe, Zap, Database, Cpu } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: '.NET Development',
      icon: Code2,
      skills: [
        { name: 'C#', level: 90 },
        { name: 'ASP.NET', level: 85 },
        { name: '.NET Core', level: 80 },
        { name: 'Entity Framework', level: 75 }
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      skills: [
        { name: 'Prompt Engineering', level: 95 },
        { name: 'LLM Development', level: 80 },
        { name: 'AI Integration', level: 85 },
        { name: 'Gemini API', level: 90 }
      ]
    },
    {
      title: 'Web Development',
      icon: Globe,
      skills: [
        { name: 'JavaScript', level: 85 },
        { name: 'Bootstrap', level: 80 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'REST APIs', level: 85 }
      ]
    },
    {
      title: 'Microsoft Technologies',
      icon: Database,
      skills: [
        { name: 'Microsoft Fabric', level: 75 },
        { name: 'Power Platforms', level: 70 },
        { name: 'Azure Services', level: 65 },
        { name: 'SQL Server', level: 80 }
      ]
    }
  ];

  const certifications = [
    { name: 'Foundation of C# - Microsoft (FreeCodeCamp)', color: 'bg-blue-500' },
    { name: 'Getting Started with AI - IBM', color: 'bg-green-500' },
    { name: 'JavaScript - Infosys', color: 'bg-yellow-500' },
    { name: 'Bootstrap - Infosys', color: 'bg-purple-500' },
    { name: 'Prompting - Simplilearn', color: 'bg-pink-500' },
    { name: 'AI Data Engineering - Reliance Foundation', color: 'bg-indigo-500' }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="p-6 card-gradient border-gradient shadow-card hover:shadow-glow transition-smooth animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gradient">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={skill.level} className="h-2" />
                      <div 
                        className="absolute top-0 left-0 h-2 skill-gradient rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-3xl font-bold text-center mb-8">
            🌟 <span className="text-gradient">Certifications</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <Card 
                key={cert.name} 
                className="p-4 card-gradient border-gradient shadow-card hover:shadow-glow transition-bounce cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${cert.color} group-hover:scale-110 transition-transform`}></div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {cert.name}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack Highlights */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-semibold mb-6 text-gradient">Tech Stack Highlights</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['.NET', 'C#', 'AI/ML', 'Gemini API', 'Microsoft Fabric', 'ASP.NET', 'JavaScript', 'Bootstrap', 'Prompt Engineering', 'Power Platforms'].map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="px-4 py-2 text-sm hero-gradient text-white hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
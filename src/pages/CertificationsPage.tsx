import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications, portfolioStats } from "../data/portfolio";
import { Award } from "lucide-react";

const CertificationsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                My Certifications
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Professional certifications and achievements that showcase my expertise 
                in various technologies and platforms.
              </p>
              <div className="mt-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {portfolioStats.certificationsCount} Certifications Earned
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <Card key={index} className="card-gradient border-gradient shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${cert.color} flex items-center justify-center`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">
                          {cert.name.split(' - ')[0]}
                        </CardTitle>
                        {cert.name.includes(' - ') && (
                          <CardDescription className="text-sm">
                            {cert.name.split(' - ')[1]}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        Professional Certification
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Card className="inline-block card-gradient border-gradient shadow-card p-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient">
                  Continuous Learning Journey
                </h3>
                <p className="text-muted-foreground max-w-2xl">
                  I believe in continuous learning and staying updated with the latest 
                  technologies. These certifications represent my commitment to excellence 
                  and professional growth in the ever-evolving tech landscape.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CertificationsPage;
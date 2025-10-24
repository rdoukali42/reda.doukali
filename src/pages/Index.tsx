import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Smartphone,
  ArrowRight,
  Send,
  Star,
  Sparkles
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    "React", "TypeScript", "Next.js", "Node.js", 
    "Tailwind CSS", "UI/UX Design", "Figma", "Git",
    "REST APIs", "GraphQL", "MongoDB", "PostgreSQL"
  ];

  const projects = [
    {
      title: "Luxury E-Commerce Platform",
      description: "Premium online shopping experience with advanced filtering and seamless checkout.",
      image: project1,
      tags: ["React", "Node.js", "Stripe"],
      link: "#"
    },
    {
      title: "Fintech Mobile App",
      description: "Modern financial management app with real-time analytics and secure transactions.",
      image: project2,
      tags: ["React Native", "TypeScript", "AWS"],
      link: "#"
    },
    {
      title: "Brand Identity System",
      description: "Complete branding solution with logo design, style guide, and marketing materials.",
      image: project3,
      tags: ["Figma", "Design System", "Branding"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Portfolio
          </h1>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/30 backdrop-blur-sm border border-border/50 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Available for freelance work</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            Creative
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Developer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Crafting exceptional digital experiences with elegant code and stunning design
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-scale-in">
            <Button variant="gold" size="lg" className="group">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg">
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center gap-2 mb-4 text-primary">
                <Star className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wider uppercase">About Me</span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Turning ideas into
                <span className="text-primary"> reality</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                With over 5 years of experience in web development and design, I specialize in creating 
                beautiful, functional, and user-friendly digital products that make a lasting impact.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                My approach combines technical expertise with creative vision, ensuring every project 
                not only meets but exceeds expectations.
              </p>
              <Button variant="gold">
                Download Resume
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="animate-slide-in-right">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in">
                  <Code2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">50+</h3>
                  <p className="text-muted-foreground">Projects Completed</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                  <Palette className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">30+</h3>
                  <p className="text-muted-foreground">Happy Clients</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                  <Smartphone className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">5+</h3>
                  <p className="text-muted-foreground">Years Experience</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.3s" }}>
                  <Sparkles className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">15+</h3>
                  <p className="text-muted-foreground">Awards Won</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Featured Work</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Selected Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work, combining innovative design with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button variant="glass" size="sm" className="ml-auto">
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary"
                        className="bg-card border border-border/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Expertise</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proficient in modern technologies and frameworks to build exceptional products
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group px-8 py-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 hover:shadow-[0_0_30px_hsl(45_100%_51%/0.2)] transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-lg font-medium group-hover:text-primary transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Get in Touch</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's create something extraordinary together
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input 
                    placeholder="Your name" 
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input 
                  placeholder="Project inquiry" 
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..." 
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>
              
              <Button variant="gold" size="lg" className="w-full group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>

          <div className="mt-12 flex justify-center gap-6 animate-fade-in-delay">
            <a href="mailto:hello@example.com">
              <Button variant="glass" size="lg">
                <Mail className="w-5 h-5" />
                Email Me
              </Button>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg">
                <Github className="w-5 h-5" />
                GitHub
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="mb-2">© 2025 Portfolio. All rights reserved.</p>
          <p className="text-sm">Crafted with passion and precision</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

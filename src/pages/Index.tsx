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
    "Python", "LLMs", "RAG", "Prompt Engineering",
    "LangGraph", "MLflow", "Dagster", "OpenStack",
    "Kubernetes", "Terraform", "Vue.js", "Docker",
    "Prometheus", "Grafana", "C", "JavaScript",
    "Jupyter", "Vector Stores", "JWT", "Machine Learning"
  ];

  const experiences = [
    {
      title: "Cloud Engineer",
      company: "Arkadia Heilbronn",
      duration: "July 2025 - August 2025",
      description: "Built IaaS foundation using OpenStack and developed PaaS layer with Kubernetes. Designed managed service product with auto-scaling and multi-region deployment.",
      image: project1,
      tags: ["OpenStack", "Kubernetes", "Terraform", "Vue.js"],
      location: "Heilbronn, Germany"
    },
    {
      title: "Generative AI Engineer",
      company: "Arkadia Heilbronn",
      duration: "June 2025 - July 2025",
      description: "Designed AI agent workflow using LangGraph and implemented RAG with vector stores for context-aware solutions.",
      image: project2,
      tags: ["LangGraph", "RAG", "Vector Stores", "LLMs"],
      location: "Heilbronn, Germany"
    },
    {
      title: "Machine Learning Engineer",
      company: "Arkadia Heilbronn",
      duration: "May 2025 - June 2025",
      description: "Explored data relationships, trained ML models, deployed to MLflow, and automated workflows using Dagster for production-ready MLOps.",
      image: project3,
      tags: ["Jupyter", "MLflow", "Dagster", "Python"],
      location: "Heilbronn, Germany"
    }
  ];

  const education = [
    {
      institution: "42 Heilbronn",
      degree: "IT",
      duration: "March 2022 - March 2024"
    },
    {
      institution: "Université Mohammed Premier Oujda",
      degree: "Bachelor of Technology - Mathematics & Computer Science",
      duration: "September 2014 - July 2015"
    },
    {
      institution: "Lycee Omar Ibn Abdelaziz Oujda",
      degree: "CPGE - Industrial Science & Technology",
      duration: "September 2012 - July 2014"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Reda Doukali
          </h1>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a>
            <a href="#education" className="text-muted-foreground hover:text-foreground transition-colors">Education</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/rdoukali" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/rdoukali42/" target="_blank" rel="noopener noreferrer">
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
            AI Engineer
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              & MLOps Specialist
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Building intelligent systems with LLMs, RAG, and cutting-edge AI technologies
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-scale-in">
            <a href="#experience">
              <Button variant="gold" size="lg" className="group">
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="glass" size="lg">
                <Mail className="w-4 h-4" />
                Get in Touch
              </Button>
            </a>
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
                Turning AI concepts into
                <span className="text-primary"> reality</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                As a versatile Software Engineer and AI enthusiast, I specialize in building end-to-end AI solutions and automating workflows using modern MLOps practices. With a strong foundation in front-end development, UX design, Python, and data science, I bring creativity and problem-solving to every stage of a project.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                My educational background spans IT and mathematics from 42 Heilbronn and Université Mohammed Premier Oujda. I'm passionate about staying up-to-date with the latest AI technologies and using them to build impactful, forward-thinking solutions.
              </p>
              <a href="https://www.linkedin.com/in/rdoukali42/" target="_blank" rel="noopener noreferrer">
                <Button variant="gold">
                  View LinkedIn Profile
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="animate-slide-in-right">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in">
                  <Code2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">AI/ML</h3>
                  <p className="text-muted-foreground">LLMs & RAG Expert</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                  <Palette className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">MLOps</h3>
                  <p className="text-muted-foreground">Pipeline Automation</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                  <Smartphone className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">Cloud</h3>
                  <p className="text-muted-foreground">OpenStack & K8s</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.3s" }}>
                  <Sparkles className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">10+</h3>
                  <p className="text-muted-foreground">Certifications</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Professional Experience</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Work History</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building cutting-edge AI solutions and cloud infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="secondary" className="bg-primary/20 border-primary/50 text-primary mb-2">
                      {exp.duration}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-3">{exp.company}</p>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, tagIndex) => (
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

      {/* Education Section */}
      <section id="education" className="py-32 px-6 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Education</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Academic Background</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Strong foundation in IT, mathematics, and computer science
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <Card 
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-primary text-lg font-medium mb-2">{edu.degree}</p>
                  <Badge variant="secondary" className="bg-card border border-border/50">
                    {edu.duration}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Expertise</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Technical Stack</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expertise in AI, MLOps, cloud infrastructure, and full-stack development
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
            <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Located in Heilbronn, Germany. Open to collaboration and new opportunities
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
            <a href="https://github.com/rdoukali" target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg">
                <Github className="w-5 h-5" />
                GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/rdoukali42/" target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
            </a>
          </div>
          
          <div className="mt-8 text-center text-muted-foreground animate-fade-in-delay">
            <p className="flex items-center justify-center gap-2">
              <span>📍</span>
              <span>Heilbronn, Baden-Württemberg, Germany</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="mb-2">© 2025 Reda Doukali. All rights reserved.</p>
          <p className="text-sm">AI Engineer | MLOps Specialist | Cloud Architecture</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

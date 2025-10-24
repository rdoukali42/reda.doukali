import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/hooks/use-locale";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { socialLinks, projectLinks, companyLinks } from "@/config/links";
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
import goldMe from "@/assets/gold_me.png";
import sports42Img from "@/assets/42sports.png";
import mlopsImg from "@/assets/mlopsPipe.png";
import webGameImg from "@/assets/webGame.png";
import securityBenchImg from "@/assets/securityBench.png";
import goWebImg from "@/assets/goWeb.png";
import aiMultiAgentImg from "@/assets/aiMultiAgents.png";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const { t } = useLocale();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (section: string, index: number) => {
    const key = `${section}-${index}`;
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Image mappings for projects (matches order in locale files)
  // Order: 42sports, MLOps Pipeline, Web Game, Security Benchmark, Go Web Service, AI Multi-Agent
  const projectImages = [sports42Img, mlopsImg, webGameImg, securityBenchImg, goWebImg, aiMultiAgentImg];
  
  // Project repository links (matches order in locale files)
  const projectRepoLinks = [
    projectLinks.sports42,
    projectLinks.mlops,
    projectLinks.webGame,
    projectLinks.securityBenchmark,
    projectLinks.goWebService,
    projectLinks.aiMultiAgent
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
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.about}</a>
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.experience}</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.projects}</a>
            <a href="#education" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.education}</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.skills}</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
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
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-12 gap-8 items-start min-h-screen">
            {/* Text Content */}
            <div className="md:col-span-12 text-center md:text-left order-2 md:order-1 relative z-0 flex flex-col justify-center min-h-screen py-20">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/30 backdrop-blur-sm border border-border/50 animate-fade-in w-fit">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{t.hero.badge}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
                {t.hero.title}
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  {t.hero.subtitle}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl animate-fade-in-delay">
                {t.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 animate-scale-in">
                <a href="#projects">
                  <Button variant="gold" size="lg" className="group">
                    {t.hero.viewWork}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#contact">
                  <Button variant="glass" size="lg">
                    <Mail className="w-4 h-4" />
                    {t.hero.getInTouch}
                  </Button>
                </a>
              </div>
            </div>

            {/* Professional Image - 3D Effect - Hidden on mobile */}
            <div className="hidden md:block md:col-span-5 md:absolute md:right-6 md:top-0 relative order-1 md:order-2 z-20 animate-slide-in-right md:pt-32">
              <div className="relative md:max-w-lg lg:max-w-xl">
                {/* Subtle glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/10 to-primary/20 blur-3xl rounded-full transform scale-110"></div>
                
                {/* The PNG image without background - positioned to overlap text */}
                <img 
                  src={goldMe} 
                  alt="Reda Doukali - AI Engineer" 
                  className="relative w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(255,193,7,0.3)] transform hover:scale-105 transition-transform duration-700"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-30">
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
                <span className="text-sm font-medium tracking-wider uppercase">{t.about.label}</span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                {t.about.title}
                <span className="text-primary">{t.about.titleHighlight}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t.about.paragraph1}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t.about.paragraph2}
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                {t.about.paragraph3}
              </p>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="gold">
                  {t.about.viewLinkedIn}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="animate-slide-in-right">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in">
                  <Code2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">{t.about.cards.aiml.title}</h3>
                  <p className="text-muted-foreground">{t.about.cards.aiml.description}</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                  <Palette className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">{t.about.cards.mlops.title}</h3>
                  <p className="text-muted-foreground">{t.about.cards.mlops.description}</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                  <Smartphone className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">{t.about.cards.cloud.title}</h3>
                  <p className="text-muted-foreground">{t.about.cards.cloud.description}</p>
                </Card>
                
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: "0.3s" }}>
                  <Sparkles className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-4xl font-bold mb-2">{t.about.cards.certifications.title}</h3>
                  <p className="text-muted-foreground">{t.about.cards.certifications.description}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Arkadia Programs */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">{t.experience.label}</span>
            </div>
            <h2 className="text-4xl font-bold mb-3">{t.experience.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.experience.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.experience.programs.map((program, index) => {
              const isExpanded = expandedItems[`experience-${index}`];
              return (
                <Card 
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <Badge variant="secondary" className="bg-primary/30 border-primary text-primary font-semibold text-xs mb-4">
                      {program.duration}
                    </Badge>
                    
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-primary text-xs font-medium mb-3">{program.company}</p>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {isExpanded ? program.description : truncateText(program.description, 120)}
                    </p>
                    {program.description.length > 120 && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-primary hover:text-primary/80 p-0 h-auto mb-3"
                        onClick={() => toggleExpand('experience', index)}
                      >
                        {isExpanded ? t.experience.showLess : t.experience.readMore}
                        <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </Button>
                    )}
                    {isExpanded && program.collaboration && (
                      <p className="text-xs text-primary/80 italic mb-3">
                        {program.collaboration}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {program.tags.slice(0, isExpanded ? program.tags.length : 3).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary"
                          className="bg-muted/50 border border-border text-foreground font-medium text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {!isExpanded && program.tags.length > 3 && (
                        <Badge variant="secondary" className="bg-muted/50 border border-border text-foreground font-medium text-xs">
                          +{program.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">{t.projects.label}</span>
            </div>
            <h2 className="text-4xl font-bold mb-3">{t.projects.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.projects.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.items.map((project, index) => {
              const isExpanded = expandedItems[`project-${index}`];
              return (
                <Card 
                  key={index}
                  className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={projectImages[index]} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge variant="secondary" className="bg-primary/30 border-primary text-primary font-semibold text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-primary/70 text-xs font-medium mb-3 italic">
                      {t.projects.madeFor} {project.madeFor}
                    </p>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {isExpanded ? project.description : truncateText(project.description, 100)}
                    </p>
                    {project.description.length > 100 && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-primary hover:text-primary/80 p-0 h-auto mb-3"
                        onClick={() => toggleExpand('project', index)}
                      >
                        {isExpanded ? t.projects.showLess : t.projects.readMore}
                        <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </Button>
                    )}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, isExpanded ? project.tags.length : 3).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary"
                          className="bg-muted/50 border border-border text-foreground font-medium text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {!isExpanded && project.tags.length > 3 && (
                        <Badge variant="secondary" className="bg-muted/50 border border-border text-foreground font-medium text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <a href={projectRepoLinks[index]} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" size="sm" className="w-full group/btn border-primary/30 hover:bg-primary/10 hover:border-primary">
                        <Github className="w-4 h-4" />
                        View Repository
                        <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">{t.education.label}</span>
            </div>
            <h2 className="text-4xl font-bold mb-3">{t.education.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.education.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.education.items.map((edu, index) => (
              <Card 
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">{edu.degree}</p>
                  <Badge variant="secondary" className="bg-muted/50 border border-border text-foreground font-medium text-xs">
                    {edu.duration}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">{t.skills.label}</span>
            </div>
            <h2 className="text-4xl font-bold mb-3">{t.skills.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.skills.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {t.skills.items.map((skill, index) => (
              <div
                key={index}
                className="group px-6 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 hover:shadow-[0_0_30px_hsl(45_100%_51%/0.2)] transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">{t.contact.label}</span>
            </div>
            <h2 className="text-4xl font-bold mb-3">{t.contact.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contact.description}
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.name}</label>
                  <Input 
                    placeholder={t.contact.form.namePlaceholder}
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.email}</label>
                  <Input 
                    type="email" 
                    placeholder={t.contact.form.emailPlaceholder}
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.form.subject}</label>
                <Input 
                  placeholder={t.contact.form.subjectPlaceholder}
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.form.message}</label>
                <Textarea 
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>
              
              <Button variant="gold" size="lg" className="w-full group">
                {t.contact.form.send}
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>

          <div className="mt-12 flex justify-center gap-6 animate-fade-in-delay">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg">
                <Github className="w-5 h-5" />
                GitHub
              </Button>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="glass" size="lg">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
            </a>
          </div>
          
          <div className="mt-8 text-center text-muted-foreground animate-fade-in-delay">
            <p className="flex items-center justify-center gap-2">
              <span>📍</span>
              <span>{t.contact.location}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="mb-2">{t.footer.copyright}</p>
          <p className="text-sm">{t.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

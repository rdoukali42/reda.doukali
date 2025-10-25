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
import SkillGame from "@/components/SkillGame";

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
            {t.education.items.map((edu, index) => {
              const key = `education-${index}`;
              const isExpanded = !!expandedItems[key];

              return (
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

                    {/* Description: hidden by default, expandable */}
                    {edu.description && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p className="whitespace-pre-line">
                          {isExpanded ? edu.description : truncateText(edu.description, 160)}
                        </p>
                        <div className="mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand('education', index)}
                            className="text-primary"
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
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

      {/* Card Game Section */}
      <section id="game" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Fun Zone</span>
            </div>
            <h2 className="text-4xl font-bold mb-3">Skills Mind Reading Challenge</h2>
            {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred skill and if I guess it in less than 3 rounds, I deserve a follow on LinkedIn! 😉
            </p> */}
          </div>

          <div className="flex justify-center animate-scale-in">
            <SkillGame />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">{t.contact.label}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.contact.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              {t.contact.description}
            </p>
          </div>

          {/* Hexagonal Connection Hub */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center connection point - hidden on mobile */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl animate-pulse" />
            </div>

            {/* Connection lines (decorative) - hidden on mobile */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="currentColor" strokeWidth="2" className="text-primary/20 animate-pulse" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="currentColor" strokeWidth="2" className="text-primary/20 animate-pulse" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="25%" y2="70%" stroke="currentColor" strokeWidth="2" className="text-primary/20 animate-pulse" strokeDasharray="5,5" />
              <line x1="50%" y1="50%" x2="75%" y2="70%" stroke="currentColor" strokeWidth="2" className="text-primary/20 animate-pulse" strokeDasharray="5,5" />
            </svg>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 py-6 md:py-12">
              {/* LinkedIn - Top Left */}
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative justify-self-center md:justify-self-end"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-primary/10 rounded-3xl blur-2xl transition-all duration-700" />
                  
                  {/* Main card */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Orbiting ring */}
                    <div className="absolute inset-3 md:inset-4 rounded-xl border border-primary/20 group-hover:rotate-180 transition-transform duration-[2000ms] ease-out" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                      <div className="mb-3 md:mb-4 p-3 md:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500 group-hover:scale-110 transform transition-transform">
                        <Linkedin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-1">LinkedIn</h3>
                      <p className="text-xs text-muted-foreground">Connect</p>
                      <div className="mt-2 md:mt-3 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-xs">Visit</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </a>

              {/* GitHub - Top Right */}
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative justify-self-center md:justify-self-start"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-primary/10 rounded-3xl blur-2xl transition-all duration-700" />
                  
                  {/* Main card */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Orbiting ring */}
                    <div className="absolute inset-3 md:inset-4 rounded-xl border border-primary/20 group-hover:rotate-180 transition-transform duration-[2000ms] ease-out" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                      <div className="mb-3 md:mb-4 p-3 md:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500 group-hover:scale-110 transform transition-transform">
                        <Github className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-1">GitHub</h3>
                      <p className="text-xs text-muted-foreground">Explore Code</p>
                      <div className="mt-2 md:mt-3 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-xs">Visit</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </a>

              {/* Email - Bottom Left */}
              <a 
                href={`mailto:${socialLinks.email}`}
                className="group relative justify-self-center md:justify-self-end"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-primary/10 rounded-3xl blur-2xl transition-all duration-700" />
                  
                  {/* Main card */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Orbiting ring */}
                    <div className="absolute inset-3 md:inset-4 rounded-xl border border-primary/20 group-hover:rotate-180 transition-transform duration-[2000ms] ease-out" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                      <div className="mb-3 md:mb-4 p-3 md:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500 group-hover:scale-110 transform transition-transform">
                        <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-1">Email</h3>
                      <p className="text-xs text-muted-foreground">Get in Touch</p>
                      <div className="mt-2 md:mt-3 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-xs">Send</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </a>

              {/* Location - Bottom Right */}
              <div className="group relative justify-self-center md:justify-self-start">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-primary/10 rounded-3xl blur-2xl transition-all duration-700" />
                  
                  {/* Main card */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Orbiting ring */}
                    <div className="absolute inset-3 md:inset-4 rounded-xl border border-primary/20 group-hover:rotate-180 transition-transform duration-[2000ms] ease-out" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                      <div className="mb-3 md:mb-4 p-3 md:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500 group-hover:scale-110 transform transition-transform">
                        <span className="text-2xl md:text-3xl">📍</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold mb-1">Location</h3>
                      <p className="text-xs text-muted-foreground px-2">Heilbronn, Germany</p>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Center decorative element - hidden on mobile */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 w-20 h-20 rounded-full border border-primary/20" />
            </div>
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

import { useState } from 'react';
import { Star, ArrowRight, Github, ExternalLink, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { projectLinks } from '@/config/links';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { ChipMount } from '@/components/motion/ChipMount';
import sports42Img from '@/assets/42sports.png';
import mlopsImg from '@/assets/mlopsPipe.png';
import lyraixGuardImg from '@/assets/lyraixGuard.png';
import securityBenchImg from '@/assets/securityBench.png';
import goWebImg from '@/assets/goWeb.png';
import aiMultiAgentImg from '@/assets/aiMultiAgents.png';

const truncate = (text: string, max = 100) =>
  text.length <= max ? text : text.slice(0, max) + '...';

// Order matches locale `projects.items`: 42sports, Spotify Popularity, LyraixGuard, SecEval, Go Notification, AI Support Ticket
const projectImages = [sports42Img, mlopsImg, lyraixGuardImg, securityBenchImg, goWebImg, aiMultiAgentImg];

const projectRepoLinks = [
  projectLinks.sports42,
  projectLinks.mlops,
  projectLinks.lyraixGuard,
  projectLinks.securityBenchmark,
  projectLinks.goWebService,
  projectLinks.aiMultiAgent,
];

const projectPaperLinks: (string | undefined)[] = [
  undefined,
  undefined,
  projectLinks.lyraixGuardPaper,
  undefined,
  undefined,
  undefined,
];

const Projects = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <section id="projects" className="py-20 px-6 relative bg-gradient-to-b from-background to-card/20" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.projects.label} ]</span>
          </div>
          <h2 id="projects-heading" className="text-4xl font-bold mb-3">
            {t.projects.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.projects.description}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, index) => {
            const isOpen = expanded[index];
            return (
              <FocusBracket key={index} size={12}>
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 group-hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={projectImages[index]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

                    {/* Hover spec overlay: full tech stack with workshop chips */}
                    <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 p-4 pb-12 flex flex-col gap-2 pointer-events-none">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">
                        [ STACK ]
                      </div>
                      <div className="flex flex-wrap gap-1.5 content-start">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-background/85 border border-primary/40 rounded-sm text-primary/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-primary/30 border border-primary text-primary">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-primary/70 text-xs font-mono italic mb-3">
                      {t.projects.madeFor} {project.madeFor}
                    </p>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {isOpen ? project.description : truncate(project.description, 100)}
                    </p>

                    {project.description.length > 100 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary font-mono p-0 h-auto mb-3"
                        onClick={() => toggle(index)}
                        data-cursor="link"
                      >
                        {'> '}
                        {isOpen ? t.projects.showLess : t.projects.readMore}
                        <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </Button>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, isOpen ? project.tags.length : 3).map((tag, ti) => (
                        <ChipMount key={tag} index={ti}>
                          <Badge
                            variant="secondary"
                            className="font-mono text-[10px] uppercase tracking-wider bg-muted/50 border border-border text-foreground"
                          >
                            {tag}
                          </Badge>
                        </ChipMount>
                      ))}
                      {!isOpen && project.tags.length > 3 && (
                        <Badge variant="secondary" className="font-mono text-[10px] bg-muted/50 border border-border text-foreground">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-2">
                      <a href={projectRepoLinks[index]} target="_blank" rel="noopener noreferrer" data-cursor="link">
                        <Button variant="outline" size="sm" className="w-full font-mono border-primary/30 hover:bg-primary/10 hover:border-primary">
                          <span className="mr-1 text-primary/70">[</span>
                          <Github className="w-4 h-4 mr-2" />
                          View Repository
                          <ExternalLink className="w-3 h-3 ml-1" />
                          <span className="ml-1 text-primary/70">]</span>
                        </Button>
                      </a>
                      {projectPaperLinks[index] && (
                        <a href={projectPaperLinks[index]} target="_blank" rel="noopener noreferrer" data-cursor="link">
                          <Button variant="outline" size="sm" className="w-full font-mono border-primary/30 hover:bg-primary/10 hover:border-primary">
                            <span className="mr-1 text-primary/70">[</span>
                            <FileText className="w-4 h-4 mr-2" />
                            Read Paper
                            <ExternalLink className="w-3 h-3 ml-1" />
                            <span className="ml-1 text-primary/70">]</span>
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </FocusBracket>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;

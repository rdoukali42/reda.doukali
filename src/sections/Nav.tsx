import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { socialLinks } from '@/config/links';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useEffect, useState } from 'react';

const Nav = () => {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: { id: string; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'education', label: t.nav.education },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-colors ${
        scrolled ? 'border-b border-primary/30' : 'border-b border-transparent'
      }`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm" data-cursor="link">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(45_100%_51%/0.6)]" aria-hidden="true" />
          <span className="text-foreground/70">reda@portfolio</span>
          <span className="text-primary">·</span>
          <span className="text-foreground">/home</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative px-2 py-1.5 text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors group"
              data-cursor="link"
            >
              <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute left-0 top-1/2 -translate-y-1/2 text-primary transition-opacity">
                [
              </span>
              <span className="px-1">{item.label}</span>
              <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 text-primary transition-opacity">
                ]
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor="link"
          >
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor="link"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

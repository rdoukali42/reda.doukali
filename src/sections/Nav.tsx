import { Link } from 'react-router-dom';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { socialLinks } from '@/config/links';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useEffect, useState } from 'react';

const Nav = () => {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet when escape is pressed
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

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
        scrolled || mobileOpen ? 'border-b border-primary/30' : 'border-b border-transparent'
      }`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand — collapses on phones */}
        <Link to="/" className="flex items-center gap-2 font-mono text-sm shrink-0" data-cursor="link">
          <span
            className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(45_100%_51%/0.6)] shrink-0"
            aria-hidden="true"
          />
          <span className="text-foreground/70 hidden sm:inline">reda@portfolio</span>
          <span className="text-primary hidden sm:inline">·</span>
          <span className="text-foreground">/home</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative px-2 py-1.5 text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors group"
              data-cursor="link"
            >
              <span
                className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute left-0 top-1/2 -translate-y-1/2 text-primary transition-opacity"
                aria-hidden="true"
              >
                [
              </span>
              <span className="px-1">{item.label}</span>
              <span
                className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 text-primary transition-opacity"
                aria-hidden="true"
              >
                ]
              </span>
            </a>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <LanguageSwitcher />

          {/* Desktop social icons */}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor="link"
            className="hidden md:inline-flex"
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
            className="hidden md:inline-flex"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            data-cursor="link"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <div
        id="mobile-nav-panel"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? 'max-h-[80vh] opacity-100 border-t border-primary/20' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1 font-mono text-sm uppercase tracking-wider">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-foreground/75 hover:text-primary border-l-2 border-transparent hover:border-primary transition-colors rounded-sm"
              data-cursor="link"
            >
              <span className="text-primary mr-1.5">[</span>
              {item.label}
              <span className="text-primary ml-1.5">]</span>
            </a>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-cursor="link"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full font-mono border-primary/30 hover:bg-primary/10 hover:border-primary">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-cursor="link"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full font-mono border-primary/30 hover:bg-primary/10 hover:border-primary">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

import { useLocale } from '@/hooks/use-locale';

const Footer = () => {
  const { t } = useLocale();
  return (
    <footer className="py-10 px-6 border-t border-primary/20" aria-label="Site footer">
      <div className="max-w-7xl mx-auto text-center text-muted-foreground">
        <p className="font-mono text-sm mb-2">
          <span className="text-primary">{'> '}reda@portfolio:~$ </span>
          {t.footer.copyright}
          <span className="inline-block w-2 h-4 -mb-0.5 ml-1 bg-primary animate-pulse align-middle" aria-hidden="true" />
        </p>
        <p className="font-mono text-xs text-muted-foreground/70">{t.footer.tagline}</p>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-background border-t border-muted-grey/20 py-16">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4 space-y-6"
          >
            <h3 className="font-heading text-2xl text-foreground font-bold">
              AI Transform
            </h3>
            <p className="font-paragraph text-base text-secondary max-w-sm">
              Wir transformieren KI von einem Tool zu einem echten Wettbewerbsvorteil für den deutschen Mittelstand.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 space-y-4"
          >
            <h4 className="font-heading text-sm text-foreground font-semibold uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="space-y-3">
              <button
                onClick={() => scrollToSection('transformation')}
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                Transformationsmodell
              </button>
              <button
                onClick={() => scrollToSection('use-cases')}
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                Anwendungsfälle
              </button>
              <button
                onClick={() => scrollToSection('results')}
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                Ergebnisse
              </button>
              <button
                onClick={() => scrollToSection('audit')}
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                KI-Audit
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                Kontakt
              </button>
            </nav>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 space-y-4"
          >
            <h4 className="font-heading text-sm text-foreground font-semibold uppercase tracking-wider">
              Kontakt
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@leoly.ai"
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                contact@leoly.ai
              </a>
              <p className="font-paragraph text-sm text-secondary">
                Tel: +49 (0) 123 456 789
              </p>
              <p className="font-paragraph text-sm text-secondary">
                Deutschland
              </p>
            </div>
          </motion.div>

          {/* Legal Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 space-y-4"
          >
            <h4 className="font-heading text-sm text-foreground font-semibold uppercase tracking-wider">
              Rechtliches
            </h4>
            <nav className="space-y-3">
              <a
                href="#impressum"
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                Impressum
              </a>
              <a
                href="#datenschutz"
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                Datenschutz
              </a>
              <a
                href="#agb"
                className="block font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                AGB
              </a>
            </nav>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-muted-grey/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary">
              © {currentYear} AI Transform. Alle Rechte vorbehalten.
            </p>
            <p className="font-paragraph text-sm text-secondary">
              Strategie + Engineering für den deutschen Mittelstand
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

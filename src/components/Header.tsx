import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Transformationsmodell', id: 'transformation' },
    { label: 'Anwendungsfälle', id: 'use-cases' },
    { label: 'Ergebnisse', id: 'results' },
    { label: 'KI-Audit', id: 'audit' },
    { label: 'Kontakt', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-muted-grey/20">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-heading text-xl md:text-2xl text-foreground font-bold hover:text-secondary transition-colors"
            >
              AI Transform
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="font-paragraph text-sm text-secondary hover:text-foreground transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={() => scrollToSection('audit')}
                className="bg-primary text-primary-foreground hover:bg-secondary px-5 py-2 text-sm font-semibold rounded"
              >
                KI-Audit starten
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground hover:text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-muted-grey/20 py-6 space-y-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left font-paragraph text-base text-secondary hover:text-foreground transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            
            <Button
              onClick={() => scrollToSection('audit')}
              className="w-full bg-primary text-primary-foreground hover:bg-secondary px-5 py-3 text-base font-semibold rounded mt-4"
            >
              KI-Audit starten
            </Button>
          </motion.nav>
        )}
      </div>
    </header>
  );
}

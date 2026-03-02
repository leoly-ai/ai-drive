// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, BarChart3, Layers, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import type { Alleinstellungsmerkmale, Anwendungsflle, MessbareErgebnisse, TransformationsmodellPhasen } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

// --- Utility Components ---

const SectionDivider = () => (
  <div className="w-full h-px bg-muted-grey/30" />
);

const VerticalLine = ({ className }: { className?: string }) => (
  <div className={`w-px bg-muted-grey/30 h-full absolute top-0 ${className}`} />
);

const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
       style={{ 
         backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
         backgroundSize: '4rem 4rem' 
       }} 
  />
);

// --- Main Component ---

export default function HomePage() {
  const [transformationPhases, setTransformationPhases] = useState<TransformationsmodellPhasen[]>([]);
  const [useCases, setUseCases] = useState<Anwendungsflle[]>([]);
  const [results, setResults] = useState<MessbareErgebnisse[]>([]);
  const [differentiators, setDifferentiators] = useState<Alleinstellungsmerkmale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll Progress for global bar
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [phasesData, useCasesData, resultsData, diffData] = await Promise.all([
        BaseCrudService.getAll<TransformationsmodellPhasen>('transformationsmodell'),
        BaseCrudService.getAll<Anwendungsflle>('anwendungsfaelle'),
        BaseCrudService.getAll<MessbareErgebnisse>('messbareergebnisse'),
        BaseCrudService.getAll<Alleinstellungsmerkmale>('alleinstellungsmerkmale'),
      ]);

      setTransformationPhases(phasesData.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
      setUseCases(useCasesData.items);
      setResults(resultsData.items);
      setDifferentiators(diffData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-heading text-2xl tracking-widest uppercase"
        >
          Loading System
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-clip">
      <Header />
      
      {/* Global Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-32 pb-12 border-b border-muted-grey/30 overflow-hidden">
        <GridBackground />
        
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-between">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Structural Line */}
            <div className="hidden md:block col-span-1 relative">
              <VerticalLine className="left-0" />
            </div>

            <div className="col-span-12 md:col-span-10 flex flex-col justify-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 mb-8 border border-foreground/10 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-xs font-medium tracking-widest uppercase text-secondary">Markt-Analyse 2024</span>
                </div>
                
                <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl leading-[0.9] tracking-tight text-foreground mb-8">
                  Während Sie noch <br />
                  <span className="text-secondary/40">experimentieren</span>, <br />
                  automatisiert Ihr <br />
                  Wettbewerb.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-2 gap-12 items-end"
              >
                <p className="font-paragraph text-xl md:text-2xl text-secondary leading-relaxed max-w-xl">
                  Wir transformieren KI von einem Tool zu einem echten, messbaren Wettbewerbsvorteil. Keine Spielereien. Nur Ergebnisse.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={scrollToContact}
                    className="bg-foreground text-background hover:bg-secondary hover:text-white px-8 py-8 text-lg rounded-none border border-transparent transition-all duration-300 group"
                  >
                    KI-Audit starten
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={scrollToContact}
                    variant="outline"
                    className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-8 text-lg rounded-none transition-all duration-300"
                  >
                    Strategisches Erstgespräch
                  </Button>
                </div>
              </motion.div>
            </div>

             {/* Right Structural Line */}
             <div className="hidden md:block col-span-1 relative">
              <VerticalLine className="right-0" />
            </div>
          </div>
        </div>
      </section>

      {/* --- MARKET REALITY (THE WAKE UP CALL) --- */}
      <section className="w-full bg-foreground text-background py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
        
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            
            {/* Sticky Left Content */}
            <div className="relative">
              <div className="sticky top-32">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="font-heading text-4xl md:text-6xl leading-tight mb-8"
                >
                  KI-Nutzung ist kein <span className="text-muted-grey">Wettbewerbsvorteil</span>.
                  <br />
                  Systemische Integration schon.
                </motion.h2>
                <div className="w-24 h-1 bg-accent-link mb-8" />
                <p className="font-paragraph text-xl text-muted-grey max-w-md">
                  Der Markt bewegt sich schneller, als viele denken. Wer jetzt nicht strukturiert transformiert, verliert Tempo und Marktanteile.
                </p>
              </div>
            </div>

            {/* Right Content - Data Visualization */}
            <div className="space-y-24">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="border border-white/20 p-12 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                
                <p className="font-paragraph text-sm text-muted-grey uppercase tracking-widest mb-4">Markt-Realität</p>
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-heading text-8xl md:text-9xl text-white">70%</span>
                  <span className="font-paragraph text-xl text-muted-grey">der Unternehmen</span>
                </div>
                <p className="font-paragraph text-2xl text-white leading-relaxed">
                  nutzen KI heute fast ausschließlich über ChatGPT – <span className="text-accent-link">isoliert</span> und ohne Integration in Kernprozesse.
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  "ChatGPT ist nur der Anfang.",
                  "Der Markt ist längst weiter.",
                  "Experimente reichen nicht mehr."
                ].map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center gap-6 border-b border-white/10 pb-8"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight className="w-6 h-6 text-accent-link" />
                    </div>
                    <p className="font-heading text-2xl md:text-3xl text-white">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRANSFORMATION MODEL (STICKY STEPS) --- */}
      <section className="w-full bg-background py-32 relative">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          
          <div className="mb-24 border-b border-foreground/10 pb-12">
            <h2 className="font-heading text-4xl md:text-7xl text-foreground mb-6">
              Unser Transformationsmodell
            </h2>
            <p className="font-paragraph text-xl text-secondary max-w-2xl">
              Ein systematischer 5-Stufen-Prozess für messbare Wettbewerbsvorteile. Wir überlassen nichts dem Zufall.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line for Timeline */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-muted-grey/30 hidden md:block" />

            <div className="space-y-0">
              {transformationPhases.map((phase, index) => (
                <TransformationPhaseCard key={phase._id} phase={phase} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- USE CASES (MAGAZINE GRID) --- */}
      <section className="w-full bg-secondary/5 py-32 border-y border-muted-grey/30">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
                Konkrete Anwendungsfälle
              </h2>
              <p className="font-paragraph text-xl text-secondary max-w-xl">
                Von der Automatisierung bis zur strategischen Wertschöpfung. Echte Lösungen für echte Probleme.
              </p>
            </div>
            <Button variant="outline" className="rounded-none border-foreground px-8 py-6" onClick={scrollToContact}>
              Alle Cases ansehen <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-muted-grey/30 border border-muted-grey/30">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={useCase._id} useCase={useCase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- MEASURABLE RESULTS (TICKER STYLE) --- */}
      <section className="w-full bg-foreground text-background py-32 overflow-hidden">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-heading text-4xl md:text-6xl mb-8">
                Messbare <br />
                <span className="text-muted-grey">Ergebnisse</span>
              </h2>
              <p className="font-paragraph text-lg text-muted-grey/80 leading-relaxed">
                Wir messen unseren Erfolg an Ihrem ROI. Unsere Lösungen sind darauf ausgelegt, direkten wirtschaftlichen Impact zu erzeugen.
              </p>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {results.map((result, index) => (
                  <motion.div
                    key={result._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <BarChart3 className="w-6 h-6 text-accent-link" />
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-grey">{result.resultType}</span>
                    </div>
                    <div className="font-heading text-5xl md:text-6xl font-bold mb-2 text-white">
                      {result.value}{result.unit}
                    </div>
                    <p className="font-paragraph text-sm text-muted-grey/70 mb-4 uppercase tracking-wide">
                      {result.impactArea}
                    </p>
                    <p className="font-paragraph text-base text-white/90">
                      {result.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DIFFERENTIATORS (WHY US) --- */}
      <section className="w-full bg-background py-32">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="relative">
              <div className="sticky top-32">
                <h2 className="font-heading text-4xl md:text-7xl text-foreground mb-12">
                  Warum wir
                </h2>
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-secondary/5">
                   <Image 
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=1"
                    alt="Strategic Planning"
                    className="w-full h-full object-cover grayscale contrast-125"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            </div>

            <div className="space-y-0 divide-y divide-muted-grey/30 border-t border-b border-muted-grey/30">
              {differentiators.map((diff, index) => (
                <motion.div
                  key={diff._id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="py-12 group"
                >
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 flex-shrink-0 bg-secondary/5 flex items-center justify-center rounded-none group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                      {diff.icon ? (
                        <Image src={diff.icon} alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                      ) : (
                        <ShieldCheck className="w-8 h-8" />
                      )}
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-heading text-2xl md:text-3xl text-foreground group-hover:translate-x-2 transition-transform duration-300">
                        {diff.title}
                      </h3>
                      {diff.shortSummary && (
                        <p className="font-paragraph text-lg font-medium text-foreground">
                          {diff.shortSummary}
                        </p>
                      )}
                      <p className="font-paragraph text-base text-secondary leading-relaxed max-w-md">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section id="contact" className="w-full bg-foreground text-background py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        </div>
        
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="font-heading text-5xl md:text-8xl leading-tight">
              In 14 Tagen zu Ihrer <br />
              <span className="text-muted-grey">konkreten KI-Roadmap.</span>
            </h2>
            
            <p className="font-paragraph text-xl md:text-2xl text-muted-grey max-w-3xl mx-auto">
              Starten Sie mit einem strukturierten KI-Audit. Keine Verpflichtungen, nur Klarheit.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button
                onClick={scrollToContact}
                className="bg-background text-foreground hover:bg-white/90 px-10 py-8 text-xl rounded-none font-semibold min-w-[240px]"
              >
                KI-Audit starten
              </Button>
              <Button
                onClick={scrollToContact}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-10 py-8 text-xl rounded-none font-semibold min-w-[240px]"
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Sub-Components for Cleaner Render Logic ---

function TransformationPhaseCard({ phase, index }: { phase: TransformationsmodellPhasen; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col md:flex-row gap-12 py-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Content Side */}
      <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
        <div className={`inline-flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
          <span className="font-heading text-8xl text-foreground/5 mb-4 block -mt-8">0{phase.stepNumber}</span>
          <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-6 relative z-10">
            {phase.phaseName}
          </h3>
          <p className="font-paragraph text-lg text-secondary mb-8 max-w-md">
            {phase.activityDescription}
          </p>
          
          <div className="bg-secondary/5 p-6 border-l-2 border-foreground max-w-md">
            <p className="font-paragraph text-xs font-bold uppercase tracking-widest text-foreground mb-2">
              Wirtschaftlicher Nutzen
            </p>
            <p className="font-paragraph text-sm text-secondary">
              {phase.economicArgument}
            </p>
          </div>
        </div>
      </div>

      {/* Center Point */}
      <div className="hidden md:flex flex-col items-center justify-center relative w-0">
        <div className="w-4 h-4 bg-foreground rounded-full z-10" />
      </div>

      {/* Image/Visual Side */}
      <div className={`flex-1 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="aspect-video w-full bg-secondary/10 relative overflow-hidden group">
          <Image
            src={phase.phaseImage || "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=2"}
            alt={phase.phaseName || "Phase"}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500" />
          
          {phase.keyDeliverables && (
            <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-paragraph text-xs font-bold uppercase mb-1">Deliverables</p>
              <p className="font-paragraph text-sm text-secondary">{phase.keyDeliverables}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function UseCaseCard({ useCase, index }: { useCase: Anwendungsflle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background p-8 md:p-12 hover:bg-secondary/5 transition-colors duration-300 group flex flex-col h-full"
    >
      <div className="mb-8 aspect-[4/3] overflow-hidden bg-secondary/10 relative">
        <Image
          src={useCase.useCaseImage || "https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=3"}
          alt={useCase.useCaseTitle || 'Use case'}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-4 left-4 bg-background px-3 py-1 text-xs font-bold uppercase tracking-wider border border-foreground">
          {useCase.industry || 'Industry'}
        </div>
      </div>

      <h3 className="font-heading text-2xl text-foreground mb-4 group-hover:underline decoration-1 underline-offset-4">
        {useCase.useCaseTitle}
      </h3>

      <div className="space-y-6 flex-grow">
        <div>
          <p className="font-paragraph text-xs font-bold text-secondary uppercase mb-1">Challenge</p>
          <p className="font-paragraph text-sm text-secondary/80 line-clamp-3">
            {useCase.challenge}
          </p>
        </div>
        <div>
          <p className="font-paragraph text-xs font-bold text-secondary uppercase mb-1">Solution</p>
          <p className="font-paragraph text-sm text-secondary/80 line-clamp-3">
            {useCase.solutionDescription}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-muted-grey/30 flex items-center justify-between">
        <span className="font-paragraph text-sm font-bold text-foreground">
          {useCase.expectedImpact}
        </span>
        <ArrowRight className="w-5 h-5 text-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </motion.div>
  );
}
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SCALE_OPTIONS = [
  { value: 1, label: "Gar nicht" },
  { value: 2, label: "Geringfügig" },
  { value: 3, label: "Teilweise" },
  { value: 4, label: "Weitgehend" },
  { value: 5, label: "Vollständig" },
] as const;

const AUDIT_SECTIONS = [
  {
    id: "strategy",
    eyebrow: "1. Strategie & Führung",
    title: "Strategische Verankerung und Führung",
    description:
      "Bewertet werden Zielbild, Budget, Verantwortlichkeit und Steuerungslogik.",
    questions: [
      { id: "strategy-1", text: "Gibt es eine definierte KI-Strategie mit klaren Zielen?" },
      { id: "strategy-2", text: "Ist KI in Budgetplanung und Roadmap verankert?" },
      { id: "strategy-3", text: "Gibt es eine verantwortliche Person oder ein dediziertes KI-Team?" },
      { id: "strategy-4", text: "Werden KI-Initiativen anhand klar definierter KPIs gemessen?" },
    ],
  },
  {
    id: "data",
    eyebrow: "2. Daten & Infrastruktur",
    title: "Datenbasis, Systeme und Governance",
    description:
      "Hier geht es um Datenzugang, Integrationsfähigkeit und regulatorische Belastbarkeit.",
    questions: [
      { id: "data-1", text: "Sind Ihre Daten strukturiert und zentral zugänglich?" },
      { id: "data-2", text: "Lassen sich neue KI-Tools schnell in Ihre Systemlandschaft integrieren?" },
      { id: "data-3", text: "Gibt es klare Richtlinien für Data Governance, Sicherheit und Compliance?" },
      { id: "data-4", text: "Bieten Ihre Systeme saubere APIs und belastbare Integrationen?" },
    ],
  },
  {
    id: "execution",
    eyebrow: "3. Umsetzung & Kultur",
    title: "Lieferfähigkeit und organisationale Adoption",
    description:
      "Im Fokus stehen produktiver Einsatz, Priorisierung, Enablement und Automatisierungsdisziplin.",
    questions: [
      { id: "execution-1", text: "Sind bereits KI-Systeme produktiv im Einsatz?" },
      { id: "execution-2", text: "Werden neue KI-Use-Cases aktiv identifiziert und priorisiert?" },
      { id: "execution-3", text: "Sind Mitarbeitende im Einsatz von KI-Tools geschult?" },
      { id: "execution-4", text: "Wird Automatisierung bereichsübergreifend strategisch gesteuert?" },
    ],
  },
] as const;

const SCORE_BANDS = [
  {
    min: 12,
    max: 24,
    label: "KI-Einsteiger",
    accent: "border-red-500/20 bg-red-500/10 text-red-700",
    summary:
      "KI ist bislang eher experimentell oder unstrukturiert. Das Fundament ist ausbaufähig.",
    nextStep:
      "Nächster Schritt: Zielbild, Verantwortlichkeiten und Datenzugang sauber aufsetzen.",
  },
  {
    min: 25,
    max: 36,
    label: "KI-Explorer",
    accent: "border-orange-500/20 bg-orange-500/10 text-orange-700",
    summary:
      "Erste Initiativen sind vorhanden, aber ein skalierbares Betriebsmodell fehlt noch.",
    nextStep:
      "Nächster Schritt: Pilotportfolio schärfen, Ownership festziehen und Governance etablieren.",
  },
  {
    min: 37,
    max: 48,
    label: "Strukturiert",
    accent: "border-yellow-500/30 bg-yellow-500/10 text-yellow-800",
    summary:
      "KI ist etabliert, aber noch nicht durchgängig in operative Steuerung und Prozesse eingebettet.",
    nextStep:
      "Nächster Schritt: Standards, KPI-Steuerung und bereichsübergreifende Rollouts absichern.",
  },
  {
    min: 49,
    max: 60,
    label: "Skalierungsbereit",
    accent: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
    summary:
      "Die Voraussetzungen für standardisierte Skalierung, ROI-Steuerung und operative Verankerung sind vorhanden.",
    nextStep:
      "Nächster Schritt: Portfolio-Steuerung professionalisieren und skalierende Rollout-Wellen planen.",
  },
] as const;

const TOTAL_QUESTIONS = AUDIT_SECTIONS.reduce(
  (sum, section) => sum + section.questions.length,
  0
);
const MAX_SCORE = TOTAL_QUESTIONS * 5;

type Answers = Record<string, number>;

type ExecutiveAuditSectionProps = {
  contactEmail: string;
  onRequestConsultation: () => void;
};

export default function ExecutiveAuditSection({
  contactEmail,
  onRequestConsultation,
}: ExecutiveAuditSectionProps) {
  const [answers, setAnswers] = useState<Answers>({});

  const answeredCount = Object.keys(answers).length;
  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const completionPercentage = (answeredCount / TOTAL_QUESTIONS) * 100;
  const isComplete = answeredCount === TOTAL_QUESTIONS;
  const resultBand = isComplete
    ? SCORE_BANDS.find((band) => totalScore >= band.min && totalScore <= band.max) ?? null
    : null;

  const categoryScores = AUDIT_SECTIONS.map((section) => ({
    title: section.title,
    score: section.questions.reduce(
      (sum, question) => sum + (answers[question.id] ?? 0),
      0
    ),
  }));

  const mailtoHref = isComplete && resultBand
    ? buildMailtoHref(contactEmail, totalScore, resultBand.label, categoryScores)
    : `mailto:${contactEmail}`;

  return (
    <section
      id="audit"
      className="w-full bg-secondary/5 py-32 border-y border-muted-grey/30"
    >
      <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-16 xl:gap-24">
          <div className="space-y-8 lg:sticky lg:top-28 h-fit">
            <div className="inline-flex flex-wrap items-center gap-3 border border-foreground/10 bg-background px-4 py-2">
              <span className="font-paragraph text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                Executive Audit
              </span>
              <span className="h-1 w-1 rounded-full bg-secondary/40" />
              <span className="font-paragraph text-xs text-secondary">12 Fragen</span>
              <span className="h-1 w-1 rounded-full bg-secondary/40" />
              <span className="font-paragraph text-xs text-secondary">3-4 Minuten</span>
              <span className="h-1 w-1 rounded-full bg-secondary/40" />
              <span className="font-paragraph text-xs text-secondary">Max. 60 Punkte</span>
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-4xl md:text-6xl text-foreground leading-[0.95]">
                KI-Readiness Audit
                <br />
                <span className="text-secondary">für Entscheider:innen</span>
              </h2>
              <p className="font-paragraph text-xl text-secondary max-w-2xl leading-relaxed">
                Bewerten Sie in wenigen Minuten, wie belastbar Ihre Organisation heute
                für skalierbare KI-Initiativen aufgestellt ist. Das Ergebnis zeigt, wo
                strategische Lücken in Führung, Datenbasis und Umsetzung bestehen.
              </p>
            </div>

            <div className="bg-foreground text-background border border-white/10 p-8 space-y-6">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="font-paragraph text-xs uppercase tracking-[0.22em] text-muted-grey">
                    Fortschritt
                  </p>
                  <p className="font-heading text-4xl">
                    {answeredCount}
                    <span className="text-muted-grey">/{TOTAL_QUESTIONS}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-paragraph text-xs uppercase tracking-[0.22em] text-muted-grey">
                    Score
                  </p>
                  <p className="font-heading text-4xl">
                    {totalScore}
                    <span className="text-muted-grey">/{MAX_SCORE}</span>
                  </p>
                </div>
              </div>

              <div className="h-2 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-accent-link transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>

              <p className="font-paragraph text-base text-muted-grey">
                {isComplete
                  ? "Audit vollständig abgeschlossen. Ihr Reifegrad ist jetzt belastbar einordenbar."
                  : `Noch ${TOTAL_QUESTIONS - answeredCount} Fragen offen, bis die finale Einordnung sichtbar wird.`}
              </p>

              {resultBand ? (
                <div className="space-y-6 border border-white/10 bg-white/5 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-paragraph text-xs uppercase tracking-[0.22em] text-muted-grey">
                        Reifegrad
                      </p>
                      <div
                        className={cn(
                          "mt-2 inline-flex items-center gap-2 border px-3 py-2 text-sm font-semibold uppercase tracking-[0.18em]",
                          resultBand.accent
                        )}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {resultBand.label}
                      </div>
                    </div>
                    <p className="font-heading text-5xl leading-none">{totalScore}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="font-paragraph text-base text-white/90">
                      {resultBand.summary}
                    </p>
                    <p className="font-paragraph text-sm text-muted-grey">
                      {resultBand.nextStep}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {categoryScores.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-paragraph text-sm text-white/90">
                            {category.title}
                          </p>
                          <p className="font-paragraph text-sm text-muted-grey">
                            {category.score}/20
                          </p>
                        </div>
                        <div className="h-1.5 bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-white transition-all duration-500"
                            style={{ width: `${(category.score / 20) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button asChild className="bg-background text-foreground hover:bg-white/90 rounded-none px-6 py-6">
                      <a href={mailtoHref}>
                        Ergebnis einordnen lassen
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onRequestConsultation}
                      className="border-white/20 text-white hover:bg-white/10 rounded-none px-6 py-6"
                    >
                      Gespräch anfragen
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border border-white/10 bg-white/5 p-6">
                  <p className="font-paragraph text-sm uppercase tracking-[0.22em] text-muted-grey mb-3">
                    Scoring-Modell
                  </p>
                  <div className="space-y-3">
                    {SCORE_BANDS.map((band) => (
                      <div key={band.label} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-paragraph text-sm text-white">{band.label}</p>
                          <p className="font-paragraph text-xs text-muted-grey">
                            {band.summary}
                          </p>
                        </div>
                        <p className="font-paragraph text-xs text-muted-grey whitespace-nowrap">
                          {band.min}-{band.max}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {SCALE_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className="border border-foreground/10 bg-background px-3 py-3 text-center"
                >
                  <p className="font-heading text-xl text-foreground">{option.value}</p>
                  <p className="font-paragraph text-[11px] text-secondary mt-1 leading-tight">
                    {option.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {AUDIT_SECTIONS.map((section, sectionIndex) => (
              <div key={section.id} className="space-y-6">
                <div className="border-b border-foreground/10 pb-6">
                  <p className="font-paragraph text-xs uppercase tracking-[0.24em] text-secondary mb-3">
                    {section.eyebrow}
                  </p>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-3xl md:text-4xl text-foreground">
                        {section.title}
                      </h3>
                      <p className="font-paragraph text-base md:text-lg text-secondary mt-3 max-w-2xl">
                        {section.description}
                      </p>
                    </div>
                    <p className="font-heading text-6xl text-foreground/10">
                      0{sectionIndex + 1}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {section.questions.map((question, questionIndex) => {
                    const absoluteIndex =
                      AUDIT_SECTIONS
                        .slice(0, sectionIndex)
                        .reduce((sum, current) => sum + current.questions.length, 0) +
                      questionIndex +
                      1;
                    const selectedValue = answers[question.id];

                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: questionIndex * 0.04 }}
                        className="border border-foreground/10 bg-background p-6 md:p-8"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                          <div>
                            <p className="font-paragraph text-xs uppercase tracking-[0.22em] text-secondary mb-2">
                              Frage {absoluteIndex} von {TOTAL_QUESTIONS}
                            </p>
                            <h4 className="font-heading text-2xl md:text-3xl text-foreground leading-tight max-w-3xl">
                              {question.text}
                            </h4>
                          </div>
                          <div className="border border-foreground/10 px-3 py-2 text-center min-w-[96px]">
                            <p className="font-paragraph text-[11px] uppercase tracking-[0.22em] text-secondary">
                              Auswahl
                            </p>
                            <p className="font-heading text-2xl text-foreground">
                              {selectedValue ?? "-"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                          {SCALE_OPTIONS.map((option) => {
                            const isSelected = selectedValue === option.value;

                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() =>
                                  setAnswers((current) => ({
                                    ...current,
                                    [question.id]: option.value,
                                  }))
                                }
                                className={cn(
                                  "border px-2 py-3 text-center min-h-[92px] flex flex-col items-center justify-center transition-all duration-200",
                                  isSelected
                                    ? "border-foreground bg-foreground text-background"
                                    : "border-foreground/10 bg-background text-foreground hover:border-foreground/30 hover:bg-secondary/5"
                                )}
                                aria-pressed={isSelected}
                              >
                                <p className="font-heading text-2xl">{option.value}</p>
                                <p
                                  className={cn(
                                    "font-paragraph text-[11px] mt-2 leading-tight",
                                    isSelected ? "text-background/80" : "text-secondary"
                                  )}
                                >
                                  {option.label}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function buildMailtoHref(
  contactEmail: string,
  totalScore: number,
  bandLabel: string,
  categoryScores: Array<{ title: string; score: number }>
) {
  const subject = `KI Readiness Audit: ${bandLabel} (${totalScore}/${MAX_SCORE})`;
  const body = [
    "Guten Tag,",
    "",
    "wir haben den KI-Readiness Audit ausgefüllt und möchten das Ergebnis einordnen lassen.",
    "",
    `Gesamtscore: ${totalScore}/${MAX_SCORE}`,
    `Reifegrad: ${bandLabel}`,
    "",
    ...categoryScores.map((category) => `${category.title}: ${category.score}/20`),
    "",
    "Bitte senden Sie uns die nächsten sinnvollen Schritte für eine Executive-Einordnung.",
  ].join("\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

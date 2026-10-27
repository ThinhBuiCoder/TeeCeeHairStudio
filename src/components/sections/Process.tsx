import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/site'

export const Process = () => (
  <section
    id="quy-trinh"
    aria-labelledby="process-title"
    className="on-dark bg-ink py-20 text-white md:py-28"
  >
    <div className="container-page">
      <Reveal>
        <SectionHeading
          id="process-title"
          tone="dark"
          eyebrow="Đặt lịch"
          title="Ba bước, chưa tới một phút"
        />
      </Reveal>

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {processSteps.map((step, index) => (
          <li key={step.title} className="relative border-t border-gold/60 pt-6">
            <Reveal delay={index * 0.1}>
              <span
                aria-hidden="true"
                className="font-display text-6xl font-bold text-gold-light/90"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-2xl text-white">
                <span className="sr-only">Bước {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-white/75">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

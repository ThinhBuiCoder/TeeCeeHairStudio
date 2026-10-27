import { Accordion } from '@/components/ui/Accordion'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { faqs } from '@/data/faq'

export const Faq = () => {
  if (faqs.length === 0) return null

  return (
    <section
      id="hoi-dap"
      aria-labelledby="faq-title"
      className="border-t border-line bg-surface py-20 md:py-28"
    >
      <div className="container-page max-w-3xl">
        <Reveal>
          <SectionHeading id="faq-title" eyebrow="Hỏi đáp" title="Câu hỏi thường gặp" />
        </Reveal>
        <Reveal className="mt-12">
          <Accordion
            items={faqs.map((f) => ({ id: f.id, title: f.question, content: f.answer }))}
          />
        </Reveal>
      </div>
    </section>
  )
}

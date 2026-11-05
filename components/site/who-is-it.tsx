"use client"

/* eslint-disable @next/next/no-img-element -- export estático: imagem servida direto de public/ */
import { useState } from "react"

import { type Locale, dictionaries } from "@/lib/i18n"

/**
 * "Quem é esse Pokémon?" do próximo evento: o local aparece como silhueta escura sobre raios de luz
 * e é revelado ao clicar (ou ao passar o mouse). O texto completo fica sempre disponível para leitores de tela.
 */
export function WhoIsIt({ locale, logo, local, descricao, data }: { locale: Locale; logo: string; local: string; descricao: string; data: string }) {
  const [revelado, setRevelado] = useState(false)
  const t = dictionaries[locale].event
  return (
    <div className="who-card" data-revealed={revelado || undefined}>
      <div aria-hidden="true" className="who-rays" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-12 text-center md:py-16">
        <p className="font-heading text-sm font-semibold tracking-widest text-aws-orange uppercase">{t.eyebrow}</p>
        <p aria-hidden="true" className="who-question font-heading text-3xl font-semibold md:text-5xl">
          {revelado ? t.answer(local) : t.question}
        </p>
        <button
          type="button"
          onClick={() => setRevelado((v) => !v)}
          aria-pressed={revelado}
          className="who-stage"
          aria-label={revelado ? t.hide : t.reveal}
        >
          <img src={logo} alt="" className="who-logo" />
        </button>
        <div aria-live="polite" className="flex flex-col items-center gap-2">
          <p className={revelado ? "text-lg text-foreground" : "sr-only"}>
            {t.sentence(local, descricao)}
          </p>
          <p className="font-heading text-xl font-semibold text-aws-orange">{t.date} {data}</p>
          {!revelado && <p className="text-sm text-muted-foreground">{t.hint}</p>}
        </div>
      </div>
    </div>
  )
}

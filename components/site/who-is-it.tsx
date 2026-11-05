"use client"

/* eslint-disable @next/next/no-img-element -- export estático: imagem servida direto de public/ */
import { useState } from "react"

/**
 * "Quem é esse Pokémon?" do próximo evento: o local aparece como silhueta escura sobre raios de luz
 * e é revelado ao clicar (ou ao passar o mouse). O texto completo fica sempre disponível para leitores de tela.
 */
export function WhoIsIt({ logo, local, descricao, data }: { logo: string; local: string; descricao: string; data: string }) {
  const [revelado, setRevelado] = useState(false)
  return (
    <div className="who-card" data-revealed={revelado || undefined}>
      <div aria-hidden="true" className="who-rays" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-12 text-center md:py-16">
        <p className="font-heading text-sm font-semibold tracking-widest text-aws-orange uppercase">Próximo evento</p>
        <p aria-hidden="true" className="who-question font-heading text-3xl font-semibold md:text-5xl">
          {revelado ? `É o ${local}!` : "Qual é esse lugar?"}
        </p>
        <button
          type="button"
          onClick={() => setRevelado((v) => !v)}
          aria-pressed={revelado}
          className="who-stage"
          aria-label={revelado ? `Esconder o local do próximo evento` : "Revelar o local do próximo evento"}
        >
          <img src={logo} alt="" className="who-logo" />
        </button>
        <div aria-live="polite" className="flex flex-col items-center gap-2">
          <p className={revelado ? "text-lg text-foreground" : "sr-only"}>
            O próximo encontro do AWS Student Builder Group da Fametro vai ser no {local}: {descricao}.
          </p>
          <p className="font-heading text-xl font-semibold text-aws-orange">Data: {data}</p>
          {!revelado && <p className="text-sm text-muted-foreground">Clique na silhueta para descobrir.</p>}
        </div>
      </div>
    </div>
  )
}

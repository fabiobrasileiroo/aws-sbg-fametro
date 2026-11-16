"use client"

export const CONSENT_KEY = "aws_sbg_cookie_consent"
export type ConsentStatus = "accepted" | "declined" | null

export function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(CONSENT_KEY) as ConsentStatus
  } catch {
    return null
  }
}

export function setStoredConsent(status: "accepted" | "declined") {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(CONSENT_KEY, status)
    window.dispatchEvent(new CustomEvent("aws_sbg_consent_change", { detail: status }))
  } catch {
    // ignorar falha se localStorage estiver bloqueado
  }

  if (status === "accepted") {
    enableAnalytics()
  }
}

/** Ativa rastreamento quando o usuário aceita cookies (ex.: Google Analytics se configurado). */
export function enableAnalytics() {
  if (typeof window === "undefined") return

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (gaId && !document.getElementById("ga-script")) {
    const script = document.createElement("script")
    script.id = "ga-script"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    const inline = document.createElement("script")
    inline.id = "ga-inline"
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    `
    document.head.appendChild(inline)
  }
}

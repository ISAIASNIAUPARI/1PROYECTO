'use client'

import Link from 'next/link'
import { useState } from 'react'

/**
 * Los dos botones flotantes: BEBIDAS (derecha) y Atención al Cliente (izquierda).
 *
 * El de atención sólo aparece si tiene una URL configurada en Sanity.
 * En la web original apuntaba a "#atencion-pendiente", un ancla inexistente:
 * el visitante pulsaba y no pasaba nada. Ahora, sin enlace, no se muestra.
 */
export function FloatingButtons({
  drinksEnabled,
  drinksLabel,
  chatEnabled,
  chatLabel,
  chatTooltip,
  chatUrl,
}: {
  drinksEnabled?: boolean
  drinksLabel?: string
  chatEnabled?: boolean
  chatLabel?: string
  chatTooltip?: string
  chatUrl?: string
}) {
  const [hover, setHover] = useState(false)
  const showChat = chatEnabled && !!chatUrl

  return (
    <>
      {drinksEnabled && (
        <Link href="/bebidas" id="bebidas-btn">
          {drinksLabel || 'BEBIDAS'}
        </Link>
      )}

      {showChat && (
        <>
          <a
            href={chatUrl}
            id="chat-atencion-btn"
            title={chatLabel}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {chatLabel}
          </a>
          <div id="chat-atencion-badge" className={hover ? 'show' : undefined}>
            {chatTooltip}
          </div>
        </>
      )}
    </>
  )
}

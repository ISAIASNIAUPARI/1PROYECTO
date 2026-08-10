# La Gloria Restaurante

Web del restaurante, hecha con **Next.js** y **Sanity** como gestor de contenidos.

El diseño es el mismo de siempre. Lo que cambia es que ahora **todos los textos, fotos, platos y precios se editan desde una pantalla de administración**, sin tocar código y sin pedírselo a nadie.

---

## Para el cliente: cómo editar la web

### 1. Entrar al panel

Ve a **`https://TU-DOMINIO.vercel.app/studio`** e inicia sesión con Google, GitHub o correo.

La primera vez, el administrador tiene que invitarte desde [sanity.io/manage](https://www.sanity.io/manage) → *Members* → *Invite member*.

### 2. Elegir qué cambiar

En la columna de la izquierda verás las secciones **en el mismo orden en que aparecen en la web**:

| Sección | Qué contiene |
|---|---|
| ⚙️ Ajustes generales | Nombre del restaurante, menú de navegación, botones flotantes, título para Google |
| 1 · Portada | El titular de bienvenida, las fotos que van rotando y los dos botones |
| 2 · Sobre La Gloria | El texto de presentación y las dos fotos que lo acompañan |
| 3 · Un instante | Los títulos de la animación que avanza al hacer scroll |
| 4 · Especiales | Los seis platos destacados con su foto y su nombre |
| 5 · Nuestro Menú | Las categorías, los platos, los ingredientes y los precios |
| 6 · Reservas | Titular, foto de fondo, teléfono, dirección y el correo que recibe las reservas |
| 7 · Pie de página | Horario, enlaces a redes sociales y copyright |
| 🥤 Página de Bebidas | Las tarjetas de bebidas con foto, descripción y precio |

### 3. Guardar

Escribe el cambio y pulsa **Publish** (abajo a la derecha). **La web se actualiza sola en menos de un minuto** — no hay que avisar a nadie ni volver a publicar nada.

Si te equivocas, el botón de los tres puntos junto a *Publish* tiene la opción de deshacer y volver a una versión anterior.

### Cosas que conviene saber

- **Cambiar una foto**: pulsa sobre la foto actual → *Upload* → elige la nueva. Sanity la recorta y la optimiza sola para cada tamaño de pantalla.
- **Reordenar platos o bebidas**: arrastra las fichas por el icono de la izquierda.
- **Añadir un plato**: botón *Add item* al final de la lista.
- **Redes sociales**: en *Pie de página* verás los cinco iconos. **El icono sólo se vuelve pulsable cuando le pones un enlace**; sin enlace se ve, pero no lleva a ningún sitio (que es justo lo que hacía la web antigua).
- **Botón de Atención al Cliente**: aparece en cuanto pegues la URL del chat en *Ajustes generales → Botones flotantes → Enlace del chat*. Mientras esté vacío, el botón no se muestra: es preferible a un botón que no hace nada.
- **Los vídeos de fondo** se pueden reemplazar desde *Especiales* y *Nuestro Menú*. Si los dejas vacíos se usan los que vienen con la web. Sube MP4 de menos de 10 MB.
- **Los fotogramas de la animación** del scroll (126 imágenes) son archivos del proyecto y no se editan desde el panel. Para cambiarlos hace falta un desarrollador.

---

## Para desarrolladores

### Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y rellena los valores
npm run dev
```

- Web: <http://localhost:3000>
- Panel: <http://localhost:3000/studio>

### Variables de entorno

Están documentadas una a una en [`.env.example`](.env.example). Resumen:

| Variable | ¿Secreta? | Para qué |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Identifica el proyecto de Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | No | El dataset a leer (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Fija el contrato de la API |
| `SANITY_API_READ_TOKEN` | **Sí** | Sólo si algún día se leen borradores |
| `SANITY_API_WRITE_TOKEN` | **Sí** | Sólo lo usa `npm run seed` |

Para que la web funcione en Vercel bastan las tres primeras. Los tokens **nunca** se suben al repositorio: `.env.local` está en `.gitignore`.

### Estructura

```
app/
  layout.tsx              Raíz: fuentes. Sin CSS global, para no romper el Studio
  (site)/
    layout.tsx            Carga globals.css y el <title> desde Sanity
    page.tsx              Portada: lee las 8 secciones y las compone
    bebidas/page.tsx      Página de bebidas
  studio/[[...tool]]/     Sanity Studio embebido en /studio
  globals.css             El CSS del diseño original, portado tal cual
components/               Un componente por sección
sanity/
  schemaTypes/            Un schema por sección
  structure.ts            Cómo se ve el menú lateral del Studio
  lib/                    Cliente, consultas GROQ y ayudas de imagen
scripts/seed.mjs          Carga inicial de contenido
public/
  frames/                 126 fotogramas de la animación de scroll
  videos/                 Vídeos de fondo por defecto
  images/  dishes/        Copia local de las fotos (el original vive en Sanity)
```

### Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run seed` | **Sobrescribe** el contenido de Sanity con el del HTML original |
| `npm run schema:deploy` | Sube el schema a Sanity (opcional, ver abajo) |

> `npm run seed` es idempotente pero destructivo: pisa lo que el cliente haya editado. Úsalo sólo para poblar un dataset vacío.

#### Sobre `schema:deploy`

**No hace falta para que la web ni el Studio funcionen.** El Studio de `/studio` lee el schema del propio código (`sanity.config.ts`), que viaja en el build.

Subir el schema a Sanity sólo sirve para que las herramientas remotas de Sanity (Media Library, acciones de agente, APIs que conocen la estructura) sepan cómo es el contenido. Requiere un token con el permiso `sanity.project/deploySchema`, que el rol *Editor* no tiene. Si lo quieres:

```bash
npx sanity login
npm run schema:deploy
```

Inicia sesión con la cuenta propietaria del proyecto de Sanity.

### Cómo llega el contenido a la web

Las páginas se generan de forma estática y **revalidan cada 60 segundos** (`export const revalidate = 60`). Un cambio publicado en el Studio aparece en la web en menos de un minuto, sin redesplegar.

Si prefieres que sea instantáneo, configura un webhook de Sanity que llame a una ruta de revalidación bajo demanda.

### Notas de la migración

La web anterior era un único `index.html` de 21 MB: un *bundle* auto-extraíble con 37 assets en base64 (2 vídeos, 5 imágenes, 29 fuentes) que el navegador descargaba entero antes de pintar nada. Al migrar:

- Las imágenes y vídeos se extrajeron a archivos reales. Las imágenes editables viven ahora en Sanity y se sirven optimizadas por su CDN.
- Las 29 fuentes en base64 se sustituyeron por `next/font`, que sirve las mismas familias de Google (Poppins, Playfair Display, Pinyon Script, Montserrat) desde nuestro propio dominio.
- **El fondo de la sección Reservas era un hueco vacío del maquetador**: en producción mostraba el texto «Foto: salón del restaurante» a los visitantes. Ahora es una foto real, editable desde el panel.
- Se eliminaron 66 MB de archivos muertos (`ziplagloria.zip` duplicaba el sitio entero, `cgi-bin.zip` estaba vacío y 5 PNG no se usaban). Siguen en el historial de git.

#### Pendiente

**El formulario de reservas sigue funcionando por `mailto:`**, igual que en la web original: abre el gestor de correo del visitante con el mensaje ya escrito. Tiene dos problemas heredados que **no** se han cambiado para no alterar el comportamiento sin tu visto bueno:

1. En un móvil sin app de correo configurada, o con webmail, no pasa nada al pulsar.
2. El botón muestra «✓ 2 personas · 10 ago · 8:00 p.m.» **aunque el correo no se haya enviado**. El visitante cree que ha reservado cuando puede que no.

La solución razonable es enviar el formulario a un webhook (n8n, por ejemplo) y confirmar sólo cuando el servidor responda que sí. Es un cambio pequeño y aislado en `components/Reservations.tsx`.

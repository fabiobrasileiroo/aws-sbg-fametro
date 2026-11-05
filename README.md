# AWS Student Builder Group da Fametro

Site oficial do grupo: apresentações interativas, teaser em vídeo, trilha de certificações, equipe e parceiros.

**Site:** https://fabiobrasileiro.me/aws-sbg-fametro/

## Como funciona

- Next.js 16 (export estático) + shadcn/ui (estilo *lyra*, cantos retos) com o design system do grupo: fundo *ink* `#161D26`, laranja `#FF9900`, rosa, roxo, azul e verde do template, grade em pixel e títulos monoespaçados.
- O conteúdo (slides, vídeo, fotos, dados em `data/site.json`) vem do repositório privado do grupo pelo comando `make publicar`. Não edite `public/slides`, `public/teaser`, `public/video` nem `data/site.json` à mão.
- Cada push na `main` publica no GitHub Pages (`.github/workflows/deploy.yml`).

## Controle pelo celular

Abra uma apresentação, clique em **Controle pelo celular** e leia o QR code: o celular avança, volta, vai ao primeiro ou ao último slide e mostra as notas. A conexão é direta entre os aparelhos (WebRTC/PeerJS).

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera out/ (use NEXT_PUBLIC_BASE_PATH=/aws-sbg-fametro para simular o Pages)
```

Comunidade estudantil do programa AWS Student Builder Groups. Este não é um site oficial da Amazon Web Services.

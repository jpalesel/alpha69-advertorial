# Advertorial Alpha 69 — Bio Saúde

Esqueleto do advertorial (estrutura campeã, copy pendente do intel do Wesley).

## Status do copy
Placeholders marcados com [MAIÚSCULAS] — preencher com:
- Headline + história da persona (público 40-60)
- 3 objeções + respostas do time de vendas (call com Wesley)
- Kits, preços, oferta (60% OFF? frete grátis?)
- Texto da garantia

## Antes de publicar — checklist técnico
1. `js/whatsapp-cta-tracking.js`: trocar `WHATSAPP_PHONE` pelo número oficial da Bio Saúde
2. `js/whatsapp-cta-tracking.js`: definir `PORTEIRO_URL` (ou deixar '' )
3. Colar o sensor da MGID no `<head>` (onde indicado)
4. Trocar `[IMAGEM HERO]` por foto real do produto/lifestyle
5. Revisar claims com a Lavínia (moderação — potência masculina é sensível)

## Deploy (Railway)
1. Criar repo `alpha69-advertorial` no GitHub e subir estes arquivos
2. Railway → New Project → Deploy from GitHub repo
3. Domínio: configurar `alpha69.tecnologiaagora.com` (CNAME no GoDaddy → URL da Railway)

## Tracking do funil (3 degraus)
1. Clique no anúncio → MGID/Taboola (clickid/tblci na URL)
2. Clique no botão WhatsApp → `trackButtonClick` (sensor + porteiro `/clique`)
3. Mensagem enviada → porteiro via webhook (`[ref:CLICKID]` no texto)

# Pacote de validação MGID — claims do advertorial Alpha 69

Preparado em 12/10/2026 (~11:05 EDT) para a etapa já planejada: **mandar os claims finais para a Lavínia validar antes de subir a campanha**.
Página ao vivo verificada hoje: https://alpha69.tecnologiaagora.com (HTTP 200, 6 fotos, disclaimers presentes).

## Estado técnico (verificado hoje)

- Número oficial **+55 11 94705-3538** já configurado no snippet `js/whatsapp-cta-tracking.js`
  (`WHATSAPP_PHONE = '5511947053538'`, formato válido 55+DDD, recebido de Wesley em 12/10).
- Botões usam `data-wa-cta`; o snippet monta o link `api.whatsapp.com/send` com texto pré-preenchido
  + `[ref:CLICKID]` (atribuição do lead ao clique MGID) — pronto.
- Hook do sensor MGID já no código (`window._mgq` → evento `wa_cta_click`), **sensor em si pendente da Lavínia**.
- `PORTEIRO_URL` vazio (correto por enquanto — API oficial x app ainda não confirmado pelo Wesley).
- **Divergência de versão:** o ar está com CTAs suavizados ("CONHECER O ALPHA69 NO WHATSAPP",
  "TIRAR DÚVIDAS COM UM CONSULTOR", "FALAR COM A BIO SAÚDE AGORA"); o `copy-final.md` v1.0 (09/10)
  tem CTAs mais agressivos ("QUERO MEU DESCONTO DE 60%"). A versão do ar é a mais segura para moderação.

## Inventário de claims (para a Lavínia aprovar/recusar)

1. **Categoria/apresentação:** "suplemento alimentar em cápsulas (frasco com 15 cápsulas)" — confirmar com Wesley se a apresentação está correta.
2. **Composição:** ingredientes e quantidades — ⏳ AGUARDANDO WESLEY (página marca "Informação aguardando validação").
3. **"Fabricante farmacêutico e ingredientes de origem controlada"** — ⚠️ RISCO: afirmação sobre terceiro; ter comprovação em mãos se a moderação questionar.
4. **História da empresa:** "Bio Saúde Suplementos nasceu em 2020... começou como e-commerce" — atribuído como "segundo a empresa".
5. **"Nossos consultores atendem centenas de homens por dia"** — claim de volume; manter só se a Bio Saúde confirmar o número.
6. **Oferta:** "60% de desconto*" + "desconto e frete grátis para contatos elegíveis" — ⏳ A CONFIRMAR (a própria página diz: "Não ativar a comunicação promocional enquanto os termos não forem comprovados e confirmados").
7. **Enquadramento sanitário:** "documento... comunicação sanitária anterior... **não constitui aprovação individual de eficácia pela Anvisa**; a regularização vigente precisa ser confirmada" — pedir OK da Lavínia para manter esse texto no ar.
8. **Blindagem já aplicada:** nenhum depoimento inventado; nenhum before/after; nenhum claim de cura/tratamento ("não deve ser divulgado ou utilizado como tratamento"); imagens ilustrativas com disclaimer; FAQ nega que trate libido/ereção.

## O que ainda NÃO existe (outra superfície de moderação)

- Os **teasers/criativos do MGID** (títulos + imagens dos anúncios) ainda não foram escritos — precisam da mesma validação da Lavínia antes de subir. É onde a moderação de "potência" mais reprova.

## Mensagem pronta para colar (Lavínia)

> Lavínia, tudo bem? O advertorial do piloto Alpha 69 (Bio Saúde) está no ar em https://alpha69.tecnologiaagora.com e quero sua validação dos claims antes de subir a campanha, pra não correr risco de reprovação. Resumo do que a página afirma: (1) produto como suplemento alimentar em cápsulas, frasco de 15; (2) composição ainda aguardando o Wesley confirmar; (3) fabricante farmacêutico com ingredientes de origem controlada; (4) história da empresa (fundada em 2020, começou como e-commerce); (5) oferta de 60% + frete grátis ainda em confirmação — a página marca como não ativar até confirmar. Blindagem aplicada: sem depoimentos, sem before/after, sem promessa de tratamento, disclaimers em todas as imagens e FAQ negando efeito terapêutico. Pode me dizer se algum desses pontos trava na moderação? E me manda o sensor da MGID pra eu instalar no head. Valeu!

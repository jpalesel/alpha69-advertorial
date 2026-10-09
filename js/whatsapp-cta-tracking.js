/**
 * WhatsApp CTA com rastreamento de Click ID + clique no botão (Alpha 69)
 * ----------------------------------------------------------------------
 * 1. Lê o click ID da URL (?tblci= / ?clickid= / ?cid=).
 * 2. Monta o link do WhatsApp com texto pré-preenchido + [ref:CLICKID].
 * 3. Registra o clique no botão (para medir o vazamento
 *    clique-no-botão -> mensagem enviada). Envia para:
 *    a) o sensor da MGID/Taboola (evento customizado), se presente;
 *    b) o porteiro, via GET /clique?ref=CLICKID (se PORTEIRO_URL definido).
 * 4. Se o número oficial ainda não foi configurado, mostra um aviso
 *    em vez de abrir o WhatsApp (modo prévia).
 */

(function () {
  'use strict';

  // Número oficial da Bio Saúde (somente dígitos, com 55 + DDD) — PENDENTE
  var WHATSAPP_PHONE = '';

  // Texto pré-preenchido (o [ref:...] é adicionado ao final)
  var BASE_TEXT = 'Olá! Vim do artigo sobre o Alpha69 e gostaria de conhecer a composição, o preço e as condições de compra.';

  // URL base do porteiro (para registrar cliques no botão). Ex: 'https://porteiro.seudominio.com'
  // Deixe '' para desativar.
  var PORTEIRO_URL = '';

  function phoneOk() {
    return /^55\d{10,11}$/.test(WHATSAPP_PHONE);
  }

  function getClickId() {
    var params = new URLSearchParams(window.location.search);
    return (
      params.get('tblci') ||
      params.get('clickid') ||
      params.get('cid') ||
      'direto'
    );
  }

  function buildWaUrl() {
    if (!phoneOk()) return '#';
    var clickId = getClickId();
    var text = BASE_TEXT + ' [ref:' + clickId + ']';
    return (
      'https://api.whatsapp.com/send/?phone=' +
      WHATSAPP_PHONE +
      '&text=' +
      encodeURIComponent(text)
    );
  }

  // Registra o clique no botão (não-bloqueante)
  function trackButtonClick(clickId) {
    try {
      // a) Sensor MGID/Taboola, se existir
      if (window._mgq) window._mgq.push(['track', 'wa_cta_click', { ref: clickId }]);
      // b) Porteiro
      if (PORTEIRO_URL) {
        var url = PORTEIRO_URL.replace(/\/$/, '') + '/clique?ref=' + encodeURIComponent(clickId);
        if (navigator.sendBeacon) navigator.sendBeacon(url);
        else fetch(url, { mode: 'no-cors', keepalive: true });
      }
    } catch (e) { /* rastreamento nunca pode quebrar o botão */ }
  }

  function applyToButtons() {
    var url = buildWaUrl();
    var clickId = getClickId();
    document.querySelectorAll('a[data-wa-cta]').forEach(function (a) {
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      a.addEventListener('click', function (e) {
        trackButtonClick(clickId);
        if (!phoneOk()) {
          e.preventDefault();
          alert('O número oficial do WhatsApp da Bio Saúde ainda não foi configurado nesta prévia.');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyToButtons);
  } else {
    applyToButtons();
  }
})();

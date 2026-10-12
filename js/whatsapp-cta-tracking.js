/**
 * WhatsApp CTA com rastreamento de Click ID + clique no botão (Alpha 69)
 * ----------------------------------------------------------------------
 * 1. Lê o click ID da URL (?clickid= / ?tblci= / ?cid=) e a origem MGID (?w= widget, ?t= teaser).
 * 2. Monta o link do WhatsApp com texto pré-preenchido + [ref:CLICKID|wWIDGET|tTEASER].
 * 3. Registra o clique no botão (para medir o vazamento
 *    clique-no-botão -> mensagem enviada). Envia para:
 *    a) o sensor da MGID/Taboola (evento customizado), se presente;
 *    b) o porteiro, via GET /clique?ref=CLICKID (se PORTEIRO_URL definido).
 * 4. Se o número oficial ainda não foi configurado, mostra um aviso
 *    em vez de abrir o WhatsApp (modo prévia).
 */

(function () {
  'use strict';

  // Número oficial da Bio Saúde (somente dígitos, com 55 + DDD)
  var WHATSAPP_PHONE = '5511947053538'; // +55 11 94705-3538 — recebido de Wesley em 12/10/2026

  // Texto pré-preenchido (o [ref:...] é adicionado ao final)
  var BASE_TEXT = 'Olá! Li o artigo sobre o Alpha69 e quero conhecer melhor o produto. Pode me passar mais informações?';

  // URL base do porteiro (para registrar cliques no botão). Ex: 'https://porteiro.seudominio.com'
  // Deixe '' para desativar.
  var PORTEIRO_URL = '';

  function phoneOk() {
    return /^55\d{10,11}$/.test(WHATSAPP_PHONE);
  }

  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function getClickId() {
    var params = getParams();
    return (
      params.get('clickid') ||
      params.get('tblci') ||
      params.get('cid') ||
      'direto'
    );
  }

  // Origem MGID: widget (site) e teaser (anúncio). URL do anúncio na MGID:
  //   https://alpha69.tecnologiaagora.com/?clickid={click_id}&w={widget_id}&t={teaser_id}
  function clean(v) {
    return (v || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40);
  }

  // Ref que vai no texto do WhatsApp: CLICKID|wWIDGET|tTEASER
  function getRef() {
    var params = getParams();
    var ref = clean(getClickId()) || 'direto';
    var w = clean(params.get('w') || params.get('widget_id'));
    var t = clean(params.get('t') || params.get('teaser_id'));
    if (w) ref += '|w' + w;
    if (t) ref += '|t' + t;
    return ref;
  }

  function buildWaUrl() {
    if (!phoneOk()) return '#';
    var text = BASE_TEXT + ' [ref:' + getRef() + ']';
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
      // a) Sensor MGID, se instalado no <head>.
      //    Formato de evento do sensor MGID: ["MgSensorInvoke", "<nome_do_evento>"].
      //    Conferir com o código que a MGID/Lavínia enviar e cadastrar
      //    o evento "wa_cta_click" como conversão no painel da MGID.
      window._mgq = window._mgq || [];
      window._mgq.push(['MgSensorInvoke', 'wa_cta_click']);
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
    var clickId = getRef();
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

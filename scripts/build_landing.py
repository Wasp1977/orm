#!/usr/bin/env python3
"""Generate the standalone ОмниРМ landing page and update the main prototype."""

import re

# Read the main prototype
with open('/home/z/my-project/download/подключение_сценарий.html', 'r', encoding='utf-8') as f:
    main_html = f.read()

# ──────────────────────────────────────────────
# 1. Build the standalone landing page
# ──────────────────────────────────────────────

landing_html = '''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ОмниРМ — омниканальное рабочее место оператора</title>
<style>
:root{
  --font-ui:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --bg-page:#EEF0F3;--panel-bg:#FFFFFF;--card-bg:#F4F5F7;--card-bg-hover:#ECEEF1;
  --card-border:#E7E9EC;--text-primary:#15171A;--text-secondary:#6B7280;--text-tertiary:#9AA1AB;
  --divider:#E7E9EC;--link:#0B6FDB;--info-icon-bg:#1478F0;
  --accent-yellow:#FFDD5B;--accent-yellow-hover:#FFD23D;
  --accent-green:#1E9E4A;--accent-magenta:#E91E63;--accent-magenta-bg:#FCE4EC;
  --radius-lg:16px;--radius-md:12px;--radius-pill:999px;
}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg-page);color:var(--text-primary);font-family:var(--font-ui);-webkit-text-size-adjust:100%;overflow-x:hidden;}
h1,h2,h3,h4{font-family:var(--font-ui);text-wrap:balance;}
.num{font-variant-numeric:tabular-nums;}
button{font-family:inherit;}
a{color:var(--link);text-decoration:none;}a:hover{text-decoration:underline;}
:focus-visible{outline:2px solid var(--info-icon-bg);outline-offset:2px);}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.65}}
.animate-fade-up{animation:fadeUp .6s ease both;}
.delay-1{animation-delay:.15s;}.delay-2{animation-delay:.3s;}.delay-3{animation-delay:.45s;}

.page{max-width:840px;margin:0 auto;padding:32px 24px 48px;}

/* Top bar with back link */
.top-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;max-width:840px;margin:0 auto;}
.back-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:var(--text-secondary);cursor:pointer;text-decoration:none;transition:color .15s ease;}
.back-link:hover{color:var(--text-primary);}
.top-logo{font-size:18px;font-weight:800;letter-spacing:-.02em;}

/* Hero */
.hero{background:linear-gradient(135deg,#1A1D29,#2D3250);border-radius:24px;padding:48px 36px;color:#fff;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(255,221,91,.15) 0%,transparent 70%);border-radius:50%;}
.hero::after{content:'';position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;background:radial-gradient(circle,rgba(233,30,99,.1) 0%,transparent 70%);border-radius:50%;}
.hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:var(--radius-pill);padding:6px 14px;font-size:13px;font-weight:700;margin-bottom:20px;}
.hero-badge .dot{width:6px;height:6px;border-radius:50%;background:#4ADE80;animation:pulse 2s infinite;}
.hero-title{font-size:36px;font-weight:800;letter-spacing:-.02em;line-height:1.15;margin-bottom:12px;}
.hero-subtitle{font-size:17px;line-height:1.6;opacity:.85;max-width:520px;margin-bottom:28px;}
.hero-cta-row{display:flex;gap:12px;flex-wrap:wrap;}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px;}
.stat-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:var(--radius-md);padding:16px 18px;text-align:center;}
.stat-num{font-size:28px;font-weight:800;letter-spacing:-.01em;color:var(--accent-yellow);}
.stat-label{font-size:13px;opacity:.7;margin-top:4px;}

/* Pains */
.section-title{font-size:20px;font-weight:800;letter-spacing:-.01em;margin-bottom:16px;}
.pains-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.pain-card{background:#FEF2F2;border:1px solid #FECACA;border-radius:var(--radius-lg);padding:20px;display:flex;gap:14px;align-items:flex-start;}
.pain-icon{width:40px;height:40px;border-radius:12px;background:#FEE2E2;color:#DC2626;display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
.pain-text{display:flex;flex-direction:column;gap:4px;}
.pain-title{font-size:14.5px;font-weight:700;color:#991B1B;}
.pain-desc{font-size:13px;color:#7F1D1D;line-height:1.5;opacity:.85;}

/* How it works */
.how-steps{display:flex;flex-direction:column;gap:0;}
.how-step{display:flex;gap:20px;align-items:flex-start;position:relative;padding-bottom:24px;}
.how-step:last-child{padding-bottom:0;}
.how-step::before{content:'';position:absolute;left:19px;top:42px;bottom:0;width:2px;background:var(--card-border);}
.how-step:last-child::before{display:none;}
.how-num{width:40px;height:40px;border-radius:50%;background:var(--info-icon-bg);color:#fff;font-size:18px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:0 0 auto;}
.how-content{display:flex;flex-direction:column;gap:4px;padding-top:4px;}
.how-title{font-size:16px;font-weight:700;}
.how-desc{font-size:14px;color:var(--text-secondary);line-height:1.6;}

/* Panel */
.panel{background:var(--panel-bg);border-radius:24px;box-shadow:0 24px 64px rgba(21,23,26,.10),0 2px 8px rgba(21,23,26,.05);padding:28px;display:flex;flex-direction:column;gap:24px;}

/* Benefits */
.benefits-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.benefit-card{background:var(--card-bg);border-radius:var(--radius-lg);padding:20px;display:flex;gap:14px;align-items:flex-start;transition:transform .2s ease,box-shadow .2s ease;}
.benefit-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(21,23,26,.08);}
.benefit-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex:0 0 auto;}
.benefit-icon.blue{background:#E8F2FE;color:#1478F0;}.benefit-icon.green{background:#EAF7EE;color:#16A34A;}
.benefit-icon.yellow{background:#FFF8E1;color:#F59E0B;}.benefit-icon.magenta{background:#FCE4EC;color:#E91E63;}
.benefit-text{display:flex;flex-direction:column;gap:4px;}
.benefit-title{font-size:14.5px;font-weight:700;}.benefit-desc{font-size:13px;color:var(--text-secondary);line-height:1.5;}

/* Tariffs preview */
.tariffs-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.tariff-card{background:#fff;border:2px solid var(--card-border);border-radius:var(--radius-lg);padding:20px 22px;display:flex;flex-direction:column;gap:8px;transition:border-color .15s ease,transform .15s ease;}
.tariff-card:hover{border-color:var(--text-primary);transform:translateY(-1px);}
.tariff-card.recommended{border-color:var(--accent-magenta);}
.tariff-name{font-size:16px;font-weight:700;}
.tariff-price{font-size:22px;font-weight:800;letter-spacing:-.01em;}
.tariff-price .note{font-size:12px;font-weight:500;color:var(--text-secondary);margin-left:4px;display:block;}
.tariff-features{list-style:none;display:flex;flex-direction:column;gap:4px;margin-top:4px;}
.tariff-features li{font-size:13px;color:var(--text-primary);display:flex;gap:6px;line-height:1.4;}
.tariff-features li::before{content:"\\2022";color:var(--text-tertiary);flex:0 0 auto;}
.tariff-cons{font-size:12px;color:var(--text-tertiary);font-style:italic;margin-top:4px;}
.tariff-footnote{font-size:12px;color:var(--text-secondary);margin-top:4px;}
.tariff-badge{display:inline-flex;align-items:center;gap:6px;background:var(--accent-magenta-bg);color:var(--accent-magenta);font-size:12px;font-weight:700;padding:4px 10px;border-radius:var(--radius-pill);align-self:flex-start;}

/* CTA bar */
.cta-bar{position:fixed;left:0;right:0;bottom:0;z-index:75;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-top:1px solid var(--card-border);padding:12px 24px;display:flex;justify-content:center;align-items:center;gap:12px;box-shadow:0 -4px 20px rgba(21,23,26,.06);}
.cta-bar .cta-text{font-size:14px;color:var(--text-secondary);}
.cta-bar .cta-price{font-size:18px;font-weight:800;color:var(--text-primary);}

/* Buttons */
.btn{appearance:none;border:none;border-radius:var(--radius-pill);padding:13px 26px;font-size:15px;font-weight:700;cursor:pointer;transition:background .15s ease,transform .05s ease,box-shadow .15s ease;}
.btn:active{transform:scale(.98);}
.btn-primary{background:var(--accent-yellow);color:var(--text-primary);}.btn-primary:hover{background:var(--accent-yellow-hover);box-shadow:0 4px 16px rgba(255,221,91,.3);}
.btn-secondary{background:#fff;color:var(--text-primary);border:1px solid var(--card-border);}.btn-secondary:hover{background:var(--card-bg);}

/* Responsive */
@media(max-width:600px){
  .hero{padding:32px 20px;border-radius:16px;}
  .hero-title{font-size:26px;}
  .hero-subtitle{font-size:15px;}
  .pains-grid,.benefits-grid,.tariffs-grid{grid-template-columns:1fr;}
  .stats-row{grid-template-columns:1fr;}
  .page{padding:16px 16px 80px;}
}
</style>
</head>
<body>

<div class="top-bar">
  <a class="back-link" id="backLink" href="подключение_сценарий.html">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Назад к АТС
  </a>
  <div class="top-logo">ОмниРМ</div>
</div>

<div class="page">

  <!-- HERO -->
  <div class="hero animate-fade-up">
    <div class="hero-badge"><span class="dot"></span> Подключение бесплатно</div>
    <h1 class="hero-title">Все каналы &mdash; в одном окне оператора</h1>
    <div class="hero-subtitle">Звонки, чаты, Telegram &mdash; всё в ОмниРМ. Не нужно переключаться между программами, не нужно нанимать лишних людей. ИИ-агенты берут рутину, операторы &mdash; сложные диалоги.</div>
    <div class="hero-cta-row"><button class="btn btn-primary" id="heroCta" style="font-size:17px;padding:15px 32px;">Подключить ОмниРМ</button></div>
    <div class="stats-row">
      <div class="stat-card"><div class="stat-num num">5+</div><div class="stat-label">каналов в одном окне</div></div>
      <div class="stat-card"><div class="stat-num num">до 14%</div><div class="stat-label">экономия с комплектом</div></div>
      <div class="stat-card"><div class="stat-num num">24/7</div><div class="stat-label">ИИ-агенты не спят</div></div>
    </div>
  </div>

  <!-- БОЛИ -->
  <div class="panel animate-fade-up delay-1">
    <h2 class="section-title">Знакомо?</h2>
    <div class="pains-grid">
      <div class="pain-card"><div class="pain-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></div><div class="pain-text"><div class="pain-title">Оператор в 4 окнах</div><div class="pain-desc">Звонки в софтфоне, чаты в Telegram, заявки в CRM &mdash; оператор путается и теряет время.</div></div></div>
      <div class="pain-card"><div class="pain-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div><div class="pain-text"><div class="pain-title">Ночью &mdash; тишина</div><div class="pain-desc">После 18:00 обращения висят до утра. Клиент уходит к конкурентам, пока вы спите.</div></div></div>
      <div class="pain-card"><div class="pain-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div><div class="pain-text"><div class="pain-title">Новый канал = новый сотрудник</div><div class="pain-desc">Подключили Telegram &mdash; наняли ещё одного. Виджет на сайт &mdash; ещё одного. Растут расходы, а не выручка.</div></div></div>
      <div class="pain-card"><div class="pain-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="2" rx="2"/><path d="M9 9h6v6H9z" stroke="currentColor" stroke-width="2"/></svg></div><div class="pain-text"><div class="pain-title">Нет общей истории</div><div class="pain-desc">Клиент звонил, писал в чат и оставил заявку &mdash; но для оператора это три разных диалога без связи.</div></div></div>
    </div>
  </div>

  <!-- КАК ЭТО РАБОТАЕТ -->
  <div class="panel animate-fade-up delay-2">
    <h2 class="section-title">Как это работает</h2>
    <div class="how-steps">
      <div class="how-step"><div class="how-num">1</div><div class="how-content"><div class="how-title">Подключаете каналы</div><div class="how-desc">Виджет на сайт, Telegram, MAX, Облачная АТС &mdash; всё из личного кабинета за пару кликов.</div></div></div>
      <div class="how-step"><div class="how-num">2</div><div class="how-content"><div class="how-title">Оператор работает в одном окне</div><div class="how-desc">Звонки и переписка &mdash; в едином интерфейсе ОмниРМ. Карточка клиента со всей историей.</div></div></div>
      <div class="how-step"><div class="how-num">3</div><div class="how-content"><div class="how-title">ИИ-агент берёт рутину</div><div class="how-desc">Ночью и в выходные ИИ-агент отвечает на типовые вопросы голосом и текстом.</div></div></div>
      <div class="how-step"><div class="how-num">4</div><div class="how-content"><div class="how-title">Платите только за нужное</div><div class="how-desc">Один оператор &mdash; от 0 &thinsp;&#8381;. Комплект с ИИ-агентом &mdash; от 2&thinsp;490&thinsp;&#8381;/мес.</div></div></div>
    </div>
  </div>

  <!-- ЧТО ВЫ ПОЛУЧАЕТЕ -->
  <div class="panel animate-fade-up delay-3">
    <h2 class="section-title">Что вы получаете</h2>
    <div class="benefits-grid">
      <div class="benefit-card"><div class="benefit-icon blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div><div class="benefit-text"><div class="benefit-title">Единый экран оператора</div><div class="benefit-desc">Все звонки и чаты видны в одном окне. Оператор работает быстрее.</div></div></div>
      <div class="benefit-card"><div class="benefit-icon green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10A15 15 0 0112 2z" stroke="currentColor" stroke-width="1.8"/></svg></div><div class="benefit-text"><div class="benefit-title">5+ каналов одновременно</div><div class="benefit-desc">Виджет, Telegram, MAX, звонки Облачной АТС &mdash; всё в пару кликов.</div></div></div>
      <div class="benefit-card"><div class="benefit-icon yellow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div><div class="benefit-text"><div class="benefit-title">ИИ работает 24/7</div><div class="benefit-desc">ИИ-агенты отвечают на типовые вопросы ночью и в выходные.</div></div></div>
      <div class="benefit-card"><div class="benefit-icon magenta"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg></div><div class="benefit-text"><div class="benefit-title">Комплект &mdash; экономия до 14%</div><div class="benefit-desc">Операторы + ИИ-агенты вместе дешевле. Бизнес+ экономит 1&thinsp;500&thinsp;&#8381;/мес.</div></div></div>
    </div>
  </div>

  <!-- ТАРИФЫ -->
  <div class="panel animate-fade-up delay-3">
    <h2 class="section-title">Тарифы ОмниРМ</h2>
    <div class="tariffs-grid">
      <div class="tariff-card">
        <div class="tariff-name">Соло</div>
        <div class="tariff-price num">0 &#8381;<span class="note">в тарифе ОАТС</span></div>
        <ul class="tariff-features">
          <li>1 оператор</li>
          <li>1 канал (виджет или MAX)</li>
          <li>100 диалогов/мес</li>
          <li>История 30 дней</li>
        </ul>
        <div class="tariff-cons">без очередей, супервизора, аналитики и рассылок</div>
      </div>
      <div class="tariff-card recommended">
        <div class="tariff-badge">Рекомендуем</div>
        <div class="tariff-name">Команда 5</div>
        <div class="tariff-price num">3 990 &#8381;/мес</div>
        <ul class="tariff-features">
          <li>До 5 операторов</li>
          <li>Полный функционал</li>
          <li>Все каналы</li>
          <li>Неограниченные диалоги</li>
          <li>Супервизор и аналитика</li>
        </ul>
        <div class="tariff-footnote">+990 &#8381; за оператора с 6-го</div>
      </div>
    </div>
  </div>

  <!-- КОМПЛЕКТЫ -->
  <div class="panel animate-fade-up delay-3">
    <h2 class="section-title">Комплекты: вместе выгоднее</h2>
    <div class="tariffs-grid">
      <div class="tariff-card">
        <div class="tariff-name">Старт+</div>
        <div class="tariff-price num">2 490 &#8381;/мес</div>
        <ul class="tariff-features">
          <li>2 оператора ОмниРМ</li>
          <li>ИИ-агенты «Старт»</li>
          <li>300 мин голоса + 300 обращений</li>
        </ul>
        <div class="tariff-footnote">Экономия 210 &#8381;/мес (8%)</div>
      </div>
      <div class="tariff-card recommended">
        <div class="tariff-badge">Рекомендуем</div>
        <div class="tariff-name">Бизнес+</div>
        <div class="tariff-price num">8 990 &#8381;/мес</div>
        <ul class="tariff-features">
          <li>Команда 5: до 5 операторов</li>
          <li>ИИ-агенты «Бизнес»</li>
          <li>800 мин голоса + 1 000 обращений</li>
        </ul>
        <div class="tariff-footnote">Экономия 1 500 &#8381;/мес (14%)</div>
      </div>
    </div>
  </div>

</div>

<!-- Sticky CTA -->
<div class="cta-bar">
  <span class="cta-text">ОмниРМ</span>
  <span class="cta-price num">от 0 &#8381;/мес</span>
  <button class="btn btn-primary" id="stickyCta" style="padding:10px 22px;font-size:14px;">Подключить</button>
</div>

<script>
  /* "Подключить" opens the main prototype at the kits screen */
  function goConnect(){
    window.open('подключение_сценарий.html?start=kits','_blank');
  }
  document.getElementById('heroCta').addEventListener('click',goConnect);
  document.getElementById('stickyCta').addEventListener('click',goConnect);
</script>
</body>
</html>'''

# Write the landing page
with open('/home/z/my-project/download/омнирм_лендинг.html', 'w', encoding='utf-8') as f:
    f.write(landing_html)

print("Landing page written to /home/z/my-project/download/омнирм_лендинг.html")

# ──────────────────────────────────────────────
# 2. Update the main prototype
# ──────────────────────────────────────────────

# Change sidebar and banner click handlers to open new page
main_html = main_html.replace(
    "el('sbOmniRM').addEventListener('click',function(){renderScreen1();showScreen(1);});",
    "el('sbOmniRM').addEventListener('click',function(){window.open('омнирм_лендинг.html','_blank');});"
)

main_html = main_html.replace(
    "el('omnirmBanner').addEventListener('click',function(){renderScreen1();showScreen(1);});",
    "el('omnirmBanner').addEventListener('click',function(){window.open('омнирм_лендинг.html','_blank');});"
)

# Add URL parameter handling: if ?start=kits, go directly to kits screen
# Find the showScreen(0) at the end and add param check before it
main_html = main_html.replace(
    "showScreen(0);\n</script>",
    """/* Check URL params for direct navigation */
(function(){
  var params=new URLSearchParams(window.location.search);
  var startScreen=params.get('start');
  if(startScreen==='kits'){renderScreen2();showScreen(2);}
  else if(startScreen==='constructor'){renderScreen3();showScreen(3);}
  else{showScreen(0);}
})();
</script>"""
)

# Write the updated main prototype
with open('/home/z/my-project/download/подключение_сценарий.html', 'w', encoding='utf-8') as f:
    f.write(main_html)

print("Main prototype updated with window.open navigation and ?start= param support")

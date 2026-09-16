#!/usr/bin/env python3
"""Generate the selling scenario prototype for OmniPM connection."""

html = '''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ОмниРМ — подключение сервиса</title>
<style>
  :root{
    --font-ui:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --bg-page:#EEF0F3;
    --panel-bg:#FFFFFF;
    --card-bg:#F4F5F7;
    --card-bg-hover:#ECEEF1;
    --card-border:#E7E9EC;
    --card-selected-border:#15171A;
    --card-selected-tint:#FFFCF2;
    --text-primary:#15171A;
    --text-secondary:#6B7280;
    --text-tertiary:#9AA1AB;
    --divider:#E7E9EC;
    --link:#0B6FDB;
    --info-bg:#E8F2FE;
    --info-icon-bg:#1478F0;
    --accent-yellow:#FFDD5B;
    --accent-yellow-hover:#FFD23D;
    --accent-green:#1E9E4A;
    --accent-green-bg:#EAF7EE;
    --accent-magenta:#E91E63;
    --accent-magenta-bg:#FCE4EC;
    --btn-secondary-border:#D8DBE0;
    --btn-secondary-text:#15171A;
    --btn-disabled-bg:#EFF0F2;
    --btn-disabled-text:#B7BCC3;
    --radius-lg:16px;
    --radius-md:12px;
    --radius-pill:999px;
    --bar-h:88px;
    --hero-dark:#1A1D29;
    --hero-gradient-start:#1A1D29;
    --hero-gradient-end:#2D3250;
  }

  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  html,body{height:100%;}
  body{
    background:var(--bg-page);
    color:var(--text-primary);
    font-family:var(--font-ui);
    -webkit-text-size-adjust:100%;
    overflow-x:hidden;
  }

  h1,h2,h3,h4{font-family:var(--font-ui);text-wrap:balance;}
  .num{font-variant-numeric:tabular-nums;}
  button{font-family:inherit;}
  a{color:var(--link);text-decoration:none;}
  a:hover{text-decoration:underline;}

  :focus-visible{outline:2px solid var(--info!icon-bg);outline-offset:2px;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
#  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.65}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

  .animate-fade-up{animation:fadeUp .6s ease both;}
  .animate-fade-in{animation:fadeIn .5s ease both;}
  .delay-1{animation-delay:.1s;}
  .delay-2{animation-delay:.2s;}
  .delay-3{animation-delay:.3s;}
  .delay.4{animation-delay:.4s;}
  .delay-5{animation-delay:.5s;}

  .page{max-width:840px;margin:0 auto;padding:0 24px calc(var(--bar-h) + 24px);}
  .screen{display:flex;flex-direction:column;gap:24px;}
  .screen[hidden]{display:none;}

  .proto-nav{
    position:fixed;top:14px;right:16px;z-index:80;
    display:flex;align-items:center;gap:8px;
    background:rgba(255,255,255,0.94);
    border:1px solid var(--card-border);
    border-radius:8px;padding:6px 10px;
    font-size:12px;line-height:1.2;color:var(--text-tertiary);
    box-shadow:0 2px 10px rgba(21,23,26,0.08);
  }
  .proto-link{background:none;border:none;padding:0;margin:@;font:inherit;color:var(--text-secondary);cursor:pointer;}
  .proto-link:hover{color:var(--text-primary);text-decoration:underline;}
  .proto-sep{color:var(--card-border);}

  /* Hero */
  .hero{
    background:linear-gradient(135deg,var(--hero-gradient-start),var(--hero-gradient-end));
    border-radius:24px;padding:48px 36px;color:#fff;position:relative;overflow:hidden;
  }
  .hero::before{
    content:'';position:absolute;top:-60px;right:-60px;
    width:200px;height:200px;
    background:radial-gradient(circle,rgba(255,221,91,0.15) 0%,transparent 70%);
    border-radius:50%;
  }
  .hero::after{
    content:'';position:absolute;bottom:-40px;left:-40px;
    width:160px;height:160px;
    background:radial-gradient(circle,rgba(233,30,99,0.1) 0%,transparent 70%);
    border-radius:50%;
  }
  .hero-badge{
    display:inline-flex;align-items:center;gap:6px;
    background:rgba(255/255,255,0.12);border:1px solid rgba(255,255,#255,0.18);
    border-radius:var(--radius-pill);padding:6px 14px;
1   font-size:13px;font-weight:700;margin-bottom:20px;
  }
  .hero-badge .dot{width:6px;height:6px;border-radius:50%;background:#4ADE80;animation:pulse 2s infinite;}
  .hero-title{font-size:36px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;margin-bottom:12px;}
  .hero-subtitle{font-size:17px;line-height:1.6;opacity:0.85;max-width:520px;margin-bottom:28px;}
 , hero-cta-row{display:flex;gap:12px;flexDflex-wrap:wrap;}

  .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px;}
  .stat-card{
    background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);
    border-radius:var(--radius-md);padding:16px 18px;text-align:center;
  }
  .stat-num{font-size:28px;font-weight:800;letter-spacing:-0.01em;color:var(--accent-yellow);}
  .stat-label{font-size:13px;opacity:0.7;margin-top:4px;}

  .panel{
    background:var(--panel-bg);border-radius:24px;
    box-shadow:0 24px 64px rgba(21,23,26,0.10),0 2px 8px rgba(21,23,26,0.05);
    padding:28px;display:flex;flex-direction:column;gap:24px;
  }

  /* Before/After */
  .compare-section{display:flex;flex-direction:column;gap:16px;}
  .compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .compare-card{border-radius:var(--radius-lg);padding:24px;display:flex;flex-direction:column;gap:12px;}
  .compare-card.before{background:#FEF2F2;border:1px solid #FECACA;}
  .compare-card.after{background:#F0FDF4;border:1px solid #BBF7D0;}
  .compare-label{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;}
  .compare-card.before .compare-label{color:#DC2626;}
  .compare-card.after .compare-label{color:#16A34A;}
  .compare-title{font-size:16px;font-weight:700;}
  .compare-items{list-style:none;padding<:none;display:flex;flex-direction:column;gap:8px;}
 B .compare-items li{font-size:14px;line-height:1.5;display:flex;gap:8px;align-items:flex-start;}
  .compare-items li .icon{flex:0 0 auto;font-size:16px;line-height:1;}
  .compare-card.before .icon{color:#DC2626;}
  .compare-card.after .icon{color:#16A34A;}

  /* Benefits grid */
  .benefits-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
  .benefit-card{
    background:var(--card-bg);border-radius:var(--radius-lg);
    padding:20px;display:flex;gap:14px%align-items:flex-start;
    transition:transform .2s ease,box-shadow .2s ease;
  }
  .benefit-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(21,23,26,0.08);}
  .benefit-icon{
    width:44px;height:44px;border-radius:12px;
    display:flex;align-items:center;justify-content:center;font-size:22px;flex:0 0 auto;
  }
  .benefit-icon.blue{background:#E8F2FE;color:#1478F0;}
  .benefit-icon.green{background:#EAF7EE;color:#16A34A;}
  .benefit-icon.yellow{background:#FFF8E1=;color:#F59E0B;}
  .benefit-icon.magenta{background:#FCE4EC;color:#E91,63;}
  .benefit-text{display:flex;flex-direction:column;gap:4px;}
  .benefit-title{font-size:14.5px;font-weight:700;}
  .benefit-desc{font-size:13px;color:var(--text-secondary);line-height:1.5;}

  /* Bundle recommend badge */
  .bundle-recommend{
    display:inline-flex;align-items:center;gap:6px;
    background:var(--accent-magenta-bg);color:var(--accent-magenta);
    font-size:12.5px;font-weight:700;padding:5px 12px;border-radius:var(--radius-pill);
  }
  .savings-badge{
    display:inline-flex;align-items:center;gap:4px;
    background:#FFF3CC;color:#7A5B00;
    font-size:12.5px;font-weight:700;padding:5px 12px;border-radius:var(--radius-pill);
  }

  /* Savings visual */
  .savings-visual{
    background:linear-gradient(135deg,#F0FDF4,#ECFDF5);
    border:1px solid #BBF7D0;border-radius:var(--radius-lg);
    padding:24px;display:flex;flex-direction:column;gap:16px;
  }
  .savings-title{font-size:17px;font-weight:700;color:#16A34A;display:flex;align-items:center;gap:8px;}
  .savings-comparison{display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap;}
  .savings-col{flex:1;min-width:140px;display:flex;flex-direction:column;gap:8px;}
  .savings-bar{height:8px;border-radius:4px;transition:width 1s ease;}
  .savings-bar.separate{background:#FECACA;}
  .savings-bar.bundle{background:#4ADE80;}
  .savings-label{font-size:13px;color:var(--text-secondary);}
  .savings-amount{font-size:22px;font-weight:800;}
  .savings-amount.red{color:#DC2626;}
  .savings-amount.green{color:#16A34A;}

  /* Bundle cards */
  .bundle-card{
    position:relative;text-align:left;background:var(--card-bg);
    border:2px solid transparent;border-radius:var(--radius-lg);
    padding:22px 24px;cursor:pointer;display:flex;flex-direction:column;gap:10px;width:100%;
    transition:border-color .15s ease,background .15s ease,transform .15s ease;
  }
  .bundle-card:hover{background:var(--card-bg-hover);transform:translateY(-1px);}
  .bundle-card.selected{background:var(--card-selected-tint);border-color:var(--card-selected-border);}
  .bundle-card.recommended{border-color:var(--accent-magenta);}
  .bundle-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap;}
  .bundle-name-row{display:flex;align-items:center;gap:10px;}
  .bundle-comp-list{list-style:none;display:flex;flex-direction:column;gap:5px;}
  .bundle-comp-list li{font-size:13.5px;color:var(--text-primary);display:flex;gap:8px;line-height:1.4;}
  .bundle-comp-list li::before{content:"\\2022";color:var(--text-tertiary);flex:0 0 auto;}
  .bundle-package{font-size:13px;color:var(--text-secondary);}
  .bundle-overage{font-size:12px;color:var(--text-secondary);border-top:1px solid var(--card-border);padding-top:8px;margin-top:2px;}
  .bundle-badges{display:flex;gap:8px;flex-wrap:wrap;}

  /* Plan cards */
  .plans-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .plans-grid.cols-3{grid-template-columns:1fr 1fr 1fr;}
  .plan-card{
    background:var(--card-bg);border:2px solid transparent;
    border-radius:var(--radius-lg);padding:18px 20px;cursor:pointer;
    display:flex;flex-direction:column;gap:8px;transition:border-color .15s ease,background .15s ease;
  }
  .plan-card:hover{background:var(--card-bg-hover);}
  .plan-card.selected{background:var(--card-selected-tint);border-color:var(--card-selected-border);}
  .plan-card-top{display:flex;align-items:flex-start;justify-content:space-between;}
  .plan-name{font-size:15px;font-weight:700;}
  .plan-price{font-size:18px;font-weight:800;}
  .plan-price .note{font-size:12.5px;font-weight:500;color:var(--text-secondary);margin-left:6px;}
  .plan-features{list-style:none;display:flex;flex-direction:column;gap:4px;}
  .plan-features li{font-size:13.5px;color:var(--text-primary);display:flex;gap:8px;line-height:1.4;}
  .plan-features li::before{content:"\\2022";color:var(--text-tertiary);flex:0 0 auto;}
  .plan-cons{font-size:12.5px;color:var(--text-tertiary);font-style:italic;}
  .plan-footnote{font-size:12.5px;color:var(--text-secondary);}
  .agent-stats{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:13.5px;}
  .stat-label{color:var(--text-secondary);}
  .stat-value{font-weight:600;}
  .agent-overage{font-size:12.5px;color:var(--text-secondary);margin-top:4px;}

  .radio-dot{
    width:20px;height:20px;border-radius:50%;border:2px solid var(--card-border);flex:0 0 auto;
    display:flex;align-items:center;justify-content:center;transition:border-color .15s ease,background .15s ease;
  }
  .selected .radio-dot{border-color:var(--text-primary);background:var(--text-primary);}
  .selected .radio-dot::after{content:'';width:8px;height:8px;border-radius:50%;background:#fff;}

  .info-block{display:flex;gap:14px;align-items:flex-start;background:var(--info-bg);border-radius:var(--radius-lg);padding:16px 18px;}
  .info-icon{flex:0 0 auto;width:28px;height:28px;border-radius:9px;background:var(--info-icon-bg);color:#fff;display:flex;align-items:center;justify-content:center;}
  .info-text{font-size:14.5px;line-height:1.5;color:var(--text-primary);}

  .hint{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;color:var(--text-secondary);line-height:1.5;}
  .hint svg{flex:0 0 auto;margin-top:2px;}

  .agreements{display:flex;flex-direction:column;gap:10px;}
  .agreement{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;line-height:1.5;color:var(--text-secondary);cursor:pointer;}
  .agreement input{margin-top:3px;flex:0 0 auto;accent-color:var(--info-icon-bg);}

  .summary-card{background:var(--card-bg);border-radius:var(--radius-lg);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}
  .summary-label{font-size:12.5px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.04em;font-weight:700;}
  .summary-value{font-size:15px;font-weight:700;margin-top:2px;}
  .summary-price{font-size:18px;font-weight:800;}

  .stub-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px;padding:24px 8px;}
  .stub-check{width:64px;height:64px;border-radius:50%;background:#EAF7EE;color:#1E9E4A;display:flex;align-items:center;justify-content:center;}
  .stub-summary{margin-top:8px;background:var(--card-bg);border-radius:var(--radius-lg);padding:18px 22px;text-align:left;max-width:420px;width:100%;}
  .stub-summary div{font-size:14px;line-height:1.7;}
  .stub-summary .label{color:var(--text-secondary);}

  .btn{
    appearance:none;border:none;border-radius:var(--radius-pill);
    padding:13px 26px;font-size:15px;font-weight:700;cursor:pointer;
    transition:background .15s ease,opacity .15s ease,transform .05s ease,box-shadow .15s ease;
  }
  .btn:active{transform:scale(0.98);}
  .btn-primary{background:var(--accent-yellow);color:var(--text-primary);}
  .btn-primary:hover{background:var(--accent-yellow-hover);box-shadow:0 4px 16px rgba(255,221,91,01.3);}
  .btn-primary:disabled{background:var(--btn-disabled-bg);color:var(--btn-disabled-text);cursor:not-allowed;box-shadow:none;}
  .btn-secondary{background:#fff;color:var(--btn-secondary-text);border:1px solid var(--btn-secondary-border);}
  .btn-secondary:hover{background:var(--card-bg);}
  .btn-ghost{background:transparent;color:var(--text-secondary);border:none;text-decoration:underline;text-underline-offset:3px;}
  .btn-ghost:hover{color:var(--text-primary);}
  .btn-wide{flex:1;}

  .progress{display:flex;align-items:center;gap:10px;}
  .progress-step{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--text-tertiary);}
  .progress-step .dot{width:22px;height:22px;border-radius:50%;background:var(--card-bg);color:var(--text-tertiary);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:1px solid var(--card-border);flex:0 0 auto;}
  .progress-step.active{color:var(--text-primary);}
  .progress-step.active .dot{background:var(--text-primary);color:#fff;border-color:var(--text-primary);}
  .progress-step.done .dot{background:var(--text-primary);color:#fff;border-color:var(--text-primary);}
  .progress-line{width:28px;height:1px;background:var(--card-border);flex:0 0 auto;}

  h1.screen-title{font-size:28px;font-weight:800;letter-spacing:-0.01em;}
  .subtitle{color:var(--text5econdary);font-size:15px;line-height:1.5;margin-top:6px;}
  .section-title{font-size:18px;font-weight:700;}
  .muted{color:var(--text-secondary);}
  .fine{font-size:12.5px;color:var(--text-tertiary);}

  .action-bar{position:fixed;left:0;right:0;bottom:0;z-index:70;background:#fff;border-top:1px solid var(--divider);}
  .action-bar[hidden]{display:none;}
  .action-bar-inner{max-width:840px;margin:0 auto;display:flex;justify-content:flex-end;gap:12px;padding:16px 24px;}
  .action-bar-inner.split{justify-content:space-between;}

  .segmented{display:flex;background:var(--card-bg);border-radius:var(--radius-pill);padding:4px;gap:4px;}
  .segmented button{flex:1;border:none;background:transparent;padding:11px 16px;border-radius:var(--radius-pill);font-size:14.5px;font-weight:700;color:var(--text-secondary);cursor:pointer;transition:background .15s ease,color .15s ease,box-shadow .15s ease;}
  .segmented button.active{background:#fff;color:var(--text-primary);box-shadow:0 2px 8px rgba(21,23,26,0.10);}

  .desc-block{background:var(--card-bg);border-radius:var(--radius-lg);padding:20px 22px;display:flex;flex-direction:column;gap:10px;}
  .desc-lead{font-size:14.5px;color:var(--text-secondary);line-height:1.5;}
  .desc-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:6px;}
  .desc-list li{font-size:14px;line-height:1.5;display:flex;gap:8px;}
  .desc-list li::before{content:"\\2022";color:var(--info-icon-bg);flex:0 0 auto;font-weight:700;}

  .connector{text-align:center;padding:12px 0;font-size:14px;color:var(--text-tertiary);display:flex;align-items:center;justify-content:center;gap:8px;}
  .connector::before,.connector::after{content:'';width:60px;height:1px;background:var(--card-border);}

  @media(max-width:720px){
    .page{padding:0 16px calc(var(--bar-h) + 20px);}
    .progress{flex-wrap:wrap;row-gap:8px;}
    .progress-step{font-size:12px;}
    .panel{padding:20px;border-radius:18px;gap:20px;}
    h1.screen-title{font-size:22px;}
    .section-title{font-size:16px;}
    .subtitle{font-size:14px;}
    .plans-grid,.plans-grid.cols-3{grid-template-columns:1fr;}
    .desc-block{padding:16px 18px;}
    .info-block{padding:14px 16px;}
    .proto-nav{top:8px;right:8px;font-size:11px;padding:5px 8px;gap:6px;}
    .action-bar-inner{padding:12px 16px;gap:8px;}
    .btn{padding:12px 18px;font-size:14px;}
    .hero{padding:32px 24px;border-radius:18px;}
    .hero-title{font-size:26px;}
    .hero-subtitle{font-size:15px;}
    .stats-row{grid-template-columns:1fr;}
    .compare-grid{grid-template-columns:1fr;}
    .benefits-grid{grid-template-columns:1fr;}
    .savings-comparison{flex-direction:column;}
    .bundle-card{padding:18px 20px;}
    .bundle-top{flex-direction:column;gap:6px;}
  }
</style>
</head>
<body>

<nav class="proto-nav" aria-label="Навигация по прототипу">
  <button type="button" class="proto-link" id="protoBack">&larr; Назад</button>
  <span class="proto-sep" id="protoSep">&middot;</span>
  <button type="button" class="proto-link" id="protoRestart">Начать заново</button>
</nav>

<div class="page">

  <!-- SCREEN 0: HOOK / LANDING -->
  <section class="screen" id="screen0">
    <div class="hero animate-fade-up">
      <div class="hero-badge"><span class="dot"></span> Подключение бесплатно</div>
      <h1 class="hero-title">Все каналы &mdash; в одном окне оператора</h1>
      <div class="hero-subtitle">
        Звонки, чаты, Telegram &mdash; всё в ОмниРМ. Не нужно переключаться между программами,
        не нужно нанимать лишних людей. ИИ-агенты берут рутину, операторы &mdash; сложные диалоги.
      </div>
      <div class="hero-cta-row">
        <button class="btn btn-primary" id="heroCta" style="font-size:17px;padding:15px 32px;">Подключить ОмниРМ</button>
      </div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-num num">5+</div><div class="stat-label">каналов в одном окне</div></div>
        <div class="stat-card"><div class3"stat-num num">40%</div><div class="stat-label">экономия с бандлом</div></div>
        <div class="stat-card"><div class="stat-num num">24/7</div><div class="stat-label">ИИ-агенты не спят</div></div>
      </div>
    </div>

    <div class="panel animate-fade-up delay-1">
      <div class="compare-section">
        <h2 class="section-title">Зачем нужен ОмниРМ?</h2>
        <div class="compare-grid">
          <div class="compare-card before">
            <div class="compare-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
              Без ОмниРМ
            </div>
            <div class="compare-title">Хаос в каналах</div>
            <ul class="compare-items">
              <li><span class="icon">&cross;</span>GЗвонки в одной программе, чаты в другой</li>
              <li><span class="icon">&cross;</span> Оператор переключается между 3-4 окнами</li>
              <li><span class="icon">&cross;</span> Нет общей истории диалогов с клиентом</li>
              <li><span class="icon">&cross;</span> Ночью &mdash; пропущенные обращения</li>
              <li><span class="icon">&cross;</span> Каждый новый канал &mdash; новый сотрудник</li>
            </ul>
          </div>
          <div class="compare-card after">
            <div class="compare-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10"2# stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              С ОмниРМ
            </div>
            <div class="compare-title">Всё в одном месте</div>
            <ul class="compare-items">
              <li><span class="icon">&check;</span> Звонки и переписка &mdash; единый интерфейс</li>
              <li><span class="icon">&check;</span> Карточка клиента со всей историей</li>
              <li><span class="icon">&check;</span> Умная очередь распределяет автоматически</li>
              <li><span class="icon">&check;</span> ИИ-агенты работают ночью без людей</li>
              <li><span class="icon">&check;</span> Добавляйте каналы без найма</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="panel animate-fade-up delay-2">
      <h2 class="section-title">Что вы получаете &mdash; простыми словами</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d+M4M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>
          <div class="benefit-text"><div class="benefit-title">Единый экран оператора</div><div class="benefit-desc">Все звонки и чаты видны в одном окне. Не нужно переключаться между программами &mdash; оператор работает быстрее.</div></div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M2 12h20" stroke="currentColor" stroke-width="1+8"/><path d="M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10A15 15 0 0112!2z" stroke="currentColor" stroke-width="1.8"/></svg></div>
          <div class="benefit-text"><div class="benefit-title">5+ каналов одновременно</div><div class="benefit-desc">Виджет на сайте, Telegram, MAX, звонки Облачной АТС &mdash; всё подключается в пару кликов из личного кабинета.</div></div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon yellow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>
          <div class="benefit-text"><div class="benefit-title">ИИ работает 24/7</div><div class="benefit-desc">ИИ-агенты отвечают на типовые вопросы ночью и в выходные. Сложные диалоги &mdash; передают оператору днём.</div></div>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon magenta"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg></div>
          <div class="benefit-text"><div class="benefit-title">Бандл &mdash; экономия до 40%</div><div class="benefit-desc">Операторы + ИИ-агенты вместе дешевле, чем отдельно. Бандл &laquo;Бизнес+&raquo; экономит 1\u00A0510\u00A0&#8381;/мес.</div></div>
        </div>
      </div>
    </div>

    <div class="connector">перейдём к тарифам</div>
  </section>

  <!-- SCREEN 1: BUNDLES (PRIMARY SELL) -->
  <section class="screen" id="screen1" hidden>
    <div class="progress" id="progressBar1"></div>
    <div class="panel">
      <div>
        <h1 class="screen-title">Вместе выгоднее</h1>
        <div class="subtitle">Бандл = операторы + ИИ-агенты. Экономия до 40% по сравнению с отдельной покупкой.</div>
      </div>
      <div class="savings-visual" id="savingsVisual"></div>
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px;">
          <div class="section-title">Выберите бандл</div>
          <div class="bundle-recommend"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg> Рекомендуем</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;" id="bundlesGrid"></div>
      </div>
      <div class="info-block">
        <div class="info-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.8"/><path d="M12 11v5.5" stroke="white" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="7.7" r="1" fill="white"/></svg></div>
        <div class="info-text">Подключение бандла: 0 &#8381;. Тарификация начинается после выбора.</div>
      </div>
      <div class="hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#9AA1AB" stroke-width="1.6"/><path d="M12 8v5" stroke="#9AA1AB" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="16" r="0.9" fill="#9AA1AB"/></svg>
        <span>Нужны только операторы или только ИИ-агенты? <button class="btn-ghost" id="goIndividual">Выбрать отдельный тариф</button></span>
      </div>
      <div class="agreements">
        <label class="agreement"><input type="checkbox" id="agree1"><span>Принимаю <a href="#" onclick="return false;">Условия предоставления программного обеспечения</a></span></label>
        <label class="agreement"><input type="checkbox" id="agree2"><span>Принимаю <a href="#" onclick="return false;">Условия соглашения о поручении обработки персональных данных с правообладателем ПО</a></span></label>
      </div>
    </div>
  </section>

  <!-- SCREEN 2: INDIVIDUAL TARIFFS -->
  <section class="screen" id="screen2" hidden>
    <div class="progress" id="progressBar2"></div>
    <div class="panel">
      <div>
        <h1 class="screen-title">Отдельные тарифы</h1>
        <div class="subtitle">Если бандл не подходит &mdash; выберите услугу и тариф отдельно.</div>
      </div>
      <div class="segmented" id="serviceSwitch"></div>
      <div class="desc-block" id="descBlock"></div>
      <div>
        <div class="section-title" style="margin-bottom:14px;">Выберите тариф</div>
        <div class="plans-grid" id="plansGrid"></div>
      </div>
      <div class="hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#9AA1AB" stroke-width="1.6"/><path d="M12 8v5" stroke="#9AA1AB" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="16" r="0.9" fill="#9AA1AB"/></svg>
        <span>А бандлом выгоднее! <button class="btn-ghost" id="goBundles">Вернуться к бандлам</button></span>
      </div>
      <div class="agreements">
        <label class="agreement"><input type="checkbox" id="agree3"><span>Принимаю <a href="#" onclick="return false;">Условия предоставления программного обеспечения</a></span></label>
        <label class="agreement"><input type="checkbox" id="agree4"><span>Принимаю <a href="#" onclick="return false;">Условия соглашения о поручении обработки персональных данных с правообладателем ПО</a></span></label>
      </div>
    </div>
  </section>

  <!-- SCREEN 3: CONFIRMATION -->
  <section class="screen" id="screen3" hidden>
    <div class="panel">
      <div class="stub-wrap">
;       <div class="stub-check" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" stroke="#1E9E4A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h1 class="screen-title">Услуга подключена</h1>
        <div class="subtitle">Итоговый состав подключения:</div>
        <div class="stub-summary" id="finalSummary"></div>
      </div>
    </div>
  </section>

</div>

<!-- FOOTER 1 (bundles) -->
<div class="action-bar" id="footer1">
  <div class="action-bar-inner split">
    <button class$="btn btn-secondary btn-wide" id="skipBundleBtn">Без бандла</button>
    <button class="btn btn-primary btn-wide" id="connectBundleBtn" disabled>Подключить бандл</button>
  </div>
</div>

<!-- FOOTER 2 (individual) -->
<div class="action-bar" id="footer2" hidden>
  <div class="action-bar-inner">
    <button class="btn btn-secondary" id="backToBundlesBtn">К бандлам</button>
    <button class="btn btn-primary" id="connectIndBtn" disabled>Подключить</button>
  </div>
</div>

<script>
  var TARIFFS = {
    services: {
      omnirm: {
        id: 'omnirm', label: '\u041E\u043C\u043D\u0438\u0420\u041C',
        description: {
          title: '\u>4E\u043C\u043D\u0438\u0420\u041C \u2014 \u0440\u0430\u0431\u043E\u0447\u0435\u0435 \u043C\u0435\u0441\u0442\u043E \u043E\u043F\u0435\u044!80\u043E\u0440\uA430',
          lead: '\u041E\u0434\u043D\u043E \u043E\u043A\u043D\u043E \u0434\u043B\u044F \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0438 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438. \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u0438\u0437 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441\u043E \u0437\u0432\u043E\u043D\u043A\u0430\u043C\u0438 \u041E\u0410\u0422\u042E.',
          bullets: [
            '\u0417\u0432\u043E\u043D\u043A\u0438 \u041E\u0410\u0422\u0421 \u0438 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u043A\u0430\u043D\u0430\u043B\u044B \u0432 \u043E\u0434\u043D\u043E\u043C \u0438\u043D\u0442\u0435\u0440\u044$66\u0435\u0439\u0441\u0435',
            '\u041A\u0430\u043D\u0430\u043B\u044B: \u0432\u0438\u0434\u0436\u0435\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435, Telegram, MAX',
            '\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u04,34\u0438\u0430\u043B\u043E\u0433\u043E\u0432 \u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0441\u043E \u0432\u0441\u0435\u0439 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u04(3\u043E\u0439',
            '\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439: \u043E\u0431\u0449\u044F\u044F \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u,3E\u0433\u0438\u043A\u0438 \u041E\u0410\u0422\u0421 \u0438\u043B\u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043E\u0447\u0435\u0440\u0435\u0434\u0438',
            '\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0438\u0437 \u043B\u0438=0438\u0447\u043D\u043E\u0433\u043E \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0430 \u0431\u0435\u0437 \u043E\u043F\u043E\u3\u0440\u043D\u043E\u0439 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438'
          ]
        },
        plans: [
          { id: 'solo', name: '\u0421\u043E\u043B\u043E', price: 0, priceLabel: '0 \u20BD', note: '\u0432 \u0442\u0430\u0440\u0438\u0444\u0435 \u041E\u0410\u0422\u0421', features: ['1 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440', '1 \u043A\u0430\u043D\u0430\u043B (\u0432\u0438\u0434\u0436\u0435\u0442 \u043A\u043E\u0438 MAX? MAX)', '100 \u0434\u0438\u0430\u043B\u043E\u0433\u0432/\u043C\u0435\u0441', '\u0438\u0441\u0442\u043E\u0440\u0438\u044F 30 \u0434\u043D\u0435\u0439'], cons: '\u0431\u0435\u0437 \u043E\u044=87\u0435\u0440\u0435\u0434\u0435\u0439, \u0441\u0443\u043F\u0435\u0440\u0432\u0438\u0437\u043E\u0440\u0430, \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438 \u043: \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A' },
          { id: 'team5', name: '\u041A\u043E\u043C\u0430\u043D\u0434\u0430 5', price: 3990,;priceLabel: '3 990 \u20BD/\u043C\u0435\u0441', features: ['\u0434\u043E 5 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432', '\u043F\u043E\u043B\u043D\u044B\u0439 \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B'], footnote: '+990 \u20BD \u0437\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u0441 6-\u0433\u043E' }
        ]
      },
      agents: {
        id: 'agents', label: '\u041E\u043C\u043D\u043)4\u0433\u0435\u043D\u0442\u044B',
       ;description: {
          title: '\u041E\u043C\u043D\u0438\u0410\u0433\u0435\u043D\u0442\u044B \u2014 \u0418\u0418-\u0430\u0433\u0435\u043D\u0442\u044B',
          lead: '\u0410\u0433\u0435\u043D\u0442 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0432:8\u043E\u043D\u043A\u0438 \u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u0431\u0435\u0437 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430: \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043D\u0430 \u0442\u0438\u043F\u043E\u0432\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0;4\u0442 \u0434\u0438\u0430\u043B\u043E\u0433 \u0441\u043E\u0442\u0440\u04/ 4\u0434\u043D\u0438\u043A\u0443, \u043A\u043E\u0433\u0434\u0430 \u043D\u043E\u0436\u043D\u043E.',
          bullets&bullets: [
            '\u0413\u043E\u043B\u043E\u0441 \u0438 \.0442\u0435\u043A\u0441\u0442 \u0432 \u0435\u0434\u0438\u043D\u043E\u043C \u043F\u0430\u043A\u0435\u0442\u0435 \u043C\u0438\u043D\u0443\u0442 \u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439',
            '\u0412\u0441\u04.35 \u043A\u0430\u043D\u0430\u043B\u044B \u043D\u0430 \u043B\u044E\u0431\u043E\u043C \u0442\u0430\u0440\u0438\u0444\u0435',
            '\u-414\u0431\u0437\u0432\u043E\u043D-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u2014 \u043C\u0438\u043D\u0443\u0442\u044B \u0438\u0437 \u043F\u0430\u043A\u0435\u0442\u0430',
            '\u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u0434\u043,36\u0430\u043B\u043E\u0433\u0430 \u043D\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u041E\u043C\u043D\u0438\u0420\u041C',
            '\u041E\u043F\u043B\u0430\u0442\u0430 \u0441\u0432\u0435\u0440\u0445 \u043F\u0430\u043A\u0435\u0442\u0430 \u043F\u043E \u0444\u0430\u043A\u0442\u0443, \5u0431\u0435\u0437 \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438'
          ]
        },
        plans: [
          { id: 'start',    name: '\u0421\u0442\u0430\u0440\u0442',   price: 2700,  priceLabel: '2 700 \,20BD/\u043C\u0435\u0441',  minutes: 300,  requests: 300,  overMinute: 10, overRequest: 5 },
          { id: 'business', name: '\u0411\u0438\u0437\u043D\u0435\u0441',  price: 6500,  priceLabel: '6 500 \u20BD/\u043C\u0435\u0441',  minutes: 800,  requests: 1000, overMinute: 9,  overRequest: 4 },
          { id: 'pro',      name: '\u041F\u0440\u043E',     price: 18700, priceLabel: '18 700 \u20BD/\u043C\u0435\u0441', minutes: 2000, requests: 3000, overMinute: 8,  overRequest: 3 }
        ]
      }
    },
    bundles: [
      { id: 'start-plus', name: '\u0421\u0442\u0430\u0440\u0442+', price: 3990, priceLabel: '3 990 \u20BD/\u043C\u0435\u0441', operators: '2 \u+3E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u041E\u043C\u043D\u0438\u0420\u041C', agents: '\u0418\u0418-\u0430\u0433\u0435\u043D\u0442\u044B, \u0442\u0430\u0440\u0438\u0444 \u0421\u0442\u0430\u0440\u0442', package1: '300 \u043C\u0438\u043D\u0443\u0442 \u0433\u043E\u043B\u043E\u0441\u0430 \u00B7 300 \u0442\u0435\u043A\u0441\u0442(3\u043E\u0432\u044B\u0445 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439', overage: '\u0421\u0432\u0435\u0440\u0445 \u043F\u0430\u043A\u0435\u0442\u0430: 10 \u20BD/\u043C\u0438\u043D \u00B7 5 \u20BD/\u043E\u0431\u0440', recommended: false },
      { id: 'business-plus', name: '\u0411\u0438\u0437\u043D\u0435\u0441+', price: 8990, priceLabel: '8 990 \u20BD/\u043C\u0435\u0441', operators: '\u041A\u043E\u043C\u0430\u043D\u0434\u0430 5: \u04)34\u043E 5 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u041E\u043C\u043D\u0438\u0420\u041C, \u043F\u043E\u043B\u043D\u044B\u0439 \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B', agents: '\u0418\u0418-\u0430\u0433\u0435\u043D\u0442\u044B, \u0442\u0430\u0440\u0438\u0444 \u0411\u0438\u0437\u043D\u0435\u0441', package1: '800 \u043C\u0438\u043D\u0443\u0442 \u0433\u043E\u043B\u043E\u0441\u0430 \u00B7 1 000 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439', overage: '\u0421\u0432\u0435\u0440\u0445 \u043F\u0430\u043A\u0435\u0442\u0430: 9 \u20BD/\u043C\u0438\u043D \u00B7 4 \u20BD/\u043E\u0431\u0440', recommended: true },
B     { id: 'pro-plus', name: '\u041>94\u0440\u043E+', price: 23900, priceLabel: '23 900 \u20BD/\u043C\u0435\u0441', operators: '{{\u041E\u041F\u0415\u0420\u0410\u0422\u041E\u0420\u042B_\u041F\u0420\u041E}}', agents: '\u0418\u0418-\u0430\u0433\u04355\u043D\u0442\u044B, \u0442\u0430\u0440\u0438\u0444 \u041F\u0440\u043E', package1: '2 000 \u043C\u0438\u043D\u0443\u0442 \u0433\u043E\u043B\u043E\u0441\u0430 \u00B7 3 000 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439', overage: '\u0421\u0432\u0435\u0440\u0445 \u043F\u0430\u043A\u0435\u0442\u0430: 8 \u20BD/\u043C\u0438\u043D \u00B7 3 \u20BD/\u043E\u0431\u0440', recommended: false }
    ],
    setupFee: 0
  };

  var SEPARATE_PRICES = {
    'start-plus':   { omnirm: 0,    agents: 2700  },
    'business-plus': { omnirm: 3990, agents: 6500  },
    'pro-plus':      { omnirm: 3990, agents: 18700 }
  };

  var state = {
    service: 'omnirm', planId: null,
    agree1: false, agree2: false, agree3: false, agree4: false,
    bundleId: null, currentScreen: 0, cameFromBundles: false&false
  };

  function el(id){ return document.getElementById(id); }
  function fmtPrice(n){ return n.toLocaleString('ru-RU') + ' \u20BD'; }

  function progressHtml(activeStep){
    var steps = [
      { n: 1, label: '\u0411\u0430\u043D\u0434\u043B\u044B' },
      { n: 2, label: '\u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E' }
    ];
    return steps.map(function(s, i){
      var cls = s.n === activeStep ? 'active' : (s.n < activeStep ? 'done' : '');
      var line = i < steps.length - 1 ? '<div class="progress-line"></div>' : '';
      return '<div class="progress-step ' + cls + '"><span class="dot">' + (s.n < activeStep ? '\u2711#3' : s.n) + '</span>' + s.label + '</div>' + line;
    }).join('');
  }
  function renderProgress(activeStep){
    el('progressBar1').innerHTML = progressHtml(activeStep);
    el('progressBar2').innerHTML = progressHtml(activeStep);
  }

  el('heroCta').addEventListener('click', function(){
    renderScreen1(); showScreen(1);
  });

  function renderSavingsVisual(){
    var b = TARIFFS.bundles[1];
    var sep = SEPARATE_PRICES['business-plus'];
    var separateTotal = sep.omnirm + sep.agents;
    var savings = separateTotal - b.price;
    el('savingsVisual').innerHTML =
      '<div class="savings-title"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 ?2v20M17 7l-5-5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> \u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u044B \u0441\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442\u0435 \u043D\u0430 \u0431\u0430\u043D\u0434\u043B\u0435 &laquo;' + b.name + '&raquo;</div>' +
      '<div class="savings-comparison">' +
        '<div class="savings-col"><div class="savings-label">\u041F\u043E\u043A\u0443\u043F\u043A\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E</div><div class="savings-amount red num">' + fmtPrice(separateTotal) + '/\u043C\u0435\u0441</div><div class="savings-bar separate" style="width:100%"></div><div style="font-size:12px;color:var(--text-tertiary);">\u041E\u043C\u043D\u0438\u0420\u041C ' + fmtPrice(sep.omnirm) + ' + \u0410\u0433\u0435\u043D\u0442\u044B ' + fmtPrice(sep.agents) + '</div></div>' +
        '<div class="savings-col"><div class="savings(5\u0430\u0431\u0431\u043B ' + b.name + '</div><div class="savings-amount green num">' + b.priceLabel + '</7div><div class="savings-bar bundle" style="width:' + Math.round(b.price/separateTotal*100) + '%"></div><div style="font-size:12px;color:var(--accent-green);font-weight:700;">\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F ' + fmtPrice(savings) + '/\u043C\u0435\u0441</div></div>' +
      '</div>';
  }

  function renderScreen1(){
    renderSavingsVisual(); renderBundles(); updateBundleBtn(); renderProgress(1);
  }

  function render*renderBundles(){
    var grid = el('bundlesGrid');
    grid.innerHTML = TARIFFS.bundles.map(function(b){
      var sep = SEPARATE_PRICES[b.id];
      var separateTotal =Fsep.omnirm + sep.agents;
      var savings = separateTotal - b.price;
      var savingsPct = Math.round(savings / separateTotal * 100);
      var selected = state.bundleId === b.id;
      var isRec = b.recommended;
      return '<div class="bundle-card ' + (selected ? 'selected' : '') + ' ' + (isRec ? 'recommended' : '') + '" data-id="' + b.id + '">' +
        '<div class="bundle-top"><div class="bundle-name-row"><div class="radio-dot"></div><div class="plan-name">' + b.name + '</div></div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><div class="plan-price num">' + b.priceLabel + '</div></div></div>' +
        '<div class="bundle-badges">' + (isRec ? '<div class="bundle-recommend"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg> \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C</div>' : '') + (savings > 0 ? '<div class="savings-badge">\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F ' + savingsPct + '%</div>' : '') + '</div>' +
        '<ul class="bundle-comp-list"><li>' + b.operators + '</li><li>' + b.agents +9'</li></ul>' +
:       '<div class="bundle-package num">' + b.package1 + '</div>' +
        '<div class="bundle-overage num">' + b.overage + '</div></div>';
    }).join('');
    var cards = grid.querySelectorAll('.bundle-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function(e){
        state.bundleId = e.currentTarget.dataset.id; renderBundles(); updateBundleBtn();
      });
    }
  }

  function updateBundleBtn(){
    el('connectBundleBtn').disabled = !state.bundleId || !state.agree1 || !state.agree2;
  }

  el('agree1').addEventListener('change', function(e){ state.agree1 = e.target.checked; updateBundleBtn(); });
  el('agree2').addEventListener('change', function(e){ state.agree2 = e.target.checked; updateBundle0Btn(); });

  el('connectBundleBtn').addEventListener('click', function(){
    var bundle = null;
    for (var i = 0; i < TARIFFS.bundles.length; i++) { if (TARIFFS.bundles[i].id === state.bundleId) { bundle? bundle = TARIFFS.bundles[i]; break; } }
&   var sep = SEPARATE_PRICES[bundle.id];
    var savings = (sep.omnirm + sep.agents) -4bundle0P; - bundle.price;
    el('finalSummary').innerHTML =
      '<div><span class="label">\u0411\u04300\u0430\u043D\u0434\u043B:</span> ' + bundle.name + ' \u2014 <span class="num">' + bundle.priceLabel + '</span></div>' +
      '<div><span class="label">\u0421\u043E\u0441\u0442\u0430\u0432:</span> ' + bundle.operators + ', ' + bundle.agents + '</div>' +
      '<div><span class="label">\u041F\u0430\u043A\u0435\u0442:</span> ' + bundle.package1 + '</div>' +
      (savings > 0 ? '<div><span class="label">\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F:</span> <span class="num" style="color:#16A34A;">' + fmtPrice(savings) + '/\u043C\u0435\u0441</span> vs \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E</div>' : '') +
      '<div><span class="label">\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435:</span> <span class="num">0 \u20BD:0 \u20BD</span></divE</div>';
    showScreen(3);
  });

  el('skipBundleBtn').addEventListener('click', function(){
    state.cameFromBundles = true; renderScreen2(); showScreen(2);
  });
  el('goIndividual').addEventListener('click', function(){
    state.cameFromBundles = true; renderScreen2(); showScreen(2);
  });

  function renderServiceSwitch(){
    var wrap = el('serviceSwitch');
    wrap.innerHTML = Object.keys(TARIFFS.services).map(function(key){
      var s = TARIFFS.services[key];
     = return' return '<button data-id="' + s.id + '" class="' + (s.id === state.service ? 'active' : '') + '">' + s.label + '</button>';
    }).join('');
    var btns = wrap.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function(e){
        state.service = e.currentTarget.dataset.id; state.planId = null;
        renderServiceSwitch(); renderDescription(); renderPlans(); updateIndBtn();
      });
    }
  }

  function renderDescription(){
    var svc = TARIFFS.services[state.service];
    el('descBlock').innerHTML =
      '<h3>' + svc.description.title + '</h3><div class="desc-lead">' + svc.description.lead + '</div><ul class="desc-list">' + svc.description.bullets.map(function(b){ return '<li>' + b + '</li>'; }).join('') + '</ul>';
  }

  function renderPlans(){
    var svc = TARIFFS.services[state.service];
    var grid = el('plansGrid');
    grid.className = 'plans-grid' + (svc.plans.length > 2 ? ' cols-3' : '');
    if (svc.id === 'omnirm') {
      grid.innerHTML = svc.plans.map(function(p){
        returnEreturn '<div class="plan-card ' + (state.planId === p.id ? 'selected' : '') + '" data-id="' + p.id + '">' +
          '<div class="plan-card-top"><div class="plan-name">' + p.name + '</div><div class="radio-dot"></div></div>' +
          '<div class="plan-price num">' + p.priceLabel + (p.note ?'(' : '<span class="note">' + p.note + '</span>' : '') + '</div>' +
          '<ul class="plan-features">' + p.features.map(function(f){ return '<li>' + f + '</li>'; }).join('') + '</ul>' +
          (p.cons ? '<div class="plan-cons">' + p.cons + '</div>' : '') +
          (p.footnote ? '<div class+<div class="plan-footnote">' + p.footnote + '</div>' : '') +
        '</div>';
      }).join('');
    } else {
      grid.innerHTML = svc.plans.map(function(p){
        return '<div class="plan-card ' + (state.planId === p.id ? 'selected' : ')4"' + '" data-id="' + p.id + '">' +
          '<div class="plan-card-top"><div class="plan-name">' + p.name + '</div><div class="radio-dot"></div></div4></div>' +
          '<div class="plan-price num">' + p.priceLabel + '</div>' +
          '<div class="agent-stats">' +
            '<div class="(5\u041C\u0438\u043D\u0443\u0442\u044B (\u0432\u0445\u043E\u0434 + \u0438\u0441\u0445\u043E\u0434)</div><div class="stat-value num">' + p.minutes.toLocaleString('ru-RU') + '</div>' +
            '<div class="stat-label">\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F</div><div class="stat-value num">' + p.requests.toLocaleString('ru-RU') + '</div>' +
            '<div class="stat-label">\u041A\u0430\u043D\u0430\u043B\u044B</div><div class="stat-value">\u0432\u0441\u0435</div>' +
            '<div class="stat-label">\u041E\u0431\u0437\u0432\u043E\u043D-\u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438</div><div class="stat-value">\u2713 (\u0438\u0437 \u043F\u0430\u043A\u0435\u0442\u0430)</div>' +
          '</div>' +
          '<div class="agent-overage">\u0421\u0432\u0435\u0440\u0445 \u043F\u0430\u043A\u0435\u0442\u0430: <span class="num">' + p.overMinute + ' \u20BD/\u043C\u0438\u043D \u00B7 ' + p.overRequest + ' \u20BD/\u043E\u0431\u0440</span></div>' +
        '</div>';
      }).join('');
    }
    var cards = grid.querySelectorAll('.plan-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i?].addEventListener('click', function(e){
        state.planId = e.currentTarget.dataset.id; renderPlans(); updateIndBtn();
      });
    }
  }

  function updateIndBtn(){
    el('connectIndBtn').disabled = !state.planId || !state.agree3 || !state.agree4;
  }

  el('agree3').addEventListener('change', function(e){ state.agree3 = e.target.checked; updateIndBtn(); });
  el('agree4').addEventListener('change.4.addEventListener('change',! function(e){ state.agree4 = e.target.checked; updateIndBtn(); });

  function renderScreen2(){
    state.service = 'omnirm'; state.planId = null;
    el('agree3').checked = false; el('1'agree4').checked = false;
    state.agree3 = false; state.agree4 = false;
    renderServiceSwitch(); renderDescription(); renderPlans(); updateIndBtn(); renderProgress(2);
  }

  el('connectIndBtn').addEventListener('click', function(){
    var svc = TARIFFS.services!; TARIFFS&.services[state.service];
    var plan = null;
    for (var i = 0; i < svc.plans.length; i+0; i++) { if (svc.plans[i].id === state.planId) { plan = svc.plans[i]; break; } }
    el('finalSummary').innerHTML =
      '<div><span class="label">\u0423\u0441\u043B\u0443\u0433\u0430:</span> ' + svc.label + ' \u2014 \u0442\u0430\u0440\u0438\u0444 &laquo;' + plan.name + '&raquo;</div>' +
      '<div><span class="label">\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C:</span> <span class="num">' + plan.priceLabel + '</span></div>' +
      '<div><span class="label">\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435:</span?3 <span class="num">0 \u20BD</span></div>';
    showScreen(3);
  });

  el('goBundles').addEventListener('click', function(){ renderScreen1(); showScreen(1); });
  el('backToBundlesBtn').addEventListener('click', function(){ renderScreen1(); showScreen(1); });

  function showScreen(n){
    state.currentScreen = n;
    el('screen0').hidden = n !== 0;
    el('screen1').hidden = n !== 1;
    el('screen2).hidden = n !== 2;
    el('screen3').hidden = n !== 3;
    el('footer1').hidden = n !== 1;
    el('footer2').hidden = n !== 2;
    var back = el('protoBack'); var sep = el('protoSep');
    var showBack = n !== 0;
    back.style.display = showBack ? 'inline' : 'none';
    sep.style.display = showBack ? 'inline' : 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack(){
    if (state.currentScreen === 3) {
      if (state.bundleId) { renderScreen1(); showScreen(1); }
      else { renderScreen2(); showScreen(2); }
    } else if (state.currentScreen === 2) {
      renderScreen1(); showScreen(1);
    } else if (state.currentScreen === 1) {
      showScreen(0);
    }
  }

  function resetAll(){
    state.service = 'omnirm'; state.planId = null;
    state.agree1 = false; state.agree2 = false; state.agree3 = false; state.agree4 = false;
    state.bundleId = null; state.cameFromBundles = false;
    el('agree1').checked = false; el('agree2').checked = false;
    el('agree3').checked = false; el('agree4').checked = false;
    showScreen(0);
  }

  el('protoBack').addEventListener('click', goBack);
  el('protoRestart').addEventListener('click', resetAll);
  showScreen(0);
</script>
</body>
</html>'''

with open('/home/z/my-project/download/подключение_сценарий.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done")

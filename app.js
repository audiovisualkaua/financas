'use strict';

/* =========================================================
   Finanças Kauã
   Tudo fica salvo no próprio navegador (localStorage).
   ========================================================= */

const STORE_KEY = 'financas-kaua:v1';
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const MES_CURTO = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const EMOJIS = ['🏠', '🏢', '📶', '💡', '💧', '🔥', '📱', '🚗', '⛽', '🎓', '💳', '🛒', '🍔', '🎬', '🎵', '📺', '☁️', '🎮', '💪', '🐶', '✈️', '🧾', '🏥', '💼', '🛵', '📸', '🎨', '💻', '🎁', '⭐', '🏖️', '🛡️'];
const COLORS = ['#1f7bff', '#32d74b', '#ff9f0a', '#bf5af2', '#ff375f', '#45e3ff', '#ffd60a', '#5e5ce6'];

/* ---------- ícones ---------- */
const svg = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
const I = {
  home: svg('<path d="M3.5 10.5 12 3.5l8.5 7V19a1.5 1.5 0 0 1-1.5 1.5h-4.5v-6h-5v6H5A1.5 1.5 0 0 1 3.5 19z"/>'),
  bills: svg('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'),
  debt: svg('<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 10h19M6.5 15h4"/>'),
  income: svg('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
  vault: svg('<rect x="3" y="4" width="18" height="15" rx="3"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 8v-.5M7 19v1.5M17 19v1.5"/>'),
  gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
  eye: svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff: svg('<path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24M2 2l20 20"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>', 'stroke-width="2.6"'),
  minus: svg('<path d="M5 12h14"/>', 'stroke-width="2.6"'),
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  x: svg('<path d="M18 6 6 18M6 6l12 12"/>', 'stroke-width="2.4"'),
  left: svg('<path d="M15 18l-6-6 6-6"/>', 'stroke-width="2.4"'),
  right: svg('<path d="M9 18l6-6-6-6"/>', 'stroke-width="2.4"'),
  wallet: svg('<path d="M20 7H5a2 2 0 0 1 0-4h13v4"/><path d="M3 5v14a2 2 0 0 0 2 2h15V7"/><circle cx="16" cy="14" r="1.3" fill="currentColor"/>'),
  spark: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
  cart: svg('<path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17.5" cy="20" r="1.3"/>'),
  bolt: svg('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
  piggy: svg('<path d="M19 9.5c.8.3 1.5 1 1.5 2.5h1v3h-1.6a7 7 0 0 1-2.4 2.6V20h-3v-1.5h-4V20h-3v-2.6A6.5 6.5 0 0 1 4 12c0-3.6 3.1-6.5 7-6.5 1.3 0 2.5.3 3.5.8L18 5z"/><circle cx="15.5" cy="11" r=".9" fill="currentColor"/>'),
};

/* ---------- utilitários ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ym = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
const TODAY = ym(new Date());
const addM = (m, n) => { const [y, mo] = m.split('-').map(Number); return ym(new Date(y, mo - 1 + n, 1)); };
const diffM = (a, b) => { const [ay, am] = a.split('-').map(Number), [by, bm] = b.split('-').map(Number); return (by - ay) * 12 + (bm - am); };
const monthName = m => MESES[+m.split('-')[1] - 1];
const monthShort = m => `${MES_CURTO[+m.split('-')[1] - 1]}/${m.slice(2, 4)}`;
const sum = (arr, f = x => x) => arr.reduce((a, x) => a + (+f(x) || 0), 0);
const round2 = v => Math.round((+v || 0) * 100) / 100;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const fmt = v => state.settings.hide ? 'R$ ••••' : BRL.format(round2(v) || 0);
const toInput = v => v ? round2(v).toFixed(2).replace('.', ',') : '';
function parseMoney(s) {
  s = String(s ?? '').trim().replace(/[R$\s]/g, '');
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  return round2(parseFloat(s)) || 0;
}
const pct = (a, b) => b > 0 ? clamp(a / b * 100, 0, 100) : 0;

/* ---------- estado ---------- */
function defaultState() {
  const m = TODAY;
  return {
    v: 1,
    onboarded: false,
    settings: { name: 'Kauã', theme: 'dark', hide: false },
    salary: { hist: [{ from: m, value: 0 }], months: {} },
    bills: [
      { id: uid(), kind: 'fixo', name: 'Parcela do apê', icon: '🏠', day: 5, start: m, hist: [{ from: m, value: 0 }], months: {} },
      { id: uid(), kind: 'fixo', name: 'Condomínio', icon: '🏢', day: 10, start: m, hist: [{ from: m, value: 350 }], months: {} },
      { id: uid(), kind: 'fixo', name: 'Internet', icon: '📶', day: 15, start: m, hist: [{ from: m, value: 49.9 }], months: {} },
    ],
    installments: [],
    debts: [],
    sources: [
      { id: 'ifood', name: 'iFood Entregas', icon: '🛵', color: '#ff375f' },
      { id: 'conteudo', name: 'Conteúdo p/ clientes', icon: '🎬', color: '#bf5af2' },
    ],
    extras: [],
    goals: [],
    reserve: 0,
    quick: [],
    closes: {},
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw), d = defaultState();
      return { ...d, ...s, settings: { ...d.settings, ...s.settings }, salary: { ...d.salary, ...s.salary } };
    }
  } catch (e) { /* começa do zero */ }
  return defaultState();
}
let state = load();
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch (e) { toast('Não consegui salvar 😕'); }
}
function commit() { save(); render(); }

const ui = { tab: 'home', month: TODAY, contas: 'fixo', animate: true, pop: null, segPrev: {}, draft: null };
const counters = {};

/* ---------- regras de negócio ---------- */
function histValue(hist, m) {
  if (!hist || !hist.length) return 0;
  const sorted = [...hist].sort((a, b) => a.from.localeCompare(b.from));
  let v = sorted[0].value;
  for (const h of sorted) if (h.from <= m) v = h.value;
  return v;
}
function setHist(hist, m, value) {
  const keep = hist.filter(h => h.from < m);
  hist.length = 0;
  hist.push(...keep, { from: m, value });
}

const salaryAt = m => state.salary.months?.[m] ?? histValue(state.salary.hist, m);
const billActive = (b, m) => b.start <= m && (!b.end || m < b.end);
const activeBills = m => state.bills.filter(b => billActive(b, m));
const altDefaultNotMe = (b, m) => !!b.alt && Math.abs(diffM(b.alt, m)) % 2 === 1;

function billMonth(b, m) {
  const rec = b.months[m] || {};
  const base = histValue(b.hist, m);
  const value = rec.value ?? base;
  const notMe = rec.notMe ?? altDefaultNotMe(b, m);
  return { value, base, adjusted: rec.value != null && rec.value !== base, paid: !!rec.paid, notMe, cost: notMe ? 0 : value };
}

const instParcel = (i, m) => { const d = diffM(i.start, m); return d >= 0 && d < i.total ? d + 1 : 0; };
const debtPaidTotal = d => sum(d.payments, p => p.value);
const debtPaidIn = (d, m) => sum(d.payments.filter(p => p.month === m), p => p.value);
const debtLeft = d => Math.max(0, round2(d.total - debtPaidTotal(d)));
const extrasIn = m => state.extras.filter(e => e.month === m);
// Fechamento: o saldo real do banco no fim do mês. Não passa para o mês seguinte como cálculo,
// só sugere o "começou com" do próximo fechamento.
const closeStartDefault = m => state.closes?.[addM(m, -1)]?.balance ?? 0;
function closeInfo(m) {
  const c = state.closes?.[m];
  if (!c) return null;
  const s = summary(m);
  const expected = c.start + s.livre;
  return { start: c.start, real: c.balance, sobra: round2(c.balance - c.start), expected, missing: round2(expected - c.balance) };
}
const missingLabel = v => v > 0 ? `${fmt(v)} sem registro` : v < 0 ? `${fmt(-v)} a mais que o previsto` : 'Bateu certinho ✓';
const quickIn = m => (state.quick || []).filter(q => q.month === m);
const guardado = () => round2(state.reserve + sum(state.goals, g => g.saved));
const sourceOf = id => state.sources.find(s => s.id === id) || { id, name: 'Outros', icon: '💰', color: '#8e8e93' };

function summary(m) {
  const s = { salary: salaryAt(m), extras: 0, fixo: 0, assinatura: 0, parcela: 0, divida: 0, avulso: 0 };
  activeBills(m).forEach(b => { s[b.kind] += billMonth(b, m).cost; });
  state.installments.forEach(i => { if (instParcel(i, m)) s.parcela += i.value; });
  state.debts.forEach(d => { s.divida += debtPaidIn(d, m); });
  s.extras = sum(extrasIn(m), e => e.value);
  s.avulso = sum(quickIn(m), q => q.value);
  s.gastos = s.fixo + s.assinatura + s.parcela + s.divida + s.avulso;
  s.total = s.salary + s.extras;
  s.sobra = s.salary - s.gastos;
  s.livre = s.total - s.gastos;
  return s;
}

function pendingItems(m) {
  const out = [];
  activeBills(m).forEach(b => {
    const bm = billMonth(b, m);
    if (!bm.paid && !bm.notMe) out.push({ kind: 'bill', id: b.id, icon: b.icon, name: b.name, sub: b.day ? `Vence dia ${b.day}` : (b.kind === 'fixo' ? 'Conta fixa' : 'Assinatura'), value: bm.value, day: b.day || 99 });
  });
  state.installments.forEach(i => {
    const n = instParcel(i, m);
    if (n && n > i.paid) out.push({ kind: 'inst', id: i.id, icon: i.icon, name: i.name, sub: `Parcela ${n} de ${i.total}`, value: i.value, day: 99 });
  });
  return out.sort((a, b) => a.day - b.day);
}

/* ---------- componentes ---------- */
const countEl = (key, v, cls = '') => `<span class="${cls}" data-count="${key}" data-v="${round2(v)}">${fmt(v)}</span>`;
const ring = (p, label = '') => `<div class="ring-wrap"><svg class="ring ${p >= 100 ? 'done' : ''}" viewBox="0 0 36 36"><circle class="trk" cx="18" cy="18" r="15.5"/><circle class="val" cx="18" cy="18" r="15.5" pathLength="100" style="stroke-dasharray:${p} 100;${p ? '' : 'opacity:0'}"/></svg>${label ? `<span>${label}</span>` : ''}</div>`;
const bar = (p, cls = '') => `<div class="bar ${cls} ${p >= 100 ? 'done' : ''}"><i style="width:${p}%"></i></div>`;
const secHead = (title, action, count) => `<div class="sec-head anim" style="--i:3"><h3>${title}${count ? ` <span class="count">${count}</span>` : ''}</h3>${action ? `<button class="add-btn" ${action} aria-label="Adicionar">${I.plus}</button>` : ''}</div>`;
const empty = (em, title, text, btn = '') => `<div class="empty"><div class="em">${em}</div><b>${title}</b>${text}${btn}</div>`;

function segView(key, opts, val) {
  const idx = opts.findIndex(o => o[0] === val);
  const prev = ui.segPrev[key] ?? idx;
  ui.segPrev[key] = idx;
  return `<div class="seg view-seg anim" style="--n:${opts.length};--x:${prev}" data-to="${idx}"><i class="pill"></i>${opts.map(([v, l]) => `<button class="${v === val ? 'on' : ''}" data-action="seg" data-key="${key}" data-val="${v}">${l}</button>`).join('')}</div>`;
}

/* ---------- views ---------- */
const VIEWS = {};

VIEWS.home = m => {
  const s = summary(m);
  const parts = [['fixo', 'Fixas', 'rgba(255,255,255,.95)'], ['assinatura', 'Assinaturas', 'rgba(255,255,255,.68)'], ['parcela', 'Parcelas', 'rgba(150,235,255,.85)'], ['divida', 'Dívidas', 'rgba(255,200,120,.9)'], ['avulso', 'Rápidos', 'rgba(255,170,210,.9)']];
  const base = Math.max(s.salary, s.gastos, 1);
  const stack = parts.map(([k, , c]) => s[k] > 0 ? `<i style="width:${s[k] / base * 100}%;background:${c}"></i>` : '').join('');
  const legend = parts.filter(([k]) => s[k] > 0).map(([k, l, c]) => `<span><i style="background:${c}"></i>${l}</span>`).join('');
  const used = s.salary > 0 ? Math.round(s.gastos / s.salary * 100) : 0;
  const pend = pendingItems(m);

  const tile = (key, label, v, icon, color, action) =>
    `<button class="tile anim" style="--i:${key[1]};--c:${color}" ${action}><div class="chip-ico">${icon}</div><div><small>${label}</small><b>${countEl('home-' + key, v)}</b></div></button>`;

  return `
  <section class="card hero anim" style="--i:0">
    <div class="hero-label"><span>Sobra do salário</span>${s.salary > 0 ? `<span class="hero-badge">${used}% usado</span>` : ''}</div>
    <div class="hero-value ${s.sobra < 0 ? 'neg' : ''}">${countEl('home-sobra', s.sobra)}</div>
    <div class="stack">${stack}</div>
    ${legend ? `<div class="legend">${legend}</div>` : ''}
    <div class="hero-foot"><div>Salário<b>${fmt(s.salary)}</b></div><div style="text-align:right">Gastos<b>${fmt(s.gastos)}</b></div></div>
  </section>
  <div class="tiles">
    ${tile('t1', 'Total do mês', s.total, I.income, '#45e3ff', 'data-action="go" data-tab="renda"')}
    ${tile('t2', 'Extras', s.extras, I.spark, '#32d74b', 'data-action="go" data-tab="renda"')}
    ${tile('t3', 'Todos os gastos', s.gastos, I.cart, '#ff9f0a', 'data-action="all-expenses"')}
    ${tile('t4', 'Guardado', guardado(), I.piggy, '#bf5af2', 'data-action="go" data-tab="cofre"')}
  </div>
  ${s.extras > 0 ? `<div class="card anim summary" style="--i:5"><div><small>Livre com os extras</small><span class="big ${s.livre < 0 ? 'neg' : ''}">${countEl('home-livre', s.livre)}</span><span class="sub">Salário + extras − gastos</span></div>${ring(pct(s.gastos, s.total))}</div>` : ''}
  ${closeCard(m)}
  <button class="fab" data-action="add-quick" aria-label="Gasto rápido">${I.bolt}<span>Gasto rápido</span></button>
  ${secHead('A pagar', '', pend.length || '')}
  <section class="card list pending anim" style="--i:6">
    ${pend.length ? pend.map(p => `
      <div class="row" data-action="${p.kind === 'bill' ? 'edit-bill' : 'edit-inst'}" data-id="${p.id}">
        <div class="ico">${p.icon}</div>
        <div class="row-main"><b>${esc(p.name)}</b><small>${p.sub}</small></div>
        <div class="row-end"><span class="amt">${p.value ? fmt(p.value) : '<em>definir</em>'}</span></div>
        <button class="check" data-action="${p.kind === 'bill' ? 'toggle-bill' : 'pay-inst'}" data-id="${p.id}" aria-label="Marcar como pago">${I.check}</button>
      </div>`).join('')
      : empty('✨', 'Tudo pago!', 'Nenhuma conta pendente neste mês.')}
  </section>`;
};

VIEWS.contas = m => {
  const k = ui.contas;
  const seg = segView('contas', [['fixo', 'Fixas'], ['assinatura', 'Assinaturas'], ['parcela', 'Parcelas']], k);
  if (k === 'parcela') return seg + parcelasView(m);

  const bills = activeBills(m).filter(b => b.kind === k).sort((a, b) => (a.day || 99) - (b.day || 99));
  const data = bills.map(b => billMonth(b, m));
  const total = sum(data, d => d.cost);
  const mine = data.filter(d => !d.notMe);
  const paid = mine.filter(d => d.paid).length;
  const label = k === 'fixo' ? 'Contas fixas' : 'Assinaturas';

  return seg + `
  <section class="card summary anim" style="--i:1">
    <div><small>${label} · ${monthName(m)}</small><span class="big">${countEl('contas-' + k, total)}</span><span class="sub">${mine.length ? `${paid} de ${mine.length} pagas` : 'Nada por aqui ainda'}</span></div>
    ${ring(pct(paid, mine.length), mine.length ? `${paid}/${mine.length}` : '')}
  </section>
  <section class="card list anim" style="--i:2;padding-bottom:0">
    ${bills.length ? bills.map(b => billRow(b, m)).join('') : empty(k === 'fixo' ? '🧾' : '📺', k === 'fixo' ? 'Sem contas fixas' : 'Sem assinaturas', k === 'fixo' ? 'Internet, condomínio, aluguel…' : 'Netflix, Spotify, iCloud…')}
    <button class="add-row" data-action="add-bill" data-kind="${k}">${I.plus} Adicionar ${k === 'fixo' ? 'conta fixa' : 'assinatura'}</button>
  </section>`;
};

function billRow(b, m) {
  const bm = billMonth(b, m);
  const bits = [];
  if (b.day) bits.push(`Dia ${b.day}`);
  if (bm.notMe) bits.push('Não fui eu este mês');
  else if (b.alt) bits.push('Minha vez');
  if (bm.adjusted) bits.push('Valor ajustado');
  const sub = bits.join(' · ') || (b.kind === 'fixo' ? 'Conta fixa' : 'Assinatura');
  return `<div class="row ${bm.notMe ? 'off' : ''} ${bm.paid ? 'is-paid' : ''}" data-action="edit-bill" data-id="${b.id}">
    <div class="ico">${b.icon}</div>
    <div class="row-main"><b>${esc(b.name)}</b><small>${sub}</small></div>
    <div class="row-end"><span class="amt">${bm.value ? fmt(bm.value) : '<em>definir</em>'}</span></div>
    ${bm.notMe ? '<span class="tag">↺</span>' : `<button class="check ${bm.paid ? 'on' : ''} ${ui.pop === b.id ? 'pop' : ''}" data-action="toggle-bill" data-id="${b.id}" aria-label="Marcar como paga">${I.check}</button>`}
  </div>`;
}

function parcelasView(m) {
  const list = [...state.installments].sort((a, b) => (a.paid >= a.total) - (b.paid >= b.total));
  const active = state.installments.filter(i => instParcel(i, m));
  const month = sum(active, i => i.value);
  const left = sum(state.installments, i => Math.max(0, i.total - i.paid) * i.value);

  return `
  <section class="card summary anim" style="--i:1">
    <div><small>Parcelas · ${monthName(m)}</small><span class="big">${countEl('parc-mes', month)}</span><span class="sub">${active.length} ativa${active.length === 1 ? '' : 's'} · falta ${fmt(left)} no total</span></div>
    <button class="add-btn" data-action="add-inst" aria-label="Nova compra parcelada">${I.plus}</button>
  </section>
  ${list.length ? list.map((i, n) => instCard(i, m, n)).join('') : `<section class="card anim" style="--i:2">${empty('💳', 'Nenhuma compra parcelada', 'Adicione e marque as parcelas pagas.', `<button class="btn inline" data-action="add-inst">${I.plus} Nova compra</button>`)}</section>`}`;
}

function instCard(i, m, n) {
  const now = instParcel(i, m);
  const done = i.paid >= i.total;
  const many = i.total > 24;
  const dots = Array.from({ length: i.total }, (_, k) => `<button class="dot ${k < i.paid ? 'paid' : ''} ${k + 1 === now ? 'now' : ''}" style="--d:${k}" data-action="set-paid" data-id="${i.id}" data-n="${k + 1}" aria-label="Parcela ${k + 1}">${k + 1}</button>`).join('');
  const leftN = Math.max(0, i.total - i.paid);
  return `<section class="card anim ${done ? 'finished' : ''}" style="--i:${n + 2}">
    <div class="inst-head" data-action="edit-inst" data-id="${i.id}">
      <div class="ico">${i.icon}</div>
      <div class="row-main"><b>${esc(i.name)}</b><small>${fmt(i.value)} por mês</small></div>
      <div class="frac">${i.paid}<small>/${i.total}</small></div>
    </div>
    <div class="dots ${many ? 'many' : ''}">${dots}</div>
    <div class="inst-foot">${done ? '<span class="badge-ok">Quitado ✓</span>' : `<span>Faltam <b>${leftN}</b> · <b>${fmt(leftN * i.value)}</b></span><span>até ${monthShort(addM(i.start, i.total - 1))}</span>`}</div>
  </section>`;
}

VIEWS.dividas = m => {
  const total = sum(state.debts, d => d.total);
  const paid = sum(state.debts, d => Math.min(d.total, debtPaidTotal(d)));
  const left = total - paid;
  const p = pct(paid, total);
  const list = [...state.debts].sort((a, b) => (debtLeft(a) === 0) - (debtLeft(b) === 0));
  return `
  <section class="card hero anim" style="--i:0">
    <div class="hero-label"><span>Falta quitar</span>${total ? `<span class="hero-badge">${Math.round(p)}% pago</span>` : ''}</div>
    <div class="hero-value">${countEl('div-left', left)}</div>
    ${bar(p, 'lg')}
    <div class="hero-foot"><div>Já paguei<b>${fmt(paid)}</b></div><div style="text-align:right">Este mês<b>${fmt(sum(state.debts, d => debtPaidIn(d, m)))}</b></div></div>
  </section>
  ${secHead('Dívidas', 'data-action="add-debt"', state.debts.filter(d => debtLeft(d) > 0).length || '')}
  ${list.length ? list.map((d, n) => {
    const dp = pct(debtPaidTotal(d), d.total), dl = debtLeft(d), done = dl === 0;
    return `<section class="card prog-card anim" style="--i:${n + 4}" data-action="open-debt" data-id="${d.id}">
      <div class="prog-top"><div class="ico">${d.icon}</div><div class="row-main"><b>${esc(d.name)}</b><small>${done ? 'Quitada 🎉' : `Faltam ${fmt(dl)}`}</small></div><span class="pct ${done ? 'done' : ''}">${Math.round(dp)}%</span></div>
      ${bar(dp)}
      <div class="prog-foot"><span><b>${fmt(Math.min(d.total, debtPaidTotal(d)))}</b> de ${fmt(d.total)}</span>${done ? '<span class="badge-ok">Quitada ✓</span>' : `<button class="mini-btn" data-action="pay-debt" data-id="${d.id}">Pagar</button>`}</div>
    </section>`;
  }).join('') : `<section class="card anim" style="--i:4">${empty('🎯', 'Nenhuma dívida aberta', 'Bote o valor total e vá registrando o que paga.', `<button class="btn inline" data-action="add-debt">${I.plus} Nova dívida</button>`)}</section>`}`;
};

VIEWS.renda = m => {
  const s = summary(m);
  const ex = extrasIn(m).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const bySrc = state.sources.map(src => ({ src, v: sum(ex.filter(e => e.sourceId === src.id), e => e.value) }));
  const orphan = sum(ex.filter(e => !state.sources.some(s2 => s2.id === e.sourceId)), e => e.value);
  const base = Math.max(s.total, 1);
  const stack = `<i style="width:${s.salary / base * 100}%;background:rgba(255,255,255,.95)"></i>` +
    bySrc.filter(x => x.v > 0).map(x => `<i style="width:${x.v / base * 100}%;background:${x.src.color}"></i>`).join('') +
    (orphan > 0 ? `<i style="width:${orphan / base * 100}%;background:#8e8e93"></i>` : '');
  const legend = `<span><i style="background:#fff"></i>Salário</span>` + bySrc.filter(x => x.v > 0).map(x => `<span><i style="background:${x.src.color}"></i>${esc(x.src.name)}</span>`).join('');

  const months = Array.from({ length: 6 }, (_, k) => addM(m, k - 5));
  const totals = months.map(mm => salaryAt(mm) + sum(extrasIn(mm), e => e.value));
  const max = Math.max(...totals, 1);

  return `
  <section class="card hero anim" style="--i:0">
    <div class="hero-label"><span>Total do mês</span><span class="hero-badge">salário + extras</span></div>
    <div class="hero-value">${countEl('renda-total', s.total)}</div>
    <div class="stack">${stack}</div>
    <div class="legend">${legend}</div>
    <div class="hero-foot"><div>Salário<b>${fmt(s.salary)}</b></div><div style="text-align:right">Extras<b>${fmt(s.extras)}</b></div></div>
  </section>
  <section class="card list anim" style="--i:1;padding:4px 0">
    <div class="row" data-action="edit-salary">
      <div class="ico">💼</div>
      <div class="row-main"><b>Salário fixo</b><small>${state.salary.months?.[m] != null ? 'Valor diferente neste mês' : 'Toque para ajustar'}</small></div>
      <div class="row-end"><span class="amt">${s.salary ? fmt(s.salary) : '<em>definir</em>'}</span></div>
    </div>
  </section>
  ${secHead('Extras', 'data-action="add-extra"', ex.length || '')}
  <div class="src-scroll anim" style="--i:4">
    ${bySrc.map(x => `<button class="src-chip" style="--c:${x.src.color}" data-action="edit-source" data-id="${x.src.id}"><div class="ico">${x.src.icon}</div><div><small>${esc(x.src.name)}</small><b>${fmt(x.v)}</b></div></button>`).join('')}
    <button class="src-chip new" data-action="new-source">${'+ Fonte'}</button>
  </div>
  <section class="card list anim" style="--i:5;padding-bottom:0">
    ${ex.length ? ex.map(e => {
      const src = sourceOf(e.sourceId);
      return `<div class="row" data-action="edit-extra" data-id="${e.id}"><div class="ico" style="background:color-mix(in srgb, ${src.color} 18%, transparent)">${src.icon}</div><div class="row-main"><b>${esc(e.note || src.name)}</b><small>${esc(e.note ? src.name : '')}${e.day ? `${e.note ? ' · ' : ''}dia ${e.day}` : ''}</small></div><div class="row-end"><span class="amt plus">+${fmt(e.value)}</span></div></div>`;
    }).join('') : empty('🛵', 'Nenhum extra neste mês', 'Entregas, clientes, freelas…')}
    <button class="add-row" data-action="add-extra">${I.plus} Lançar extra</button>
  </section>
  <section class="card anim" style="--i:6">
    <div class="summary"><div><small>Últimos 6 meses</small><span class="sub">Total recebido por mês</span></div></div>
    <div class="chart">${months.map((mm, k) => `<div class="col ${mm === m ? 'cur' : ''}"><div class="b" style="height:${Math.max(3, totals[k] / max * 100)}%;--d:${k}"></div><small>${MES_CURTO[+mm.split('-')[1] - 1]}</small></div>`).join('')}</div>
  </section>`;
};

VIEWS.cofre = () => {
  const total = guardado();
  return `
  <section class="card hero anim" style="--i:0">
    <div class="hero-label"><span>Dinheiro guardado</span><span class="hero-badge">${state.goals.length} meta${state.goals.length === 1 ? '' : 's'}</span></div>
    <div class="hero-value">${countEl('cofre-total', total)}</div>
    <div class="hero-foot"><div>Reserva livre<b>${fmt(state.reserve)}</b></div><div style="text-align:right">Nas metas<b>${fmt(sum(state.goals, g => g.saved))}</b></div></div>
    <div class="hero-actions">
      <button data-action="reserve" data-dir="1">${I.plus} Guardar</button>
      <button data-action="reserve" data-dir="-1">${I.minus} Retirar</button>
    </div>
  </section>
  ${secHead('Metas', 'data-action="add-goal"', '')}
  ${state.goals.length ? state.goals.map((g, n) => {
    const p = pct(g.saved, g.target), done = g.target > 0 && g.saved >= g.target;
    return `<section class="card prog-card anim" style="--i:${n + 4}" data-action="open-goal" data-id="${g.id}">
      <div class="prog-top"><div class="ico">${g.icon}</div><div class="row-main"><b>${esc(g.name)}</b><small>${done ? 'Meta batida! 🎉' : `Faltam ${fmt(Math.max(0, g.target - g.saved))}`}</small></div><span class="pct ${done ? 'done' : ''}">${Math.round(p)}%</span></div>
      ${bar(p)}
      <div class="prog-foot"><span><b>${fmt(g.saved)}</b> de ${fmt(g.target)}</span><button class="mini-btn" data-action="open-goal" data-id="${g.id}">Guardar</button></div>
    </section>`;
  }).join('') : `<section class="card anim" style="--i:4">${empty('🎯', 'Nenhuma meta ainda', 'Viagem, reserva de emergência, um carro…', `<button class="btn inline" data-action="add-goal">${I.plus} Nova meta</button>`)}</section>`}`;
};

/* ---------- render ---------- */
const TABS = [['home', 'Início', I.home], ['contas', 'Contas', I.bills], ['dividas', 'Dívidas', I.debt], ['renda', 'Renda', I.income], ['cofre', 'Cofre', I.vault]];

function renderTabbar() {
  const nav = $('#tabbar');
  if (!nav.children.length) {
    nav.innerHTML = `<i class="tab-ind"></i>` + TABS.map(([k, l, ic]) => `<button class="tab" data-action="go" data-tab="${k}">${ic}<span>${l}</span></button>`).join('');
  }
  const idx = TABS.findIndex(t => t[0] === ui.tab);
  nav.style.setProperty('--i', idx);
  $$('.tab', nav).forEach((b, i) => b.classList.toggle('on', i === idx));
}

function renderMonth() {
  const el = $('#month');
  const showMonth = ui.tab !== 'cofre';
  el.style.display = showMonth ? '' : 'none';
  const y = ui.month.slice(0, 4);
  el.innerHTML = `
    <button class="mb-btn" data-action="month" data-d="-1" aria-label="Mês anterior">${I.left}</button>
    <button class="mb-label" data-action="month-today"><span>${monthName(ui.month)}</span><small>${y}</small>${ui.month !== TODAY ? '<em class="today-pill">voltar p/ hoje</em>' : ''}</button>
    <button class="mb-btn" data-action="month" data-d="1" aria-label="Próximo mês">${I.right}</button>`;
}

function render() {
  document.documentElement.dataset.theme = state.settings.theme;
  $('meta[name="theme-color"]').content = state.settings.theme === 'light' ? '#eef2f9' : '#03050b';
  $('#brandName').textContent = state.settings.name || 'Kauã';
  $('#eyeBtn').innerHTML = state.settings.hide ? I.eyeOff : I.eye;
  $('#gearBtn').innerHTML = I.gear;
  renderTabbar();
  renderMonth();
  const v = $('#view');
  v.classList.toggle('enter', ui.animate);
  v.innerHTML = VIEWS[ui.tab](ui.month);
  afterRender(v, ui.animate);
  ui.animate = false;
  ui.pop = null;
}

function afterRender(root, animate) {
  $$('.view-seg', root).forEach(el => { void el.offsetWidth; el.style.setProperty('--x', el.dataset.to); });
  $$('[data-count]', root).forEach(el => {
    const key = el.dataset.count, to = +el.dataset.v;
    const from = counters[key] ?? (animate ? 0 : to);
    counters[key] = to;
    if (state.settings.hide || from === to) return;
    el.textContent = fmt(from);
    const t0 = performance.now(), dur = animate ? 1100 : 700;
    const step = now => {
      if (!el.isConnected) return;
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ---------- sheet (painel de baixo) ---------- */
let sheetCtx = {};
let sheetGen = 0;
function openSheet(title, body, ctx = {}) {
  sheetGen++;
  const root = $('#sheet-root');
  root.classList.remove('open');
  sheetCtx = ctx;
  root.innerHTML = `<div class="backdrop" data-action="close-sheet"></div>
    <form class="sheet" autocomplete="off" novalidate><div class="grab"></div>
      <div class="sheet-head"><h2>${title}</h2><button type="button" class="icon-btn sm" data-action="close-sheet" aria-label="Fechar">${I.x}</button></div>
      ${body}
    </form>`;
  const form = $('.sheet', root);
  form.addEventListener('submit', e => { e.preventDefault(); $('[data-primary]', form)?.click(); });
  form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); $('[data-primary]', form)?.click(); } });
  $$('.money input', form).forEach(inp => {
    const fit = () => { inp.style.width = `${Math.max(3, (inp.value || inp.placeholder).length) + 0.6}ch`; };
    fit();
    inp.addEventListener('input', fit);
    inp.addEventListener('focus', () => setTimeout(() => inp.select(), 0));
  });
  enableDrag(form);
  void root.offsetWidth;
  requestAnimationFrame(() => root.classList.add('open'));
  const af = $('[data-autofocus]', form);
  if (af && matchMedia('(pointer: fine)').matches) setTimeout(() => af.focus(), 380);
}
function closeSheet() {
  const root = $('#sheet-root');
  if (!root.innerHTML) return;
  root.classList.remove('open');
  const gen = sheetGen;
  setTimeout(() => { if (gen === sheetGen) root.innerHTML = ''; }, 450);
}
function enableDrag(sheet) {
  let y0 = null, dy = 0;
  sheet.addEventListener('touchstart', e => { if (sheet.scrollTop > 0) { y0 = null; return; } y0 = e.touches[0].clientY; dy = 0; }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (y0 == null) return;
    dy = Math.max(0, e.touches[0].clientY - y0);
    if (dy > 4) { sheet.style.transition = 'none'; sheet.style.transform = `translateY(${dy}px)`; }
  }, { passive: true });
  sheet.addEventListener('touchend', () => {
    if (y0 == null) return;
    sheet.style.transition = ''; sheet.style.transform = '';
    if (dy > 110) closeSheet();
    y0 = null;
  });
}
const form = () => $('#sheet-root form');
const fv = name => form()?.elements[name];

/* ---------- campos de formulário ---------- */
const F = {
  money: (name, v, auto = false) => `<label class="money"><span>R$</span><input name="${name}" inputmode="decimal" placeholder="0,00" value="${toInput(v)}" ${auto ? 'data-autofocus' : ''}></label>`,
  text: (name, label, v = '', ph = '', auto = false) => `<label class="field"><span>${label}</span><input name="${name}" value="${esc(v)}" placeholder="${esc(ph)}" ${auto ? 'data-autofocus' : ''}></label>`,
  num: (name, label, v = '', ph = '') => `<label class="field"><span>${label}</span><input name="${name}" inputmode="numeric" value="${v ?? ''}" placeholder="${ph}"></label>`,
  emoji: sel => {
    const list = EMOJIS.includes(sel) ? EMOJIS : [sel, ...EMOJIS];
    return `<div class="emojis">${list.map(e => `<label><input type="radio" name="icon" value="${e}" ${e === sel ? 'checked' : ''}><span>${e}</span></label>`).join('')}</div>`;
  },
  seg: (name, opts, val) => `<div class="seg form-seg" style="--n:${opts.length}">${opts.map(([v, l]) => `<label><input type="radio" name="${name}" value="${v}" ${v === val ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div>`,
  toggle: (name, label, on, sub = '') => `<label class="toggle"><div><b>${label}</b>${sub ? `<small>${sub}</small>` : ''}</div><input type="checkbox" name="${name}" ${on ? 'checked' : ''}><i></i></label>`,
  btn: (label, action, extra = '') => `<button type="button" class="btn" data-primary data-action="${action}" ${extra}>${label}</button>`,
  danger: (label, action, extra = '') => `<button type="button" class="btn danger" data-confirm data-action="${action}" ${extra}>${label}</button>`,
  more: (label, inner) => `<details class="more"><summary>${I.right}${label}</summary><div>${inner}</div></details>`,
};
const dayVal = () => { const d = parseInt(fv('day')?.value, 10); return d >= 1 && d <= 31 ? d : null; };
const nameVal = (fallback) => (fv('name')?.value || '').trim() || fallback;

/* ---------- sheets: contas fixas / assinaturas ---------- */
function billSheet(id, kind) {
  const b = id ? state.bills.find(x => x.id === id) : null;
  const m = ui.month;
  if (!b) {
    const isFixo = kind === 'fixo';
    openSheet(isFixo ? 'Nova conta fixa' : 'Nova assinatura', `
      ${F.money('value', 0, true)}
      ${F.emoji(isFixo ? '🏠' : '📺')}
      <div class="fields-2">${F.text('name', 'Nome', '', isFixo ? 'Ex: Internet' : 'Ex: Netflix')}${F.num('day', 'Dia do vencimento', '', 'Ex: 10')}</div>
      <div class="toggles">
        ${F.toggle('ask', 'Valor muda todo mês', false, 'Pergunta o valor quando der o check')}
        ${F.toggle('alt', 'Revezo o pagamento', false, 'Pago um mês sim, um mês não')}
      </div>
      ${F.btn('Adicionar', 'save-bill')}`, { kind });
    return;
  }
  const bm = billMonth(b, m);
  openSheet(esc(b.name), `
    <div class="sheet-hero"><div class="ico lg">${b.icon}</div><div><b>Valor de ${monthName(m).toLowerCase()}</b><small>${bm.adjusted ? `Normal: ${fmt(bm.base)}` : 'Mude se veio diferente'}</small></div></div>
    ${F.money('value', bm.value)}
    ${F.seg('scope', [['month', 'Só este mês'], ['forward', 'Daqui pra frente']], 'month')}
    <div class="toggles">
      ${F.toggle('paid', 'Paguei', bm.paid)}
      ${F.toggle('notMe', 'Não fui eu que paguei', bm.notMe, 'Não entra nos gastos deste mês')}
      ${F.toggle('ask', 'Valor muda todo mês', !!b.ask, 'Pergunta o valor quando der o check')}
      ${F.toggle('alt', 'Revezo o pagamento', !!b.alt, 'Mês sim, mês não — automático')}
    </div>
    ${F.more('Editar detalhes', `${F.emoji(b.icon)}<div class="fields-2">${F.text('name', 'Nome', b.name)}${F.num('day', 'Dia do vencimento', b.day || '')}</div>`)}
    ${F.btn('Salvar', 'save-bill')}
    ${F.danger('Remover', 'remove-bill')}`, { id });
}

function payBillSheet(id) {
  const b = state.bills.find(x => x.id === id), m = ui.month;
  const bm = billMonth(b, m);
  openSheet(esc(b.name), `
    <div class="sheet-hero"><div class="ico lg">${b.icon}</div><div><b>Quanto veio em ${monthName(m).toLowerCase()}?</b><small>Mês passado: ${fmt(billMonth(b, addM(m, -1)).value)}</small></div></div>
    ${F.money('value', bm.value, true)}
    ${F.btn(`${I.check} Paguei`, 'confirm-pay-bill')}`, { id });
}

function saveBill() {
  const m = ui.month;
  const value = parseMoney(fv('value').value);
  if (!sheetCtx.id) {
    const b = { id: uid(), kind: sheetCtx.kind, name: nameVal(sheetCtx.kind === 'fixo' ? 'Conta' : 'Assinatura'), icon: fv('icon').value, day: dayVal(), start: m, hist: [{ from: m, value }], months: {} };
    if (fv('alt').checked) b.alt = m;
    if (fv('ask').checked) b.ask = true;
    state.bills.push(b);
    closeSheet(); commit(); toast('Adicionado ✓');
    return;
  }
  const b = state.bills.find(x => x.id === sheetCtx.id);
  const rec = b.months[m] || (b.months[m] = {});
  if (fv('scope').value === 'forward') {
    setHist(b.hist, m, value);
    delete rec.value;
    Object.keys(b.months).forEach(k => { if (k > m) delete b.months[k].value; });
  } else {
    if (value === histValue(b.hist, m)) delete rec.value; else rec.value = value;
  }
  rec.paid = fv('paid').checked;
  const altOn = fv('alt').checked, notMe = fv('notMe').checked;
  if (altOn && !b.alt) b.alt = notMe ? addM(m, 1) : m;
  if (!altOn) delete b.alt;
  if (notMe !== altDefaultNotMe(b, m)) rec.notMe = notMe; else delete rec.notMe;
  if (fv('ask').checked) b.ask = true; else delete b.ask;
  b.name = nameVal(b.name); b.icon = fv('icon').value; b.day = dayVal();
  if (!Object.keys(rec).some(k => rec[k] !== false && rec[k] !== undefined)) delete b.months[m];
  closeSheet(); commit(); toast('Salvo ✓');
}

/* ---------- sheets: parcelados ---------- */
function instSheet(id) {
  const i = id ? state.installments.find(x => x.id === id) : null;
  openSheet(i ? esc(i.name) : 'Compra parcelada', `
    <div class="sec-label" style="margin-top:0;text-align:center">Valor da parcela</div>
    ${F.money('value', i?.value, !i)}
    ${F.emoji(i?.icon || '💳')}
    ${F.text('name', 'O que foi', i?.name || '', 'Ex: iPhone, sofá…')}
    <div class="fields-2">${F.num('total', 'Total de parcelas', i?.total || '', 'Ex: 12')}${F.num('paid', 'Já paguei', i?.paid ?? '', 'Ex: 3')}</div>
    ${F.num('now', `Parcela de ${monthName(ui.month).toLowerCase()}`, i ? instParcel(i, ui.month) || '' : '', 'Ex: 4 (deixe vazio = próxima)')}
    ${F.btn(i ? 'Salvar' : 'Adicionar', 'save-inst')}
    ${i ? F.danger('Remover', 'remove-inst') : ''}`, { id });
}
function saveInst() {
  const value = parseMoney(fv('value').value);
  const total = clamp(parseInt(fv('total').value, 10) || 1, 1, 420);
  const paid = clamp(parseInt(fv('paid').value, 10) || 0, 0, total);
  if (!value) return toast('Coloque o valor da parcela');
  const data = { name: nameVal('Compra'), icon: fv('icon').value, value, total, paid };
  // "Parcela deste mês" define quando a compra começou; vazio = a próxima depois das pagas.
  const now = parseInt(fv('now').value, 10);
  if (now >= 1 && now <= total) data.start = addM(ui.month, -(now - 1));
  else if (!sheetCtx.id) data.start = addM(ui.month, -paid);
  if (sheetCtx.id) Object.assign(state.installments.find(x => x.id === sheetCtx.id), data);
  else state.installments.push({ id: uid(), ...data });
  closeSheet(); commit(); toast('Salvo ✓');
}

/* ---------- sheets: dívidas ---------- */
function debtNewSheet() {
  openSheet('Nova dívida', `
    <div class="sec-label" style="margin-top:0;text-align:center">Valor total da dívida</div>
    ${F.money('total', 0, true)}
    ${F.emoji('🧾')}
    ${F.text('name', 'Com quem / o quê', '', 'Ex: Cartão Nubank, empréstimo…')}
    <label class="field"><span>Já paguei até agora (opcional)</span><input name="already" inputmode="decimal" placeholder="0,00"></label>
    ${F.btn('Adicionar', 'save-debt')}`);
}
function debtSheet(id, focusPay = false) {
  const d = state.debts.find(x => x.id === id);
  const paid = debtPaidTotal(d), left = debtLeft(d), p = pct(paid, d.total);
  const pays = [...d.payments].sort((a, b) => b.month.localeCompare(a.month) || (b.ts || 0) - (a.ts || 0));
  openSheet(esc(d.name), `
    <div class="sheet-hero"><div class="ico lg">${d.icon}</div><div><b>${left ? `Faltam ${fmt(left)}` : 'Quitada! 🎉'}</b><small>${Math.round(p)}% pago de ${fmt(d.total)}</small></div></div>
    ${bar(p, 'lg')}
    ${left ? `<div class="sec-label">Registrar pagamento · ${monthName(ui.month)}</div>
      ${F.money('pay', 0, focusPay)}
      ${F.btn('Registrar pagamento', 'add-payment')}` : ''}
    ${pays.length ? `<div class="sec-label">Histórico</div><div class="hist">${pays.map(py => `<div class="h-row"><span>${monthName(py.month)} ${py.month.slice(0, 4)}${py.note ? ` · ${esc(py.note)}` : ''}</span><div><b>${fmt(py.value)}</b><button type="button" data-action="del-payment" data-pid="${py.id}" aria-label="Apagar">${I.x}</button></div></div>`).join('')}</div>` : ''}
    ${F.more('Editar dívida', `${F.emoji(d.icon)}${F.text('name', 'Nome', d.name)}<label class="field"><span>Valor total</span><input name="total" inputmode="decimal" value="${toInput(d.total)}"></label><button type="button" class="btn ghost" data-action="save-debt">Salvar alterações</button>`)}
    ${F.danger('Remover dívida', 'remove-debt')}`, { id });
  if (focusPay) setTimeout(() => fv('pay')?.focus(), 420);
}

/* ---------- sheets: renda ---------- */
function salarySheet() {
  const m = ui.month;
  openSheet('Salário fixo', `
    ${F.money('value', salaryAt(m), true)}
    ${F.seg('scope', [['forward', 'Daqui pra frente'], ['month', 'Só este mês']], 'forward')}
    ${F.btn('Salvar', 'save-salary')}`);
}
function extraSheet(id, draft) {
  const e = id ? state.extras.find(x => x.id === id) : null;
  const sel = draft?.src || e?.sourceId || state.sources[0]?.id;
  openSheet(e ? 'Editar extra' : 'Novo extra', `
    ${F.money('value', draft?.value ?? e?.value, !e)}
    <div class="chips">
      ${state.sources.map(s => `<label style="--c:${s.color}"><input type="radio" name="src" value="${s.id}" ${s.id === sel ? 'checked' : ''}><span>${s.icon} ${esc(s.name)}</span></label>`).join('')}
      <button type="button" class="chip" data-action="new-source" data-from="extra">+ Nova fonte</button>
    </div>
    ${F.text('note', 'Descrição (opcional)', draft?.note ?? e?.note ?? '', 'Ex: Cliente Ana, semana 2…')}
    ${F.btn(e ? 'Salvar' : 'Lançar', 'save-extra')}
    ${e ? F.danger('Apagar', 'remove-extra') : ''}`, { id });
}
function sourceSheet(id, from) {
  const s = id ? state.sources.find(x => x.id === id) : null;
  const color = s?.color || COLORS[state.sources.length % COLORS.length];
  openSheet(s ? 'Editar fonte' : 'Nova fonte de renda', `
    ${F.emoji(s?.icon || '💼')}
    ${F.text('name', 'Nome', s?.name || '', 'Ex: Uber, Freela design…', !s)}
    <div class="colors">${COLORS.map(c => `<label style="--c:${c}"><input type="radio" name="color" value="${c}" ${c === color ? 'checked' : ''}><span></span></label>`).join('')}</div>
    ${F.btn(s ? 'Salvar' : 'Criar fonte', 'save-source')}
    ${s ? F.danger('Remover fonte', 'remove-source') : ''}`, { id, from });
}

/* ---------- sheets: cofre ---------- */
function goalNewSheet(id) {
  const g = id ? state.goals.find(x => x.id === id) : null;
  openSheet(g ? 'Editar meta' : 'Nova meta', `
    <div class="sec-label" style="margin-top:0;text-align:center">Quanto quer juntar</div>
    ${F.money('target', g?.target, !g)}
    ${F.emoji(g?.icon || '🏖️')}
    ${F.text('name', 'Nome da meta', g?.name || '', 'Ex: Viagem, reserva…')}
    ${g ? '' : `<label class="field"><span>Já tenho guardado (opcional)</span><input name="saved" inputmode="decimal" placeholder="0,00"></label>`}
    ${F.btn(g ? 'Salvar' : 'Criar meta', 'save-goal')}`, { id });
}
function goalSheet(id) {
  const g = state.goals.find(x => x.id === id);
  const p = pct(g.saved, g.target);
  openSheet(esc(g.name), `
    <div class="sheet-hero"><div class="ico lg">${g.icon}</div><div><b>${fmt(g.saved)} de ${fmt(g.target)}</b><small>${g.saved >= g.target ? 'Meta batida! 🎉' : `Faltam ${fmt(g.target - g.saved)}`}</small></div></div>
    ${bar(p, 'lg')}
    ${F.money('value', 0)}
    <div class="btn-row">
      <button type="button" class="btn" data-primary data-action="goal-move" data-dir="1">${I.plus} Guardar</button>
      <button type="button" class="btn ghost" data-action="goal-move" data-dir="-1">${I.minus} Retirar</button>
    </div>
    <div style="height:8px"></div>
    <button type="button" class="btn ghost" data-action="edit-goal">Editar meta</button>
    ${F.danger('Remover meta', 'remove-goal')}`, { id });
}
function reserveSheet(dir) {
  openSheet(dir > 0 ? 'Guardar na reserva' : 'Retirar da reserva', `
    <div class="sheet-hero" style="justify-content:center"><small>Reserva livre: <b>${fmt(state.reserve)}</b></small></div>
    ${F.money('value', 0, true)}
    ${F.btn(dir > 0 ? 'Guardar' : 'Retirar', 'reserve-move')}`, { dir });
}

/* ---------- sheets: todos os gastos ---------- */
function allExpensesSheet() {
  const m = ui.month, s = summary(m);
  const groups = [];
  ['fixo', 'assinatura'].forEach(k => {
    const items = activeBills(m).filter(b => b.kind === k).map(b => { const bm = billMonth(b, m); return { icon: b.icon, name: b.name, value: bm.value, off: bm.notMe, sub: bm.notMe ? 'Não fui eu' : bm.paid ? 'Pago' : 'Pendente' }; });
    if (items.length) groups.push([k === 'fixo' ? 'Contas fixas' : 'Assinaturas', s[k], items]);
  });
  const inst = state.installments.filter(i => instParcel(i, m)).map(i => ({ icon: i.icon, name: i.name, value: i.value, sub: `Parcela ${instParcel(i, m)}/${i.total}` }));
  if (inst.length) groups.push(['Parcelas', s.parcela, inst]);
  const debts = state.debts.filter(d => debtPaidIn(d, m) > 0).map(d => ({ icon: d.icon, name: d.name, value: debtPaidIn(d, m), sub: 'Pagamento de dívida' }));
  if (debts.length) groups.push(['Dívidas', s.divida, debts]);
  const quick = quickIn(m).sort((a, b) => (b.ts || 0) - (a.ts || 0)).map(q => ({ icon: '⚡', name: q.note || 'Gasto rápido', value: q.value, sub: q.day ? `Dia ${q.day} · toque para editar` : 'Toque para editar', action: `data-action="edit-quick" data-id="${q.id}"` }));
  if (quick.length) groups.push(['Gastos rápidos', s.avulso, quick]);

  openSheet(`Gastos de ${monthName(m).toLowerCase()}`, `
    <div class="money" style="padding-top:0"><span>R$</span><input readonly value="${state.settings.hide ? '••••' : toInput(s.gastos) || '0,00'}" tabindex="-1"></div>
    ${groups.length ? groups.map(([title, total, items]) => `
      <div class="group-h"><span>${title}</span><span>${fmt(total)}</span></div>
      <div class="hist">${items.map(it => `<div class="h-row ${it.action ? 'tap' : ''}" ${it.action || ''} style="${it.off ? 'opacity:.45' : ''}"><div style="gap:10px"><span style="font-size:18px;color:inherit">${it.icon}</span><div><b style="display:block">${esc(it.name)}</b><span style="font-size:12px">${it.sub}</span></div></div><b style="${it.off ? 'text-decoration:line-through' : ''}">${fmt(it.value)}</b></div>`).join('')}</div>`).join('')
      : empty('🧾', 'Nenhum gasto', 'Adicione suas contas na aba Contas.')}
    <button type="button" class="btn ghost" data-action="add-quick" style="margin-top:14px">${I.bolt} Gasto rápido</button>`);
}

/* ---------- fechar o mês ---------- */
function closeCard(m) {
  if (m > TODAY) return '';
  const c = closeInfo(m);
  if (!c) return `<section class="card anim close-card" style="--i:5" data-action="close-month">
      <div class="ico">🔒</div>
      <div class="row-main"><b>Fechar ${monthName(m).toLowerCase()}</b><small>Diga quanto sobrou na conta</small></div>
      ${Object.keys(state.closes || {}).length ? `<button class="mini-btn ghost" data-action="history">Histórico</button>` : `<span class="mini-btn">Fechar</span>`}
    </section>`;
  return `<section class="card anim close-card done" style="--i:5" data-action="history">
      <div class="ico">✅</div>
      <div class="row-main"><small>Sobrou de verdade</small><b class="big-sm ${c.sobra < 0 ? 'neg' : ''}">${fmt(c.sobra)}</b><small class="${c.missing > 0 ? 'warn' : ''}">${missingLabel(c.missing)}</small></div>
      <span class="mini-btn">Histórico</span>
    </section>`;
}

function closeMonthSheet(m) {
  const c = state.closes?.[m];
  openSheet(`Fechar ${monthName(m).toLowerCase()}`, `
    <div class="sec-label" style="margin-top:0;text-align:center">Quanto tem na conta agora?</div>
    ${F.money('balance', c?.balance, true)}
    <label class="field"><span>Começou o mês com</span><input name="start" inputmode="decimal" value="${toInput(c ? c.start : closeStartDefault(m))}" placeholder="0,00"></label>
    <p class="hint">Já vem com o que sobrou no mês passado. Se você tirou esse dinheiro da conta, coloque 0.</p>
    ${F.btn(c ? 'Salvar' : 'Fechar mês', 'save-close')}
    ${c ? F.danger('Reabrir mês', 'reopen-month') : ''}`, { m });
}

function historySheet() {
  const months = Object.keys(state.closes || {}).sort();
  const rows = months.map(m => ({ m, ...closeInfo(m) }));
  const avgMissing = rows.length ? sum(rows, r => r.missing) / rows.length : 0;
  const avgSobra = rows.length ? sum(rows, r => r.sobra) / rows.length : 0;
  const last = rows.slice(-12);
  const max = Math.max(...last.map(r => Math.abs(r.sobra)), 1);
  openSheet('Histórico', rows.length ? `
    <div class="tiles" style="margin-bottom:6px">
      <div class="tile"><div><small>Sobra média</small><b class="${avgSobra < 0 ? 'neg' : ''}">${fmt(avgSobra)}</b></div></div>
      <div class="tile"><div><small>Sem registro (média)</small><b>${fmt(Math.max(0, avgMissing))}</b></div></div>
    </div>
    <div class="enter"><div class="chart" style="height:130px">${last.map((r, k) => `<div class="col ${r.m === ui.month ? 'cur' : ''}"><div class="b ${r.sobra < 0 ? 'neg' : ''}" style="height:${Math.max(3, Math.abs(r.sobra) / max * 100)}%;--d:${k}"></div><small>${MES_CURTO[+r.m.split('-')[1] - 1]}</small></div>`).join('')}</div></div>
    <div class="sec-label">Meses fechados</div>
    <div class="hist">${rows.slice().reverse().map(r => `<div class="h-row tap" data-action="close-month" data-m="${r.m}"><div><div><b style="display:block">${monthName(r.m)} ${r.m.slice(0, 4)}</b><span style="font-size:12px">${missingLabel(r.missing)}</span></div></div><div style="text-align:right;display:block"><b class="${r.sobra < 0 ? 'neg' : ''}" style="display:block">${fmt(r.sobra)}</b><span style="font-size:12px">na conta ${fmt(r.real)}</span></div></div>`).join('')}</div>
    <p class="hint">"Sem registro" é a diferença entre o que o app calculou e o que tinha de verdade no banco.</p>`
    : empty('📅', 'Nenhum mês fechado ainda', 'No fim do mês, toque em "Fechar mês" no Início.'));
}

/* ---------- sheet: gasto rápido ---------- */
function quickSheet(id) {
  const q = id ? state.quick.find(x => x.id === id) : null;
  const recent = [...new Set(state.quick.filter(x => x.note).sort((a, b) => b.ts - a.ts).map(x => x.note))].slice(0, 6);
  openSheet(q ? 'Editar gasto' : 'Gasto rápido', `
    ${F.money('value', q?.value, !q)}
    ${F.text('note', 'O que foi (opcional)', q?.note || '', 'Ex: mercado, lanche, Uber…')}
    ${recent.length && !q ? `<div class="chips">${recent.map(n => `<button type="button" class="chip" data-action="quick-note" data-note="${esc(n)}">${esc(n)}</button>`).join('')}</div>` : ''}
    ${F.btn(q ? 'Salvar' : 'Lançar', 'save-quick')}
    ${q ? F.danger('Apagar', 'remove-quick') : ''}`, { id });
}

/* ---------- sheets: ajustes / boas-vindas ---------- */
function settingsSheet() {
  openSheet('Ajustes', `
    ${F.text('name', 'Seu nome', state.settings.name)}
    <div class="sec-label">Aparência</div>
    ${F.seg('theme', [['dark', 'Escuro'], ['light', 'Claro']], state.settings.theme)}
    <div class="toggles">${F.toggle('hide', 'Esconder valores', state.settings.hide, 'Bom pra abrir o app em público')}</div>
    ${F.btn('Salvar', 'save-settings')}
    <div class="sec-label">Backup</div>
    <div class="btn-row">
      <button type="button" class="btn ghost" data-action="export">Exportar</button>
      <button type="button" class="btn ghost" data-action="import">Importar</button>
    </div>
    <p style="color:var(--muted);font-size:12.5px;margin:10px 4px 0">Seus dados ficam salvos só neste aparelho. Exporte de vez em quando pra não perder nada.</p>
    ${F.danger('Apagar todos os dados', 'reset')}`);
  form().addEventListener('change', e => {
    if (e.target.name === 'theme') { state.settings.theme = e.target.value; save(); render(); }
  });
}
function welcomeSheet() {
  openSheet('', `
    <div class="welcome">
      <div class="logo"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l5-5 4 4 7-8"/><path d="M15 8h5v5"/></svg></div>
      <h2>E aí, ${esc(state.settings.name)} 👋</h2>
      <p>Qual é o seu salário fixo?</p>
    </div>
    ${F.money('value', 0, true)}
    <p style="text-align:center;color:var(--muted);font-size:13px;margin:-6px 0 12px">Já deixei Condomínio, Internet e Parcela do apê em Contas — é só ajustar.</p>
    ${F.btn('Começar', 'onboard')}`);
}

/* ---------- ações ---------- */
const A = {
  'go': el => { if (ui.tab !== el.dataset.tab) { ui.tab = el.dataset.tab; ui.animate = true; render(); } window.scrollTo({ top: 0, behavior: 'smooth' }); },
  'month': el => { ui.month = addM(ui.month, +el.dataset.d); ui.animate = true; render(); $('#month').classList.remove('swap'); void $('#month').offsetWidth; $('#month').classList.add('swap'); },
  'month-today': () => { if (ui.month !== TODAY) { ui.month = TODAY; ui.animate = true; render(); } },
  'seg': el => { if (ui[el.dataset.key] !== el.dataset.val) { ui[el.dataset.key] = el.dataset.val; ui.animate = true; render(); } },
  'toggle-hide': () => { state.settings.hide = !state.settings.hide; commit(); },
  'settings': settingsSheet,
  'close-sheet': closeSheet,
  'all-expenses': allExpensesSheet,

  // contas
  'add-bill': el => billSheet(null, el.dataset.kind),
  'edit-bill': el => billSheet(el.dataset.id),
  'save-bill': saveBill,
  'toggle-bill': el => {
    const b = state.bills.find(x => x.id === el.dataset.id), m = ui.month;
    const rec = b.months[m] || (b.months[m] = {});
    if (b.ask && !rec.paid) return payBillSheet(b.id);
    rec.paid = !rec.paid;
    animateCheck(el, b.id);
  },
  'confirm-pay-bill': () => {
    const b = state.bills.find(x => x.id === sheetCtx.id), m = ui.month;
    const rec = b.months[m] || (b.months[m] = {});
    const value = parseMoney(fv('value').value);
    if (value === histValue(b.hist, m)) delete rec.value; else rec.value = value;
    rec.paid = true;
    ui.pop = b.id;
    closeSheet(); commit(); toast('Pago ✓');
  },
  'remove-bill': () => {
    const b = state.bills.find(x => x.id === sheetCtx.id), m = ui.month;
    if (b.start >= m) state.bills = state.bills.filter(x => x !== b);
    else b.end = m;
    closeSheet(); commit(); toast(b.start >= m ? 'Removido' : `Removido a partir de ${monthName(m).toLowerCase()}`);
  },

  // parcelados
  'add-inst': () => instSheet(),
  'edit-inst': el => instSheet(el.dataset.id),
  'save-inst': saveInst,
  'set-paid': el => {
    const i = state.installments.find(x => x.id === el.dataset.id), n = +el.dataset.n;
    i.paid = i.paid === n ? n - 1 : n;
    save();
    $$(`.dot[data-id="${i.id}"]`).forEach((d, k) => { d.style.setProperty('--d', Math.abs(k - n)); d.classList.toggle('paid', k < i.paid); });
    setTimeout(render, 450);
  },
  'pay-inst': el => {
    const i = state.installments.find(x => x.id === el.dataset.id);
    i.paid = Math.max(i.paid, instParcel(i, ui.month));
    animateCheck(el, i.id);
  },
  'remove-inst': () => { state.installments = state.installments.filter(x => x.id !== sheetCtx.id); closeSheet(); commit(); toast('Removido'); },

  // dívidas
  'add-debt': debtNewSheet,
  'open-debt': el => debtSheet(el.dataset.id),
  'pay-debt': el => debtSheet(el.dataset.id, true),
  'save-debt': () => {
    const total = parseMoney(fv('total').value);
    if (!total) return toast('Coloque o valor total');
    if (sheetCtx.id) {
      const d = state.debts.find(x => x.id === sheetCtx.id);
      Object.assign(d, { total, name: nameVal(d.name), icon: fv('icon').value });
      commit(); debtSheet(d.id); toast('Salvo ✓');
      return;
    }
    const d = { id: uid(), name: nameVal('Dívida'), icon: fv('icon').value, total, payments: [] };
    const already = parseMoney(fv('already').value);
    if (already) d.payments.push({ id: uid(), month: addM(ui.month, -1), value: already, note: 'Pago antes', ts: Date.now() });
    state.debts.push(d);
    closeSheet(); commit(); toast('Dívida adicionada');
  },
  'add-payment': () => {
    const v = parseMoney(fv('pay').value);
    if (!v) return toast('Coloque o valor pago');
    const d = state.debts.find(x => x.id === sheetCtx.id);
    d.payments.push({ id: uid(), month: ui.month, value: v, ts: Date.now() });
    commit();
    if (debtLeft(d) === 0) { closeSheet(); toast('Dívida quitada! 🎉'); }
    else { debtSheet(d.id); toast('Pagamento registrado ✓'); }
  },
  'del-payment': el => {
    const d = state.debts.find(x => x.id === sheetCtx.id);
    d.payments = d.payments.filter(p => p.id !== el.dataset.pid);
    commit(); debtSheet(d.id);
  },
  'remove-debt': () => { state.debts = state.debts.filter(x => x.id !== sheetCtx.id); closeSheet(); commit(); toast('Removida'); },

  // renda
  'edit-salary': salarySheet,
  'save-salary': () => {
    const v = parseMoney(fv('value').value), m = ui.month;
    state.salary.months = state.salary.months || {};
    if (fv('scope').value === 'forward') {
      setHist(state.salary.hist, m, v);
      Object.keys(state.salary.months).forEach(k => { if (k >= m) delete state.salary.months[k]; });
    } else state.salary.months[m] = v;
    closeSheet(); commit(); toast('Salário atualizado ✓');
  },
  'add-extra': () => extraSheet(),
  'edit-extra': el => extraSheet(el.dataset.id),
  'save-extra': () => {
    const v = parseMoney(fv('value').value);
    if (!v) return toast('Coloque o valor');
    const src = fv('src')?.value;
    if (!src) return toast('Escolha uma fonte');
    const note = fv('note').value.trim();
    if (sheetCtx.id) Object.assign(state.extras.find(x => x.id === sheetCtx.id), { value: v, sourceId: src, note });
    else state.extras.push({ id: uid(), value: v, sourceId: src, note, month: ui.month, day: ui.month === TODAY ? new Date().getDate() : null, ts: Date.now() });
    closeSheet(); commit(); toast('Extra lançado 💸');
  },
  'close-month': el => closeMonthSheet(el.dataset.m || ui.month),
  'history': historySheet,
  'save-close': () => {
    const raw = fv('balance').value.trim();
    if (!raw) return toast('Coloque o saldo da conta');
    const balance = parseMoney(raw), m = sheetCtx.m;
    state.closes = state.closes || {};
    state.closes[m] = { balance, start: parseMoney(fv('start').value), ts: Date.now() };
    closeSheet(); commit();
    const c = closeInfo(m);
    toast(c.missing > 0 ? `Mês fechado · ${fmt(c.missing)} sem registro` : 'Mês fechado ✓');
  },
  'reopen-month': () => { delete state.closes[sheetCtx.m]; closeSheet(); commit(); toast('Mês reaberto'); },
  'add-quick': () => quickSheet(),
  'edit-quick': el => quickSheet(el.dataset.id),
  'quick-note': el => { fv('note').value = el.dataset.note; fv('value').focus(); },
  'save-quick': () => {
    const v = parseMoney(fv('value').value);
    if (!v) return toast('Coloque o valor');
    const note = fv('note').value.trim();
    state.quick = state.quick || [];
    if (sheetCtx.id) Object.assign(state.quick.find(x => x.id === sheetCtx.id), { value: v, note });
    else state.quick.push({ id: uid(), value: v, note, month: ui.month, day: ui.month === TODAY ? new Date().getDate() : null, ts: Date.now() });
    closeSheet(); commit(); toast('Gasto lançado ⚡');
  },
  'remove-quick': () => { state.quick = state.quick.filter(x => x.id !== sheetCtx.id); closeSheet(); commit(); toast('Apagado'); },
  'remove-extra': () => { state.extras = state.extras.filter(x => x.id !== sheetCtx.id); closeSheet(); commit(); toast('Apagado'); },
  'new-source': el => {
    if (el.dataset.from === 'extra') ui.draft = { id: sheetCtx.id, value: parseMoney(fv('value').value), note: fv('note').value };
    sourceSheet(null, el.dataset.from);
  },
  'edit-source': el => sourceSheet(el.dataset.id),
  'save-source': () => {
    const data = { name: nameVal('Nova fonte'), icon: fv('icon').value, color: fv('color').value };
    let id = sheetCtx.id;
    if (id) Object.assign(state.sources.find(s => s.id === id), data);
    else { id = uid(); state.sources.push({ id, ...data }); }
    commit();
    if (sheetCtx.from === 'extra' && ui.draft) { const d = ui.draft; ui.draft = null; extraSheet(d.id, { ...d, src: id }); }
    else { closeSheet(); toast('Fonte salva ✓'); }
  },
  'remove-source': () => { state.sources = state.sources.filter(s => s.id !== sheetCtx.id); closeSheet(); commit(); toast('Fonte removida'); },

  // cofre
  'reserve': el => reserveSheet(+el.dataset.dir),
  'reserve-move': () => {
    const v = parseMoney(fv('value').value);
    if (!v) return toast('Coloque um valor');
    state.reserve = round2(Math.max(0, state.reserve + v * sheetCtx.dir));
    closeSheet(); commit(); toast(sheetCtx.dir > 0 ? 'Guardado 🐷' : 'Retirado');
  },
  'add-goal': () => goalNewSheet(),
  'edit-goal': () => goalNewSheet(sheetCtx.id),
  'open-goal': el => goalSheet(el.dataset.id),
  'save-goal': () => {
    const target = parseMoney(fv('target').value);
    if (!target) return toast('Coloque o valor da meta');
    const data = { target, name: nameVal('Meta'), icon: fv('icon').value };
    if (sheetCtx.id) { Object.assign(state.goals.find(g => g.id === sheetCtx.id), data); commit(); goalSheet(sheetCtx.id); }
    else { state.goals.push({ id: uid(), saved: parseMoney(fv('saved').value), ...data }); closeSheet(); commit(); }
    toast('Meta salva ✓');
  },
  'goal-move': el => {
    const v = parseMoney(fv('value').value);
    if (!v) return toast('Coloque um valor');
    const g = state.goals.find(x => x.id === sheetCtx.id);
    const before = g.saved;
    g.saved = round2(Math.max(0, g.saved + v * +el.dataset.dir));
    closeSheet(); commit();
    toast(before < g.target && g.saved >= g.target ? 'Meta batida! 🎉' : +el.dataset.dir > 0 ? 'Guardado 🐷' : 'Retirado');
  },
  'remove-goal': () => {
    const g = state.goals.find(x => x.id === sheetCtx.id);
    state.reserve = round2(state.reserve + g.saved);
    state.goals = state.goals.filter(x => x !== g);
    closeSheet(); commit(); toast(g.saved ? 'Meta removida · valor voltou pra reserva' : 'Meta removida');
  },

  // ajustes
  'save-settings': () => {
    state.settings.name = (fv('name').value || '').trim() || 'Kauã';
    state.settings.theme = fv('theme').value;
    state.settings.hide = fv('hide').checked;
    closeSheet(); commit(); toast('Ajustes salvos ✓');
  },
  'export': () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `financas-kaua-${TODAY}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Backup exportado ✓');
  },
  'import': () => $('#importFile').click(),
  'reset': () => { localStorage.removeItem(STORE_KEY); state = defaultState(); closeSheet(); ui.tab = 'home'; ui.animate = true; commit(); setTimeout(welcomeSheet, 500); },
  'onboard': () => {
    const v = parseMoney(fv('value').value);
    state.salary.hist = [{ from: TODAY, value: v }];
    state.onboarded = true;
    ui.animate = true;
    closeSheet(); commit();
  },
};

function animateCheck(el, id) {
  save();
  const row = el.closest('.row');
  if (el.closest('.pending')) {
    el.classList.add('on', 'pop');
    setTimeout(() => row.classList.add('done'), 220);
    setTimeout(render, 600);
  } else {
    ui.pop = id;
    render();
  }
}

/* ---------- eventos ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const fn = A[el.dataset.action];
  if (!fn) return;
  e.preventDefault();
  e.stopPropagation();
  if (el.hasAttribute('data-confirm') && !el.classList.contains('armed')) {
    const orig = el.innerHTML;
    el.classList.add('armed');
    el.textContent = 'Toque de novo para confirmar';
    setTimeout(() => { if (el.isConnected) { el.classList.remove('armed'); el.innerHTML = orig; } }, 3000);
    return;
  }
  fn(el, e);
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

$('#importFile').addEventListener('change', async e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.bills) || !data.salary) throw new Error('formato');
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    state = load();
    closeSheet(); ui.animate = true; render(); toast('Backup importado ✓');
  } catch (err) { toast('Arquivo inválido'); }
});

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- início ---------- */
render();
if (!state.onboarded) setTimeout(welcomeSheet, 700);
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

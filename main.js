document.documentElement.classList.add('js');
document.getElementById('y').textContent = new Date().getFullYear();

const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold: .12}) : null;
document.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));

function buildMessage() {
  const parts = [];
  document.querySelectorAll('.opts').forEach(g => {
    const v = [...g.querySelectorAll('input:checked')].map(i => i.value);
    if (v.length) parts.push(g.dataset.q + ': ' + v.join(', '));
  });
  return 'Здравствуйте! Пишу с сайта «SMM волна». Хочу бесплатный SMM-разбор страницы.\n' + (parts.length ? parts.join('\n') + '\n' : '') + 'Ссылка на мою страницу: ';
}
const result = document.getElementById('result');
document.querySelectorAll('.opts input').forEach(i => i.addEventListener('change', () => {
  result.textContent = buildMessage();
  result.classList.add('show');
}));

const toast = document.getElementById('toast');
document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', async () => {
  const text = buildMessage();
  try { await navigator.clipboard.writeText(text); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); } catch (e) {}
  window.open(b.dataset.go, '_blank', 'noopener');
}));

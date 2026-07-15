const envelope = document.getElementById('envelope');
const intro = document.querySelector('.intro');
const seal = document.getElementById('seal');
const nav = document.querySelector('.site-nav');
const menu = document.querySelector('.menu-toggle');

let opened = false;
function openInvitation() {
  if (opened) return;
  opened = true;
  envelope.classList.add('open');
  intro.classList.add('opened');
  document.body.classList.add('opened');
  window.setTimeout(() => {
    document.getElementById('transitionSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1500);
}

seal.addEventListener('click', openInvitation);
window.addEventListener('scroll', () => {
  if (!opened && window.scrollY > 80) openInvitation();
  nav.style.boxShadow = window.scrollY > window.innerHeight ? '0 8px 24px rgba(20,25,20,.08)' : 'none';
});

menu.addEventListener('click', () => document.querySelector('.site-nav nav').classList.toggle('active'));
document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.site-nav nav').classList.remove('active')));

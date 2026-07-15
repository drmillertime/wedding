
const hero = document.querySelector('.hero');
const seal = document.getElementById('seal');
const prompt = document.getElementById('openPrompt');
const scene = document.getElementById('scene');

function openEnvelope(){
  hero.classList.add('open');
  sessionStorage.setItem('nz-envelope-opened','yes');
}
seal.addEventListener('click', openEnvelope);
prompt.addEventListener('click', openEnvelope);

window.addEventListener('pointermove', (e) => {
  const x = Math.round((e.clientX / innerWidth) * 100);
  const y = Math.round((e.clientY / innerHeight) * 100);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);

  if (innerWidth > 900) {
    const rx = ((e.clientY / innerHeight) - .5) * -2.5;
    const ry = ((e.clientX / innerWidth) - .5) * 3.5;
    scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
});

window.addEventListener('scroll', () => {
  if (!hero.classList.contains('open') && window.scrollY > 40) openEnvelope();
}, {passive:true});

// Keep the experience fresh on first load, but skip the closed state during same-session revisits.
if (sessionStorage.getItem('nz-envelope-opened') === 'yes') {
  hero.classList.add('open');
}

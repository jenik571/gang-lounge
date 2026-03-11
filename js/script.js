// Gang Lounge v06 – mobilní úpravy + opravené odkazy kalendářů
// Jemný 3D nádech: silnější pohyb dlaždic služeb + lehký pohyb hero boxu
const hero = document.querySelector('.hero-content');
const cards = document.querySelectorAll('.service-card, .team-card, .booking-card, .contact-card');

if (hero) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    hero.style.transform = `translateZ(0) rotateX(${(-y).toFixed(2)}deg) rotateY(${(x).toFixed(2)}deg)`;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    hero.style.transform = 'translateZ(0)';
  });
}

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    card.style.transform = `perspective(900px) rotateY(${px.toFixed(2)}deg) rotateX(${(-py).toFixed(2)}deg) translateY(-10px) scale(1.025)`;
    card.style.boxShadow = '0 30px 75px rgba(17, 12, 7, .18)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// Plynulé scrollování s ohledem na sticky menu
function scrollToId(id){
  const el = document.querySelector(id);
  const header = document.querySelector('.topbar');
  if(!el) return;
  const offset = header ? header.offsetHeight + 10 : 10;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href && href.length > 1){
      e.preventDefault();
      scrollToId(href);
      history.replaceState(null, "", href);
    }
  });
});

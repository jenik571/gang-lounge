// Gang Lounge v07 – 4 rezervační tlačítka podle služby
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


// Gang Lounge v08 – výběr stylistky a služby přes přepínací tlačítka
(function () {
  const selector = document.querySelector('.booking-selector');
  if (!selector) return;

  let currentStylist = 'leni';
  let currentService = 'rasy';

  const mainBtn = document.getElementById('booking-main-btn');
  const buttons = selector.querySelectorAll('.pill-btn');

  function getUrl() {
    if (currentStylist === 'leni' && currentService === 'rasy') return selector.dataset.leniRasy;
    if (currentStylist === 'leni' && currentService === 'oboci') return selector.dataset.leniOboci;
    if (currentStylist === 'gabi' && currentService === 'rasy') return selector.dataset.gabiRasy;
    if (currentStylist === 'gabi' && currentService === 'oboci') return selector.dataset.gabiOboci;
    return selector.dataset.leniRasy;
  }

  function refresh() {
    buttons.forEach(btn => {
      const group = btn.dataset.group;
      const value = btn.dataset.value;
      const isActive = (group === 'stylist' && value === currentStylist) ||
                       (group === 'service' && value === currentService);
      btn.classList.toggle('active', isActive);
    });
    if (mainBtn) mainBtn.href = getUrl();
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const value = btn.dataset.value;
      if (group === 'stylist') currentStylist = value;
      if (group === 'service') currentService = value;
      refresh();
    });
  });

  refresh();
})();


// Gang Lounge v09 – finální vzhled rezervace s podkategoriemi
(function () {
  const selector = document.querySelector('.booking-selector');
  if (!selector) return;

  let currentStylist = 'leni';
  let currentCategory = 'rasy';
  let currentService = 'lash-lifting';

  const mainBtn = document.getElementById('booking-main-btn');
  const pillButtons = selector.querySelectorAll('.pill-btn');
  const serviceButtons = selector.querySelectorAll('.service-btn');
  const subgroups = selector.querySelectorAll('.service-subgroup');

  function getUrl() {
    if (currentStylist === 'leni' && currentCategory === 'rasy') return selector.dataset.leniRasy;
    if (currentStylist === 'leni' && currentCategory === 'oboci') return selector.dataset.leniOboci;
    if (currentStylist === 'gabi' && currentCategory === 'rasy') return selector.dataset.gabiRasy;
    if (currentStylist === 'gabi' && currentCategory === 'oboci') return selector.dataset.gabiOboci;
    return selector.dataset.leniRasy;
  }

  function defaultServiceForCategory(category){
    return category === 'rasy' ? 'lash-lifting' : 'laminace';
  }

  function refreshSubgroups() {
    subgroups.forEach(group => {
      group.classList.toggle('active', group.dataset.subgroup === currentCategory);
    });

    serviceButtons.forEach(btn => {
      const parent = btn.closest('.service-subgroup');
      const visible = parent && parent.dataset.subgroup === currentCategory;
      btn.classList.toggle('active', visible && btn.dataset.service === currentService);
    });
  }

  function refreshPills() {
    pillButtons.forEach(btn => {
      const group = btn.dataset.group;
      const value = btn.dataset.value;
      const isActive = (group === 'stylist' && value === currentStylist) ||
                       (group === 'category' && value === currentCategory);
      btn.classList.toggle('active', isActive);
    });
  }

  function refreshMainButton() {
    if (mainBtn) mainBtn.href = getUrl();
  }

  function refreshAll() {
    refreshPills();
    refreshSubgroups();
    refreshMainButton();
  }

  pillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const value = btn.dataset.value;
      if (group === 'stylist') currentStylist = value;
      if (group === 'category') {
        currentCategory = value;
        currentService = defaultServiceForCategory(value);
      }
      refreshAll();
    });
  });

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.service-subgroup');
      if (!parent || parent.dataset.subgroup !== currentCategory) return;
      currentService = btn.dataset.service;
      refreshSubgroups();
    });
  });

  refreshAll();
})();


(function () {
  const booking = document.querySelector(".booking-box");
  if (!booking) return;

  let stylist = "leni";
  let category = "rasy";
  let service = "lash-lifting";

  const reserveBtn = document.getElementById("reserve-link");
  const stylistButtons = booking.querySelectorAll(".stylist-tile");
  const categoryButtons = booking.querySelectorAll(".pill-button");
  const serviceButtons = booking.querySelectorAll(".service-choice");
  const serviceGroups = booking.querySelectorAll(".service-group");
  const hoverCards = document.querySelectorAll(".service-card");

  function defaultService(nextCategory) {
    return nextCategory === "rasy" ? "lash-lifting" : "laminace";
  }

  function getLink() {
    const map = {
      "leni-lash-lifting": booking.dataset.leniLashLifting,
      "leni-classic": booking.dataset.leniClassic,
      "leni-volume": booking.dataset.leniVolume,
      "leni-mega": booking.dataset.leniMega,
      "leni-laminace": booking.dataset.leniLaminace,
      "leni-uprava": booking.dataset.leniUprava,
      "gabi-lash-lifting": booking.dataset.gabiLashLifting,
      "gabi-classic": booking.dataset.gabiClassic,
      "gabi-volume": booking.dataset.gabiVolume,
      "gabi-mega": booking.dataset.gabiMega,
      "gabi-laminace": booking.dataset.gabiLaminace,
      "gabi-uprava": booking.dataset.gabiUprava
    };
    return map[`${stylist}-${service}`];
  }

  function refreshStylist() {
    stylistButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.stylist === stylist);
    });
  }

  function refreshCategory() {
    categoryButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });
  }

  function refreshServiceGroups() {
    serviceGroups.forEach(group => {
      group.classList.toggle("active", group.dataset.group === category);
    });
  }

  function refreshServices() {
    serviceButtons.forEach(btn => {
      const group = btn.closest(".service-group");
      const visible = group && group.dataset.group === category;
      btn.classList.toggle("active", visible && btn.dataset.service === service);
    });
  }

  function refreshLink() {
    reserveBtn.href = getLink();
  }

  function refreshAll() {
    refreshStylist();
    refreshCategory();
    refreshServiceGroups();
    refreshServices();
    refreshLink();
  }

  stylistButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      stylist = btn.dataset.stylist;
      refreshAll();
    });
  });

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      category = btn.dataset.category;
      service = defaultService(category);
      refreshAll();
    });
  });

  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".service-group");
      if (!group || group.dataset.group !== category) return;
      service = btn.dataset.service;
      refreshServices();
      refreshLink();
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector(".topbar");
      const offset = header ? header.offsetHeight + 10 : 10;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  hoverCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
      card.style.transform = `perspective(900px) rotateY(${px.toFixed(2)}deg) rotateX(${(-py).toFixed(2)}deg) translateY(-10px) scale(1.025)`;
      card.style.boxShadow = "0 30px 75px rgba(17, 12, 7, .18)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });

  refreshAll();
})();

const sections = ['home', 'about_me', 'skills', 'portfolio', 'contact'];
async function loadAllPages() {
  for (const id of sections) {
    const el = document.getElementById(id);
    try {
      const res = await fetch(`/pages/${id}.html`);
      const html = await res.text();
      el.innerHTML = html;
    } catch {
      el.innerHTML = `<h1>${id}</h1><p>Failed to load content.</p>`;
    }
  }
}
window.addEventListener('load', loadAllPages);

function animateOnScroll() {
  const animate = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  animate.forEach(element => observer.observe(element));
  
}

window.addEventListener('load', () => {
  loadAllPages(). then(() => {
    animateOnScroll();
  });
});

function updateHashOnScroll() {
  const sections = document.querySelectorAll('page-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        history.replaceState(null, '', `#${entry.target.id}`);
      }
    });
}, { treshold: 0.1 });
  sections.forEach(section => observer.observe(section));
}

window.addEventListener('load', () => {
  loadAllPages().then(() => {
    animateOnScroll();
    updateHashOnScroll();
    animatePercentageBars();

    const target = window.location.hash;
    if (target) {
      const section = document.querySelector(target);
      if (section) {
        section.scrollIntoView({ behavior: 'instant' });
      }
    }
  });
});

function animatePercentageBars() {
  const percents = document.querySelectorAll('.percentage-bar');

  percents.forEach(percent => {
    let width = 0;
    const target = parseInt(percent.getAttribute('percent'));
    const interval = setInterval(() => {
      if (width >= target) {
        clearInterval(interval);
      } else {
        width++;
        percent.style.width = width + "%";
        percent.textContent = width + "%";
      }
    }, 20);
  });
}

document.addEventListener('click', function(e) {
  if(e.target.classList.contains('open-popup')){
    const title = e.target.getAttribute('data-title');
    const desc = e.target.getAttribute('data-desc');
    const image = e.target.getAttribute('data-image');

    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-description').textContent = desc;
    document.getElementById('myPopup').style.display = 'flex';
    document.getElementById('popup-image').src = image;
  }

  if (e.target.classList.contains('close') || e.target.id === 'myPopup'){
    document.getElementById('myPopup').style.display = 'none';
  }
});
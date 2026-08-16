// --- Sample News Articles (static, always works) ---
const newsGrid = document.getElementById('newsGrid');
const newsLoading = document.getElementById('newsLoading');
const newsError = document.getElementById('newsError');
const topicButtons = document.querySelectorAll('.topic-btn');

const SAMPLE_ARTICLES = {
  technology: [
    {
      title: "AI Tools Are Reshaping How Small Businesses Work",
      source: "DailyPulse Tech",
      date: "Aug 15, 2026",
      desc: "From customer support to content creation, small businesses are increasingly adopting AI tools to save time and cut costs.",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80"
    },
    {
      title: "5G Expansion Reaches Rural India",
      source: "DailyPulse Tech",
      date: "Aug 14, 2026",
      desc: "Telecom operators continue rolling out 5G infrastructure to smaller towns, promising faster connectivity for millions.",
      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80"
    },
    {
      title: "New Smartphone Chips Focus on Battery Efficiency",
      source: "DailyPulse Tech",
      date: "Aug 12, 2026",
      desc: "Manufacturers are prioritizing power efficiency over raw speed in their latest generation of mobile processors.",
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"
    }
  ],
  business: [
    {
      title: "Local Markets See Steady Growth This Quarter",
      source: "DailyPulse Business",
      date: "Aug 15, 2026",
      desc: "Analysts report consistent gains across retail and manufacturing sectors, driven by festive season demand.",
      img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80"
    },
    {
      title: "Startups Attract Fresh Investment Amid Market Optimism",
      source: "DailyPulse Business",
      date: "Aug 13, 2026",
      desc: "Venture funding has picked up pace, with early-stage startups in fintech and logistics leading the way.",
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&q=80"
    },
    {
      title: "Small Traders Adapt to Digital Payment Trends",
      source: "DailyPulse Business",
      date: "Aug 11, 2026",
      desc: "More local shop owners are adopting UPI and digital wallets as customer preference shifts away from cash.",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
    }
  ],
  sports: [
    {
      title: "Local Cricket League Kicks Off This Weekend",
      source: "DailyPulse Sports",
      date: "Aug 16, 2026",
      desc: "Teams from across the district gather for the season opener, with strong turnout expected from fans.",
      img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80"
    },
    {
      title: "Young Athletes Shine at Regional Track Meet",
      source: "DailyPulse Sports",
      date: "Aug 14, 2026",
      desc: "Several new personal records were set as young talent from local schools competed at the regional level.",
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80"
    },
    {
      title: "Football Academy Opens New Training Ground",
      source: "DailyPulse Sports",
      date: "Aug 10, 2026",
      desc: "A newly built training facility aims to nurture young football talent in the region.",
      img: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&q=80"
    }
  ]
};

function renderNews(topic) {
  if (!newsGrid || !newsLoading) return;

  newsLoading.textContent = '';
  newsError.textContent = '';

  const articles = SAMPLE_ARTICLES[topic] || [];

  if (!articles.length) {
    newsGrid.innerHTML = '<p>No news found for this topic right now.</p>';
    return;
  }

  const cardsHtml = articles
    .map((article) => {
      return `
        <article class="card">
          <img src="${article.img}" alt="${article.title}" loading="lazy" />
          <div class="card-body">
            <h3>${article.title}</h3>
            <div class="card-meta">
              <span>${article.source}</span>
              <span>${article.date}</span>
            </div>
            <p>${article.desc}</p>
          </div>
        </article>
      `;
    })
    .join('');

  newsGrid.innerHTML = cardsHtml;
}

if (topicButtons && topicButtons.length) {
  topicButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      topicButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const topic = btn.dataset.topic || 'technology';
      renderNews(topic);
    });
  });
}

if (newsGrid) {
  renderNews('technology');
}

// --- Mobile menu toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// --- Contact form validation ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formSuccess.textContent = '';

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your full name.';
      hasError = true;
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      hasError = true;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      hasError = true;
    }

    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter a message.';
      hasError = true;
    }

    if (!hasError) {
      formSuccess.textContent = 'Thank you! Your message has been sent (demo).';
      contactForm.reset();
    }
  });
}

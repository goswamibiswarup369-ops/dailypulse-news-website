const newsGrid = document.getElementById('newsGrid');
const newsLoading = document.getElementById('newsLoading');
const newsError = document.getElementById('newsError');
const topicButtons = document.querySelectorAll('.topic-btn');

// Cloudflare Worker proxy URL (fetches from NewsAPI on the server side,
// avoiding the browser-blocking restriction NewsAPI enforces on free plans)
const PROXY_URL = 'https://winter-band-941f.goswamibiswarup369.workers.dev';

async function fetchNews(topic = 'technology') {
  if (!newsGrid || !newsLoading) return;

  newsGrid.innerHTML = '';
  newsLoading.textContent = 'Loading latest news...';
  newsError.textContent = '';

  try {
    const url = `${PROXY_URL}/?topic=${encodeURIComponent(topic)}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch news. HTTP ' + res.status);
    }

    const data = await res.json();

    if (data.status !== 'ok') {
      throw new Error((data.code || 'error') + ': ' + (data.message || 'Unknown error'));
    }

    const articles = data.articles || [];
    newsLoading.textContent = '';

    if (!articles.length) {
      newsGrid.innerHTML = '<p>No news found for this topic right now.</p>';
      return;
    }

    const cardsHtml = articles
      .map((article) => {
        const img = article.urlToImage || 'images/article-1.jpg';
        const title = article.title || 'No title';
        const desc = article.description || 'No description available.';
        const source = article.source?.name || 'Unknown';
        const date = article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : '';
        return `
          <article class="card">
            <img src="${img}" alt="${title}" loading="lazy" />
            <div class="card-body">
              <h3>${title}</h3>
              <div class="card-meta">
                <span>${source}</span>
                <span>${date}</span>
              </div>
              <p>${desc}</p>
              <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                Read full story
              </a>
            </div>
          </article>
        `;
      })
      .join('');

    newsGrid.innerHTML = cardsHtml;
  } catch (error) {
    console.error(error);
    newsLoading.textContent = '';
    newsError.textContent = 'Could not load news: ' + error.message;
  }
}

if (topicButtons && topicButtons.length) {
  topicButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      topicButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const topic = btn.dataset.topic || 'technology';
      fetchNews(topic);
    });
  });
}

if (newsGrid) {
  fetchNews('technology');
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


const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {

  revealEls.forEach((el) => el.classList.add('in-view'));
}

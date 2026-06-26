// --- News API integration ---
const newsGrid = document.getElementById('newsGrid');
const newsLoading = document.getElementById('newsLoading');
const newsError = document.getElementById('newsError');
const topicButtons = document.querySelectorAll('.topic-btn');

const NEWS_API_KEY = '73ffa8c2bbfd4ba2b0e31626fc99f134';
const BASE_NEWS_URL = 'https://newsapi.org/v2/everything';

const TOPIC_KEYWORDS = {
  technology: 'technology',
  business: 'business',
  sports: 'sports'
};

async function fetchNews(topic = 'technology') {
  if (!newsGrid || !newsLoading) return;

  newsGrid.innerHTML = '';
  newsLoading.textContent = 'Loading latest news...';
  newsError.textContent = '';

  try {
    const keyword = TOPIC_KEYWORDS[topic] || 'news';

    const url = `${BASE_NEWS_URL}?q=${encodeURIComponent(keyword)}&language=en&pageSize=6&apiKey=${NEWS_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch news. HTTP ' + res.status);
    }

    const data = await res.json();

    if (data.status !== 'ok') {
      throw new Error(data.code + ': ' + data.message);
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

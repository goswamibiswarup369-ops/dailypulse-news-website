# dailypulse-news-website
DailyPulse is a responsive multi-page news and blog website built with HTML, CSS, and JavaScript, featuring live news cards, articles, and a contact form.


# DailyPulse – Responsive News & Blog Website

DailyPulse is a modern multi-page news/blog website with a hero section, static articles, contact form, and a dynamic "Latest News" grid powered by NewsAPI.

## Features

- Home page with hero banner, topic filter buttons, and live news cards.
- Articles page with featured story and multiple editorial articles.
- About page explaining project goals and technologies.
- Contact page with client-side form validation for name, email, and message.
- Responsive layout using CSS grid and media queries.
- Animated gradient background for a modern visual style.
- Sticky header with mobile navigation toggle.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [NewsAPI](https://newsapi.org/) for fetching live articles.[web:63][web:67]

## Project Structure

```text
dailypulse-news-website/
├─ index.html        # Home with hero + Latest News
├─ about.html        # About the project and goals
├─ articles.html     # Editorial articles and categories
├─ contact.html      # Contact form with validation
├─ css/
│  └─ style.css      # Shared styles and responsive layout
├─ js/
│  └─ main.js        # NewsAPI integration, menu toggle, form validation
├─ LICENSE
└─ README.md
```

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dailypulse-news-website.git
   cd dailypulse-news-website
   ```
2. Open `index.html` in your browser.

3. Replace `NEWS_API_KEY` in `js/main.js` with your own key from NewsAPI.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set Source to `main` branch and `/ (root)` folder.[web:65][web:71]
4. Your site will be available at:
   `https://YOUR_USERNAME.github.io/dailypulse-news-website/`.

## Author

Created by **Biswarup Goswami** as a portfolio-ready frontend project.

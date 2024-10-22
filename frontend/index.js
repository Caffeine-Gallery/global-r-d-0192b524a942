import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  feather.replace();
  await loadNews();
});

async function loadNews() {
  showLoadingSpinner();
  try {
    const articles = await backend.listArticles();
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
      const articleElement = createArticleElement(article);
      newsContainer.appendChild(articleElement);
    });
  } catch (error) {
    console.error('Error loading news:', error);
  } finally {
    hideLoadingSpinner();
  }
}

function createArticleElement(article) {
  const articleElement = document.createElement('article');
  articleElement.className = 'news-article';

  const title = document.createElement('h2');
  title.textContent = article.title;

  const author = document.createElement('p');
  author.className = 'author';
  author.textContent = `By ${article.author}`;

  const date = document.createElement('p');
  date.className = 'date';
  date.textContent = new Date(Number(article.timestamp) / 1000000).toLocaleString();

  const content = document.createElement('p');
  content.className = 'content';
  content.textContent = article.content;

  articleElement.appendChild(title);
  articleElement.appendChild(author);
  articleElement.appendChild(date);
  articleElement.appendChild(content);

  return articleElement;
}

function showLoadingSpinner() {
  document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoadingSpinner() {
  document.getElementById('loading-spinner').classList.add('hidden');
}

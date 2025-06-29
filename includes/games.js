
// Game data array
const games = [
  {
    id: 1,
    icon: 'https://abchub-play.github.io/icons/game1.png',
    alt: 'ABC Adventure',
    badge: 'NEW',
    title: 'ABC Adventure',
    subtitle: 'Learn letters through exciting quests',
    rating: 4.2,
    appStoreUrl: 'https://apps.apple.com',
    playStoreUrl: 'https://play.google.com'
  },
  {
    id: 2,
    icon: 'https://abchub-play.github.io/icons/game2.png',
    alt: 'Math Maze',
    title: 'Math Maze',
    subtitle: 'Solve puzzles to escape the number labyrinth',
    rating: 4.5,
    appStoreUrl: 'https://apps.apple.com',
    playStoreUrl: 'https://play.google.com'
  },
  {
    id: 3,
    icon: 'https://abchub-play.github.io/icons/game3.png',
    alt: 'Word World',
    badge: 'HOT',
    title: 'Word World',
    subtitle: 'Build vocabulary with interactive challenges',
    rating: 4.8,
    appStoreUrl: 'https://apps.apple.com',
    playStoreUrl: 'https://play.google.com'
  },
  {
    id: 4,
    icon: 'https://abchub-play.github.io/icons/game3.png',
    alt: 'Word World',
    badge: 'HOT',
    title: 'Word World',
    subtitle: 'Build vocabulary with interactive challenges',
    rating: 4.8,
    appStoreUrl: 'https://apps.apple.com',
    playStoreUrl: 'https://play.google.com'
  },
  {
    id: 5,
    icon: 'https://abchub-play.github.io/icons/game3.png',
    alt: 'Word World',
    badge: 'HOT',
    title: 'Word World',
    subtitle: 'Build vocabulary with interactive challenges',
    rating: 4.8,
    appStoreUrl: 'https://apps.apple.com',
    playStoreUrl: 'https://play.google.com'
  }
];

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars += '★';
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars += '½';
    } else {
      stars += '☆';
    }
  }
  
  return stars;
}

// Generate HTML for a single game card
function generateGameCard(game) {
  return `
    <div class="game-card" data-id="${game.id}">
      <div class="game-content-wrapper">
        <div class="game-icon-container">
          <img src="${game.icon}" alt="${game.alt}" class="game-icon" loading="lazy">
          ${game.badge ? <span class="game-badge">${game.badge}</span> : ''}
        </div>
        <div class="game-info">
          <h2 class="game-title">${game.title}</h2>
          <p class="game-subtitle">${game.subtitle}</p>
          <div class="game-rating">
            ${generateStars(game.rating)}
            <span class="rating-text">${game.rating}/5</span>
          </div>
        </div>
      </div>
      <div class="store-buttons">
        <a href="${game.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-btn app-store-btn">
          <img src="https://abchub-play.github.io/icons/app-store.png" alt="App Store" class="store-icon">
          <span>App Store</span>
        </a>
        <a href="${game.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-btn play-store-btn">
          <img src="https://abchub-play.github.io/icons/google-play.png" alt="Google Play" class="store-icon">
          <span>Google Play</span>
        </a>
      </div>
    </div>
  `;
}

// Render all game cards
function renderGameCards() {
  const gamesGrid = document.querySelector('.games-grid');
  if (gamesGrid) {
    gamesGrid.innerHTML = games.map(game => generateGameCard(game)).join('');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderGameCards();
});

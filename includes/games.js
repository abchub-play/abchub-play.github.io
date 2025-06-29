// Game data - this can be moved to a separate JSON file later if needed
const gamesData = [
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
  }
];

// Helper function to generate star rating display
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
}

// Generates HTML for store buttons
function getStoreButtons(appStoreUrl, playStoreUrl) {
  return `
    <a href="${appStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-btn app-store-btn">
      <img src="https://abchub-play.github.io/icons/app-store.png" alt="App Store" class="store-icon">
      <span>App Store</span>
    </a>
    <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-btn play-store-btn">
      <img src="https://abchub-play.github.io/icons/google-play.png" alt="Google Play" class="store-icon">
      <span>Google Play</span>
    </a>
  `;
}

// Generates HTML for a single game card
function createGameCard(game) {
  return `
    <div class="game-card" data-game-id="${game.id}">
      <div class="game-content-wrapper">
        <div class="game-icon-container">
          <img src="${game.icon}" alt="${game.alt}" class="game-icon" loading="lazy">
          ${game.badge ? <span class="game-badge">${game.badge}</span> : ''}
        </div>
        <div class="game-info">
          <h2 class="game-title">${game.title}</h2>
          <p class="game-subtitle">${game.subtitle}</p>
          <div class="game-rating">
            ${getStarRating(game.rating)}
            <span class="rating-text">${game.rating}/5</span>
          </div>
        </div>
      </div>
      <div class="store-buttons">
        ${getStoreButtons(game.appStoreUrl, game.playStoreUrl)}
      </div>
    </div>
  `;
}

// Renders all game cards to the page
function renderGames() {
  const gamesContainer = document.querySelector('.games-grid');
  if (gamesContainer) {
    gamesContainer.innerHTML = gamesData.map(game => createGameCard(game)).join('');
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', renderGames);

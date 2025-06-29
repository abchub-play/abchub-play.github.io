// Game data
const games = [
    {
      title: "HELLO GOVERNOR!",
      subtitle: "Arcade Idle",
      icon: "https://abchub-play.github.io/icons/games/hello-governor-icon.png",
      alt: "Hello Governor!",
      appStoreUrl: "https://apps.apple.com/app/id6504637193",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.hello.governor"
    },
    {
      title: "Pocket Clash",
      subtitle: "Real Time Strategy",
      icon: "https://abchub-play.github.io/icons/games/pocket-clash-icon.png",
      alt: "Pocket clash",
      appStoreUrl: "https://apps.apple.com/app/id6478879887",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.clash.pocket3d"
    },
    {
      title: "Alien Grounds",
      subtitle: "Action Puzzle",
      icon: "https://abchub-play.github.io/icons/games/alien-grounds-icon.png",
      alt: "Alien Grounds",
      appStoreUrl: "https://apps.apple.com/app/id6741333498",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.grounds.alien"
    },
    {
      title: "2D Brawl",
      subtitle: "Fighting, Multiplayer",
      icon: "https://abchub-play.github.io/icons/games/2d-brawl-icon.png",
      alt: "2D Brawl",
      appStoreUrl: "https://apps.apple.com/app/id6517361887",
      playStoreUrl: "https://apps.apple.com/app/id6517361887" // Note: This appears to be the same as App Store URL
    },
    {
      title: "Daily Quest",
      subtitle: "Learning",
      icon: "https://abchub-play.github.io/icons/games/daily-quest-icon.png",
      alt: "2D Brawl",
      appStoreUrl: "https://apps.apple.com/app/id6738058668",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.daily.quest" // Note: This appears to be the same as App Store URL
    }
    // Add more games here as needed
  ];

// Modern Game Card Component with enhanced features
class GameCard {
  constructor(game) {
    this.game = game;
    this.card = document.createElement('div');
    this.card.className = 'game-card';
    this.card.innerHTML = this.#template();
    this.#addEventListeners();
  }

  #template() {
    return `
      <div class="game-content-wrapper">
        <div class="game-icon-container">
          <img src="${this.game.icon}" alt="${this.game.alt}" class="game-icon" loading="lazy">
          ${this.game.badge ? <span class="game-badge">${this.game.badge}</span> : ''}
        </div>
        <div class="game-info">
          <h2 class="game-title">${this.game.title}</h2>
          <p class="game-subtitle">${this.game.subtitle}</p>
          <div class="game-rating">
            ${this.#generateStars(this.game.rating)}
            <span class="rating-text">${this.game.rating}/5</span>
          </div>
        </div>
      </div>
      <div class="store-buttons">
        <a href="${this.game.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-btn app-store-btn">
          <img src="https://abchub-play.github.io/icons/app-store.png" alt="App Store" class="store-icon">
          <span>App Store</span>
        </a>
        <a href="${this.game.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="store-btn play-store-btn">
          <img src="https://abchub-play.github.io/icons/google-play.png" alt="Google Play" class="store-icon">
          <span>Google Play</span>
        </a>
      </div>
    `;
  }

  #generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += '<span class="star full">★</span>';
      } else if (i === fullStars && hasHalfStar) {
        stars += '<span class="star half">★</span>';
      } else {
        stars += '<span class="star empty">★</span>';
      }
    }
    
    return stars;
  }

  #addEventListeners() {
    this.card.addEventListener('click', (e) => {
      if (!e.target.closest('.store-btn')) {
        // Handle card click (could expand for more details)
        console.log(`Selected game: ${this.game.title}`);
      }
    });
  }

  render() {
    return this.card;
  }
}

// Modern Games Grid Initialization
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('games-container');
  if (!container) return;

  // Create IntersectionObserver for lazy loading
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Render each game with animation delay
  games.forEach((game, index) => {
    const card = new GameCard(game).render();
    card.style.setProperty('--delay', `${index * 0.05}s`);
    container.appendChild(card);
    observer.observe(card);
  });

  // Add analytics tracking for store buttons
  container.addEventListener('click', (e) => {
    const storeBtn = e.target.closest('.store-btn');
    if (storeBtn) {
      const storeType = storeBtn.classList.contains('app-store-btn') ? 'App Store' : 'Google Play';
      const gameTitle = storeBtn.closest('.game-card').querySelector('.game-title').textContent;
      console.log(`Track: ${gameTitle} - ${storeType} click`);
      // Replace with actual analytics tracking
    }
  });
});

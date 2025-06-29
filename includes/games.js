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
    }
    // Add more games here as needed
  ];

// Template for game card
function createGameCard(game) {
  return `
    <div class="game-card">
      <div class="game-content-wrapper">
        <div class="game-icon-container">
          <img src="${game.icon}" alt="${game.alt}" class="game-icon">
        </div>
        <div class="game-info">
          <h2 class="game-title">${game.title}</h2>
          <p class="game-subtitle">${game.subtitle}</p>
        </div>
      </div>
      <div class="store-buttons">
        <a href="${game.appStoreUrl}" target="_blank" class="store-btn app-store-btn">
          <img src="https://abchub-play.github.io/icons/app-store.png" alt="App Store" class="store-icon">
          App Store
        </a>
        <a href="${game.playStoreUrl}" target="_blank" class="store-btn play-store-btn">
          <img src="https://abchub-play.github.io/icons/google-play.png" alt="Google Play" class="store-icon">
          Google Play
        </a>
      </div>
    </div>
  `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('games-container');
  if (container) {
    games.forEach(game => {
      container.insertAdjacentHTML('beforeend', createGameCard(game));
    });
  }
});

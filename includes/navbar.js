function loadNavbar() {
  fetch('includes/navbar.html')
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById('navbar-container');
      if (container) {
        container.innerHTML = data;
        
        // Process links
        document.querySelectorAll('#navbar-container .nav-link').forEach(link => {
          link.target = '_top';
          
          // Highlight current page
          const currentPath = window.location.pathname.split('/').pop() || 'index.html';
          if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    })
    .catch(error => console.error('Error loading navbar:', error));
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar);

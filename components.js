// Jetseen — Shared navbar and footer components
const components = {
  currentPage: window.location.pathname.split('/').pop() || 'index.html',

  navLink(href, label) {
    const isActive = this.currentPage === href;
    const activeClass = isActive ? 'text-white' : 'text-slate-400 hover:text-white';
    return `<a href="${href}" class="${activeClass} transition-colors duration-200 text-sm font-medium">${label}</a>`;
  },

  renderNavbar() {
    const el = document.getElementById('navbar');
    if (!el) return;

    el.innerHTML = `
    <nav class="bg-slate-900 sticky top-0 z-50 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a href="index.html" class="flex items-center gap-2">
            <svg class="w-8 h-8 text-blue-500" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/>
              <path d="M8 16c0-4.4 3.6-8 8-8M16 24c4.4 0 8-3.6 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M10 12l6 4-6 4V12z" fill="currentColor"/>
            </svg>
            <span class="text-white text-xl font-bold tracking-tight">Jetseen</span>
          </a>

          <!-- Desktop Nav Links -->
          <div class="hidden md:flex items-center gap-8">
            ${this.navLink('index.html', 'Home')}
            ${this.navLink('about.html', 'About')}
          </div>

          <!-- Desktop Auth Buttons -->
          <div class="hidden md:flex items-center gap-4">
            <a href="login.html" class="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200">Log In</a>
            <a href="signup.html" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200">Get Started</a>
          </div>

          <!-- Mobile Hamburger -->
          <button id="mobile-menu-btn" class="md:hidden text-slate-300 hover:text-white" onclick="components.toggleMobileMenu()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path id="hamburger-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden pb-4">
          <div class="flex flex-col gap-3 pt-2 border-t border-slate-800">
            <a href="index.html" class="text-slate-300 hover:text-white text-sm font-medium py-2 transition-colors">Home</a>
            <a href="about.html" class="text-slate-300 hover:text-white text-sm font-medium py-2 transition-colors">About</a>
            <div class="flex flex-col gap-2 pt-3 border-t border-slate-800">
              <a href="login.html" class="text-slate-300 hover:text-white text-sm font-medium py-2 transition-colors">Log In</a>
              <a href="signup.html" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg text-center transition-colors">Get Started</a>
            </div>
          </div>
        </div>
      </div>
    </nav>`;
  },

  toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
  },

  renderFooter() {
    const el = document.getElementById('footer');
    if (!el) return;

    el.innerHTML = `
    <footer class="bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-7 h-7 text-blue-500" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/>
                <path d="M8 16c0-4.4 3.6-8 8-8M16 24c4.4 0 8-3.6 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M10 12l6 4-6 4V12z" fill="currentColor"/>
              </svg>
              <span class="text-lg font-bold">Jetseen</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">Travel smart. Stay compliant.<br>Built for digital nomads.</p>
          </div>

          <!-- Product -->
          <div>
            <h4 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Product</h4>
            <ul class="space-y-3">
              <li><a href="index.html#features" class="text-slate-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="index.html" class="text-slate-400 hover:text-white text-sm transition-colors">Pricing</a></li>
              <li><a href="index.html" class="text-slate-400 hover:text-white text-sm transition-colors">Changelog</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h4 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Company</h4>
            <ul class="space-y-3">
              <li><a href="about.html" class="text-slate-400 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="about.html" class="text-slate-400 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-slate-800 mt-12 pt-8 text-center">
          <p class="text-slate-500 text-sm">&copy; ${new Date().getFullYear()} Jetseen. All rights reserved.</p>
        </div>
      </div>
    </footer>`;
  },

  init() {
    this.renderNavbar();
    this.renderFooter();
  }
};

document.addEventListener('DOMContentLoaded', () => components.init());

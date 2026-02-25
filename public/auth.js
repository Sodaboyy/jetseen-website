// Jetseen Auth — localStorage-based authentication gating
const auth = {
  STORAGE_KEY: 'jetseen_auth',
  USERS_KEY: 'jetseen_users',

  isAuthenticated() {
    const session = localStorage.getItem(this.STORAGE_KEY);
    if (!session) return false;
    try {
      const data = JSON.parse(session);
      return data.loggedIn === true;
    } catch {
      return false;
    }
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    } catch {
      return null;
    }
  },

  login(email, password) {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password' };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      loggedIn: true,
      email: user.email,
      name: user.name,
      loginAt: new Date().toISOString()
    }));
    return { success: true };
  },

  signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }
    users.push({ name, email, password, createdAt: new Date().toISOString() });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return this.login(email, password);
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = '/login.html';
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  }
};

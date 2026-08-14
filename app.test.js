const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Mock IntersectionObserver
class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }], this);
  }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserver;

describe('app.js coverage', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    localStorage.clear();
    jest.resetModules();
  });

  it('loads and runs without errors', () => {
    require('./app.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });
});

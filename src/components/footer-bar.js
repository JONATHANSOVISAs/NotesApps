class FooterBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer class="notes-footer">
                <div class="notes-container">
                    <div class="notes-main-footer">Aplikasi Catatan &copy; 2025</div>
                </div>
            </footer>
        `;
  }
}

// Daftarkan custom element
customElements.define('footer-bar', FooterBar);
console.log('✅ FooterBar component registered!');

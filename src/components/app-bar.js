class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <header class="notes-app-bar">
                <h1>NOTES APPLICATION</h1>
            </header>
        `;
  }
}

customElements.define('app-bar', AppBar);

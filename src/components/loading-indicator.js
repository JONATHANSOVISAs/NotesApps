class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <style>
          .spinner-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
  
          .spinner {
            width: 50px;
            height: 50px;
            border: 6px solid #ccc;
            border-top-color: #007BFF;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
  
        <div class="spinner-overlay">
          <div class="spinner"></div>
        </div>
      `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);

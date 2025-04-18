class NoteItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const body = this.getAttribute('body') || '';
    this.innerHTML = `
         
                <h3>${title}</h3>
                <p>${body}</p>
            
        `;
  }
}
customElements.define('note-item', NoteItem);

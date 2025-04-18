class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="noteFormContainer" class="hidden">
        <div class="form-wrapper">
          <h2 class="form-title">📝 Catatan Baru</h2>
          <form id="noteForm" class="note-form">
            <div class="input-group">
              <label for="noteTitle">Judul</label>
              <input type="text" id="noteTitle" name="title" placeholder="Contoh: Belajar JavaScript" required>
            </div>

            <div class="input-group">
              <label for="noteBody">Isi Catatan</label>
              <textarea id="noteBody" name="body" placeholder="Tuliskan catatanmu di sini..." required></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" id="saveNoteButton">Save</button>
              <button type="button" id="updateNoteButton" class="hidden">Update</button>
            </div>
          </form>
        </div>
      </section>
    `;
  }
}
customElements.define('note-form', NoteForm);

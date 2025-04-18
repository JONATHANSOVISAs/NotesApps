import Swal from 'sweetalert2';
import gsap from 'gsap';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const Notes = {
  async getAll() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      console.error('Gagal ambil data notes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal memuat catatan!',
        text: 'Terjadi masalah saat memuat data catatan. Coba lagi nanti.',
      });
      return [];
    }
  },

  async add(title, body) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal menambahkan catatan');
      }

      Swal.fire({
        icon: 'success',
        title: 'Catatan berhasil ditambahkan!',
        showConfirmButton: false,
        timer: 1500,
      });

      return responseJson.data;
    } catch (error) {
      console.error('Gagal tambah catatan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal menambahkan catatan',
        text: 'Terjadi masalah saat menambahkan catatan. Coba lagi nanti.',
      });
      throw error;
    }
  },

  async delete(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
      });

      const responseJson = await response.json();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal menghapus catatan');
      }

      Swal.fire({
        icon: 'success',
        title: 'Catatan berhasil dihapus!',
        showConfirmButton: false,
        timer: 1500,
      });

      return responseJson.message;
    } catch (error) {
      console.error('Gagal hapus catatan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal menghapus catatan',
        text: 'Terjadi masalah saat menghapus catatan. Coba lagi nanti.',
      });
      throw error;
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#noteForm');
  const inputTitle = document.querySelector('#noteTitle');
  const inputBody = document.querySelector('#noteBody');
  const notesDataContainer = document.querySelector('#notesDataContainer');
  const loadingIndicator = notesDataContainer.querySelector('loading-indicator');

  const showLoading = () => {
    loadingIndicator.style.display = 'flex';
  };

  const hideLoading = () => {
    loadingIndicator.style.display = 'none';
  };

  const loadNotes = async () => {
    try {
      showLoading(); 

      const notes = await Notes.getAll();

      hideLoading(); 

      notesDataContainer.innerHTML = '<loading-indicator style="display: none;"></loading-indicator>'; // reset ulang + simpan loading indicator
      const loadingElem = notesDataContainer.querySelector('loading-indicator');

      notes.forEach((note) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-item');
        noteElement.innerHTML = `
          <div class="note-card">
            <h5>${note.title}</h5>
            <p>${note.body}</p>
            <button class="delete-btn" data-id="${note.id}">Hapus</button>
          </div>
        `;
        notesDataContainer.appendChild(noteElement);

        gsap.fromTo(
          noteElement,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      });

      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', async (e) => {
          const noteId = e.target.dataset.id;

          gsap.to(e.target, {
            scale: 0.8,
            duration: 0.2,
            onComplete: async () => {
              try {
                showLoading(); 

                await Notes.delete(noteId);
                await loadNotes();
              } catch (error) {
                console.error(error);
              }
            },
          });
        });
      });
    } catch (error) {
      hideLoading(); 
      console.error('Gagal memuat catatan:', error);
    }
  };

  if (form && inputTitle && inputBody) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = inputTitle.value.trim();
      const body = inputBody.value.trim();

      if (!title || !body) {
        alert('Judul dan isi catatan tidak boleh kosong!');
        return;
      }

      try {
        showLoading(); 
        await Notes.add(title, body);
        form.reset();
        await loadNotes();
      } catch (error) {
        console.error(error);
        hideLoading();
      }
    });
  }

  loadNotes();
});

export default Notes;
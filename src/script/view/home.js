import Utils from '../utils.js';
import Notes from '../data/local/notes-api.js';

const home = () => {
  const notesDataContainerElement = document.querySelector(
    '#notesDataContainer'
  );
  const notesDataLoadingElement = document.querySelector('loading-indicator'); // Menyesuaikan selector loading-indicator
  const notesDataListElement = document.querySelector('#notesDataList'); // Pastikan ini adalah ID atau class yang benar
  const listElement = notesDataListElement.querySelector('.list'); // Pastikan juga ini sesuai dengan elemen yang ada

  const showNotesApps = async () => {
    showLoading(); // Tampilkan loading indicator saat data sedang dimuat

    try {
      const result = await Notes.getAll();
      displayResult(result);
    } catch (err) {
      listElement.innerHTML = `<p style="color:red;">Gagal memuat data catatan.</p>`;
    }

    showNotesList(); // Setelah data selesai dimuat, tampilkan daftar catatan
  };

  const displayResult = (notesData) => {
    const noteItems = notesData.map((note) => {
      return `
        <div class="note-card">
          <h2>${note.title}</h2>
          <p>${note.body}</p>
          <small>${new Date(note.createdAt).toLocaleString()}</small>
        </div>
      `;
    });

    listElement.innerHTML = noteItems.join('');
  };

  // Fungsi untuk menampilkan indikator loading
  const showLoading = () => {
    Array.from(notesDataContainerElement.children).forEach((element) => {
      Utils.hideElement(element); // Sembunyikan elemen selain loading-indicator
    });
    Utils.showElement(notesDataLoadingElement); // Tampilkan loading-indicator
  };

  // Fungsi untuk menampilkan daftar catatan setelah data dimuat
  const showNotesList = () => {
    // Sembunyikan hanya elemen loading, bukan semua anak
    const loadingIndicator = notesDataContainerElement.querySelector('loading-indicator');
    if (loadingIndicator) {
      Utils.hideElement(loadingIndicator);
    }
  
    // Tampilkan daftar catatan
    Utils.showElement(notesDataListElement);
  };
  

  // Memulai untuk memuat dan menampilkan catatan
  showNotesApps();
};

export default home;

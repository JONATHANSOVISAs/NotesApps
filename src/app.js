import home from './script/view/home.js';
import './components/index.js';
import './styles/style.css';

document.addEventListener('DOMContentLoaded', () => {
  home();
  document.addEventListener('add-note', (event) => {
    console.log('Catatan baru:', event.detail);
    addNoteToList(event.detail);
  });
});

function addNoteToList(note) {
  const noteList = document.querySelector('note-list');
  if (noteList) {
    noteList.addNote(note);
  }
}

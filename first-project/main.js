const MOCK_NOTES = [
    {
    id: 1,
    title: 'Работа с формами',
    content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
    color: 'green',
    isFavorite: false,
  },
  // ...
]

const model = {
  notes: [],
  addNote(title, content, color) {
      const note = {
        id: Math.random(),
        title,
        content,
        color,
        isFavorite: false,
      };
      this.notes.unshift(note);
      view.renderNotes(this.notes);
  },
  deleteNote(noteId) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
      view.renderNotes(this.notes);
  },
  toggleNote(noteId) {
      this.notes = this.notes.map((note) => {
          if (note.id === noteId) {
              note.isFavorite = !note.isFavorite;
          }
          return note;
      });
      view.renderNotes(this.notes);
  },
  toggleIsOnlyFavorite(isFavoriteChecked) {
      const filteredNotes = isFavoriteChecked
          ? this.notes.filter((note) => note.isFavorite)
          : this.notes;

      view.renderNotes(filteredNotes);
  }
};

const view = {
  init() {
      this.renderNotes(model.notes);
      const form = document.querySelector('.note-form');
      const input_1 = document.querySelector('.input-1-placeholder');
      const input_2 = document.querySelector('.input-2-placeholder');
      const list = document.querySelector('.notes-list');
      const chekFavor = document.querySelector('.checkbox');
      const displayMessage = document.querySelector('.messages-box')

      form.addEventListener('submit', function (event) {
          event.preventDefault();
          const isFavoriteChecked = document.querySelector('.checkbox').checked;
          if (isFavoriteChecked) {
              return; 
          }
          const title = input_1.value;
          const content = input_2.value;
          const color = document.querySelector('input[name=color]:checked').value;
          if (input_1.value.length > 50) {
            let addMessageHTMLWarning = "";
            addMessageHTMLWarning += `<div class="messages-box-warning">
                      <div class="add-message-warning">
                          <div>
                              <img src="images/warning.png">
                          </div>
                          <span>Максимальная длина заголовка - 50 символов</span>
                      </div>
              </div>`;
            displayMessage.innerHTML = addMessageHTMLWarning;
            setTimeout(() => {
              let addMessageHTMLWarning = ''
              displayMessage.innerHTML = addMessageHTMLWarning;
            }, 3000);
            input_1.value = '';
            input_2.value = ''; 
          } else if (input_1.value.length > 0 && input_1.value.length < 50 && input_2.value.length > 0 && input_2.value.length) {
            let addMessageHTMLDone = "";
            addMessageHTMLDone += `<div class="messages-box-done">
                      <div class="add-message-done">
                          <div>
                              <img src="images/done.png">
                          </div>
                          <span>Заметка добавлена!</span>
                      </div>
              </div>`;
            displayMessage.innerHTML = addMessageHTMLDone;
            setTimeout(() => {
              let addMessageHTMLDone = ''
              displayMessage.innerHTML = addMessageHTMLDone;
            }, 3000);
            input_1.value = '';
            input_2.value = ''; 

            controller.addNote(title, content, color)
          } else {
            return
          }
      });

      list.addEventListener('click', function (event) {
          if (event.target.classList.contains('delete')) {
              const noteId = +event.target.parentElement.id;
              controller.deleteNote(noteId);
          }
          if (event.target.classList.contains('izbr')) {
              const noteId = +event.target.parentElement.id;
              controller.toggleNote(noteId);
          }
      });

      chekFavor.addEventListener('change', function () {
          const isFavoriteChecked = this.checked;
          controller.toggleIsOnlyFavorite(isFavoriteChecked);
      });
  },
  renderNotes(notes) {
          const p_text = document.querySelector('.see-text');
      if (notes.length === 0) {
          p_text.textContent = 'У вас нет еще ни одной заметки.'
          p_text.innerHTML += '<br>Заполните поля выше и создайте свою первую заметку!';
          p_text.style.padding = '138px'; 
      } else {
          p_text.textContent = '';
          p_text.style.padding = '0px'; 
      }
      const counter = document.querySelector('.span');
      const list = document.querySelector('.notes-list');
      const colors = {
        red: '#F37D7D',
        green: '#C2F37D',
        blue: '#7DE1F3',
        yellow: '#F3DB7D',
        purple: '#E77DF3',
      };
      let notesHTML = '';
      notes.forEach(note => {
          const far = note.isFavorite ? './images/heart-active.png' : './images/heart-inactive.png';
          const noteColor = colors[note.color]
          notesHTML += `<li class="added-note">
              <div>
                  <div class="note-title" style="background-color: ${noteColor};">
                      <span>${note.title}</span>
                      <div id="${note.id}">
                          <img class="izbr" src="${far}">
                          <img class="delete" src="images/trash.png">
                      </div>
                  </div>
                  <div class="added-content">${note.content}</div>
              </div>
          </li>`;
      });
      list.innerHTML = notesHTML;
      counter.textContent = `Всего заметок: ${notes.length}`;
  }
};

const controller = {
  addNote(title, content, color) {
      if (title.trim() !== '' && content.trim() !== '') {
          model.addNote(title, content, color);
      }
  },
  deleteNote(noteId) {
      model.deleteNote(noteId);
  },
  toggleNote(noteId) {
      model.toggleNote(noteId);
  },
  toggleIsOnlyFavorite(isFavoriteChecked) {
      model.toggleIsOnlyFavorite(isFavoriteChecked);
  }
};

function init() {
  view.init();
}
init();
// Mini gestionnaire de tâches — sert de projet d'essai pour tester Git.
const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const count = document.getElementById('count');
const clear = document.getElementById('clear');

let tasks = [];

function render() {
  list.innerHTML = '';
  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Aucune tâche pour le moment.';
    list.append(empty);
  }
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const label = document.createElement('span');
    label.textContent = task.title;
    label.addEventListener('click', () => toggle(index));

    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.type = 'button';
    remove.textContent = '✕';
    remove.addEventListener('click', () => removeTask(index));

    li.append(label, remove);
    list.append(li);
  });
  count.textContent = tasks.length + (tasks.length > 1 ? ' tâches' : ' tâche');
}

function add(title) {
  const clean = title.trim();
  if (!clean) return;
  tasks.push({ title: clean, done: false });
  render();
}

function toggle(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function removeTask(index) {
  tasks.splice(index, 1);
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  add(input.value);
  input.value = '';
  input.focus();
});

clear.addEventListener('click', () => {
  tasks = [];
  render();
});

render();

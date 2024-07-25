const templatesList = document.getElementById('templates-list');
const addTemplateBtn = document.getElementById('add-template-btn');
const templateSelect = document.getElementById('template');
const itemsList = document.getElementById('items');
const checklistForm = document.getElementById('checklist-form');

// Добавление шаблона
addTemplateBtn.addEventListener('click', () => {
  const newTemplate = document.createElement('li');
  newTemplate.innerHTML = `
    <input type="text" placeholder="Название шаблона">
    <button type="button" class="delete-template-btn">Удалить</button>
  `;

  templatesList.appendChild(newTemplate);
});

// Удаление шаблона
templatesList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-template-btn')) {
    e.target.parentNode.remove();
  }
});

// Загрузка шаблона
templateSelect.addEventListener('change', () => {
  // Очистка текущих пунктов
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }

  // Загрузка пунктов из выбранного шаблона
  const selectedTemplate = templateSelect.value;
  const templateData = JSON.parse(localStorage.getItem(selectedTemplate));
  templateData.items.forEach((item) => {
    const newItem = document.createElement('li');
    newItem.innerHTML = `
      <input type="text" placeholder="${item.text}" value="${item.text}">
      <input type="file" accept="image/*">
    `;

    itemsList.appendChild(newItem);
  });
});

// Отправка формы
checklistForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Извлечение данных из формы
  const template = templateSelect.value;
  const items = [];
  for (let i = 0; i < itemsList.children.length; i++) {
    const item = itemsList.children[i];
    items.push({
      text: item.querySelector('input[type="text"]').value,
      photos: item.querySelector('input[type="file"]').files,
    });
  }

  // Создание объекта чек-листа
  const checklist = {
    template,
    items,
  };

  // Отправка запроса на сервер
  const response = await fetch('/create-checklist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checklist),
  });

  // Обработка ответа сервера
  const data = await response.json();
  if (data.success) {
    alert('Чек-лист успешно создан');
  } else {
    alert('Не удалось создать чек-лист');
  }
});

// Загрузка шаблонов при загрузке страницы
window.addEventListener('load', () => {
  // Получение шаблонов из localStorage
  const templates = JSON.parse(localStorage.getItem('templates')) || ;

  // Отображение шаблонов в списке
  templates.forEach((template) => {
    const newTemplate = document.createElement('li');
    newTemplate.innerHTML = 
      <option value="${template.name}">${template.name}</option>
    ;

    templatesList.appendChild(newTemplate);
  });
});

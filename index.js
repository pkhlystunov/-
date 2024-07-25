const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdf = require('html-pdf');
const docx = require('docx');

const app = express();
app.use(express.json());

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Создание чек-листа
app.post('/create-checklist', upload.array('photos'), async (req, res) => {
  // Извлечение данных из запроса
  const { template, items } = req.body;
  const photos = req.files;

  // Создание объекта чек-листа
  const checklist = {
    template,
    items: items.map(item => ({ text: item.text, photos:  }))
  };

  // Сохранение чек-листа в базе данных (заглушка)
  console.log('Чек-лист сохранен в базе данных: ', checklist);

  // Отправка ответа
  res.json({
    success: true,
    message: 'Чек-лист успешно создан'
  });
});

// Генерация отчета в формате PDF
app.get('/checklist/:id/pdf', async (req, res) => {
  // Получение чек-листа по идентификатору (заглушка)
  const checklist = {
    template: 'Ежедневный осмотр строительной площадки',
    items: 
      { text: 'Проверка ограждений и предупреждающих знаков', photos: [ },
      { text: 'Осмотр электропроводки и оборудования', photos:  },
      { text: 'Проверка средств индивидуальной защиты', photos:  }
    ]
  };

  // Генерация HTML-кода отчета
  const html = generatePdfHtml(checklist);

  // Создание PDF-документа
  pdf.create(html).to

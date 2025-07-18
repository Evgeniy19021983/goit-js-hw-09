import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

// Слухаємо input події, зберігаємо з throttle
form.addEventListener('input', throttle(onInput, 500));
// Слухаємо submit
form.addEventListener('submit', onSubmit);

// При завантаженні сторінки - перевірити localStorage
populateFormFields();

function onInput(e) {
  const { name, value } = e.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Будь ласка, заповніть обидва поля');
    return;
  }

  console.log({ email, message });

  // Очищаємо форму та localStorage
  form.reset();
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо formData
  formData.email = '';
  formData.message = '';
}

function populateFormFields() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
      formData.email = parsedData.email;
    }

    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
      formData.message = parsedData.message;
    }
  } catch (error) {
    console.warn('Помилка парсингу з localStorage:', error);
  }
}

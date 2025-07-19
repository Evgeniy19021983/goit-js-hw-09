import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

// === 1. Спочатку заповнюємо форму, потім ставимо слухачі ===
populateFormFields();

// === 2. Вже після заповнення ставимо слухачі ===
form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

// === 3. Обробка input ===
function onInput(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// === 4. Обробка submit ===
function onSubmit(evt) {
  evt.preventDefault();

  const { email, message } = form.elements;

  // Валідація
  if (email.value.trim() === '' || message.value.trim() === '') {
    alert('Please fill in all the fields!');
    return;
  }

  console.log(formData); // <-- саме formData!

  // Очищення
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
}

// === 5. Заповнення форми при завантаженні ===
function populateFormFields() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    formData = JSON.parse(savedData);
    if (formData.email) form.elements.email.value = formData.email;
    if (formData.message) form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing data from localStorage:', error);
  }
}

const dlg = document.getElementById("contactDialog");
const openBtn = document.getElementById("openDialog");
const closeBtn = document.getElementById("closeDialog");
const form = document.getElementById("contactForm");
const phone = document.getElementById("phone");
let lastActive = null;

openBtn.addEventListener("click", () => {
  lastActive = document.activeElement;
  dlg.showModal();
  dlg.querySelector("input,select,textarea,button")?.focus();
});
closeBtn.addEventListener("click", () => dlg.close("cancel"));
dlg.addEventListener("close", () => {
  lastActive?.focus();
});

form?.addEventListener("submit", (e) => {
  // 1) Сброс кастомных сообщений
  [...form.elements].forEach((el) => el.setCustomValidity?.(""));
  // 2) Проверка встроенных ограничений
  if (!form.checkValidity()) {
    e.preventDefault();
    // Пример: таргетированное сообщение
    const email = form.elements.email;
    const phone = form.elements.phone;
    if (email?.validity.typeMismatch) {
      email.setCustomValidity(
        "Введите корректный e-mail, например name@example.com"
      );
    }
    if (phone?.validity.patternMismatch) {
      phone.setCustomValidity(
        "Введите корректный номер телефона, например +79991234567"
      );
    }
    form.reportValidity(); // показать браузерные подсказки
    // A11y: подсветка проблемных полей
    [...form.elements].forEach((el) => {
      if (el.willValidate) {
        el.setAttribute("aria-invalid", el.checkValidity() ? "false" : "true");
      }
    });    
    return;
  }
  // 3) Успешная «отправка» (без сервера)
  e.preventDefault();
  // Если форма внутри <dialog>, закрываем окно:
  document.getElementById("contactDialog")?.close("success");
  form.reset();

  setTimeout(() => {
    window.location.href = "thanks.html";
  }, 200);
});

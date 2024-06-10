const form = document.querySelector(".register__form");
form.noValidate = true;

const formInputs = Array.from(form);
const regexpLogin = /^[a-zA-Zа-яА-я]{2,}/;
const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexpPassword =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
form.addEventListener("submit", function (e) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].setCustomValidity("");
    formInputs[i].classList.remove("success");
    formInputs[i].classList.remove("err");
    if (formInputs[i].type == "email") {
      if (
        !regexpEmail.test(formInputs[i].value) &&
        formInputs[i].type !== "submit"
      ) {
        e.preventDefault();
        formInputs[i].classList.add("invalid");
        formInputs[i].setCustomValidity(
          "Почта должна состоять из латиницы и не содержать спец. символов, кроме точки и тире."
        );
        formInputs[i].reportValidity();
        break;
      }
    } else if (formInputs[i].name == "login") {
      if (
        !regexpLogin.test(formInputs[i].value) &&
        formInputs[i].type !== "submit"
      ) {
        e.preventDefault();
        formInputs[i].classList.add("invalid");
        formInputs[i].setCustomValidity(
          "Логин должен быть длиннее четырёх символов"
        );
        formInputs[i].reportValidity();
        break;
      }
    } else if (formInputs[i].name === "password") {
      if (
        !regexpPassword.test(formInputs[i].value) &&
        formInputs[i].type !== "submit"
      ) {
        e.preventDefault();
        formInputs[i].classList.add("invalid");
        formInputs[i].setCustomValidity(
          "Пароль должен содержать одну цифру от 1 до 9, одну строчную букву, одну заглавную букву, один специальный символ, должен быть без пробелов и иметь длину от 8 до 16 символов"
        );
        formInputs[i].reportValidity();
        break;
      }
    } else if (formInputs[i].name === "again_pswrd") {
      if (formInputs[i].value !== formInputs[i - 1].value) {
        e.preventDefault();
        formInputs[i].classList.add("invalid");
        formInputs[i].setCustomValidity("Пароли не совпадают");
        formInputs[i].reportValidity();
        break;
      }
    } else if (
      formInputs[i].type === "checkbox" &&
      formInputs[i].name == "check__rules"
    ) {
      if (!formInputs[i].checked) {
        e.preventDefault();
        formInputs[i].classList.add("invalid");
        formInputs[i].setCustomValidity(
          "Вы должны согласиться с правилами проекта"
        );
        formInputs[i].reportValidity();
        break;
      }
    } else {
      formInputs[i].setCustomValidity("");
      formInputs[i].classList.add("success");
    }
  }
});

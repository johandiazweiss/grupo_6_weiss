const formRegister = document.querySelector("#formRegister");

const firstName = document.querySelector("#nombre");
const lastName = document.querySelector("#apellido");
const birthDate = document.querySelector("#fechaNac");
const emailRegister = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector("#password2");
const errorIcon = document.querySelector(".errorIcon");





firstName.onkeyup = function (e) {
  firstName.classList.remove("form_invalidInputs")
  firstName.classList.add("form_inputs_reg")


}

lastName.onkeyup = function (e) {
  lastName.classList.remove("form_invalidInputs")
  lastName.classList.add("form_inputs_reg")
 



}

birthDate.onclick = function (e) {
  birthDate.classList.remove("form_invalidInputs")
  birthDate.classList.add("form_inputs_reg")
}

emailRegister.onkeyup = function (e) {
  emailRegister.classList.remove("form_invalidInputs")
  emailRegister.classList.add("form_inputs_reg")
}



password.onkeyup = function (e) {
  password.classList.remove("form_invalidInputs")
  password.classList.add("form_inputs_reg")


}



passwordCheck.onkeyup = function (e) {
  passwordCheck.classList.remove("form_invalidInputs")
  passwordCheck.classList.add("form_inputs_reg")


}



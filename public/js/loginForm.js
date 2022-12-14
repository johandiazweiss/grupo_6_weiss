const emailLogin= document.querySelector("#emailLogin");
const passwordLogin = document.querySelector("#passwordLogin");
emailLogin.onkeyup = function (e) {
  emailLogin.classList.remove("form_invalidInputs")
  emailLogin.classList.add("form_inputs_reg")
}
passwordLogin.onkeyup = function (e) {
  passwordLogin.classList.remove("form_invalidInputs")
  passwordLogin.classList.add("form_inputs_reg")


}
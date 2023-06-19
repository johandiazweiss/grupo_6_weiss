window.onload = function () {


  let loginForm = document.forms.loginForm;

  let emailLogin = document.querySelector("#emailLogin");
  let passwordLogin = document.querySelector("#passwordLogin");
  let validationErrorBanner = document.querySelector(".validationError-on_time");
  let errorIcon = document.querySelector("#errorIcon");
  let errorIconCorrection = document.querySelector("#errorIconCorrection");


  let on_timeValidation1 = document.querySelector(".on_timeValidation1");
  let on_timeValidation2 = document.querySelector(".on_timeValidation2");


  function onTime_email() {
    if (errorIcon) {
      errorIcon.style.display = "none";
    }
    let value = emailLogin.value;
    if (!value || !value.includes("@") || !value.includes(".com")) {
      on_timeValidation1.innerHTML = "Introduce tu correo electrónico";
      on_timeValidation1.style.display = "inline";
      emailLogin.classList.add("form_invalidInputs");
    } else {
      on_timeValidation1.innerHTML = "";
      on_timeValidation1.style.display = "none";
      emailLogin.classList.remove("form_invalidInputs");
      emailLogin.classList.add("form_inputs_reg");
    }
  }
  emailLogin.addEventListener("keyup", onTime_email);
  emailLogin.addEventListener("blur", onTime_email);

  function onTime_password () {
    if (errorIconCorrection) {
      errorIconCorrection.style.display = "none";
    }
    let value = passwordLogin.value;
    if (!value) {
      on_timeValidation2.innerHTML = "Introduce tu contraseña";
      on_timeValidation2.style.display = "inline";
      passwordLogin.classList.add("form_invalidInputs");
    } else {
      on_timeValidation2.innerHTML = "";
      on_timeValidation2.style.display = "none";
      passwordLogin.classList.remove("form_invalidInputs");
      passwordLogin.classList.add("form_inputs_reg");
    }
  }
  passwordLogin.addEventListener("keyup", onTime_password);
  passwordLogin.addEventListener("blur", onTime_password);
  

  
















  loginForm.addEventListener("submit", function (e) {
    let errors = [];

    if (emailLogin.value == "") {
      on_timeValidation1.innerHTML = "Introduce tu correo electrónico";
      on_timeValidation1.style.display = "inline";
      emailLogin.classList.add("form_invalidInputs");
      errors.push("Email requerido");
    } else if (!emailLogin.value.includes("@") || !emailLogin.value.includes(".com")) {
      on_timeValidation1.innerHTML = "Introduce tu correo electrónico";
      on_timeValidation1.style.display = "inline";
      emailLogin.classList.add("form_invalidInputs");
      errors.push("Introduce tu Email");
    }

    if (passwordLogin.value == "") {
      on_timeValidation2.innerHTML = "Introduce tu contraseña";
      on_timeValidation2.style.display = "inline";
      passwordLogin.classList.add("form_invalidInputs");
      errors.push("Introduce tu contraseña");
    }


    if (errors.length > 0) {
      e.preventDefault()
      validationErrorBanner.style.display = "block";
    }



  })








}
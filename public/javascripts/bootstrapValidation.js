// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
'use strict'

// <!-- 显示upload文件名 but ONLY WORK for Bootstrap 4 bs-custom-file-input-->
// bsCustomFileInput.init()

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.validated-form')

// Loop over them and prevent submission
Array.from(forms)
.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }, false)
})
})()
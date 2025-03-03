// user login authentication
// ChatGPT told me to remove the `event` within the parentheses after `'click', `
document.querySelector('#btnLogin').addEventListener('click', () => {
  let strErrorMessage = ""
  let strErrorRequired = ""

  const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/


  let strEmail = document.querySelector("#txtEmailLogin").value
  strEmail = strEmail.toLowerCase()
  if (!document.querySelector("#txtEmailLogin").value) {
    strErrorRequired += "email, "
  }
  else if (!regEmail.test(strEmail)) {
    strErrorMessage += `<p>Please enter a valid email address</p>`
  }

  let strPassword = document.querySelector("#txtPasswordLogin").value
  if (!document.querySelector("#txtPasswordLogin").value) {
    strErrorRequired += "password, "
  }
  else if (!regPassword.test(strPassword)) {
    strErrorMessage += `<p>Please enter a valid password (at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and no special characters)</p>`
  }

  strErrorRequired = strErrorRequired.replace(/, $/, "");
  // ChatGPT helped me come up with this regex to replace the last comma with an "and"
  strErrorRequired = strErrorRequired.replace(/,(?=[^,]*$)/, ", and ");

  // ChatGPT helped me come up with this regex to remove a comma if it's the only one
  if ((strErrorRequired.match(/,/g) || []).length === 1) {
    strErrorRequired = strErrorRequired.replace(",", "");
  }

  if (strErrorRequired != '') {
    strErrorRequired = "Please enter into all required fields: " + strErrorRequired
    strErrorMessage += strErrorRequired
  }

  if (strErrorMessage) {
    Swal.fire({
      title: 'Error!',
      html: strErrorMessage,
      icon: 'error',
      confirmButtonText: 'Close'
    })
  }
})

// user register authentication
// ChatGPT told me to remove the `event` within the parentheses after `'click', `
document.querySelector('#btnRegister').addEventListener('click', () => {
  let strErrorMessage = ""
  let strErrorRequired = ""

  const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  const regZip = /^\d{5}(\-?\d{4})?$/
  const regPhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/

  let strZip = document.querySelector("#txtZip").value
  if (!regZip.test(strZip) && document.querySelector("#txtZip").value) {
    strErrorMessage += `<p>Please enter a valid ZIP code</p>`
  }

  let strPhone = document.querySelector("#txtPhone").value
  if (!regPhone.test(strPhone) && document.querySelector("#txtPhone").value) {
    strErrorMessage += `<p>Please enter a valid phone number</p>`
  }

  let strEmail = document.querySelector("#txtEmailRegister").value
  strEmail = strEmail.toLowerCase()
  if (!document.querySelector("#txtEmailRegister").value) {
    strErrorRequired += "email, "
  } else if (!regEmail.test(strEmail)) {
    strErrorMessage += `<p>Please enter a valid email address</p>`
  }

  let strPassword = document.querySelector("#txtPasswordRegister").value
  if (!document.querySelector("#txtPasswordRegister").value) {
    strErrorRequired += "password, "
  } else if (!regPassword.test(strPassword)) {
    strErrorMessage += `<p>Please enter a valid password (at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and no special characters)</p>`
  }

  if (!document.querySelector("#txtFirstName").value) {
    strErrorRequired += "first name, "
  }

  if (!document.querySelector("#txtLastName").value) {
    strErrorRequired += "last name, "
  }

  if (!document.querySelector("#txtAddress1").value) {
    strErrorRequired += "address, "
  }

  if (!document.querySelector("#txtCity").value) {
    strErrorRequired += "city, "
  }

  if (!document.querySelector("#txtState").value) {
    strErrorRequired += "state, "
  }

  if (!document.querySelector("#txtZip").value) {
    strErrorRequired += "ZIP, "
  }

  if (!document.querySelector("#txtPhone").value) {
    strErrorRequired += "phone number, "
  }

  strErrorRequired = strErrorRequired.replace(/, $/, "");
  // ChatGPT helped me come up with this regex:
  strErrorRequired = strErrorRequired.replace(/,(?=[^,]*$)/, ", and ");

  // ChatGPT helped me come up with this regex to remove a comma if it's the only one
  if ((strErrorRequired.match(/,/g) || []).length === 1) {
    strErrorRequired = strErrorRequired.replace(",", "");
  }

  if (strErrorRequired != '') {
    strErrorRequired = "Please enter into all required fields: " + strErrorRequired
    strErrorMessage += strErrorRequired
  }

  if (strErrorMessage) {
    Swal.fire({
      title: 'Error!',
      html: strErrorMessage,
      icon: 'error',
      confirmButtonText: 'Close'
    })
  }
})

// jQuery
$('#btnSwapLogin').on('click', function () {
  $('#frmLogin').slideUp(function () {
    $('#frmRegister').slideDown()
  })
})

$('#btnSwapRegister').on('click', function () {
  $('#frmRegister').slideUp(function () {
    $('#frmLogin').slideDown()
  })
})
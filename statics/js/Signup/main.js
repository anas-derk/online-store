let passwordInputField      =  document.querySelector(".signup .signup-form .password"),

    rewritePasswordField    = document.querySelector(".signup .signup-form .confirm-password"),

    errorBox = document.querySelector(".signup .container p")

let mainborderColor = "#ced4da"

function password_identical_validation_handling(passwordField1, passwordField2){

    passwordField1.onkeyup = () => {

        if(passwordField1.value !== passwordField2.value) {
    
            rewritePasswordField.style.borderColor = "#F00"

            setTimeout(() => {

                errorBox.classList.add("displayed")

            }, 300)

            setTimeout(() => {

                errorBox.classList.remove("displayed")

            }, 5000)
    
        } else {
    
            rewritePasswordField.style.borderColor = mainborderColor

            errorBox.classList.remove("displayed")
    
        }
    
    }

}

password_identical_validation_handling(passwordInputField, rewritePasswordField)

password_identical_validation_handling(rewritePasswordField, passwordInputField)
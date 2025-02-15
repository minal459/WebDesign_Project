document.addEventListener("DOMContentLoaded", function () {
    const sellerSwitch = document.getElementById("sellerSwitch");
    const sellerOptions = document.getElementById("sellerOptions");
    const registerContainer = document.getElementById("registerContainer");

    sellerSwitch.addEventListener("change", function () {
        sellerOptions.style.display = this.checked ? "block" : "none";
        registerContainer.classList.toggle("seller-active", this.checked);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const nameField = document.getElementById("name");
    const errorName = document.getElementById("error_name");

    if (nameField) {
        nameField.addEventListener("input", function () {
            const regExAlpha = /^[A-Za-z\s]+$/;
            if (!nameField.value.match(regExAlpha) || nameField.value.trim().length < 3) {
                errorName.style.display = "block";
                nameField.style.border = "2px solid red";
            } else {
                errorName.style.display = "none";
                nameField.style.border = "";
            }
        });
    } else {
        console.error("Error: Name field not found in the document.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const usernameField = document.getElementById("username");
    const errorUsername = document.getElementById("error_username");

    if (usernameField) {
        usernameField.addEventListener("input", function () {
            const regExUsername = /^[A-Za-z0-9_-]{3,}$/;
            if (!usernameField.value.match(regExUsername)) {
                errorUsername.style.display = "block";
                usernameField.style.border = "2px solid red";
            } else {
                errorUsername.style.display = "none";
                usernameField.style.border = "";
            }
        });
    } else {
        console.error("Error: Username field not found in the document.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const emailField = document.getElementById("email");
    const errorEmail = document.getElementById("error_email");

    if (emailField) {
        emailField.addEventListener("input", function () {
            const regExEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.(com)$/;
            if (!emailField.value.match(regExEmail)) {
                errorEmail.style.display = "block";
                emailField.style.border = "2px solid red";
            } else {
                errorEmail.style.display = "none";
                emailField.style.border = "";
            }
        });
    } else {
        console.error("Error: Email field not found in the document.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("password");
    const errorPassword = document.getElementById("error_password");

    if (passwordField) {
        passwordField.addEventListener("input", function () {
            const regExPassword = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
            if (!passwordField.value.match(regExPassword)) {
                errorPassword.style.display = "block";
                passwordField.style.border = "2px solid red";
            } else {
                errorPassword.style.display = "none";
                passwordField.style.border = "";
            }
        });
    } else {
        console.error("Error: Password field not found in the document.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const phoneField = document.getElementById("phone");
    const errorPhone = document.getElementById("error_phone");

    if (phoneField) {
        phoneField.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            
            if (value.length > 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            } else if (value.length > 3) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
            const regExPhone = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!value.match(regExPhone)) {
                errorPhone.style.display = "block";
                phoneField.style.border = "2px solid red";
            } else {
                errorPhone.style.display = "none";
                phoneField.style.border = "";
            }
        });
    } else {
        console.error("Error: Phone field not found in the document.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const countryField = document.getElementById("country");
    const errorCountry = document.getElementById("error_country");

    if (countryField) {
        countryField.addEventListener("input", function () {
            const regExAlpha = /^[A-Za-z\s]+$/;
            if (!countryField.value.match(regExAlpha)) {
                errorCountry.style.display = "block";
                countryField.style.border = "2px solid red";
            } else {
                errorCountry.style.display = "none";
                countryField.style.border = "";
            }
        });
    } else {
        console.error("Error: Country field not found in the document.");
    }
});

// Updated signup functionality with full validation checks and inline seller field validation
document.addEventListener("DOMContentLoaded", function () {
    const signupButton = document.getElementById("signupButton");

    if (signupButton) {
        signupButton.addEventListener("click", function (e) {
            e.preventDefault();
            let valid = true;

            // Validate Name
            const nameField = document.getElementById("name");
            const errorName = document.getElementById("error_name");
            const regExAlpha = /^[A-Za-z\s]+$/;
            if (!nameField.value.match(regExAlpha) || nameField.value.trim().length < 3) {
                errorName.style.display = "block";
                nameField.style.border = "2px solid red";
                valid = false;
            } else {
                errorName.style.display = "none";
                nameField.style.border = "";
            }

            // Validate Username
            const usernameField = document.getElementById("username");
            const errorUsername = document.getElementById("error_username");
            const regExUsername = /^[A-Za-z0-9_-]{3,}$/;
            if (!usernameField.value.match(regExUsername)) {
                errorUsername.style.display = "block";
                usernameField.style.border = "2px solid red";
                valid = false;
            } else {
                errorUsername.style.display = "none";
                usernameField.style.border = "";
            }

            // Validate Email
            const emailField = document.getElementById("email");
            const errorEmail = document.getElementById("error_email");
            const regExEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.(com)$/;
            if (!emailField.value.match(regExEmail)) {
                errorEmail.style.display = "block";
                emailField.style.border = "2px solid red";
                valid = false;
            } else {
                errorEmail.style.display = "none";
                emailField.style.border = "";
            }

            // Validate Password
            const passwordField = document.getElementById("password");
            const errorPassword = document.getElementById("error_password");
            const regExPassword = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
            if (!passwordField.value.match(regExPassword)) {
                errorPassword.style.display = "block";
                passwordField.style.border = "2px solid red";
                valid = false;
            } else {
                errorPassword.style.display = "none";
                passwordField.style.border = "";
            }

            // Validate Phone Number
            const phoneField = document.getElementById("phone");
            const errorPhone = document.getElementById("error_phone");
            const regExPhone = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phoneField.value.match(regExPhone)) {
                errorPhone.style.display = "block";
                phoneField.style.border = "2px solid red";
                valid = false;
            } else {
                errorPhone.style.display = "none";
                phoneField.style.border = "";
            }

            // Check if Terms and Conditions checkbox is checked
            const termsCheckbox = document.getElementById("terms");
            if (!termsCheckbox.checked) {
                // Optionally, display an inline error message below the checkbox
                valid = false;
            }

            // Validate seller fields if the seller toggle is checked
            const sellerSwitch = document.getElementById("sellerSwitch");
            if (sellerSwitch.checked) {
                // Validate Skills
                const skillsField = document.getElementById("skills");
                const errorSkills = document.getElementById("error_skills");
                if (skillsField.value.trim() === "") {
                    errorSkills.style.display = "block";
                    skillsField.style.border = "2px solid red";
                    valid = false;
                } else {
                    errorSkills.style.display = "none";
                    skillsField.style.border = "";
                }
                // Validate Certification (file input restricted to PDF)
                const certificationField = document.getElementById("certification");
                const errorCertification = document.getElementById("error_certification");
                if (!certificationField.files || certificationField.files.length === 0) {
                    errorCertification.style.display = "block";
                    certificationField.style.border = "2px solid red";
                    valid = false;
                } else {
                    errorCertification.style.display = "none";
                    certificationField.style.border = "";
                }
                // Validate Description
                const descriptionField = document.getElementById("description");
                const errorDescription = document.getElementById("error_description");
                if (descriptionField.value.trim() === "") {
                    errorDescription.style.display = "block";
                    descriptionField.style.border = "2px solid red";
                    valid = false;
                } else {
                    errorDescription.style.display = "none";
                    descriptionField.style.border = "";
                }
            }

            // If all validations pass, sign up the user
            if (valid) {
                alert("Registration Successful! Redirecting to Login Page...");
                window.location.href = "login.html";
            }
        });
    } else {
        console.error("Error: Sign Up button not found in the document.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profilePictureInput = document.getElementById("profilePicture");
    const errorProfilePicture = document.getElementById("error_profilePicture");
    const imagePreview = document.getElementById("imagePreview");

    if (profilePictureInput) {
        profilePictureInput.addEventListener("change", function () {
            const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
            const file = profilePictureInput.files[0];

            if (file) {
                const fileName = file.name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (!allowedExtensions.includes(fileExtension)) {
                    errorProfilePicture.style.display = "block";
                    profilePictureInput.value = "";
                    imagePreview.style.display = "none";
                } else {
                    errorProfilePicture.style.display = "none";
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        imagePreview.src = e.target.result;
                        imagePreview.style.display = "block";
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    } else {
        console.error("Error: Profile picture input field not found in the document.");
    }
});

// Certification File Input Validation and Preview for PDF
document.addEventListener("DOMContentLoaded", function () {
    const certificationInput = document.getElementById("certification");
    const errorCertification = document.getElementById("error_certification");
    const certificationPreview = document.getElementById("certificationPreview");

    if (certificationInput) {
        certificationInput.addEventListener("change", function () {
            const allowedExtensions = ["pdf"];
            const file = certificationInput.files[0];

            if (file) {
                const fileName = file.name;
                const fileExtension = fileName.split(".").pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    errorCertification.style.display = "block";
                    errorCertification.innerText = "Please select a PDF file.";
                    certificationInput.value = "";
                    certificationPreview.style.display = "none";
                } else {
                    errorCertification.style.display = "none";
                    // Instead of an image preview, display the file name
                    certificationPreview.innerText = `Selected file: ${fileName}`;
                    certificationPreview.style.display = "block";
                }
            }
        });
    } else {
        console.error("Error: Certification input field not found in the document.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("languageSelect");

    const translations = {
        "en": {
            "title": "Create Account",
            "name": "Name *",
            "username": "Username *",
            "email": "Email *",
            "password": "Password *",
            "profilePicture": "Profile Picture",
            "country": "Country",
            "phone": "Phone Number *",
            "terms": "I agree to terms and conditions*",
            "signup": "Sign Up",
            "sellerToggle": "I want to become a seller",
            "skills": "Skills *",
            "certification": "Certification",
            "description": "Description",
        },
        "es": {
            "title": "Crear Cuenta",
            "name": "Nombre *",
            "username": "Nombre de usuario *",
            "email": "Correo Electrónico *",
            "password": "Contraseña *",
            "profilePicture": "Foto de Perfil",
            "country": "País",
            "phone": "Número de Teléfono *",
            "terms": "Acepto los términos y condiciones*",
            "signup": "Regístrate",
            "sellerToggle": "Quiero ser vendedor",
            "skills": "Habilidades *",
            "certification": "Certificación",
            "description": "Descripción",
        }
    };

    function translatePage(language) {
        document.getElementById("title").innerText = translations[language]["title"];
        document.getElementById("label_name").innerText = translations[language]["name"];
        document.getElementById("label_username").innerText = translations[language]["username"];
        document.getElementById("label_email").innerText = translations[language]["email"];
        document.getElementById("label_password").innerText = translations[language]["password"];
        document.getElementById("label_profilePicture").innerText = translations[language]["profilePicture"];
        document.getElementById("label_country").innerText = translations[language]["country"];
        document.getElementById("label_phone").innerText = translations[language]["phone"];
        document.getElementById("label_terms").innerText = translations[language]["terms"];
        document.getElementById("signupButton").innerText = translations[language]["signup"];
        document.getElementById("sellerSwitchLabel").innerText = translations[language]["sellerToggle"];
        document.getElementById("label_skills").innerText = translations[language]["skills"];
        document.getElementById("label_certification").innerText = translations[language]["certification"];
        document.getElementById("label_description").innerText = translations[language]["description"];
    }

    languageSelect.addEventListener("change", function () {
        const selectedLanguage = languageSelect.value;
        translatePage(selectedLanguage);
    });
});

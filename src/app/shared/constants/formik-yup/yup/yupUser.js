import * as Yup from 'yup'

export const schemaFormLogin = Yup.object().shape({
    mail: Yup.string().required("Required input"),
    password: Yup.string().required("Required input")
});


export const schemaFormProfile = Yup.object().shape({
    nom: Yup.string().required("Required input"),
    prenom: Yup.string().required("Required input"),
    anniversaire: Yup.string().required("Required input"),
    email: Yup.string()
        .email("L'email n'est pas valide")
        .required("Champ requis"),
    numeroA: Yup.string().required("Required input"),
    rue: Yup.string().required("Required input"),
    codepostal: Yup.string().required("Required input"),
    ville: Yup.string().required("Required input"),
    pays: Yup.string().required("Required input"),
    telephone: Yup.string()
        .required("Champ requis")
        .matches(/^[0-9]+$/, "Nombres uniquement")
        .min(10, "Doit contenir au moins 10 chiffres")
        .max(16, "Doit contenir moins de 16 chiffres"),
    password: Yup.string()
        .required("Le mot de passe est requis")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial"
        ),
    passwordTest: Yup.string()
        .oneOf([Yup.ref("password"), null], "pas de correspondance")
        .required("Champ requis"),

})

export const schemaFormRegistration = Yup.object().shape({
    lastName: Yup.string().required("Saisissez votre nom"),
    firstName: Yup.string().required("Saisissez votre prénom"),
    mail: Yup.string()
        .email("L'email n'est pas valide")
        .required("Saisissez votre adresse Email"),
    password: Yup.string()
        .required("Choisissez un mot de passe")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial"
        ),
    passwordTest: Yup.string()
        .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas")
        .required("Confirmé le mot de passe que vous avez saisie"),


})

// Used to start the password reset feature : ask the user their email address.
export const schemaFormAskNewPassword = Yup.object().shape({
    email: Yup.string().required("Adresse mail requise"),
})

// Used to create and check a new password
export const schemaFormValidateNewPassword = Yup.object().shape({
    newPassword: Yup.string().required("Champs requis").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial"
    ),
    verifyNewPassword: Yup.string().required("Champs requis").oneOf([Yup.ref("newPassword"), null], "Les mots de passe ne sont pas similaires")

})



export const schemaFormProfileUpdate =  Yup.object().shape({
    firstName: Yup.string().required("Required input").max(50, "50 caractères Maximum"),
    lastName: Yup.string().required("Required input").max(50, "50 caractères Maximum"),
    birthdate: Yup.string().required("Required input"),
    mail: Yup.string()
        .email("L'email n'est pas valide")
        .required("Champ requis"),
    number: Yup.string().required("Required input").max(10, "10 caractères Maximum"),
    street: Yup.string().required("Required input"),
    postalCode: Yup.string().required("Required input"),
    city: Yup.string().required("Required input"),
    country: Yup.string().required("Required input"),
    phone: Yup.string()
        .required("Champ requis")
        .matches(/^[0-9]+$/, "Nombres uniquement")
        .min(10, "Doit contenir au moins 10 chiffres")
        .max(16, "Doit contenir moins de 16 chiffres"),
  

})
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

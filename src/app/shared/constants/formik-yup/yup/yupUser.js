import * as Yup from 'yup'

export const schemaFormLogin = Yup.object().shape({
    mail: Yup.string().required("Required input"),
    password: Yup.string().required("Required input")
})

// Used to start the password reset feature : ask the user their email address.
export const schemaFormAskNewPassword = Yup.object().shape({
    email: Yup.string().required("Adresse mail requise"),
})

export const schemaFormValidateNewPassword = Yup.object().shape({
    newPassword: Yup.string().required("Champs requis"),
    verifyNewPassword: Yup.string().required("Champs requis").oneOf([Yup.ref("newPassword"), null], "Les mots de passe ne sont pas similaires")
})
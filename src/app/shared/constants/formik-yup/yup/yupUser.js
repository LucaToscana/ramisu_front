import * as Yup from 'yup'

export const schemaFormLogin = Yup.object().shape({
    mail: Yup.string().required("Required input"),
    password: Yup.string().required("Required input")
})
import * as Yup from 'yup'



export const schemaFormModalAddress = Yup.object().shape({
  
    numeroA: Yup.string().required("Required input"),
    rue: Yup.string().required("Required input"),
    codepostal: Yup.string().required("Required input"),
    ville: Yup.string().required("Required input"),
    pays: Yup.string().required("Required input"),
    

})




export const defaulValuesLogin = { 
    mail:'', 
    password:'',
    rememberMe: false
}

/* nom, prénom, email, adresse 
(découpée en numéro, rue, complément d'adresse, code postal, ville et pays), 
numéro de téléphsone et mot de passe (le mot de passe est à entrer 2 fois). 
Toutes les infos sont nécessaires.*/ 
const isMyAddress = () => {

    var myAddress = {
      street_number: "",
      route: "",
      country: "",
      locality: "",
      postal_code: ""
    }
    if (localStorage.getItem("myAddress")) {
      return JSON.parse(localStorage.getItem("myAddress"))
    } else { return myAddress }
  }
  const address = isMyAddress()
export const defaulValuesInscription = { 
    nom:'',
    prenom:'',
    anniversaire:'',
    email:'',
    adresse:'',
    numeroA:address.street_number,
    rue:address.route,
    complementadresse:'',
    codepostal:address.postal_code,
    ville: address.locality,
    pays: address.country,
    telephone:'', 
    password:'',
    passwordTest:'',
 //   rememberMe: false
}
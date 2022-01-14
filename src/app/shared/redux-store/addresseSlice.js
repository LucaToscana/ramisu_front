import { createSlice } from '@reduxjs/toolkit'
import { defaulValuesInscription, defaulValuesLogin } from '../../shared/constants/formik-yup/default-values-form/idefaultValuesUser';




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



export const addresseSlice = createSlice({
  name: 'addresse',
  initialState: {
    value: address
  },
  reducers: {
    setAddress: (state, action) => {
      state.value = action.payload


      //   localStorage.setItem("myAddress", JSON.stringify(state.value)); //store
    },
    setAddressRoute: (state, action) => {
      state.value.route = action.payload
      var myAddress = {
        street_number: "",
        route: "",
        country: "",
        locality: "",
        postal_code: ""
      }
      if (localStorage.getItem("myAddress")) {
        myAddress = JSON.parse(localStorage.getItem("myAddress"))
        myAddress.route = action.payload

      } else {
        myAddress.route = action.payload
      }
      localStorage.setItem("myAddress", JSON.stringify(myAddress)); //store
      defaulValuesInscription.rue = action.payload
    },

    setAddressNumber: (state, action) => {
      state.value.street_number = action.payload
      var myAddress = {
        street_number: "",
        route: "",
        country: "",
        locality: "",
        postal_code: ""
      }
      if (localStorage.getItem("myAddress")) {
        myAddress = JSON.parse(localStorage.getItem("myAddress"))
        myAddress.street_number = action.payload

      } else {
        myAddress.street_number = action.payload
      }
      localStorage.setItem("myAddress", JSON.stringify(myAddress)); //store
      defaulValuesInscription.numeroA = action.payload

    },
    setAddressCountry: (state, action) => {
      state.value.country = action.payload
      var myAddress = {
        street_number: "",
        route: "",
        country: "",
        locality: "",
        postal_code: ""
      }
      if (localStorage.getItem("myAddress")) {
        myAddress = JSON.parse(localStorage.getItem("myAddress"))
        myAddress.country = action.payload

      } else {
        myAddress.country = action.payload
      }
      localStorage.setItem("myAddress", JSON.stringify(myAddress)); //store
      defaulValuesInscription.pays = action.payload

    },

    setAddressVille: (state, action) => {
      state.value.locality = action.payload
      var myAddress = {
        street_number: "",
        route: "",
        country: "",
        locality: "",
        postal_code: ""
      }
      if (localStorage.getItem("myAddress")) {
        myAddress = JSON.parse(localStorage.getItem("myAddress"))
        myAddress.locality = action.payload

      } else {
        myAddress.locality = action.payload
      }
      localStorage.setItem("myAddress", JSON.stringify(myAddress)); //store
      defaulValuesInscription.ville = action.payload

    },

    setPostalCode: (state, action) => {
      state.value.postal_code = action.payload
      var myAddress = {
        street_number: "",
        route: "",
        country: "",
        locality: "",
        postal_code: ""
      }
      if (localStorage.getItem("myAddress")) {
        myAddress = JSON.parse(localStorage.getItem("myAddress"))
        myAddress.postal_code = action.payload

      } else {
        myAddress.postal_code = action.payload
      }
      localStorage.setItem("myAddress", JSON.stringify(myAddress)); //store
      defaulValuesInscription.codepostal = action.payload

    }



  }
})

// Action creators are generated for each case reducer function
export const { setAddress, setAddressRoute, setAddressNumber, setAddressCountry, setAddressVille, setPostalCode } = addresseSlice.actions

export default addresseSlice.reducer
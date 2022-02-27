
import React from 'react';

import { useDispatch , useSelector } from 'react-redux';
import  {fetchFav, selectorFav} from '../shared/redux-store/favoritesSlice';
import { useHistory } from 'react-router-dom';
const Wishlist = (props)=>{


  const dispatch = useDispatch();
  const favorites = useSelector(selectorFav);
  const history = useHistory();

    const clickHandler = (event)=>
    {
        console.log(event);
        dispatch(fetchFav())
    }


    return (<div className='text-2xl text-center mt-32'>
                <h2>Produit Favoris</h2>
              
                {
                  favorites.length>0 ?  
                    favorites.map(elt=>{
                      return (
                        <div className='border-2 m-1 p-1 border-gray-300' key={elt.id}>
                          <div>id : {elt.id}</div>
                          <div>{elt.label}</div>
                          <div>{elt.label}</div>
                          <div>{elt.price}&nbsp;€</div>
                          <div>
                            <img className='hover:cursor-pointer' src={elt.picture} width="100px"onClick={() => {  history.push(`/produits/detail/${elt.id}`) }} />
                          </div>
                          <div>
                            <button className="p-1 m-1 bg-gray-300">trash</button>
                          </div>
                        </div>
                      )
                    }) 
                    :
                    (
                      <h3>Vous n'avez aucun produit favoris</h3>
                    ) 
                }
                  
            </div>)
}


export default Wishlist;
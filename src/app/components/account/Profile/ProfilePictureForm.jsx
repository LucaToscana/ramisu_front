

import React from 'react';
import { useState , useEffect} from 'react';
import avatar from '../../../assets/images/default-avatar.png';
import addImg from '../../../assets/images/icones/add-image.svg';


const PictureForm = (props)=>
{

    const [imgProfile , setImageProfile] = useState(undefined);
    useEffect(()=>{
        console.log('avatar filename' , props.data.avatar);
        let userPicture = `http://localhost:8080/upload/profilePictures/${props.data.avatar}`;
        if(props.data.avatar!=undefined)setImageProfile(userPicture)
      
    }, ['props.data.avatar', props.data.avatar]);

    const fileSelector=(event)=>{
      
        const uploadField = event.currentTarget.parentNode.querySelector('#uploadField');
        uploadField.addEventListener('change' , (event)=>{
            // debugger
            const file =  event.currentTarget.files[0];
            if(file!=undefined)
            {
                const formData = new FormData();
                    formData.append("image", file);
                   props.uploadHandler(formData);
            }
        });
        uploadField.click();

    }

   

 
    return (<div className='ml-20 flex flex-col justify-center items-center p-3'>
                 
                    <button
                        type="submit" 
                        onClick={fileSelector}
                        className='border-2 border-black rounded-full w-15 h-15 p-2  bg-white translate-y-2/3 translate-x-full ' >
                            <img src={addImg} 
                            width="30px" 
                            height="30px" />
                    </button>
                    <div className='border-2 border-black w-[200px] rounded-full overflow-hidden'>
                         <img    src={imgProfile != undefined ? imgProfile : avatar} 
                                width="200px"
                                height="200px"
                                className="object-fill" /> 
                    </div>
                    <div>
                        <input  type="file" 
                                name="image" 
                                accept="image/png, image/gif, image/jpeg" 
                                className='hidden' 
                                id="uploadField"/>
                        
                    </div>
             
            </div>);

}


export default PictureForm;


   
 
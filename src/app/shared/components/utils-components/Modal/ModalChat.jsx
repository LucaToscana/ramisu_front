import { ReplyIcon } from "@heroicons/react/solid";
import React from "react";
import ReactDOM from "react-dom";
import logo from "../../../../assets/images/icones/logo/warhammer-shop-logo.png";
import war from '../../../../assets/images/war1.png'

const ModalChat = ({ isShowing, hide, userData, handleMessage, sendPrivateValue, privateChats, publicChats, tab, sendValue }) =>
  isShowing

    ? ReactDOM.createPortal(
      <>
        <div className={isShowing?"modal-wrapper  flex-row-reverse pointer-events-none   bottom-0 mt-10 pb-3  animated fadeIn faster  ": "modal-wrapper  flex-row-reverse pointer-events-none   bottom-0 mt-10 pb-3  animated fadeOut faster  "   }>
          <div className="lg:w-3/7 p-5  rounded-lg m-3 pointer-events-auto mt-10" style={{
            backgroundImage: `url(${war})`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}>
            <div className="flex justify-between pointer-events-auto  z-50"><div className="flex  items-center justify-center text-center m-3"> <img src={logo} className="h-24"></img>
            </div> <button
              type="button"
              onClick={hide}
            >
                <span className=" text-8xl text-white">&times;</span>

              </button></div>

            <div className="flex  items-center justify-center text-center">

              {<div className="self-center ">

                <div className="  p-4 w-72 lg:w-96 bg-white rounded-lg border shadow-md sm:p-2 mb-5 overflow-x-auto">

                  <div className="h-48 lg:w-96 lg:h-96">
                    <div className="container">
                      {userData.connected ?
                        <div className=" h-48">
                          <div className="h-48">
                            {tab === "CHATROOM" && <div className="">
                              <ul className="">
                                {publicChats.map((chat, index) => (
                                  <li className={`message m-1 ${chat.senderName === userData.username && "self m-1"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data "><p>{chat.message}</p></div>
                                    {chat.senderName === userData.username && <div className="avatar self"><p className="text-xs">{chat.senderName}</p></div>}
                                  </li>
                                ))}
                              </ul>


                            </div>}
                            {tab !== "CHATROOM" && <div className="chat-content h-48">
                              <ul className="chat-messages">
                                {[...privateChats.get(tab)].map((chat, index) => (
                                  <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                  </li>
                                ))}
                              </ul>

                            </div>}
                          </div></div>
                        :

                        null}
                    </div>
                  </div>
                </div>

              </div>}

            </div>
            <div className="grid grid-cols-5 lg:w-96">
           <div className="col-span-4"> 
          <p> <input type="text" className="input-message rounded lg:w-full" placeholder="enter the message" 
           value={userData.message} onChange={handleMessage} /></p>
           </div>  
           <div className="col-span-1 flex justify-center item-center">
              <button type="submit" class=" bg-yellow-400 text-white  text-bold hover:bg-yellow-600 p-2 rounded text-sm w-auto"
                onClick={
                  sendValue}>

                <ReplyIcon className="h-5 w-12"></ReplyIcon></button>
                </div>
            </div>
          </div>
        </div>




        <style jsx="true">{`
        
            .animated {
              -webkit-animation-duration: 1s;
              animation-duration: 1s;
              -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
            }
        
            .animated.faster {
              -webkit-animation-duration: 500ms;
              animation-duration: 500ms;
            }
        
            .fadeIn {
              -webkit-animation-name: fadeIn;
              animation-name: fadeIn;
            }
        
            .fadeOut {
              -webkit-animation-name: fadeOut;
              animation-name: fadeOut;
            }
        
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
        
              to {
                opacity: 1;
              }
            }
        
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
        
              to {
                opacity: 0;
              }
              
              .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 1040;
                background-color: rgba(0, 0, 0, 1);
              }
  
              .modal-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1050;
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                outline: 0;
                display: flex;
                align-items: center;
              }
  
             
              .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
  
              .modal-close-button {
                font-size: 1.4rem;
                font-weight: 700;
                color: #000;
                cursor: pointer;
                border: none;
                background: transparent;
              }
          `}</style>
      </>,
      document.body
    )
    : null;

export default ModalChat;
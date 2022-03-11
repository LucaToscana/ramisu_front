import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import { accountLogin, isAuthenticated } from '../services/accountServices';
import { getToken } from '../services/tokenServices';
import { useDispatch } from 'react-redux';
import { onPrivateMessageStore, onPrivateNotificationStore } from '../redux-store/webSocketSlice';
import useModal from '../components/utils-components/Modal/useModal';
import { sendAllNotificationByUser } from '../../api/backend/user';
import { ChatIcon } from '@heroicons/react/solid';
import ModalChat from '../components/utils-components/Modal/ModalChat.jsx'
var Sock = new WebSocket("ws://localhost:8080/ws");
var stompClient = over(Sock);

//var stompClient = null;

const token = () => { if (isAuthenticated() === true) { return getToken() } else { return 'null' } }
const login = () => { if (isAuthenticated() === true) { return accountLogin() } else { return 'null' } }





const WebSocketConnection = (props) => {
  const { isShowing: isShowed, toggle: toggle } = useModal();
  const dispatch = useDispatch()
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]); 

  const [tab, setTab] = useState("CHATROOM");

  const [userData, setUserData] = useState({
    username: login(),
    receivername: '',
    connected: false,
    message: ''
  });





  useEffect(() => {

    if (isAuthenticated() === true && userData.connected === false) {
      connect()
    }




    console.log(userData);
  }, [userData]);




  const connect = () => {
    var Sock = new WebSocket("ws://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({ 'token': token() }, onConnected, onError);
    setTimeout(function () {
      console.log("connect WS" + userData);
      sendAllNotificationByUser()
    }, 1000);
  }

  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
     stompClient.subscribe('/chatroom/public', onMessageReceived);//--- chat produit? 
     stompClient.subscribe("/notifications/messages", onMessageReceived);   //--- example: for new  article notify all client
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    stompClient.subscribe('/user/' + userData.username + '/notifications/private-messages', onPrivateNotification);
    userJoin();
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }



  const onPrivateMessage = (payload) => {

    console.log("new onPrivateMessage")
    var payloadData = JSON.parse(payload.body);
    dispatch(onPrivateMessageStore(payloadData))
    console.log("dispatch onPrivateMessage end")
  }



  const onPrivateNotification = (payload) => {

    console.log("new onPrivateNotification")
    var payloadData = JSON.parse(payload.body);
    dispatch(onPrivateNotificationStore(payloadData))
    console.log("dispatch onPrivateNotification end")
  }



  const onError = (err) => {
    console.log(err);

  }


  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "message": value });
  }

  
  const sendValue=()=>{
          if (stompClient) {
            var chatMessage = {
              senderName: userData.username,
              message: userData.message,
              status:"MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
          }
  }



  const onMessageReceived = (payload)=>{
    var payloadData = JSON.parse(payload.body);
    switch(payloadData.status){
        case "JOIN":
            if(!privateChats.get(payloadData.senderName)){
                privateChats.set(payloadData.senderName,[]);
                setPrivateChats(new Map(privateChats));
            }
            break;
        case "MESSAGE":
            publicChats.push(payloadData);
            setPublicChats([...publicChats]);
            break;
    }
}
 /*
  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: "WARHAMMERMARKET",
        message: userData.message,
        status: "MESSAGE"
      };

      if (userData.username !== tab) {
        // privateChats.get(tab).push(chatMessage);
        //  setPrivateChats(new Map(privateChats));
        //  localStorage.setItem("notification",JSON.stringify(privateChats))

      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
      // localStorage.setItem("notification", JSON.stringify(privateChats))

    }
  }

*/

const sendPrivateValue=()=>{
  if (stompClient) {
    var chatMessage = {
      senderName: userData.username,
      receiverName:tab,
      message: userData.message,
      status:"MESSAGE"
    };
    
    if(userData.username !== tab){
      privateChats.get(tab).push(chatMessage);
      setPrivateChats(new Map(privateChats));
    }
    stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    setUserData({...userData,"message": ""});
  }
}

  return <div>

    {props.children}


    <footer
      className=" pointer-events-none	
      flex flex-row-reverse bg-transparent
             text-3xl text-yellow-400 text-center
             fixed
             z-50
             inset-x-0
             bottom-0
             p-4 ">

      {isAuthenticated() === true && userData.connected === true && login() ?
        <button className={isShowed ? 'hidden' : 'pointer-events-auto lg:mb-16 z-50'}
          onClick={() => {
            toggle()
          }}>
          <ChatIcon className='w-16 lg:w-24  '></ChatIcon></button>
        : null}


    </footer> 
  <div className='bottom-0'> <ModalChat
      userData={userData}
      isShowing={isShowed}
      privateChats={privateChats}
      publicChats={publicChats}
      hide={toggle}
      message={userData.message} 
      handleMessage={handleMessage}
      sendPrivateValue={sendPrivateValue}
      tab={tab}
      sendValue={sendValue}
      >
    </ModalChat></div>  </div>;
}



export default WebSocketConnection  
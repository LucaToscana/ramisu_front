import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import { accountLogin, isAuthenticated } from '../services/accountServices';
import { getToken } from '../services/tokenServices';
import { useDispatch } from 'react-redux';
import { onPrivateMessageStore, onPrivateNotificationStore } from '../redux-store/webSocketSlice';
import useModal from '../components/utils-components/Modal/useModal';

var stompClient = null;

const token = () => { if (isAuthenticated() === true) { return getToken() } else { return 'null' } }
const login = () => { if (isAuthenticated() === true) { return accountLogin() } else { return 'null' } }

const WebSocketConnection = (props) => {
  const { isShowing: isModalShowed, toggle: toggle } = useModal();

  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    username: login(),
    receivername: '',
    connected: false,
    message: ''
  });





  useEffect(() => {
    if (localStorage.getItem('notification') === null) {

      const notification = [];
      localStorage.setItem('notification', JSON.stringify(notification))
    }


    if (isAuthenticated() === true && userData.connected === false) {
      connect()
    }
    console.log(userData);
  }, [userData]);




  const connect = () => {
    var Sock = new WebSocket("ws://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({ 'token': token() }, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    // stompClient.subscribe('/chatroom/public', onMessageReceived);--- chat produit? 
    // stompClient.subscribe("/notifications/messages", onMessageReceived);   --- example: for new  article notify all client
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

  /*
  const handleMessage =(event)=>{
      const {value}=event.target;
      setUserData({...userData,"message": value});
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
          localStorage.setItem("notification",JSON.stringify(privateChats))
  
        }
        stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        setUserData({...userData,"message": ""});
        localStorage.setItem("notification",JSON.stringify(privateChats))
  
      }
  }
  
  const handleUsername=(event)=>{
      const {value}=event.target;
      setUserData({...userData,"username": value});
  }
  */


  return <div>
    {props.children}
  </div>;
}



export default WebSocketConnection  
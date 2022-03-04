import React, { useState } from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import RoutesWithNavigation from './routes/RoutesWithNavigation';
import { store } from './shared/redux-store/store';
import { accountLogin, isAuthenticated } from './shared/services/accountServices';
import {over} from 'stompjs';
import { getToken } from './shared/services/tokenServices';
/*
var  stompClient =null

const login =   accountLogin()
const token =   getToken()
/**
 * Component APP
 * with: 
 * 	- creation of redux store
 * 
 * @author Peter Mollet
 */
const App = () => {
   /* const [userData, setUserData] = useState({
        username: accountLogin(),
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
    
    if(userData.connected===false){
    //    connect()
              console.log(userData);

     } },[])
   
     const connect =()=>{
        var Sock = new WebSocket("ws://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({'token':token},onConnected, onError);
    }


    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe("/topic/messages", onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
        console.log(SON.stringify(stompClient))
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
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
                console.log(JSON.stringify(publicChats))
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
            localStorage.setItem("notification",privateChats)
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

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
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }*/
    return (
        <Provider store={ store }>
			<RoutesWithNavigation/>
		</Provider>
    );
};

export default App;
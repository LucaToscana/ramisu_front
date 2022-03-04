import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { accountLogin, isAuthenticated } from './app/shared/services/accountServices';
import { getToken } from './app/shared/services/tokenServices';

var stompClient =null;
const token = ()=>{if(isAuthenticated===true){return localStorage.getItem('token')}else{return localStorage.getItem('token')}}
const login = ()=>{if(isAuthenticated===true){return  accountLogin()}else{return accountLogin()}}  



const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: login(),
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);

    }, [userData]);

/*let sock = new SockJS("http://localhost:8080/stomp");
// Create a new StompClient object with the WebSocket endpoint
let client = stompClient.over(sock);
/*
 Start the STOMP communications, provide a callback for when the CONNECT frame arrives. Provide the username and password
 in the headers
 
client.connect({'username': 'Jimbob', 'password': 'pass'}, frame => {
    // Subscribe to "/topic/messages". Whenever a message arrives add the text in a list-item element in the unordered list.
    client.subscribe("/topic/messages", payload => {
  
      let message_list = document.getElementById('message-list');
      let message = document.createElement('li');
      message.appendChild(document.createTextNode(JSON.parse(payload.body).message));
      message_list.appendChild(message);
  
    });
  });
  
  // Take the value in the ‘message-input’ text field and send it to the server with empty headers.
  function sendMessage(){
  
    let input = document.getElementById("message-input");
    let message = input.value;
  
    client.send('/app/chat', {}, JSON.stringify({message: message}));
  
  }*/ 
    const connect =()=>{
        var Sock = new WebSocket("ws://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({'token':token()},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe("/notifications/messages", onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        stompClient.subscribe('/user/'+userData.username+'/notifications/private-messages', onPrivateMessage);

        userJoin();
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
        console.log(JSON.stringify(payloadData))
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));

                }
                break;
            case "MESSAGE"||"NOTIFICATION":


            console.log(payloadData)
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                localStorage.setItem("notification",JSON.stringify(privateChats))

                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        console.log(JSON.stringify(payloadData))

        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
            localStorage.setItem("notificationLength",privateChats.get(payloadData.senderName))
            var not= []
            privateChats.get(payloadData.senderName).forEach(element => {
                not.push(element)
            });
            localStorage.setItem("notificationLength",privateChats.get(payloadData.senderName).length)
            localStorage.setItem("notification",JSON.stringify(not))

        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
            localStorage.setItem("notification",JSON.stringify( privateChats.get(payloadData.senderName)))

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

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    {privateChats.size}
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={login()}
                readOnly // onChange={handleUsername}
                margin="normal"
              />
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    )
}

export default ChatRoom

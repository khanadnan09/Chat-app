import React, { useRef, useState, useEffect } from 'react'
import db from '../firebase';
import firebase from "firebase/compat/app";
import sound from '../IMAGES/sound.mp3';
import { useSelector } from 'react-redux'
import userImg from '../IMAGES/user.png';

const ChatComponent = ({ roomId }) => {

  const [message, setMessage] = useState("")
  const audioRef = useRef(null)
  const [displayMsg, setDisplayMsg] = useState([])
  const messagesEndRef = useRef(null);
  const userData = useSelector((state) => state.user)


  const sendMessage = () => {
    if (message === "") {
      alert("you can not send empty meassage.")
    } else {
      db.collection("rooms").doc(roomId).collection("messages").add({
        userName: userData.userName,
        message: message,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      audioRef.current.play();
      setMessage("")
    }
  }

  useEffect(() => {
    db.collection("rooms").doc(roomId).collection("messages").orderBy("timeStamp", "asc").onSnapshot((snapshot) => {
      setDisplayMsg(snapshot.docs.map(doc => doc.data()));
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    })
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [roomId])


  return (
    <>
      {/* CHATconversion */}
      <div className="col-12 Chat_conversion_area">
        <div className="row">

          {/* <div className="col-12 UserChatCol">
            <div className="UserChat">
              <div className="name__user__Img"> <img src="https://mywhatsappwebclone.netlify.app/IMAGES/ps8.jpg" alt="user__Img" className='user__Img' /> Robert</div>
              <div className="message__user">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis? <div className="timeStamp">12:40pm</div>
              </div>
            </div>
          </div> */}
          {
            displayMsg.map((msgData) => {
              return <div className={`col-12 UserChatCol ${userData.userName === msgData.userName && "user__sender"} `} key={msgData.timeStamp}>
                <div className="UserChat">
                  <div className="name__user__Img"> <img src={userData.userName === msgData.userName ? userData.userPhoto : userImg} alt="user__Img" className='user__Img' /> {msgData.userName}</div>
                  <div className="message__user">{msgData.message}<div className="timeStamp">{new Date(msgData.timeStamp?.seconds * 1000).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            })
          }
          <div className='col-12' ref={messagesEndRef} ></div>


          {/* <div className="col-12 UserChatCol user__sender">
            <div className="UserChat">
              <div className="name__user__Img"> <img src="https://mywhatsappwebclone.netlify.app/IMAGES/ps5.jpg" alt="user__Img" className='user__Img' />Adnan khan</div>
              <div className="message__user">
                <img src="https://mywhatsappwebclone.netlify.app/IMAGES/ps9.jpg" alt="IMG" className='sendImgUSER' />
                <div className="timeStamp">12:40pm</div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
      {/* Send messageg Box/Input */}
      <div className="col-12 top_left_header d-flex align-items-center" style={{ padding: "7.5px 16px", backgroundcolor: "#f0f2f5" }}>
        <div className="input_before_icons d-flex align-items-center">
          <input type="file" id='sendImg' style={{ display: "none" }} />
          <label htmlFor="sendImg"><ion-icon name="image" id="send-img"></ion-icon>
          </label>
        </div>
        <input type="text" placeholder="Type a message" className="chat_box" value={message} onChange={e => setMessage(e.target.value)} />
        <ion-icon name="send-sharp" id="send-icon" onClick={sendMessage}></ion-icon>
        <audio ref={audioRef} src={sound}></audio>
      </div>
    </>
  )
}

export default ChatComponent
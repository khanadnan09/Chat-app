import React, { useEffect, useState } from 'react'
import db from '../firebase';

const ChatHeader = ({ roomName, roomId, roomImage}) => {
 console.log(roomImage)
  const [lastMsg, setLastMsg] = useState("")
  useEffect(() => {
    db.collection("rooms").doc(roomId).collection("messages").orderBy("timeStamp", "desc").onSnapshot((snap) => {
      setLastMsg(snap.docs.map(doc => doc.data()))
    })
  }, [roomId])
  return (
    <div className="col-12 top_left_header d-flex justify-content-between" style={{ padding: " 7.5px 16px" }}>
      <div className="user_wraper d-flex align-items-center">
      
        {
          roomImage !== undefined ? <img src={roomImage} alt="" className="uesr_top_left_header" style={{ cursor: "pointer" }} /> 
          :
          <ion-icon name="person" id="groupIcon"></ion-icon>
        }

        <div className="text_info_wrapper ps-2">
          <span className="user_name mb-1">{roomName}</span>
          <span className="user_sm_msg position-relative" style={{ top: "-5px", fontSize: "11px" }}>last seen {lastMsg.length ? new Date(lastMsg[0].timeStamp?.seconds * 1000).toLocaleString() : "Loading..."}</span>
        </div>
      </div>
      <ul className="top_left_header_ul d-flex align-items-center">
        <li className="me-1" style={{ cursor: "pointer" }}>
          <ion-icon name="search" role="img" className="md hydrated" aria-label="search"></ion-icon>
        </li>
        <li className="position-relative" style={{ cursor: "pointer" }}>
          <ion-icon name="ellipsis-vertical" className="dropdown_options md hydrated" role="img" aria-label="ellipsis vertical"></ion-icon>
        </li>
      </ul>
    </div>
  )
}

export default ChatHeader
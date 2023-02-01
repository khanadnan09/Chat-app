import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatComponent from './ChatComponent'
import ChatHeader from './ChatHeader'
import db from '../firebase';

const Chat = () => {
  const [roomName, setRoomName] = useState("")

  const { roomId } = useParams()

  useEffect(() => {
    db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>{
     roomId ? setRoomName(snapshot.data().name) : setRoomName()
    })
  }, [roomId])
  return (
    <div className="col-lg-8 p-0">
      <ChatHeader roomName={roomName} roomId={roomId} />
      <ChatComponent roomId={roomId} />
    </div>
  )
}

export default Chat
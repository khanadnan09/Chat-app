import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatComponent from './ChatComponent'
import ChatHeader from './ChatHeader'
import db from '../firebase';
import EmptyChatComp from './EmptyChatComp';

const Chat = () => {
  const [roomName, setRoomName] = useState("")
  const [roomImage, setRoomImage] = useState("")

  const { roomId } = useParams()

  useEffect(() => {
    db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
      if (roomId) {
        setRoomName(snapshot.data().name)
        setRoomImage(snapshot.data().image)
      }
    })
  }, [roomId])


  return (
    <div className="col-lg-8 p-0">
      {
        roomId ? <>
          <ChatHeader roomName={roomName} roomId={roomId} roomImage={roomImage}/>
          <ChatComponent roomId={roomId} />
        </>
          : <EmptyChatComp />
      }

    </div>
  )
}

export default Chat
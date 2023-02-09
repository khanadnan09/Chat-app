import React from 'react'
import SideBarHead from '../COMPONENTS/SideBarHead';
import SideBarGroups from './SideBarGroups';
import { useEffect, useState } from 'react'
import db from '../firebase';
const Sidebar = () => {

  const [rooms, setRooms] = useState([])
  const [seacrchRoom, setSeacrchRoom] = useState("")
  const [seacrchRoomData, setSeacrchRoomData] = useState([])

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  const seacrchRoomHandle = (e) => {
    setSeacrchRoom(e.target.value)
    db.collection("rooms").where("name", ">=", `${seacrchRoom}`).where('name', '<=', `${seacrchRoom}\uf8ff`)
      .get()
      .then((snapshot) => {
        setSeacrchRoomData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      })
  }
 
  return (
    <>
      <div className="col-lg-4">
        <div className="row">
          <div className="col-12 p-0">
            <SideBarHead />
          </div>
          <div className="col-12 searchBar">
            <ion-icon name="search-outline" role="img" aria-label="search outline"></ion-icon><input type="text" placeholder="Search or start new chat" value={seacrchRoom} onChange={seacrchRoomHandle}/>
          </div>
          <div className="col-12 p-0 SideBarGroups">
            {
              seacrchRoom !== "" ? seacrchRoomData.map((data) => {
                return <SideBarGroups key={data.id} id={data.id} name={data.name} image={data.image} />
              }) :
                rooms.map((room) => {
                  return <SideBarGroups key={room.id} id={room.id} name={room.data.name} image={room.data.image} />
                })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
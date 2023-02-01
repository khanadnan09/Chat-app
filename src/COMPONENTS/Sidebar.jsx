import React from 'react'
import SideBarHead from '../COMPONENTS/SideBarHead';
import SideBarGroups from './SideBarGroups';
import { useEffect, useState } from 'react'
import db from '../firebase';
const Sidebar = () => {

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])
  return (
    <>
      <div className="col-lg-4">
        <div className="row">
          <div className="col-12 p-0">
            <SideBarHead />
          </div>
          <div className="col-12 searchBar">
            <ion-icon name="search-outline" role="img" class="md hydrated" aria-label="search outline"></ion-icon><input type="text" placeholder="Search or start new chat" />
          </div>
          <div className="col-12 p-0 SideBarGroups">
            {
              rooms.map((room) => {
                return <SideBarGroups key={room.id} id={room.id} name={room.data.name} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
import React from 'react'
import db from '../firebase';
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLogOut } from '../ReduxStore/UserSlice'
import userImg from '../IMAGES/user.png';

const SideBarHead = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user)


    const createRoom = () => {
        const roomName = prompt("Enter the room name")
    
        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
                // image:image
            })
          
        }
    }

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(setUserLogOut({
                userName: "",
                userPhoto: "",
                userEmail: ""
            }))
        })
    }


    return (
        <div className='sidebar_top d-flex align-items-center'>
            <div className="User__img flex-fill">
                <img src={userData.userPhoto ? userData.userPhoto: userImg}  alt="userPhoto"/>
            </div>
            <div className="sidebar_top_icons d-flex">
                <ion-icon name="add-outline" className="addGroup" title="Create New Group" onClick={createRoom}></ion-icon>
                <ion-icon name="log-out-outline" className="log__out" title="Log Out" onClick={signOut} ></ion-icon>
            </div>
        </div>

    )
}

export default SideBarHead
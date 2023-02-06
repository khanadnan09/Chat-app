import React, { useState } from 'react'
import db from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLogOut } from '../ReduxStore/UserSlice'
import userImg from '../IMAGES/user.png';


const SideBarHead = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user)
    const [roomName, setRoomName] = useState("")
    const [img, setImg] = useState([]);

    const storage = getStorage();

    const createRoom = () => {

        // handling images
        const storageRef = storage && img.name && ref(storage, `/RoomsImage/${img.name}`);
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        if (img.name && roomName) {
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        db.collection("rooms").add({
                            name: roomName,
                            image: url
                        })
                    });
                }
            );
        }
        if (!img.name && roomName !=="") {
            db.collection("rooms").add({
                name: roomName,
            })
        }
        if ( roomName ==="") {
           alert("you can not create room without name.")
        }
        setRoomName("")
        setImg("")
    }
    //  handling file input
    const handleChange = (event) => {
        setImg(event.target.files[0])
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
        <>
            <div className='sidebar_top d-flex align-items-center'>
                <div className="User__img flex-fill">
                    <img src={userData.userPhoto ? userData.userPhoto : userImg} alt="userPhoto" />
                </div>
                <div className="sidebar_top_icons d-flex">
                    <ion-icon name="add-outline" className="addGroup" title="Create New Group" data-bs-toggle="modal" data-bs-target="#exampleModal"></ion-icon>
                    <ion-icon name="log-out-outline" className="log__out" title="Log Out" onClick={signOut} ></ion-icon>
                </div>
            </div>
            {/* Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Create New Room.
                            </h1>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <span className="mb-2">Enter the room name <span className="text-danger">*</span> </span>
                            <input type="text" placeholder="Type the new room name" value={roomName} onChange={e => setRoomName(e.target.value)} />
                            <input
                                type="file"
                                name=""
                                id="RoomImg"
                                onChange={handleChange}
                                style={{ display: "none" }}
                            />

                            <label htmlFor="RoomImg" className="d-flex align-items-center mt-3 mb-2">
                                <span className="pe-2">Select the room image</span>
                                <ion-icon name="image" id="send-img"></ion-icon>
                            </label>
                            {
                                img.name ? <div style={{ fontSize: "12px" }}>Selected image : <span className='text-danger'>{img.name}</span></div> : ""
                            }
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setRoomName("")
                                    setImg("")
                                }}
                            >
                                Discard
                            </button>
                            <button type="button" className="btn" onClick={createRoom} data-bs-dismiss="modal">
                                Create Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SideBarHead
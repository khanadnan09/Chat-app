import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import db from '../firebase';

const SideBarGroups = ({ id, name, image }) => {
    const [lastMsg, setLastMsg] = useState("")

    useEffect(() => {
        db.collection("rooms").doc(id).collection("messages").orderBy("timeStamp", "desc").onSnapshot((snap) => {
            setLastMsg(snap.docs.map(doc => doc.data()))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Link to={`/room/${id}`} style={{ textDecoration: "none" }}>
            <div className="col-12 single_contact d-flex align-items-center">
                {
                    image ? <img src={image} alt="GruopImg" /> : <ion-icon name="person" id="groupIcon"></ion-icon>
                }


                <div className="wraper_user_text">
                    <span className="user_name">{name} <span className="time">{
                        lastMsg[0] ? new Date(lastMsg[0].timeStamp?.seconds * 1000).toLocaleTimeString() : "Loading..."
                    }</span> </span>
                    <span className="user_sm_msg d-flex justify-content-between">{
                        lastMsg.length ? lastMsg[0].message === "" ? lastMsg[0].fileType.startsWith('image/') ? <ion-icon name="camera"></ion-icon> : lastMsg[0].fileType.startsWith('video/') ? <ion-icon name="videocam-sharp"></ion-icon> : lastMsg[0].fileType ? <ion-icon name="document-text-sharp"></ion-icon> : "" : lastMsg[0].message : "Loading..."
                    }
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default SideBarGroups
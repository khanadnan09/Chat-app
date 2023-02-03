import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import db from '../firebase';

const SideBarGroups = ({ id, name }) => {

    const [lastMsg, setLastMsg] = useState("")

    useEffect(() => {
        db.collection("rooms").doc(id).collection("messages").orderBy("timeStamp", "desc").onSnapshot((snap) => {
            setLastMsg(snap.docs.map(doc => doc.data()))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
console.log(lastMsg)
    return (
        <Link to={`/room/${id}`} style={{ textDecoration: "none" }}>
            <div className="col-12 single_contact">
                <img src="https://mywhatsappwebclone.netlify.app/IMAGES/ps1.jpg" alt="GroupImg" />

                <div className="wraper_user_text">
                    <span className="user_name">{name} <span className="time">{
                        lastMsg[0] ? new Date(lastMsg[0].timeStamp?.seconds * 1000).toLocaleTimeString() : "Loading..."
                    }</span> </span>
                    <span className="user_sm_msg d-flex justify-content-between">{
                        lastMsg.length ? lastMsg[0].message === "" ? <ion-icon name="camera"></ion-icon> : lastMsg[0].message : "Loading..."
                    }
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default SideBarGroups
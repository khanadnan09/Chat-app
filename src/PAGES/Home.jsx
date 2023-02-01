import React from 'react'
import Sidebar from '../COMPONENTS/Sidebar';
import Chat from '../COMPONENTS/Chat';

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 top_gradient_behind"></div>
                <div className="col-12 d-flex justify-content-center">
                    <div className="row Main_window">
                        <Sidebar />
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
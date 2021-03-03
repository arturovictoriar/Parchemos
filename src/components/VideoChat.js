// Import Libraries
import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import '../styles/VideoChat.css';

const VideoChat = ({ User, MyStream }) => {
    const { roomId } = useParams();

    useEffect(() => {
        MyStream(roomId, document.getElementById('Vchat__grid__videos'));
    })

    return (
        <div className="Vchat__main">
            <div className="Vchat__section__video">
                < div className="Vchat__box__videos">
                    <div id="Vchat__grid__videos">
                        <p>{roomId} {User}</p>
                    </div>
                </div>
                <div className="Vchat__box__video__controller">

                </div>
            </div>
            <div className="Vchat__section__chat">
                <div className="Vchat__box__messages">

                </div>
            </div>
        </div>

    );
}

export default VideoChat;
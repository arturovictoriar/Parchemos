import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import setupSocketPeer from "../socketPeer/index"


const Hall = ({User, setMyStream}) => {
    const [Room, setRoom] = useState("");

    const history = useHistory();

    const availableMedia = async () => {
        let myStream = {};

        await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            myStream = stream;
            console.log("Stream loading Success");
        }).catch(e => {
            console.log("Stream loading Error: ", e);
        });
        return (myStream);
    }

    const handler_new_room = async (e) => {
        let network_error = false;
        const newRoom = await fetch('http://localhost:5000/createRoomId').then(
			response => {
				return response.json()
            }).catch(() => {
                network_error = true;
            });
        if (!newRoom || network_error) {
            alert("Sorry! Server Down");
            return;
        }
        const myStream = await availableMedia();
        setMyStream(setupSocketPeer(myStream));
        history.push(`/parche/room-${newRoom.room}`);
        e.preventDefault();
    }

    const handler_old_room = async () => {
        const myStream = await availableMedia();
        setMyStream(setupSocketPeer(myStream));
        history.push(`/parche/room-${Room}`);
    }

    const search_room = () => {
        return (true);
    }

    const roomAlerts = (roomFound) => {
        if (roomFound === true) {
            alert("Room Found");
        }
        else {
            alert("Room NOT Found");
        }
    }

    const handler_exist_room_by_key = (e) => {
        if (e.key === "Enter") {
            const roomFound = search_room();
            roomAlerts(roomFound);
            handler_old_room();
        }
    }

    const handler_exist_room_by_button = (e) => {
        const roomFound = search_room();
        roomAlerts(roomFound);
        handler_old_room();
    }

    const handler_room_typed = (e) => {
        setRoom(e.target.value);
    }

    return (
        <div>
            <h1> Welcome {User}!</h1>
            <button onClick={handler_new_room} >New meeting</button>
            <span>
                <input
                    type="text"
                    placeholder="Enter a link code"
                    onKeyPress={handler_exist_room_by_key}
                    onChange={handler_room_typed}
                />
                <button onClick={handler_exist_room_by_button}>Join</button>
            </span>

        </div>
    );
}

export default Hall;
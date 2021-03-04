import io from 'socket.io-client';
// eslint-disable-next-line
import Peer from "peerjs";
const peerConnection = require('../config/peer.config');
const {socketHostPort} = require('../config/socket.config');

const setupSocketPeer = (MyStream) => {
    const setupSP = () => {
        const startSocketPeer = (roomId, videoGridContainer) => {
            const socket = io(socketHostPort);

            const myPeer = new Peer('', peerConnection);
            const videoGrid = videoGridContainer;
            const peers = {};

            const myVideo = document.createElement('video');
            myVideo.muted = true;
            MyStream.getVideoTracks()[0].enabled = false;

            addVideoStream(myVideo, MyStream);

            myPeer.on('open', id => {
                socket.emit('join-room', roomId, id)  
            })

            socket.on('user-connected', userId => {
                connectToNewUser(userId, MyStream)
            })

            socket.on('user-disconnected', userId => {
                if (peers[userId]) peers[userId].close()
            })

            myPeer.on('call', call => {
                peers[call.peer] = call;
                call.answer(MyStream)
                const video = document.createElement('video')
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
                call.on('close', () => {
                    video.remove()
                })
            })

            function connectToNewUser(userId, stream) {
                const call = myPeer.call(userId, stream)
                const video = document.createElement('video')
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
                call.on('close', () => {
                    video.remove()
                })
                
                peers[userId] = call;
            }

            function addVideoStream(video, stream) {
                video.srcObject = stream
                video.addEventListener('loadedmetadata', () => {
                    video.play()
                })
                if (videoGrid) {
                    videoGrid.append(video)
                }
            }
        }
        return (startSocketPeer)
    }

    return (setupSP);
}

export default setupSocketPeer
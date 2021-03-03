import io from 'socket.io-client';
// eslint-disable-next-line
import Peer from "peerjs";

const setupSocketPeer = (MyStream) => {
    const setupSP = () => {
        const startSocketPeer = (roomId, videoGridContainer) => {
            const socket = io("http://localhost:5000");

            const myPeer = new Peer('', {
                path: '/videochat',
                host: 'localhost',
                port: '5000'
            });
            const videoGrid = videoGridContainer;
            const peers = {};

            const myVideo = document.createElement('video');
            myVideo.muted = true;

            addVideoStream(myVideo, MyStream);

            myPeer.on('open', id => {
                socket.emit('join-room', roomId, id)
            })

            socket.on('user-connected', userId => {
                console.log("user-connected", userId);
                connectToNewUser(userId, MyStream)
            })

            socket.on('user-disconnected', userId => {
                if (peers[userId]) peers[userId].close()
            })

            myPeer.on('call', call => {
                call.answer(MyStream)
                const video = document.createElement('video')
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
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
                console.log(stream);
                peers[userId] = call
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
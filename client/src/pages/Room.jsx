import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider"
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { Link } from "react-router-dom";

const Room = () => {
    const socket = useSocket();

    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined the room ${id}`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket])

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })
        setMyStream(stream);
        console.log(`Incoming call from ${from}`);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans })

    }, [socket]);

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("Call Accepted!");
        sendStreams();
    }, [sendStreams])

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [socket, remoteSocketId]);

    const handleNegoNeededIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
    }, [socket])

    const handleNegoNeededFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        }
    }, [handleNegoNeeded]);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            setRemoteStream(remoteStream[0]);
        })
    }, [])

    useEffect(() => {
        socket.on("user:joined", handleUserJoined)
        socket.on("incoming:call", handleIncomingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeededIncoming);
        socket.on("peer:nego:final", handleNegoNeededFinal);

        return () => {
            socket.off("user:joined", handleUserJoined)
            socket.off("incoming:call", handleIncomingCall)
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeededIncoming);
            socket.off("peer:nego:final", handleNegoNeededFinal);
        }
    }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeededIncoming, handleNegoNeededFinal]);


    return (
        <div className="flex flex-col justify-center items-center p-8 w-full">
            <h1>Room</h1>
            <h4 >{remoteSocketId ? "Connected" : "No one in the room"}</h4>
            {myStream && <button onClick={sendStreams} className="my-4 font-bold text-2xl border-[1px] border-black rounded-xl px-3 text-center">Send Stream</button>}
            {remoteSocketId && <button onClick={handleCallUser} className="bg-red-500 rounded-xl p-2 text-white">CALL</button>}
            <div className="flex gap-8">

                {myStream && (
                    <div className="flex flex-col gap-2">
                        <h1 className="my-4 font-bold text-2xl border-[1px] border-black rounded-xl px-3 text-center">My Stream</h1>
                        <ReactPlayer playing muted height="250px" width="400px" url={myStream} />
                    </div>
                )
                }
                {remoteStream && (
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <h1 className="my-4 font-bold text-2xl border-[1px] border-black rounded-xl px-3 text-center">Other&apos;s Stream</h1>
                        <ReactPlayer playing muted height="250px" width="400px" url={remoteStream} />
                        <Link to="/" className="bg-red-500 rounded-xl p-2 text-white">End Call</Link>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Room

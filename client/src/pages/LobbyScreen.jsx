import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();

    const navigate = useNavigate();

    console.log("socket: ", socket);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();


        console.log({ email, room });
        socket.emit("room:join", { email, room });
    }, [email, room, socket]);

    const handleRoomJoin = useCallback((data) => {
        const { email, room } = data;
        console.log("data from be: ", data);
        navigate(`/room/${room}`);
    }, [navigate])

    useEffect(() => {
        socket.on("room:join", handleRoomJoin);

        return () => {
            socket.off("room:join", handleRoomJoin);
        }
    }, [socket, handleRoomJoin])


    return (
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <h1 className="mt-8">Lobby</h1>
            <form onSubmit={handleSubmit} className="flex flex-col p-4 w-1/2 rounded-xl shadow-2xl gap-2">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border-[1px] border-black" />
                <br></br>
                <label htmlFor="room">Room</label>
                <input type="room" placeholder="room" value={room} onChange={(e) => setRoom(e.target.value)} className="p-2 border-[1px] border-black" />
                <br></br>
                <button className="bg-blue-500 hover:bg-blue-300 rounded-xl p-2 text-white">Join</button>
            </form>
        </div>
    )
}

export default LobbyScreen




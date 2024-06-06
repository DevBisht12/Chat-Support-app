import "./support.css";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
// import { setSocketIO } from "../../Redux/features/socketIoSlice.js";
// import { useDispatch } from "react-redux";

const TestSupport = ({Soccket}) => {

  console.log(Soccket)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { roomId } = useSelector((state) => state.roomId);
  const [socket, setSocket] = useState(null);
  const {socketIO} =useSelector((state)=>state.socketIO)
  console.log(user)
  console.log(socketIO)

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    // console.log(socket)
    if(newSocket){
      newSocket.emit("joinRoom", { name: user.name, role: user.role });
    }

    if(newSocket){
      newSocket.on("chatStarted", (data) => {
        console.log(data.userId);
      });
    }

    if(newSocket){
      newSocket.on("receiveMessage", ( message, sender,roomId ) => {
        console.log(message,sender,roomId)
        const receivedMessage = {
          message,
          user: sender,
          time: new Date().toLocaleString(),
        };
        console.log(receivedMessage)
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
  
    }
    return () => {
      if(newSocket){
        newSocket.disconnect();
      }
    };
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      message,
      user: user?.role,
      time: new Date().toLocaleString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    if (socket) {
      socket.emit("sendMessage", {
        roomId,
        message: newMessage.message,
        sender: user.role,
      });
    if(socket){
      socket.on("receiveMessage", ( message, sender,roomId ) => {
        console.log(message,sender,roomId)
      })
    }
      
    }
  };


  return (
    <div className="support">
      <div className="support_container">
        <div className="side_menu"></div>
        <div className="chatBox">
          <div className="chatBox_header">
            <Link to="/">
              <h1>LoGo</h1>
            </Link>
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
              alt=""
            />
          </div>
          <div className="chatBox_Main">
            {messages.map((msg, i) => (
              <div key={i} style={{ width: "100%", border: "2px" }}>
                <Message
                  message={msg.message}
                  user={msg.user}
                  time={msg.time}
                />
              </div>
            ))}
          </div>
          <div className="chat_form">
            <form className="chat_form" onSubmit={handleSubmit}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Message"
              />
              <button type="submit">
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSupport;


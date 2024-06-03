import "./support.css";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector,useDispatch } from "react-redux";
import { IoExitOutline } from "react-icons/io5";
import { getRoomId } from "../../Redux/features/supportSlice";
import SupportMessage from "../../components/SupportMessage/SupportMessage";

const TestSupport = ({ msg }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { roomId } = useSelector((state) => state.roomId);
  const [socket, setSocket] = useState(null);
  const { socketIO } = useSelector((state) => state.socketIO);

  const dispatch=useDispatch()

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    if (newSocket) {
      newSocket.emit("joinRoom", { name: user.name, role: user.role });

      newSocket.on("chatStarted", (data) => {
        console.log(data.userId);
      });

      newSocket.on("receiveMessage", (message, sender, roomId) => {
        console.log(message, sender, roomId);

        const receivedMessage = {
          message,
          user: sender,
          time: new Date().toLocaleString(),
        };

        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user.name, user.role]);

  useEffect(() => {
    if (msg?.user === "user") {
      setMessages((prevMessages) => [...prevMessages, msg]);
    }
  }, [msg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      message: message,
      user: user?.role,
      time: new Date().toLocaleString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    if (socket) {
      socket.emit("sendMessage", {
        roomId: roomId,
        message: newMessage.message,
        sender: user.role,
      });
    }
  };

  const handleLeaveRoom=()=>{
    console.log('leave btn clicked')
    // window.alert(`roomId: ${roomId}, userId: ${user.id}`);

      socket.emit("leaveRoom", {
        roomId: roomId,
        supportId: user.id,
      });
  }

  // console.log(messages);
  return (
    <div className="support">
      <div className="support_container">
        <div className="side_menu"></div>
        <div className="chatBox">
          <div className="chatBox_header">
            <Link to="/">
              <h1>LoGo</h1>
            </Link>
            <button class="leave-btn" onClick={handleLeaveRoom}>
              <IoExitOutline />
            </button>
          </div>
          <div className="chatBox_Main">
            {messages.map((msg, i) => (
              <div key={i} style={{ width: "100%", border: "2px" }}>
                <SupportMessage
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

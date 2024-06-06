import ImgMediaCard from "../../components/Card";
import video from "../../../public/Banner_video.mp4";
import { MdArrowRightAlt } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import ChatSupport from "../../components/chat support/chatSupport";
import "./Home.css";
import Message from "../../components/Message/Message";
import { useSelector } from "react-redux";


const Home = () => {
  const [toggleChatBox, setToggleChatBox] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState();
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { socketIO } = useSelector((state) => state.socketIO);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    if (newSocket) {
      newSocket.on("chatStarted", (data) => {
        console.log(data.userId);
      });
    }

    if (newSocket) {
      newSocket.on("receiveMessage", (message, sender, roomId) => {
        console.log(message, sender, roomId);
        setRoomId(roomId);

        if(sender==='support'){
          const receivedMessage = {
            message,
            user: sender,
            time: new Date().toLocaleString(),
          };
  
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
       
      });
    }

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const ToggleChatBox = () => {
    setToggleChatBox(true);
  };

  const handleStartChat=()=>{
    console.log('handle start chat')
    if (socket) {
      if (user?.role === "user") {
        if (!roomId) {
          socket.emit("messageToSupport", { 
            userId: user.id,
            sender:user.role
          }); 
        }
      }
    }
  }
  const handleChatMessage = (e) => {
    e.preventDefault();

    const newMessage = {
      message,
      user: user?.role,
      time: new Date().toLocaleString(),
    };
    // setMessage()
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    if (socket) {
      if (user?.role === "user") {
        if (!roomId) {
          socket.emit("messageToSupport", { 
            userId: user.id,
            message: newMessage.message,

            sender:user.role
          });
          
        } else {
          socket.emit("sendMessage", {
            roomId,
            message: newMessage.message,
            sender: user.role,
          });
        }
      }
    }
  };

  console.log(messages)

  return (
    <div className="home">
      <div onClick={ToggleChatBox}>
        <ChatSupport id="chatSupport" />
      </div>
      {toggleChatBox && (
        <div className="chat_box">
          <div className="Chat_box_header">
            <h1>LoGo</h1>
            <IoIosArrowDown onClick={() => setToggleChatBox(false)} />
          </div>
          <div className="main_chat">
            {messages.length>0?messages.map((msg, i) => (
              <div key={i} style={{ width: "100%", border: "2px" }}>
                <Message
                  message={msg.message}
                  user={msg.user}
                  time={msg.time}
                />
              </div >
            )):<div className="start_chat">
              <button onClick={handleStartChat} >Start Chat</button>
              </div>}
            {}
          </div>
          <div className="Chat_box_footer">
            <form action="" onSubmit={handleChatMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button type="submit">
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="hero_Section gradient-background">
        <div className="heroMain">
          <h1>
            We can help your <br /> Business beat fraud and <br /> Build{" "}
            <span
              style={{
                color: "#FFC107",
                fontWeight: 700,
                fontFamily: '"PT Sans", sans-serif',
              }}
            >
              Trust
            </span>
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Distinctio, cum. Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Distinctio, cum
          </p>
          <div className="hero_img">
            <img src="https://i.postimg.cc/HkXDtJb2/Screenshot-84.png" alt="" />
          </div>
        </div>
      </div>
      <div className="fade_div"></div>
      <div className="services ">
        <h2>Our Services</h2>
        <div className="services_card">
          <ImgMediaCard
            title={"Identity Verification"}
            imgSrc={
              "https://onfido.com/wp-content/uploads/2022/08/verification-experience-inline-blog-image.jpg"
            }
          />
          <ImgMediaCard
            title={"Age Checks"}
            imgSrc={
              "https://onfido.com/wp-content/uploads/2022/07/Age-Verification-Thumbnail-compressed.png"
            }
          />
          <ImgMediaCard
            title={"Digital ID"}
            imgSrc={
              "https://onfido.com/wp-content/uploads/2023/03/Adverse-Media-Screening-Header-1502x800-1.png"
            }
          />
        </div>
      </div>
      <div className="banner_section">
        <div className="banner_left_sec">
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="banner_right_sec">
          <h2>Post Office unique identity solutions</h2>
          <p>
            Our inclusive, unique solution allows you to verify customers who
            want or need in person support by using Post Office’s branch
            network. Works alongside our online verification solutions.
          </p>
          <Link>
            Find out more <MdArrowRightAlt />
          </Link>
        </div>
      </div>
      <div className="how_to_start_sec">
        <h2>How to get started</h2>
        <div className="main_container">
          <div className="main_left">
            <div className="main_1">
              <h3>Web portal</h3>
              <p>
                No integration required. Send and review identity check requests
                in seconds.
              </p>
            </div>
            <div className="main_2">
              <h3>Developer hub</h3>
              <p>
                Use our APIs and SDKs to build the solution that works for you.
                Easy to use and support available from our integrations team.
              </p>
            </div>
          </div>
          <div className="main_right">
            <div className="main_3">
              <h3>Integrations</h3>
              <p>
                Yoti is integrated into over 70 of the biggest SAAS products.
              </p>
            </div>
            <div className="main_4">
              <img
                src="https://www.yoti.com/wp-content/uploads/2024/03/Woo.png"
                alt=""
              />
              <img
                src="https://www.yoti.com/wp-content/uploads/2024/03/Zendesk.png"
                alt=""
              />
              <img
                src="https://www.yoti.com/wp-content/uploads/2024/03/Salesforce.png"
                alt=""
              />
              <img
                src="https://www.yoti.com/wp-content/uploads/2024/03/Hubspot-150x46.png"
                alt=""
              />
              <img
                src="https://www.yoti.com/wp-content/uploads/2024/03/Drive.png"
                alt=""
              />
              <img
                src="https://www.yoti.com/wp-content/uploads/2024/03/Microsoft-365-150x25.png"
                alt=""
              />
              <img
                src="https://www.yoti.com/wp-content/uploads/2024/03/Stripe.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="banner_sec2">
        <div className="banner_sec2_img">
          <img
            src="https://www.yoti.com/wp-content/uploads/2024/03/Security_2X-489x500.webp"
            alt=""
          />
        </div>
        <div className="banner_sec2_main">
          <h3>Built with security and privacy as a priority</h3>
          <p>
            Our systems are built in a way that means we cannot mine or sell
            data to third parties. Once we’ve completed our security checks, we
            can’t access any user details. We’re trusted by regulators for
            adhering to the highest standards of security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;


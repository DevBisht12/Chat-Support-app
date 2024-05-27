import Chat from "./components/Chat";
import { useEffect, useState, useRef } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import "./App.css";
import { io } from "socket.io-client";
import Footer from "./components/Footer/Footer";
import SignUp from "./pages/Signup/SignUp";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "./pages/Dashboard/Dashboard";
import UpdateUser from "./pages/updateUser/updateUser";
import Login from "./pages/Login/Login";
import Alert from "./components/Alert/Alert";
import { getRoomId } from "./Redux/features/supportSlice.js";
import { setSocketIO } from "./Redux/features/socketIoSlice.js";
import TestSupport from "./pages/Testing/Testing.jsx";


function App() {
  return (
    <BrowserRouter>
      <WithoutHeaderandFooter />
    </BrowserRouter>
  );
}

function WithoutHeaderandFooter() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [supportJoinedRoom, setSupportJoinedRoom] = useState();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [roomId, setRoomId] = useState();
  const [userMessage,setUserMessage]=useState({
    message:"",
    sender:"",
    time:""
  })
  const socketRef = useRef(null);
  const { isAuthenticated } = useSelector((state) => state.user.user);
  const { user } = useSelector((state) => state.user);
  const {socketIO}= useSelector((state)=>state.socketIO)
  console.log(socketIO)

  useEffect(() => {
    if (isAuthenticated && user) {
      const { id, name, email, role } = user;
      setUserData({ id, name, email, role });
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && userData.id && !socketRef.current) {
      const newSocket = io("http://localhost:5000");
      // dispatch(setSocketIO(newSocket))
      socketRef.current = newSocket;
      console.log(socketRef.current)

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      newSocket.emit("joinRoom", userData);

      if (userData.role === "support") {
        newSocket.on("requestFromUser", (id) => {
          console.log(id);
          setRoomId(id);
          setShowAlert(false);
          dispatch(getRoomId(id));
          setShowAlert(true);
        });
      }

      newSocket.on("chatStarted", (data) => {
        console.log(data.userId);
        setShowAlert(false); 
        dispatch(getRoomId(data.userId));
      });
      newSocket.on("receiveMessage",(message,sender,roomId)=>{
        console.log(roomId,message,sender)
        setUserMessage({
          message,
          user: sender,
          time: new Date().toLocaleString(),
        })
      })

      
      return () => {
        newSocket.disconnect();
        socketRef.current = null;
      };
    }
  }, [isAuthenticated, userData, dispatch]);


  console.log(userMessage)
  const handleJoinSupport = (options) => {

    if (socketRef.current) {
      socketRef.current.emit("acceptUserJoinRequest", {
        supportId: options.id,
        name: options.name,
        roomId: roomId,
      });
      navigate("/support");
      setShowAlert(false);
      socketRef.current.on("chatStarted", (data) => {
        console.log(data.userId);
        dispatch(getRoomId(data.userId));
        setShowAlert(false);
      });
    }
  };



  return (
    <>
      {location.pathname !== "/signup" &&
        location.pathname !== "/support" &&
        location.pathname !== "/login" &&
        location.pathname !== "/user/dashboard" && <Header />}
      {showAlert && (
        <Alert id={user.id} name={user.name} handleButton={handleJoinSupport} />
      )}
      <Routes>
        <Route path="/" element={<Home supportJoinedRoom={supportJoinedRoom} Soccket={socketRef.current} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/support" element={<Support RoomId={roomId || ""} SocketIO={socketIO||""} />} /> */}
        {/* <Route path="/support" element={<TestSupport Soccket={socketRef.current}  />} /> */}
        <Route path="/support" element={<TestSupport msg={userMessage} />}/>
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
      </Routes>
      {location.pathname !== "/signup" &&
        location.pathname !== "/support" &&
        location.pathname !== "/login" &&
        location.pathname !== "/user/dashboard" && <Footer />}
    </>
  );
}

export default App;





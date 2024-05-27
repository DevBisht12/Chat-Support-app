import "./dashboard.css";
import { useEffect,useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineHelp } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GoLinkExternal } from "react-icons/go";
import Avatar from '@mui/joy/Avatar';
import { FiActivity } from "react-icons/fi";
import { useSelector } from "react-redux";


const Dashboard = () => {
  
  const [userData,setUserData] =useState([]);
  const {user}= useSelector((state)=>state.user)
  console.log(user)


  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/getallusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const userData = await res.json();
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };
  
    getAllUsers();
  }, []);

  // console.log(userData)

  return (
    <div className="dashboard">
      <div className="side_menuu">
        <Link to="/">
          <h1>LoGo</h1>
        </Link>
        <div className="sideMenu_main">
          <Link to="/dashboard">
            <p>
              <AiFillHome /> Home
            </p>
          </Link>
          <p>
            <BiSupport /> Support
          </p>
          <p>
            <HiUsers /> Users
          </p>
          <p>
            {" "}
            <IoMdSettings /> Setting
          </p>
          <p>
            <MdOutlineHelp /> Help
          </p>
        </div>
        <div className="seideMenu_footer">
            <p>👋 Hello {user?user.name:Guest}</p>
            <Avatar/>
        </div>
      </div>
      <div className="main_Dashboard">
        <div className="dashboard_heading">
            <img src="https://i.postimg.cc/Wb9kYsK5/dashboard.png" alt="" />
            <h2>Dashboard</h2>
        </div>
      
        <div className="bashboard_head">
          
        <div className="total_user_active">
            <p><HiUsers/> Total active user</p>
            <h1>41</h1>
        </div>
        <hr />
        <div className="total_support_active">
           <p><BiSupport/> Total active support</p>
           <h1>11</h1>
        </div>
        <hr />
        <div className="total_dummy_active">
           <p><FiActivity /> Total active support</p>
           <h1>11</h1>
        </div>
        </div>
        <div className="dashboard_table">
            <h2>All Users</h2>
            {userData.length>0?
            <table>
            <tr id="table_head"  >
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update</th>
            </tr>
            {userData.map((user,i)=>(
              <tr id="table_row" key={i} >
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><Link to={`/updateUser/${user._id}`}><button>Update <GoLinkExternal/></button></Link></td>
          </tr>
            ))}
            
           
        </table>
            : <div className="noUser">
              <img className="noUserFound" src="https://i.postimg.cc/Px516Nyr/524c6c3d7bd258cd165729ba9b28a9a2-removebg-preview.png" alt="" />
              <h1>No User Found</h1>
              </div>}
            
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

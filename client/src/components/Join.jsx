// import { useEffect, useState } from "react";
// import io from "socket.io-client"; // Import the socket.io-client library

// const Join = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     socket.on("connect", () => {
//       console.log("User is connected");
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

    
//     const formData = {
//       name: name,
//       email: email,
//       role: role,
//     };
//     console.log(formData);
//     const socket = io("http://localhost:5000");
//     socket.emit("support", formData);
//   };
  
//   return (
//     <div className="join">
//       <form action="" onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />

//         <label htmlFor="role">Role</label>
//         <select
//           id="role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//           <option value="support">Support</option>
//         </select>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Join;

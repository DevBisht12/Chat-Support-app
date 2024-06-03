import './Message.css'

const Message = ({ message, user,time }) => {
  return (
    <div
      className="message"
      style={{
        color: user === "user" ? "white" : "black",
        display: "flex",
        
        justifyContent: user === "user" ? "flex-end": "flex-start" ,
      }}
    >
      <div className="message_main">
        <p style={{backgroundColor:user ==="user"? "#3556c4" : "#F0F4F8",}} >{message}</p>
      <span style={{opacity:'70%',fontSize:'8px',color:'black'}} >{time}</span>
      </div>
    </div>
  );
};

export default Message;

const SupportMessage = ({ message, user,time }) => {
  return (
    <div
      className="message"
      style={{
        color: user === "support" ? "white" : "black",
        display: "flex",
        
        justifyContent: user === "support" ? "flex-end": "flex-start" ,
      }}
    >
      <div className="message_main">
        <p style={{backgroundColor:user ==="support"? "#3556c4" : "#F0F4F8",}} >{message}</p>
      <span style={{opacity:'70%',fontSize:'8px',color:'black'}} >{time}</span>
      </div>
    </div>
  );
};

export default SupportMessage;

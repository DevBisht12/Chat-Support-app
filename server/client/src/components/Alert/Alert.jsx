import "./Alert.css";
import { BsChatLeftDotsFill } from "react-icons/bs";


const Alert = ({id,name,handleButton}) => {
  return (
    <div className="Alert_box">
        <div className="icon_Box">
        <BsChatLeftDotsFill/>
        </div>
      <div className="message_box">
        <h2>Join</h2>
        <p>Please join the chat...</p>
        <span style={{fontSize:'10px'}}>{id},{name}</span>
      </div>
      <div className="button_box">
        <button onClick={()=>handleButton({id,name})} >Join</button>
      </div>
    </div>
  );
};

export default Alert;

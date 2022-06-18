import React, {useContext, useState} from "react";
import {StoreContext} from "../context/store/storeContext";
import {postMessage} from "../services/messagesAPI";
import AddContactButton from "./addContactButton"

const MessageBox = () => {
    const {state, actions} = useContext(StoreContext);
    const {currentContact, loggedInContact} = state.generalStates.contacts;
    const [message, setMessage] = useState("");

    // Receiver of messages is currentContact

    const sendMessage = async () => {
        let messageToSend = {
            "message": message,
            "fromContactID": loggedInContact._id,
            "toContactID": currentContact._id,
            "sendDate": new Date().toISOString()
        }

        const response = await postMessage({message: messageToSend});
        actions.generalActions.addMessage(response.data);

        if (response.error) {
            console.log(response);
            console.log(response.error);
        } else {
            setMessage("");
        }
    }

    const updateValue = (e) => {
        let message = e.target.value;
        setMessage(message);
    }

    return (
        <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message"
                          rows="3" onChange={updateValue} value={message}/>
            <button onClick={sendMessage}>Send</button>
            <AddContactButton />
        </div>    
    );
}

export default MessageBox;
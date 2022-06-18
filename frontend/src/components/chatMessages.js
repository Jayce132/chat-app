import {StoreContext} from "../context/store/storeContext";
import {useContext} from "react";

const ChatMessages = (props) => {
    const {state} = useContext(StoreContext);
    const {currentContact, loggedInContact} = state.generalStates.contacts;

    const currentChat = props.currentChat;

    // Receiver of messages is currentContact

    return (

        <div className="chat-history">
            <ul>

                {currentChat.map(message =>
                    <li key={message._id} className="clearfix">
                        <div
                            className={message.fromContactID === loggedInContact._id ?
                                "message-data align-right" :
                                "message-data"
                            }>

                            {message.fromContactID === loggedInContact._id ?

                                <div>
                                    <span className="message-data-time">{message ? new Date(message.sendDate).toLocaleString() : ""}</span>&nbsp;
                                    <span className="message-data-name"> {loggedInContact.firstName} (Me)</span> <i
                                    className="fa fa-circle me"/>
                                </div>

                                :

                                <div>
                                    <span className="message-data-name">
                                        <i className={`fa fa-circle offline`}/> {currentContact.firstName}</span>
                                    <span className="message-data-time">{message ? new Date(message.sendDate).toLocaleString() : ""}</span>
                                </div>}


                        </div>
                        <div
                            className={message.fromContactID === loggedInContact._id ?
                                "message my-message float-right" :
                                "message other-message"
                            }>

                            {message.message}
                        </div>
                    </li>
                )}

            </ul>

        </div>)
}

export default ChatMessages;
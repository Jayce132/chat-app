import {StoreContext} from "../context/store/storeContext";
import {useContext} from "react";
import {fetchManOrWomanAvatar} from "../utils/fetchAvatar";

const ChatHeader = (props) => {
    const {state} = useContext(StoreContext);
    const {currentContact, loggedInContact} = state.generalStates.contacts;
    const contact = state.generalStates.contacts.currentContact;
    const name = contact.firstName + ' ' + contact.lastName;

    const currentChat = props.currentChat;

    return (
        <div className="chat-header clearfix">
            <img className={currentContact._id === loggedInContact._id ? "online" : "offline"}
                 src={fetchManOrWomanAvatar(currentContact)}
                 alt="avatar"/>

            <div className="chat-about">

                <div className="chat-with">
                    Chat with {currentContact._id === loggedInContact._id ?
                    "yourself" : name}
                </div>

                {/* it will show "be the first to say Hello" if there are no messages between contacts */}

                <div
                    className="chat-num-messages"> {currentChat && currentChat.length > 0 ?
                    `already ${currentChat.length} message(s)` :
                    "be the first to say Hello"}
                </div>

            </div>
            <i className="fa fa-star"/>

        </div>
    );
}

export default ChatHeader;
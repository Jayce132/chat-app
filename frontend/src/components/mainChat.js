import React, {useContext, useEffect} from "react";
import {StoreContext} from "../context/store/storeContext";
import {Link} from "react-router-dom";
import {getAllMessages} from "../services/messagesAPI";

import PeopleList from "./peopleList";
import Login from "./login";
import ChatHeader from "./chatHeader";
import ChatMessages from "./chatMessages";
import MessageBox from "./messageBox";

const Chat = (props) => {
    return (
        <div className="chat">
            {/* Maybe currentChat should be added in store instead */}

            <ChatHeader currentChat={props.currentChat}/>

            <ChatMessages currentChat={props.currentChat}/>

            <MessageBox/>
        </div>
    );
};

const MainChat = () => {
    const {state, actions} = useContext(StoreContext);

    const fetchMessages = async () => {
        const response = await getAllMessages();
        if (!response.error) {
            actions.generalActions.setMessages(response.data)
        }

    };

    useEffect(() => {
        fetchMessages();
    }, [])

    const {currentContact, loggedInContact, messages} = state.generalStates.contacts;

    let currentChat = [];

    messages.map((message) => {
        if (message.fromContactID === currentContact._id && message.toContactID === loggedInContact._id ||
            message.fromContactID === loggedInContact._id && message.toContactID === currentContact._id) {
            currentChat.push(message);
        }
        return currentChat;
    });

    return (
        <div className="container clearfix">
            <Link to="contacts">Contacts</Link>
            <Login/>
            <PeopleList/>
            <Chat currentChat={currentChat}/>
        </div>
    );
};

export default MainChat;
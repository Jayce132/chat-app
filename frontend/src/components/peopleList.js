import React, {useContext, useEffect} from "react";
import {StoreContext} from "../context/store/storeContext";
import {getAllContacts} from "../services/contactsAPI";
import {formatDate} from "../utils/dateFormatUtils";
import {fetchManOrWomanAvatar} from "../utils/fetchAvatar";
import FilterContacts from "./filterContacts";


const PeopleList = () => {

    const {state, actions} = useContext(StoreContext);

    const fetchContacts = async () => {
        const response = await getAllContacts();

        if (!response.error) {
            actions.generalActions.setContactsResults(response.data);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const {results, filterBy, loggedInContact} = state.generalStates.contacts;


    // filterBy criterion is changed in FilterContacts component

    const filteredResults = results.filter((contact) => {
        if (
            contact.firstName.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1 ||
            contact.lastName.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1
        ) {
            return true;
        } else {
            contact.checked = false;
            return false;
        }
    });


    // Receiver of messages is currentContact
    const changeChat = (contact) => {
        actions.generalActions.setCurrentContact(contact);
    }

    if (results) {
        return (
            <div className="people-list" id="people-list">

                <FilterContacts/>

                {/*
                    If loggedInContact then display online and (Me), else display offline and last seen
                    First map puts loggedInContact always on top
                */}

                <ul className="list">
                    {filteredResults.map(contact => contact._id === loggedInContact._id ?
                        <li
                            key={`contacts_list_${contact._id}`}
                            className="clearfix"
                            onClick={changeChat.bind(this, contact)}>

                            <img
                                src={fetchManOrWomanAvatar(contact)}
                                alt="avatar"
                            />

                            <div className="about">

                                <div
                                    className="name">{contact.firstName + ' ' + contact.lastName + ' (Me)'}
                                </div>

                                <div className="status">
                                    <i className={"fa fa-circle online"}/> online<i/>
                                </div>

                            </div>

                        </li> : null)}

                    {/*
                        If loggedInContact then display online and (Me), else display offline and last seen
                        Second map displays all other contacts except loggedInContact
                    */}

                    {filteredResults.map(contact => contact._id !== loggedInContact._id ?
                        <li
                            key={`contacts_list_${contact._id}`} className="clearfix"
                            onClick={changeChat.bind(this, contact)}>

                            <img
                                src={fetchManOrWomanAvatar(contact)}
                                alt="avatar"/>

                            <div className="about">
                                <div className="name">{contact.firstName + ' ' + contact.lastName}</div>

                                <div className="status">
                                    <i className={"fa fa-circle offline"}/>
                                    Last seen: {contact.lastSeen.split(" ")[0] === "lastSeen" ?
                                    formatDate(contact.createDate) :
                                    formatDate(contact.lastSeen)}
                                    <i/>
                                </div>

                            </div>
                        </li> : null
                    )}

                </ul>
            </div>
        );
    }
};

export default PeopleList;

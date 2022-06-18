import * as actionNames from '../actions/actionNames';
import {putContact} from "../../services/contactsAPI";

export const generalActions = (props) => {
    return {
        setContactsResults: (results) => {
            props.dispatch({type: actionNames.CONTACTS_SET_RESULTS, data: results});
        },
        increment: () => {
            props.dispatch({type: actionNames.INCREMENT});
        },
        decrement: () => {
            props.dispatch({type: actionNames.DECREMENT});
        },
        reset: () => {
            props.dispatch({type: actionNames.RESET});
        },
        setValue: (data) => {
            // props.dispatch({ type: "SET_VALUE", data });
            externSetValue(props, data);
        },
        setContacts: (contacts) => {
            props.dispatch({type: actionNames.CONTACTS_SET, data: contacts});
        },
        setCheckedAll: (checked) => {
            props.dispatch({type: actionNames.SET_CHECKED_ALL, data: checked});
        },
        setFilterBy: (filter) => {
            props.dispatch({type: actionNames.SET_FILTER_BY, data: filter});
        },
        editContact: async (contact) => {
            const editResponse = await putContact({contact: contact});
            if (editResponse.error) {
                alert("putContact failed");
                return;
            }

            props.dispatch({type: actionNames.EDIT_CONTACT, data: editResponse.data});
        },
        setCurrentContact: (contact) => {
            props.dispatch({type: actionNames.SET_CURRENT_CONTACT, data: contact});
        },
        setLoggedInContact: (contact) => {
            props.dispatch({type: actionNames.SET_LOGGED_IN_CONTACT, data: contact});

            props.dispatch({type: actionNames.SET_CURRENT_CONTACT, data: contact});
        },
        setMessages: (data) => {
            props.dispatch({type: actionNames.SET_MESSAGES, data});
        },
        addMessage: (message) => {
            props.dispatch({type: actionNames.ADD_MESSAGE, data: message});
        },
        setShowLoginModal: (data) => {
            props.dispatch({type: actionNames.SET_SHOW_LOG_IN_MODAL, data})
        },
        setItemEdit: (data) => {
            props.dispatch({type: actionNames.SET_ITEM_EDIT, data});
        },
        setShowEditModal: (data) => {
            props.dispatch({type: actionNames.SET_SHOW_EDIT_MODAL, data});
        },
        setCurrentChat: (data) => {
            props.dispatch({type: actionNames.SET_CURRENT_CHAT, data});
        },
    }

    function externSetValue(props, data) {
        props.dispatch({type: actionNames.SET_VALUE, data});
    }
}
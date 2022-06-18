import * as actionNames from '../actions/actionNames';

export const generalStates = {
    count: 0,
    contacts: {
        currentContact: {
            "createDate": "2022-05-08T20:49:17.729Z",
            "firstName": "Default",
            "lastName": "Contact",
            "email": "noreply@email.com",
            "checked": false,
            "lastSeen": "lastSeen -1",
            "_id": -1
        },
        loggedInContact: {
            "createDate": "2022-05-08T20:49:17.729Z",
            "firstName": "Default",
            "lastName": "Contact",
            "email": "noreply@email.com",
            "checked": false,
            "lastSeen": "lastSeen -1",
            "_id": -1
        },
        messages: [],
        currentChat: [],
        results: [],
        sortBy: null,
        sortOrder: 'asc',
        selectedAll: false,
        filterBy: '',
    },
    showEditModal: false,
    editItem: {
        firstName: "",
        lastName: "",
        email: "",
    },
    showLoginModal: true,
}

function incrementAction(state) {
    return {
        ...state,
        count: state.count + 1
    };
}

function decrementAction(state) {
    return {
        ...state,
        count: state.count - 1
    };
}

function resetAction(state) {
    return {
        ...state,
        count: 0
    };
}

function setValueAction(state, data) {
    return {
        ...state,
        count: data
    };
}

function setContactsResults(state, data) {
    return {
        ...state,
        contacts: {
            ...state.contacts,
            results: data,
        }
    };
}

function setContacts(state, data) {
    return {
        ...state,
        contacts: {
            ...state.contacts,
            ...data,
        }
    };
}

function setCheckedAll(state, data) {
    return {
        ...state,
        contacts: {
            ...state.contacts,
            selectedAll: data,
        }
    }
}

function setFilterBy(state, data) {
    return {
        ...state,
        contacts: {
            ...state.contacts,
            filterBy: data,
        }
    }
}

function editContact(state, data) {
    const newContacts = state.contacts.results;

    newContacts.forEach((row, i) => {
        if (row._id === data._id) {
            newContacts[i].firstName = data.firstName;
            newContacts[i].lastName = data.lastName;
            newContacts[i].email = data.email;
            newContacts[i].lastSeen = data.lastSeen;
        }
    });

    return {
        ...state,
        contacts: {
            ...state.contacts,
            results: newContacts
        }
    }
}

function setCurrentContact(state, data) {
    return {
        ...state,
        contacts: {
            ...state.contacts,
            currentContact: {
                _id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                createDate: data.createDate,
                lastSeen: data.lastSeen,
            }
        }
    }
}

function setLoggedInContact(state, data) {
    return {
        ...state,
        contacts: {
            ...state.contacts,
            loggedInContact: {
                _id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                createDate: data.createDate,
                lastSeen: data.lastSeen,
            }
        }
    }
}

function setCurrentChat (state, data) {
  return {
    ...state,
    contacts: {
      ...state.contacts,
        currentChat: data,
        }
    }
}

function setMessages (state, data) {
    return {
        ...state,
        contacts: {
            ...state.contacts,
            messages: data
        }
    }
}

function addMessage(state, data) {
    const { messages } = state.contacts;
    messages.push(data);
    return {
        ...state,
        contacts: {
            ...state.contacts,
            messages,
        }
    }
}

function setShowLoginModal(state, data) {
    return {
        ...state,
        showLoginModal: data
    }
}

function setItemEdit(state, data) {
    return {
        ...state,
        editItem: data,
    }
}

function setShowEditModal(state, data) {
    return {
        ...state,
        showEditModal: data
    }
}

const reducers = {
    [actionNames.INCREMENT]: incrementAction,
    [actionNames.DECREMENT]: decrementAction,
    [actionNames.SET_VALUE]: setValueAction,
    [actionNames.RESET]: resetAction,
    [actionNames.CONTACTS_SET_RESULTS]: setContactsResults,
    [actionNames.CONTACTS_SET]: setContacts,
    [actionNames.SET_CHECKED_ALL]: setCheckedAll,
    [actionNames.SET_FILTER_BY]: setFilterBy,
    [actionNames.EDIT_CONTACT]: editContact,
    [actionNames.SET_CURRENT_CONTACT]: setCurrentContact,
    [actionNames.SET_LOGGED_IN_CONTACT]: setLoggedInContact,
    [actionNames.SET_MESSAGES]: setMessages,
    [actionNames.ADD_MESSAGE]: addMessage,
    [actionNames.SET_SHOW_LOG_IN_MODAL]: setShowLoginModal,
    [actionNames.SET_ITEM_EDIT]: setItemEdit,
    [actionNames.SET_SHOW_EDIT_MODAL]: setShowEditModal,
    [actionNames.SET_CURRENT_CHAT]: setCurrentChat,
};

export const generalReducer = (state, action) => {
    if (reducers[action.type]) {
        console.log("Action: ", action.type);
        return reducers[action.type](state, action.data);
    } else {
        throw new Error("Unexpected action");
    }
};

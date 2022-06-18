import React, {useContext, useEffect} from "react";
import {useState} from "react";
import {StoreContext} from "../context/store/storeContext";
import {getAllContacts, postContact} from "../services/contactsAPI";
import {Modal} from "react-bootstrap";

const AddContactModal = () => {
    const {state, actions} = useContext(StoreContext);
    const {results} = state.generalStates.contacts;
    const [firstName, setFirstName] = useState(state.generalStates.editItem.firstName);
    const [lastName, setLastName] = useState(state.generalStates.editItem.lastName);
    const [email, setEmail] = useState(state.generalStates.editItem.email);

    useEffect(() => {
        setFirstName(state.generalStates.editItem.firstName);
        setLastName(state.generalStates.editItem.lastName);
        setEmail(state.generalStates.editItem.email);
    }, [state.generalStates.editItem])

    const refreshContacts = async () => {
        const response = await getAllContacts();
        if (!response.error) {
            actions.generalActions.setContactsResults(response.data);
        }
    };

    const addContact = async (editItem) => {
        const newContact = {...editItem};

        const response = await postContact({contact: newContact});
        if (!response.error) {
            await refreshContacts();
        }
    };

    const updateValue = (e) => {
        let value = e.target.value;
        switch (e.target.name) {
            case "firstName":
                setFirstName(value);
                state.generalStates.editItem.firstName = value;
                break;
            case "lastName":
                setLastName(value);
                state.generalStates.editItem.lastName = value;
                break;
            case "email":
                setEmail(value);
                state.generalStates.editItem.email = value;
                break;
        }
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (state.generalStates.editItem._id) {
            results.forEach((contact) => {
                if (contact._id === state.generalStates.editItem._id) {
                    contact.firstName = firstName;
                    contact.lastName = lastName;
                    contact.email = email;
                }
            });
            actions.generalActions.setContacts({results});
            editContact(state.generalStates.editItem);
        } else {
            addContact(state.generalStates.editItem);
        }
        actions.generalActions.setShowEditModal(false);
    }

    function closeModalHandler() {
        actions.generalActions.setShowEditModal(false);
    }

    return (
        <Modal show={state.generalStates.showEditModal}>
            <section className='modal-content'>
                <form onSubmit={handleEditSubmit}>

                    <button type="button" className={'close'} onClick={closeModalHandler}>
                        X
                    </button>

                    <label>First Name: </label>
                    <br/>
                    <input id="add-contact-first-name"
                           type="text"
                           name="firstName"
                           onChange={updateValue}
                           value={firstName}
                           pattern="[A-Z][a-z]+"
                           onInvalid={e => e.target.setCustomValidity('Name must start with uppercase and have at least two a to z characters.')}
                           onInput={e => e.target.setCustomValidity('')}
                           required
                    />

                    <br/>

                    <label>Last Name: </label>
                    <br/>
                    <input id="add-contact-last-name"
                           type="text"
                           name="lastName"
                           onChange={updateValue}
                           value={lastName}
                           pattern="[A-Z][a-z]+"
                           onInvalid={e => e.target.setCustomValidity('Name must start with uppercase and have at least two a to z characters.')}
                           onInput={e => e.target.setCustomValidity('')}
                           required
                    />

                    <br/>

                    <label>Email: </label>
                    <br/>
                    <input id="add-contact-email"
                           type="email"
                           name="email"
                           onChange={updateValue}
                           value={email}
                           required
                    />

                    <br/>

                    <input type="submit" value="Save"/>

                </form>
            </section>
        </Modal>
    );
}

export default AddContactModal;
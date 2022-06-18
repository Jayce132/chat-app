import {StoreContext} from "../context/store/storeContext";
import {useContext} from "react";
import {Modal} from "react-bootstrap";

const Login = () => {
    const {state, actions} = useContext(StoreContext);
    const {results} = state.generalStates.contacts;

    const handleSelectLoggedIn = async (event) => {
        const newLoggedInContact = {
            ...results.find(contact => contact._id === event.target.value),
            lastSeen: new Date().toISOString(),
        };

        // Change lastSeen of contact in API when the user is loggedInContact

        actions.generalActions.setLoggedInContact(newLoggedInContact);
        await actions.generalActions.editContact(newLoggedInContact);

        actions.generalActions.setShowLoginModal(false);
    };


    return (
        <div>
            <button id="login-button" onClick={() => actions.generalActions.setShowLoginModal(true)}>Log In</button>
            <Modal show={state.generalStates.showLoginModal}>
                <div id="login-dropdown">
                    <select id="login-select" onChange={handleSelectLoggedIn} value={"Who are you?"}>
                        <option disabled>Who are you?</option>
                        {results.map(contact =>
                            <option key={contact._id}
                                    value={contact._id}>{contact.firstName} {contact.lastName}
                            </option>)}
                    </select>
                </div>
            </Modal>
        </div>
    );
}

export default Login;
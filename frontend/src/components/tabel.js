import {useContext, useEffect} from "react";
import {StoreContext} from "../context/store/storeContext";
import {getAllContacts} from "../services/contactsAPI"

const Tabel = (props) => {
    const {state, actions} = useContext(StoreContext);

    useEffect( () => {
       // Executes once at the begining
       // Executes everytime the state has been updated with the props included in []
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const response = await getAllContacts();
        if (!response.error) {
            actions.generalActions.setContactsResults(response.data.results);
        }
    }

    const renderContacts = () => {
        const { results } = state.generalStates.contacts;
        if (results) {
            return results.map((result) => {
                return (
                    <tr key={`contacts_${result.id}`}>
                        <td>{result.firstName}</td>
                        <td>{result.lastName}</td>
                        <td>{result.email}</td>
                    </tr>
                );
            });
        }
    }

    return (
        <table className="contactsTable">
            <thead>
            <tr>
                <th>First Name
                </th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {renderContacts()}
            </tbody>
        </table>
    );
}

export default Tabel;
import React, {useContext, useEffect} from "react";
import {StoreContext} from "../context/store/storeContext";
import {deleteContact, getAllContacts} from "../services/contactsAPI"
import {
    useParams,
    useNavigate,
    useLocation, Link, useSearchParams,
} from "react-router-dom";
import AddContactModal from "./addContactModal";

const TabelContacts = (props) => {
    const {state, actions} = useContext(StoreContext);
    const {results, sortBy, sortOrder, selectedAll, filterBy} = state.generalStates.contacts;

    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    let [searchParams, setSearchParams] = useSearchParams();

    const filteredResults = results.filter((contact) => {
        if (contact.firstName.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1 ||
            contact.lastName.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1 ||
            contact.email.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1) {
            return true;
        } else {
            contact.checked = false;
            return false;
        }
    })

    useEffect(() => {
        // Executes once at the begining
        // Executes everytime the state has been updated with the props included in []
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const response = await getAllContacts();
        if (!response.error) {
            actions.generalActions.setContactsResults(response.data.results);
        }
    };

    const callDeleteContact = async (contactId) => {
        const response = await deleteContact({contactId: contactId});
        if (!response.error) {
            //actions.generalActions.setContactsResults(response.data.results);
            actions.generalActions.deleteContact(contactId);
        }
    };

    const renderContacts = () => {
        // renders each line in the table, populated with corresponding data from contacts.results
        const {results} = state.generalStates.contacts;
        if (results) {
            return filteredResults.map((result) => {
                const {id, checked, firstName, lastName, email} = result;
                return (
                    <tr key={`contacts_${id}`}>
                        <td><input type="checkbox" value={id} checked={checked} onChange={checkSingleContact}/></td>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        <td>{email}</td>
                        <td>
                            <button>Delete</button>
                            <button>Edit</button>
                        </td>
                    </tr>
                );
            });
        }
    }

    const sortContacts = (sortContactsBy, sortContactsOrder) => {
        //reset sortOrder if SortBy has changed
        sortContactsOrder = sortContactsBy !== sortBy ? 'asc' : sortContactsOrder;

        //sort the contacts.results array by 'sortContactsBy' prop
        results.sort((a, b) => {
            if (sortContactsOrder === 'asc') {
                return a[sortContactsBy].localeCompare(b[sortContactsBy]);
            } else {
                return b[sortContactsBy].localeCompare(a[sortContactsBy]);
            }
        });

        //put the sorted array back to contacts and re-render the component
        actions.generalActions.setContacts({
            results,
            sortBy: sortContactsBy,
            sortOrder: sortContactsOrder === 'desc' ? 'asc' : 'desc',
        });
    }

    const selectAll = (e) => {

        filteredResults.forEach((contact) => {
            if (e.target.checked) {
                contact.checked = true;
            } else {
                contact.checked = false;
            }
        });
        actions.generalActions.setContactsResults(results);
        actions.generalActions.setCheckedAll(e.target.checked);
    }


    const checkSingleContact = (e) => {
        results.forEach((contact) => {
            if (e.target.value === contact.id) {
                contact.checked = e.target.checked;
            }
        });

        actions.generalActions.setContactsResults(results);
        actions.generalActions.setCheckedAll(false);
    }

    const deleteChecked = () => {
        const filteredResults = results.filter((contact) => {
            return !contact.checked;
        });

        results.forEach((contact) => {
            if (contact.checked) {
                callDeleteContact(contact.id);
            }

        });

        if (filteredResults.length === 0) {
            actions.generalActions.setCheckedAll(false);
        }
        actions.generalActions.setContactsResults(filteredResults);
    }

    const changeFilter = (event) => {
        actions.generalActions.setFilterBy(event.target.value);
    }

    const changePage = () => {
        console.log(location);
        console.log(params);
        console.log(searchParams.get('parametru'));
        navigate('/');
    }

    return (
        <>
            <button onClick={changePage}>Take me to Church</button>
            <Link to="/" >Go to Home</Link>
            <input name="filter" value={filterBy} onChange={changeFilter}/>
            <table className="contactsTable">
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" onChange={selectAll} checked={selectedAll}/>
                    </th>
                    <th onClick={() => {
                        sortContacts('firstName', sortOrder)
                    }}>
                        First Name
                        {sortBy === 'firstName' && <i className={`arrow ${sortOrder === 'desc' ? 'up' : 'down'}`}></i>}
                    </th>
                    <th onClick={() => {
                        sortContacts('lastName', sortOrder)
                    }}>
                        Last Name
                        {sortBy === 'lastName' && <i className={`arrow ${sortOrder === 'desc' ? 'up' : 'down'}`}></i>}
                    </th>
                    <th onClick={() => {
                        sortContacts('email', sortOrder)
                    }}>
                        Email
                        {sortBy === 'email' && <i className={`arrow ${sortOrder === 'desc' ? 'up' : 'down'}`}></i>}
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                <AddContactModal />
                {renderContacts()}
                </tbody>
            </table>

            <button onClick={deleteChecked}>Delete Checked Contacts</button>

            <div className="modal hide_modal">
                <div className="modal-content">
                </div>
            </div>
        </>
    );
}

export default TabelContacts;

import {fetchData} from './axiousHook';

/*
    self-explanatory
 */
export const getAllContacts = async () => {
    return fetchData({
        method: 'GET',
        url: 'contacts',
            headers: {
            accept: '*/*'
        },
    });
};

/*
    Get information about a contact id
    contactID - id of contact we need to retreive the details for
 */
export const getContact = ({ contactId }) => {
    return fetchData({
        method: 'GET',
        url: `contacts/${contactId}`,
        headers: {
            accept: '*/*'
        },
    });
};


/*
    Update information about the contact with the corresponding id
    contact - {
                    id: 123,
                    email: "",
                    firstName: "",
                    lastName: "",
              }

 */
export const putContact = async ({ contact }) => {
    return fetchData({
        method: 'PUT',
        url: `contacts/${contact._id}`,
        headers: {
            accept: '*/*'
        },
        data: contact,
    });
};


/*
    Create a new contact
    contact = {
                    email: "",
                    firstName: "",
                    lastName: "",
              }
 */
export const postContact = ({ contact }) => {
    return fetchData({
        method: 'POST',
        url: `contacts`,
        headers: {
            accept: '*/*'
        },
        data: contact,
    });
};

/*
    Delete a contact
 */

export const deleteContact = ({ contactId }) => {
    return fetchData({
        method: 'DELETE',
        url: `contacts/${contactId}`,
        headers: {
            accept: '*/*'
        },
    });
};

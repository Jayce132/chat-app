import {fetchData} from './axiousHook';
const resourceName = 'messages';
/*
    self-explanatory
 */
export const getAllMessages = async () => {

    return fetchData({
        method: 'GET',
        url: resourceName,
        headers: {
            accept: '*/*'
        },
    });
};

/*
    Get information about a message id
    messageID - id of message we need to retreive the details for
 */
export const getMessage = ({messageId}) => {
    return fetchData({
        method: 'GET',
        url: `${resourceName}/${messageId}`,
        headers: {
            accept: '*/*'
        },
    });
};


/*
    Update information about the Message with the corresponding id
    Message - {
                    "id": "1",
                    "message":"message 1",
                    "fromContactID":"fromContactID 1",
                    "toContactID":"toContactID 1",
              }

 */
export const putMessage = ({message}) => {
    return fetchData({
        method: 'PUT',
        url: `${resourceName}/${message._id}`,
        headers: {
            accept: '*/*'
        },
        data: message,
    });
};


/*
    Create a new message
    message = {
        "message":"message 1",
        "fromContactID":"fromContactID 1",
        "toContactID":"toContactID 1",
        }
 */
export const postMessage = ({message}) => {
    return fetchData({
        method: 'POST',
        url: resourceName,
        headers: {
            accept: '*/*'
        },
        data: message,
    });
};

/*
    Delete a message
 */

export const deleteMessage = ({messageId}) => {
    return fetchData({
        method: 'DELETE',
        url: `${resourceName}/${messageId}`,
        headers: {
            accept: '*/*'
        },
    });
};

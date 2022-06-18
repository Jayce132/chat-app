/**
 * If firstName ends in "a" or "e" then fetch woman image, else man
 *
 * - Not 100% reliable but does its job most of the time
 *
 * - Problems with API when param goes above 100 this is why it's param % 100,
 * so it doesn't go above
 * @param contact
 * @returns {string}
 */
export const fetchManOrWomanAvatar = (contact) => {
    if (contact._id === -1) { // default
        `https://randomuser.me/api/portraits/women/1.jpg`
    } else {
        const lastIndex = String(contact._id).length - 1;
        const intCodeFromId = String(contact._id).charCodeAt(0)
            + String(contact._id).charCodeAt(5)
            + String(contact._id).charCodeAt(10)
            + String(contact._id).charCodeAt(lastIndex);

        return contact.firstName.slice(-1) === "a" || contact.firstName.slice(-1) === "e" ?
            `https://randomuser.me/api/portraits/women/${intCodeFromId % 100}.jpg` :
            `https://randomuser.me/api/portraits/men/${intCodeFromId % 100}.jpg`
    }
}
import React, { useContext } from "react";
import { StoreContext } from "../context/store/storeContext";
import AddContactModal from "./addContactModal";

const AddContactButton = () => {

    const { actions } = useContext(StoreContext);

    const addContactHandler = () => {
        actions.generalActions.setItemEdit({
            _id: 0,
            firstName: "",
            lastName: "",
            email: ""
        });
        actions.generalActions.setShowEditModal(true);
    }

    return (
        <>
            <button className={'addButton'} onClick={addContactHandler}>Add Contact</button>
            <AddContactModal />
        </>
    );
}

export default AddContactButton;
import React, {useContext} from "react";
import {StoreContext} from "../context/store/storeContext";

const FilterContacts = () => {
    const {state, actions} = useContext(StoreContext);
    const {results, filterBy} = state.generalStates.contacts;

    const changeFilter = (event) => {
        actions.generalActions.setFilterBy(event.target.value);
    };

    if (results) {
        return (
                <div className="search">
                    <input name="filter" value={filterBy} onChange={changeFilter}/>
                    <i className="fa fa-search"/>
                </div>

        );
    }
};

export default FilterContacts;

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3002/api/';

/**
 fixed :
 - no need to JSON.stringify to then immediatly do a JSON.parse
 - don't use export defaults, because default imports are hard to search for
 - axios already support generic request in one parameter, no need to call specialized ones
 **/
export const fetchData = async (params) => {
        try {
            const result = await axios.request(params);
            return {data: result.data, loading: false, error: null };
        } catch( error ) {
            return {data: null, loading: false, error: error };
        }
    };

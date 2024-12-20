import { user } from "../initialValues/userProps";
import {SIGN_IN, SIGN_OUT} from "../actions/userActions";

const initialState = {
    user: user

}
export default function userReducer(state = initialState, { type, payload }) {
    switch (type) { 
        case SIGN_IN:
            alert("user Id: " + payload.userId);
            return {
                ...state,
                user: payload
            }
        case SIGN_OUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    
    }
}
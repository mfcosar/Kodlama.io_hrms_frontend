import {combineReducers} from 'redux';
import userReducer from './reducers/userReducer';

//t�m state'leri toplad���m�z yer
const rootReducer = combineReducers({
    user: userReducer//,...
})

export default rootReducer;
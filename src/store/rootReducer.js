import {combineReducers} from 'redux';
import userReducer from './reducers/userReducer';

//tüm state'leri topladýðýmýz yer
const rootReducer = combineReducers({
    user: userReducer//,...
})

export default rootReducer;
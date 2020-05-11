const redux=require('redux');
const createStore= redux.createStore;
const applyMiddleware=redux.applyMiddleware;
const thunkMiddleware=require('redux-thunk').default;
const axios=require('axios');

//action
const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR='FETCH_USERS_ERROR';

const fetchUserList = () =>{
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = user =>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: user
    }
}

const fetchUserError = error =>{
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

//initial state
const initialState={
    loading: false,
    users:[],
    error: ''
}

//reducer

const reducer = (state = initialState,action)=>{

    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }   
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users:action.payload,
                error:''
            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                loading: false,
                users:[],
                error:action.payload
            }
        default:
            return state;
    }

}


const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUserList());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res=>{           
            const user=res.data.map(user=>user.id);
            dispatch(fetchUserSuccess(user))
        })
        .catch(err=>{
            dispatch(fetchUserError(err.message))
        })
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(fetchUsers());

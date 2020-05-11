const redux=require('redux');
const reduxLogger=require('redux-logger');
const applyMiddleware=redux.applyMiddleware;
const createStore= redux.createStore;
const combineReducers=redux.combineReducers;
const logger = reduxLogger.createLogger();
//action
const BUY_CAKE='BUY_CAKE';
const BUY_ICECREAM='BUY_ICECREAM';

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIcecream() {
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
}

//reducers
const initialCakeState={
    noOfCakes: 20
};

const initialIcecreamState={
    noOfIcecreams: 10
};

const cakeReducer=(state = initialCakeState ,action)=>{
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                noOfCakes: state.noOfCakes -1
            }
    
        default:
            return state;
    }
}

const icecreamReducer=(state = initialIcecreamState ,action)=>{
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                noOfIcecreams: state.noOfIcecreams -1
            }
    
        default:
            return state;
    }
}

const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream: icecreamReducer
})
const store=createStore(rootReducer,applyMiddleware(logger));
console.log('Initial State:',store.getState());

const unsubscribe=store.subscribe(()=>{});
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
unsubscribe();
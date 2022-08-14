import { legacy_createStore, bindActionCreators, combineReducers, applyMiddleware } from 'redux';
import pkg from 'redux-logger';
const { createLogger } = pkg;

// action type
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// logger middleware
const logger = createLogger();

// action creator - a function that returns an action object
function orderCake() {
  return {
    // the action object contains a type object which tells the reducers what to do
    type: CAKE_ORDERED, // action type
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// initial cake state
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIcecreams: 10,
};

// reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED: {
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    }
    case CAKE_RESTOCKED: {
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    }
    default:
      return state;
  }
};

//reducer
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED: {
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };
    }
    case ICECREAM_RESTOCKED: {
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };
    }
    default:
      return state;
  }
};

// rootReducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// store
const store = legacy_createStore(rootReducer, applyMiddleware(logger));
console.log(store.getState());

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake());
// store.dispatch(restockCake(100));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderIcecream();
actions.orderIcecream();
actions.orderIcecream();
actions.restockCake(3);
actions.restockIcecream(3);

unsubscribe();

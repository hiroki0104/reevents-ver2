const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMET_COUNTER = 'DECREMENT_COUNTER';

export function increment(amount) {
  return {
    type: INCREMENT_COUNTER,
    payload: amount,
  };
}

export function decrement(amount) {
  return {
    type: DECREMET_COUNTER,
    payload: amount,
  };
}

const initialState = {
  data: 42,
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMET_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
}

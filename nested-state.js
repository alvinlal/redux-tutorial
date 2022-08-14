import produce from 'immer';

const initialState = {
  name: 'alvin',
  address: {
    state: 'kerala',
    city: 'Kochi',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CITY': {
      return produce(state, draft => {
        draft.address.city = action.payload;
      });
    }
  }
};

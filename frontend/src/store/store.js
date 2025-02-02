import { createStore, action } from 'easy-peasy';

const store = createStore({
    authenticated: false,

    setAuthenticated: action((state, payload) => { 
      state.authenticated = payload;
    }),
});

export default store;

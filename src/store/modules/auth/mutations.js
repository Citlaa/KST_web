export default {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.didAutoLogout = false;  
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  };
// usersReducer.js
const initialState = {
    usersAll: [],
    loading: false,
    error: null,
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOADING':
        return {
          ...state,
          loading: true,
        };
  
      case 'GET_USERS_ALL':
        return {
          ...state,
          usersAll: action.payload,
          loading: false,
        };
  
      case 'USER_LOADING_END':
        return {
          ...state,
          loading: false,
        };
  
      default:
        return state;
    }
  };
  
  export default usersReducer;
  
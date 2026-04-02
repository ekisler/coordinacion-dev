import {
    apiGetUsers, apiUpdateUser
  } from './api';

export const getUsersAll = () => async (dispatch) => {
    dispatch({ type: 'USER_LOADING', payload: true });
    try {
      const res = await apiGetUsers();
      dispatch({
        type: 'GET_USERS_ALL',
        payload: res.data,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      dispatch({ type: 'USER_LOADING_END' });
    }
  };
  
  export const updateUser = (userId, data) => async (dispatch) => {
    try {
      const response = await apiUpdateUser(userId, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
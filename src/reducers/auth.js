const initialState = {
  user: 'piotr',
  id: '5ea58dc614589d2080fc7ce8',
  permission: 'USER',
  subscribers: ['5ea5a5e501e6392fc561f8fe']
}
export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
        id: action.id,
        permission: action.permission,
        subscribers: action.subscribers
      };
    case 'LOGOUT':
      return {};
    case 'SET_SUBSCRIBERS':
      return {
        ...state,
        subscribers: action.subscribers
      };
    default:
      return state;
  }
};

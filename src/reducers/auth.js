const initialState = {
  user: 'piotr',
  id: '5e7647c45897a60e114c2c15',
  permission: 'USER',
  subscribers: ['5e765fc65897a60e114c2c16']
}
export default (state = initialState, action) => {
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

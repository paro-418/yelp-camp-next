import React from 'react';

export const userContext = React.createContext({
  isLoggedIn: false,
  username: '',
  userToken: null,
  userId: nul,
});


// export const GlobalContextProvider = (props) => {
//     return <
// }
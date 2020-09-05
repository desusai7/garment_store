import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate()
{
    return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  
  const [user, setUser] = useState(null);

  const updateUser = (useritem) => {
    setUser(useritem);
  };

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );

}

export default UserProvider;

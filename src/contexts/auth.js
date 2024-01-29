import { createContext, useEffect, useState } from "react";
import dataUsers from './users_bd.json';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = dataUsers;

    if (userToken && usersStorage) {
      const hasUser = usersStorage?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email, password) => {
    const usersStorage = dataUsers;

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "email ou senha está inválido";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signout = () => {
    console.log('teste')
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
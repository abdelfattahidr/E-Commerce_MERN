import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: () => boolean;
  myorders : any[]; // Adjust type as needed
  login: (username: string, token: string) => void;
  logout: () => void;
  getmyorders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  myorders: [],
  isAuthenticated: () => false,
  login: () => {},
  logout: () => {},
  getmyorders: () => {},
});

export const useAth = () => useContext(AuthContext);

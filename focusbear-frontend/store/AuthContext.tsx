import {createContext} from "react";
import {BaseUser} from "@/hooks/useUser";

interface AuthContext {
  user: BaseUser | null;
  setUser: (user: BaseUser | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});

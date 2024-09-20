import { useContext } from "react";
import { AuthContext } from "@/store/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export interface BaseUser {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
}

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem, removeItem } = useLocalStorage();

    // Add user function, including local storage and state update
    const addUser = (newUser: BaseUser) => {
        if (!newUser) {
            console.error("Invalid user data provided");
            return;
        }
        console.log("Adding user", newUser);

        // Update state and local storage only if the user is new or different
        if (JSON.stringify(user) !== JSON.stringify(newUser)) {
            setUser(newUser);
            setItem("user", JSON.stringify(newUser));
        } else {
            console.log("User already exists in state");
        }
    };

    // Remove user function, clears local storage and state
    const removeUser = () => {
        console.log("Removing user");
        removeItem("user");
        setUser(null);  // Assuming `null` is used for when there is no user logged in
    };

    return { user, addUser, removeUser, setUser };
};

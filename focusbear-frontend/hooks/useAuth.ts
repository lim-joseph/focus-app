import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { LoginUser, RegisterUser, useUser } from "./useUser";

const AUTHURL = "http://118.139.10.45:3000/auth";

export const useAuth = () => {
	const { user, addUser, removeUser, setUser } = useUser();
	const { getItem } = useLocalStorage();

	// Memoize the `fetchUser` function to ensure it is only called when needed
	const fetchUser = useCallback(async () => {
		const storedUser = await getItem("user");
		if (storedUser) {
			console.log("User found in local storage");
			addUser(JSON.parse(storedUser));
		}
	}, [addUser, getItem]); // Only re-run if `addUser` or `getItem` changes

	useEffect(() => {
		fetchUser(); // Fetch user once when the component mounts
	}, [fetchUser]);

	const login = async (user: LoginUser) => {
		const url = AUTHURL + "/login";

		const body = new URLSearchParams();
		body.append("email", user.email);
		body.append("password", user.password);

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: body.toString(),
		});

		if (response.ok) {
			const data = await response.json();
			addUser(data);
			console.log("Login Successful:", data);
		} else {
			throw new Error("Login Failed");
		}
	};

	const signUp = async (user: RegisterUser) => {
		const url = AUTHURL + "/register";
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (response.ok) {
			const data = await response.json();
			addUser(data);
			console.log("Signup Successful:", data);
		} else {
			throw new Error("Signup Failed");
		}
	};

	const logout = () => {
		removeUser();
	};

	return { user, login, logout, setUser, signUp };
};

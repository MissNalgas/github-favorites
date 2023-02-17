import { getAuth, User } from "firebase/auth";
import { useEffect, useState, createContext, useContext } from "react";

export type LoginState = 'loading' | 'loggedin' | 'loggedout';
type LoginContextType = [LoginState, (name ?: string) => void, User | undefined];

const LoginContext = createContext<LoginContextType>(['loading', function() {}, undefined]);

interface LoginProviderProps {
	children?: React.ReactNode;
}
export function LoginProvider({children} : LoginProviderProps) : JSX.Element {

	const [loginState, setLoginState] = useState<LoginState>('loading');
	const [user, setUser] = useState<User | undefined>(undefined);

	const updateLogin = (name?: string) => {
		name && setUser(user => user ? ({
			...user,
			displayName: name
		}) : undefined);
	}

	useEffect(() => {
		if (typeof window === 'undefined') return;
		updateLogin();
		const auth = getAuth();
		auth.onAuthStateChanged((user) => {
			if (user) {
				setLoginState('loggedin');
				setUser(user);
			} else {
				setLoginState('loggedout');
			}
		}, () => {
			setLoginState('loggedout');
		});
	}, []);

	return (
		<LoginContext.Provider value={[loginState, updateLogin, user]}>
			{children}
		</LoginContext.Provider>
	);

}

export function useLogin() : LoginContextType {
	return useContext(LoginContext);
}

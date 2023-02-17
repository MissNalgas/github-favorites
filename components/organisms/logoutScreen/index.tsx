import LoginForm from "@/components/molecules/loginForm";
import RegisterForm from "@/components/molecules/registerForm";
import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import { MainContainer } from "./styles";

export default function LogoutScreen() : JSX.Element {
	const [isSigningUp, setIsSigningUp] = useState(false);

	return (
		<MainContainer>
			{!isSigningUp ? (
				<Fragment>
					<h1>Log in</h1>
					<LoginForm/>
					<Button onClick={() => setIsSigningUp(true)} variant='text'>
						Sign up
					</Button>
				</Fragment>
			) : (
				<Fragment>
					<h1>Register</h1>
					<RegisterForm/>
					<Button onClick={() => setIsSigningUp(false)} variant='text'>
						I already have an account
					</Button>
				</Fragment>
			)}
		</MainContainer>
	);
}

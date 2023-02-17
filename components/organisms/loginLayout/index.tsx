import Loading from '@/components/atoms/loading';
import { useLogin } from '@/utils/hooks/useLogin';
import { Fragment } from 'react';
import LogoutScreen from '../logoutScreen';

interface LoginLayoutProps {
	children?: React.ReactNode;
}
export default function LoginLayout({children} : LoginLayoutProps) : JSX.Element {
	const [loginState] = useLogin();

	switch(loginState) {
		case 'loading':
			return (
				<Loading/>
			);
		case 'loggedin':
			return (
				<Fragment>
					{children}
				</Fragment>
			);
		default:
			return (
				<LogoutScreen/>
			);
	}
}

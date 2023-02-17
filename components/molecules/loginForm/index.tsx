import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form } from "./styles";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

interface LoginFormTypes {
	email: string;
	password: string;
}

const schema = yup.object({
	email: yup.string().email(),
	password: yup.string().required()
})

export default function LoginForm() : JSX.Element {
	const { handleSubmit, register, formState: {errors} } = useForm<LoginFormTypes>({
		resolver: yupResolver(schema)
	});

	const onSubmit = (data : LoginFormTypes) => { 
		const auth = getAuth();
		signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
			console.log('logged in');
		}).catch(() => alert('Wrong email or password!'));

	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<TextField error={!!errors?.email} helperText={errors?.email?.message} variant='standard' label='Email' {...register('email')}/>
			<TextField variant='standard' label='Password' type='password' {...register('password')}/>
			<Button variant='contained' type='submit'>Log in</Button>
		</Form>
	);
}

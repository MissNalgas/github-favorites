import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Form } from "./styles";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useLogin } from "@/utils/hooks/useLogin";

interface RegisterFormType {
	name: string;
	email: string;
	password: string;
	password2: string;
}

const scheme = yup.object({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
	password2: yup.string().oneOf([yup.ref('password')], 'Password must be equal')
})

export default function RegisterForm() : JSX.Element {
	const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormType>({
		resolver: yupResolver(scheme)
	});
	const [_, updateLogin] = useLogin();
	const onSubmit = (data : RegisterFormType) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
			updateProfile(userCredential.user, {displayName: data.name}).catch(console.error).then(() => {
				updateLogin(data.name);
			});
		}).catch(() => {
			alert('The email already exists!');
		})
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<TextField error={!!errors?.name} helperText={errors?.name?.message} label='Name:' {...register('name')}/>
			<TextField error={!!errors?.email} helperText={errors?.email?.message} label='Email:' {...register('email')}/>
			<TextField type='password' error={!!errors?.password} helperText={errors?.password?.message} label='Password:' {...register('password')}/>
			<TextField type='password' error={!!errors?.password2} helperText={errors?.password2?.message} label='Repeat password:' {...register('password2')}/>
			<Button variant='contained' type='submit'>
				Register
			</Button>
		</Form>
	);
}

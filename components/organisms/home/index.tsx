import { Button, List, ListItemText, ListItemIcon, ListItemButton, ListItemAvatar, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import { Container, FavContainer, TitleContainer } from './styles';
import { randomId } from '@/utils';
import axios from 'axios';
import { useMemo, useReducer, useState } from 'react';
import { useLogin } from '@/utils/hooks/useLogin';
import { getAuth } from 'firebase/auth';

const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_ID; 

function reducer(state:string[], action: string) {
	if (state.includes(action)) {
		return state.filter(item => item !== action);
	} else {
		return [...state, action];
	}


}

export default function Home() : JSX.Element { 

	const [user, setUser] = useState<any>({});
	const [repos, setRepos] = useState<any[]>([]);
	const [favs, dispatchFavs] = useReducer(reducer, []);
	const [_, updateLogin, loginUser] = useLogin();


	const favoriteRepos = useMemo(() => {
		return favs.map(fav => repos.find(repo => repo.id === fav));

	}, [repos, favs]);


	const getUser = async (code : string) => {
		const response = await axios.get(`/api/user?code=${code}`);
		setUser(response.data?.user);
		setRepos(response.data?.repos);
	}

	const logOut = () => {
		const auth = getAuth();
		auth.signOut().finally(() => {
			updateLogin();
		})
	}



	const githubLogin = () => { 
		const iState = randomId();
		const myWindow = window.open(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo&state=${iState}`, 'github', 'popup'); 
		window.addEventListener('message', (event) => {
			const {data} = event;
			if (data?.type === 'oauth') {
				myWindow?.close();
				const {code, state} = data;
				if (state !== iState) {
					return alert('Invalid authentication');
				}
				getUser(code)

			}
		})
	}

	return ( 
		<Container> 
			<TitleContainer>
				<Avatar alt={user?.login} src={user?.avatar_url}/>
				<h2>Welcome {loginUser?.displayName || ''}{!!user?.login && `(${user.login})`}!</h2> 
			</TitleContainer>
			<Button variant='text' onClick={() => logOut()}>Log out</Button>
			{!!user?.login ? (
				<FavContainer>
					<div>
						<h3>All repos</h3>
						<List>
							{repos.map(repo => (
								<ListItemButton onClick={() => dispatchFavs(repo?.id)} key={repo?.id}>
									<ListItemIcon>
										<FavoriteIcon sx={{color: favs.includes(repo.id) ? 'red': 'gray'}}/>
									</ListItemIcon>
									<ListItemText>{repo?.name}</ListItemText>
								</ListItemButton>
							))}
						</List>
					</div>
					<div>
						<h3>Favorites</h3>
						<List>
							{favoriteRepos.map(repo => (
								<ListItemButton onClick={() => dispatchFavs(repo?.id)} key={repo?.id}>
									<ListItemAvatar>
										<Avatar>
											<GitHubIcon/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={repo?.name}/>
									<ListItemIcon>
										<CloseIcon/>
									</ListItemIcon>
								</ListItemButton>
							))}
						</List>
					</div>
				</FavContainer>
			) : (
				<Button onClick={githubLogin} variant='contained'> 
					Log in to Github! 
				</Button>
			)}
		</Container>
	);
}

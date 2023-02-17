import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';

const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_ID;
const CLIENT_SECRET = process.env.GITHUB_SECRET;
const REDIRECT_URI = 'https://juanaragon.co';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const {code} = req.query;

	const jsonBody = {
		client_id: CLIENT_ID, 
		client_secret: CLIENT_SECRET,
		code,
		redirect_uri: REDIRECT_URI
	};

	const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
		method: 'post',
		body: JSON.stringify(jsonBody),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});

	const tokenJson : any = await tokenResponse.json();

	const accessToken = tokenJson?.access_token;
	if (!accessToken) {
		res.status(404).send({error: 'User not found!'});
	}

	const userResponse = await fetch('https://api.github.com/user', {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	});
	const userJson : any = await userResponse.json();

	const reposResponse = await fetch('https://api.github.com/user/repos?per_page=100', {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	})
	const reposJson = await reposResponse.json();
	res.send({user: userJson, repos: reposJson});
}

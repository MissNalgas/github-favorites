export function randomId(size = 16) : string { 
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

	return [...Array(size)].map(() => {
		const i = Math.floor(Math.random() * chars.length);
		return chars.charAt(i);
	}).join('');

}

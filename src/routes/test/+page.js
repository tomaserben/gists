export async function load({ fetch }) {
	console.log('run')
	const res = await fetch(`/api/gists`);
	const data = await res.json();
	console.log(data)
	return {data};
}
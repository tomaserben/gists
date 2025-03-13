export async function load({ fetch }) {
	const res = await fetch(`/api/gists`);
	const data = await res.json();
	return {data};
}
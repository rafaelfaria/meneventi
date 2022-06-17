// If name is single word, just take first two chars, but if more, then take 1st chars of first and last names
export const getInitials = (name: string) => {
	return name.trim().split(' ').reduce((acc, cur, idx, arr) => acc + (arr.length > 1 ? (idx === 0 || idx === arr.length - 1 ? cur.substring(0, 1) : '') : cur.substring(0, 2)), '').toUpperCase();
}
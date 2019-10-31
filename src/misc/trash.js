const getRandomPath = () => {
	const xStart = 0;
	const yStart = 50;
	const xEnd = 50;
	const yEnd = 100;
	const steps = 30;
	const dx = (xEnd - xStart) / steps;
	const dy = (yEnd - yStart) / steps;
	let path = `M${xStart} ${yStart} `;
	let prevX = xStart;
	let prevY = yStart;
	for (let i = 0; i < steps; i++) {
		const nextX = prevX + dx;
		const nextY = prevY + dy;
		const bezier = this.getBezier(prevX, prevY, nextX, nextY, 20);
		path += `${bezier}, ${nextX} ${nextY} `;
		prevX = nextX;
		prevY = nextY;
	}
	path += `L0 100Z`;
	return path;
};
const getBezier = (cx1, cy1, cx2, cy2, a) => {
	const p1 = (cx1 + this.randomSign() * Math.random() * a).toFixed(2);
	const p2 = (cy1 + this.randomSign() * Math.random() * a).toFixed(2);
	const p3 = (cx2 + this.randomSign() * Math.random() * a).toFixed(2);
	const p4 = (cy2 + this.randomSign() * Math.random() * a).toFixed(2);
	return `C${p1} ${p2}, ${p3} ${p4}`;
};

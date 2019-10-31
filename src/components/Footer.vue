<template>
	<footer>
		<a href="mailto:coucou@pow.cool">coucou@pow.cool</a>
		<a href="https://drangies.fr" target="_blank"
			>made by drangies.fr</a
		>
	</footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
	position: relative;
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 70%;
	margin-top: 30px;
	@media (max-width: 768px) {
		width: 100%;
	}
	// position: absolute;
	// bottom: 0;
	// left: 0;
	// right: 0;
}
</style>

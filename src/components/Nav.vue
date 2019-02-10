<template>
	<div class="nav">
		<div class="menu-icon" @click="showMenu">
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="nav--list">
			<router-link to="/"
				>HOME
				<svg width="100%" height="100%">
					<line x1="15%" y1="50%" x2="85%" y2="50%" />
				</svg>
			</router-link>
			<router-link to="/about"
				>ABOUT
				<svg width="100%" height="100%">
					<line x1="15%" y1="50%" x2="85%" y2="50%" />
				</svg>
			</router-link>
			<router-link to="/residencies"
				>RESIDENCIES
				<svg width="100%" height="100%">
					<line x1="10%" y1="50%" x2="90%" y2="50%" />
				</svg>
			</router-link>
			<router-link to="/members"
				>MEMBERS
				<svg width="100%" height="100%">
					<line x1="10%" y1="50%" x2="90%" y2="50%" />
				</svg>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		showMenu: () => {
			const icon = document.querySelector('.menu-icon');
			const bars = document.querySelectorAll('.menu-icon span');
			const menu = document.querySelector('.nav--list');
			const navBar = document.querySelector('.nav');
			navBar.classList.toggle('white');
			menu.classList.toggle('showing');
			icon.classList.toggle('fixed');
			Array.from(bars).forEach(b => b.classList.toggle('open'));
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
// general styling
.nav {
	z-index: 2;
	position: absolute;
	top: 20px;
	right: 20px;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	box-sizing: border-box;
	height: auto;
	@media (max-width: 768px) {
		padding: 0;
		top: 0;
		right: 0;
	}
	&.white {
		@media (max-width: 768px) {
			background-color: white;
		}
	}
	a {
		padding: 0 15px 0 15px;
		letter-spacing: 2px;
		font-weight: bold;
		text-decoration: none;
		color: white;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		@include short-transition;
		@media (max-width: 768px) {
			color: $darker-grey;
			text-align: center;
			opacity: 0;
		}
		&.router-link-exact-active svg,
		&:hover svg {
			stroke-dashoffset: 0;
		}
		svg {
			stroke: white;
			@media (max-width: 768px) {
				stroke: $darker-grey;
			}
		}
	}
	.menu-icon {
		width: 36px;
		height: 28px;
		z-index: 2;
		display: none;
		cursor: pointer;
		@media (max-width: 768px) {
			display: block;
			position: absolute;
			margin: 30px 30px 0 -30px;
		}
		span {
			display: block;
			position: absolute;
			height: 3px;
			width: 100%;
			background: white;
			border-radius: 2px;
			left: 0;
			transform-origin: right center;
			@include short-transition(0.1s);
			&.open {
				background-color: $darker-grey;
			}
			&:nth-child(1) {
				top: 0px;
				&.open {
					transform: rotate(-45deg);
					left: 6px;
				}
			}
			&:nth-child(2) {
				width: 75%;
				right: 0;
				left: unset;
				top: 12px;
				&.open {
					width: 0%;
					opacity: 0;
				}
			}
			&:nth-child(3) {
				top: 25px;
				&.open {
					transform: rotate(45deg);
					top: 25px;
					left: 6px;
				}
			}
		}
		&.fixed {
			position: fixed;
		}
		&.fill {
			@media (max-width: 768px) {
				fill: $darker-grey;
			}
		}
	}
	.nav--list {
		display: flex;
		overflow: hidden;
		@include long-transition;
		@media (max-width: 768px) {
			height: 0;
			width: 100%;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			overflow: hidden;
			position: fixed;
		}
		&.showing {
			@media (max-width: 768px) {
				height: 100vh;
				padding: 5% 0 5% 0;
				background-color: white;
			}
			a {
				@media (max-width: 768px) {
					opacity: 1;
				}
			}
		}
		svg {
			position: absolute;
			stroke-width: 1.5px;
			stroke-dasharray: 150 150;
			stroke-dashoffset: 150;
			@include short-transition;
			top: 0;
			left: 0;
		}
	}
}
</style>

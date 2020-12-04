<script>
	import Home from "./routes/Home.svelte";
	import Router from "svelte-spa-router";
	import Arriving from "./routes/Arriving.svelte";
	import active from "svelte-spa-router/active";
	import LeaderFollowing from "./routes/LeaderFollowing.svelte";
	import { DEBUG, setDebug } from "./constants";
import Obstacles from "./routes/Obstacles.svelte";
import FieldFollow from "./routes/FieldFollow.svelte";

	const routes = {
		"/": Home,

		"/arriving": Arriving,

		"/leader-follow": LeaderFollowing,

		"/obstacles-avoidance": Obstacles,

		"/field-following": FieldFollow,

		"*": Home,
	};

	let isBootstrapLoaded = false;
	const handleBootstrapLoaded = () => {
		isBootstrapLoaded = true;
	};

	let isDebug = DEBUG();

	const handleDebugFlagChange = () => {
		setDebug(isDebug);
	};
</script>

<style>
	.nav-link.active {
		font-weight: bold;
	}

	.line-separator {
		border-right: #ccc 1px solid;
	}
</style>

<svelte:head>
	<title>Autonomous vehicles demos</title>
	<link
		rel="stylesheet"
		href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
		crossorigin="anonymous"
		on:load={handleBootstrapLoaded} />
</svelte:head>

{#if isBootstrapLoaded}
	<div class="container mt-3">
		<div class="row">
			<div class="col-2 line-separator">
				<nav>
					<ul class="nav flex-column">
						<li class="nav-item">
							<a
								class="nav-link active"
								use:active
								href="#/">Home</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link active"
								use:active
								href="#/arriving">Arriving and fleeing</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link active"
								use:active
								href="#/leader-follow">Leader following</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link active"
								use:active
								href="#/obstacles-avoidance">Obstacles avoidance</a>
						</li>

						<li class="nav-item">
							<a
								class="nav-link active"
								use:active
								href="#/field-following">Field following</a>
						</li>

						<li class="nav-item mt-4">
							<label>
								<input
									type="checkbox"
									bind:checked={isDebug}
									on:change={handleDebugFlagChange} />
								DEBUG
							</label>
						</li>
					</ul>
				</nav>
			</div>

			<div class="col-10">
				<div class="ml-4">
					<Router {routes} />
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="container mt-3">loading...</div>
{/if}

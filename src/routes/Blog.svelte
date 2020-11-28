<script>
    import { fade } from "svelte/transition";

    let products = new Array(100);
</script>

<style>
    .clickable-card {
        cursor: pointer;
        width: 200px;
    }
    .clickable-card > img {
        height: 220px;
    }
</style>

<svelte:head>
    <title>Products</title>
</svelte:head>
<div>
    <h1>Products</h1>

    <div>
        <input class="form-control" type="text" placeholder="search"/>
    </div>

    <div class="d-flex w-100 flex-wrap justify-content-center">
        {#each products as product, index (index)}
            <div
                transition:fade={{ duration: 300 }}
                key={index}
                class="card m-2 clickable-card">
                <img
                    src="https://picsum.photos/220/200?index={index}"
                    class="card-img-top"
                    alt="product {index}"
                    loading="lazy" />
                <div class="card-body">
                    <h5 class="card-title text-monospace">
                        Card title
                        {index}
                    </h5>
                </div>
            </div>
        {/each}
    </div>
</div>

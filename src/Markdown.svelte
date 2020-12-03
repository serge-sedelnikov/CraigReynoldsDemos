<script>
    import marked from "marked";
    import { onMount } from "svelte";

    export let file;
    let content;
    let element;

    onMount(async () => {
        if (file && !content) {
            content = await fetch(file).then((response) => response.text());
            element.innerHTML = marked(content, {
                gfm: true,
                breaks: true,
                smartypants: true,
            });
        }
    });
</script>

<style>
    .markdownContainer {
        white-space: pre-line;
    }
</style>

{#if !content}...{/if}

<div bind:this={element} class="markdownContainer" />

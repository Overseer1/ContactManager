<script>
    import "../app.css";
</script>
<div>
    <!-- <div class="sticky top-0 flex">
		<NavBar/>
	</div> -->
	<main class="sticky top-0">
		<slot />
	</main>
</div>
<style lang="postcss">
	.bgFooter {
      color: #dddddd;
    }
	:global(html) {
        background-color: theme(colors.bgBlack);
      }
</style>
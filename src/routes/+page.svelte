<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';

	const products: Product[] = [
		{
			id: '1',
			name: 'coffee',
			price: 5
		},
		{
			id: '2',
			name: 'sunglasses',
			price: 10
		},
		{
			id: '3',
			name: 'bottle',
			price: 15
		}
	];
</script>

<div class="m-16">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1 class="text-3xl">Amazing Store</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled">Checkout with Stripe</button>
		</div>
	</div>
</div>

<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
	import { get } from 'http';
	import { cartItems } from '../cart';

	const products: Product[] = [
		{
			id: 'price_1OASi6LUfeep0aneGRZeeQ6B',
			name: 'coffee',
			price: 5
		},
		{
			id: 'price_1OASj1LUfeep0aneOn38jQwj',
			name: 'sunglasses',
			price: 10
		},
		{
			id: 'price_1OASjILUfeep0aneDnKO9EQC',
			name: 'bottle',
			price: 15
		}
	];

	const checkout = async () => {
		await fetch('api/stripe.checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: get(cartItems) })
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	};
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
			<button class="btn variant-filled" on:click={() => checkout()}>Checkout with Stripe</button>
		</div>
	</div>
</div>

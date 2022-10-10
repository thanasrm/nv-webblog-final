<template>
	<div class="container-fluid">
		<back-header />

		<div class="container-fluid">
			<br />
			<button
				style="float: right"
				type="button"
				class="btn btn-success font2"
				v-on:click="navigateTo('/order/create')"
			>
				<i class="fas fa-plus-circle"></i> Add Order
			</button>
		</div>
		<br /><br /><br />

		<div class="container-fluid">
			<div v-for="order in orders" v-bind:key="order.id" class="blog-list">
				<table class="table table-bordered">
					<tbody>
						<th width="3%">
							<center>{{ order.id }}</center>
						</th>
						<th width="15%">
							<i
								class="fas fa-wine-glass-alt"
								style="font-size: 30px; color: orange"
							></i
							>&nbsp;
							{{ order.product_name }}
						</th>
						<th width="8%">
							<span style="color: red">Quantity : </span>{{ order.quantity }}
						</th>
						<th width="10%">
							<span style="color: yellowgreen">Size : </span>{{ order.size }}
						</th>
						<th width="10%">
							<span style="color: green">Sweet : </span>{{ order.sweet }}
						</th>
						<th width="15%">
							<i class="far fa-clock" style="font-size: 20px; color: red"></i>

							<span style="color: purple"></span>{{ order.updatedAt }}
						</th>
						<th width="15%">
							<button
								class="btn btn-primary btn-lg"
								v-on:click="navigateTo('/order/edit/' + order.id)"
							><i class='fas fa-edit'></i>
								Edit
							</button>
							<button
								class="btn btn-danger btn-lg"
								v-on:click="deleteOrder(order)"
							><i class='fas fa-trash-alt'></i>
								Delete
							</button>
						</th>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import ordersService from "@/services/OrderService";
import _ from "lodash";

export default {
	data() {
		return {
			orders: [],
			BASE_URL: "http://localhost:8081/assets/uploads/",
		};
	},
	async created() {
		this.orders = (await ordersService.index()).data;
	},
	methods: {
		logout() {
			this.$store.dispatch("setToken", null);
			this.$store.dispatch("setBlog", null);
			this.$router.push({
				name: "login",
			});
		},
		navigateTo(route) {
			this.$router.push(route);
		},
		async deleteOrder(order) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await ordersService.delete(order);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.orders = (await ordersService.index()).data;
		},
	},
};
</script>
<style scoped>
</style>

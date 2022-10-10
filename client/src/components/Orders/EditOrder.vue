<template>
	<div>
		<main-header navsel="front"></main-header>
		<back-header /><br />

		<div class="container-fluid">
			<div class="container">
				<div class="blog-wrapper">
					<h4><i class="far fa-clipboard"></i> <b>Edit Order</b></h4>
					<br />
					<span class="font2">
						<form v-on:submit.prevent="editOrder">
							<div class="row">
								<div class="col">
									<label for="input1">Product Name</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1"
												><i class="fas fa-boxes"></i
											></span>
										</div>
										<select
											class="form-control"
											v-model="order.product_name"
											required
										>
											<option disabled value="">Choose a product</option>
											<option v-for="blog in blogs" v-bind:key="blog.id">
												{{ blog.title + "  " + blog.content + "  Baht" }}
											</option>
										</select>
									</div>
								</div>
								<div class="col">
									<label for="input1">Quantity</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1"
												><i class="fas fa-sort-numeric-up"></i
											></span>
										</div>
										<input
											required
											type="number"
											class="form-control"
											v-model="order.quantity"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<label for="input1">Size</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1"
												><i class="fas fa-boxes"></i
											></span>
										</div>
										<select class="form-control" v-model="order.size" required>
											<option value="Small">Small</option>
											<option value="Medium">Medium</option>
											<option value="Large">Large</option>
										</select>
									</div>
								</div>
								<div class="col">
									<label for="input1">Size</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1"
												><i class="fas fa-boxes"></i
											></span>
										</div>
										<select class="form-control" v-model="order.sweet" required>
											<option value="Unsweetened">Unsweetened 0%</option>
											<option value="Less sweet">Less sweet 25%</option>
											<option value="Normal sweet">Normal sweet 50%</option>
											<option value="Very sweet">Very sweet 75%</option>
											<option value="Sweetest">Sweetest 100%</option>
										</select>
									</div>
								</div>
							</div>
							<div
								class="shadow-sm p-3 mb-5 bg-light rounded"
								style="padding: 0.5rem !important"
							>
								<div class="blog-tab"><h5>ordering details</h5></div>
								<p class="font3" style="margin-top: 10px">
									Product name: {{ order.product_name }}<br />
									Quantity: {{ order.quantity }} <br />
									Size : {{ order.size }} <br />
									Sweet level : {{ order.sweet }}
								</p>
							</div>
							<div class="row">
								<div class="col">
									<button
										type="submit"
										class="btn btn-success"
										style="width: 100%"
									>
										<i class="fas fa-clipboard-check"></i> Confirm
									</button>
								</div>
								<div class="col">
									<button
										class="btn btn-danger"
										type="button"
										style="width: 100%"
										v-on:click="navigateTo('/orders')"
									>
										<i class="fas fa-times-circle"></i> Cancel
									</button>
								</div>
							</div>
						</form>
					</span>
				</div>
				<div class="footer"></div>
			</div>
		</div>
	</div>
</template>
  <script>
import { mapState } from "vuex";
import OrderService from "@/services/OrderService";
import BlogsService from "@/services/BlogsService";

export default {
  data() {
    return {
      blogs: [],
      order: {
				quantity: "",
				product_name: "",
				size: "",
				sweet: "",
				status: "pending",
			},
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async editOrder() {
      try {
        await OrderService.put(this.order);
        this.$router.push({
          name: "orders",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      let orderId = this.$route.params.orderId;
      this.order = (await OrderService.show(orderId)).data;
      this.blogs = (await BlogsService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>>

<style scoped>
  
.header {
	margin-left: auto;
	margin-right: auto;
	margin-top: 0px;
	padding: 10px;
	position: relative;
	background-color: #ececec;
	border-bottom: 1px solid rgba(255, 255, 255, 0.5);
	box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.1) inset;
	text-shadow: 1px 1px 1px #fff;
}
.categories {
	margin-top: 10px;
	padding: 0;
	width: 100%;
}
.blog-wrapper {
	margin-top: 20px;
	padding: 40px;
	height: 100%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.blog-tab {
	padding: 1px;
	background-color: #d3d3d3;
	text-align: left;
	text-indent: 0.5em;
}
.footer {
	margin-top: 50px;
}
</style>
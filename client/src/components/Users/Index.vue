<template>
	<div class="container-fluid">
		<back-header />

		<br />
		<div class="container-fluid">
			<h3><b>Total Users</b></h3>
			<div v-for="user in users" v-bind:key="user.id" class="blog-list">
				<div class="card mb-3">
					<div class="card-body">
            <i class="fas fa-user fa-3x" style="color: purple"></i><br><br>
						<h5 class="card-title"><b>Admin ID : </b>{{user.id}}</h5>
						<h6><b>Name : </b>
              {{user.name}}
              {{user.lastname}}
            </h6>
            <h6><b>Email : </b>
              {{user.email}}
            </h6>
            <h6><b>Status : </b>
              {{user.status}}
            </h6>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import UsersService from "@/services/UsersService";

export default {
	data() {
		return {
			users: [],
		};
	},
	async created() {
		try {
			this.users = (await UsersService.index()).data;
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route);
		},
		async deleteUser(user) {
			let result = confirm("Want to delete");
			if (result) {
				try {
					await UsersService.delete(user);
					this.refreshData();
				} catch (error) {
					console.log(error);
				}
			}
		},
		async refreshData() {
			this.users = (await UsersService.index()).data;
		},
		logout() {
			this.$store.dispatch("setToken", null);
			this.$store.dispatch("setUser", null);

			this.$router.push({
				name: "login",
			});
		},
	},
};
</script>
<style scoped>
</style>
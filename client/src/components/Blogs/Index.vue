<template>
	<div class="container-fluid">
		<back-header />

		<div class="container-fluid">
			<br />
			<button
				style="float: right"
				type="button"
				class="btn btn-success font2"
				v-on:click="navigateTo('/blog/create')"
			>
				<i class="fas fa-plus-circle"></i> Add Product
			</button>
		</div>
		<br /><br /><br />

		<!-- <div class="container-fluid">
			<transition-group name="fade">
				<div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
					<div class="blog-pic">
						<div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
							<img :src="BASE_URL + blog.thumbnail" alt="thumbnail" width="200" />
						</div>
					</div>
					<h3>{{ blog.title }}</h3>
					<div class="blog-info">
						<p>
							<span class="font2">Product Id:</span> {{ blog.id }}<br />
							<span class="font2">Price:</span> {{ blog.content }}<br />
							<span class="font2">Category:</span> {{ blog.category }}<br />
							<span class="font2">Status:</span> {{ blog.status }}<br />
							<span class="font2">Apply on:</span>
							{{ blog.createdAt | formatedDate }}
						</p>
						<p class="font2">
							<button
								class="btn btn-sm btn-info"
								v-on:click="navigateTo('/blog/' + blog.id)"
							>
								<i class="far fa-eye"></i>
								Watch Book
							</button>
							<button
								class="btn btn-sm btn-warning"
								v-on:click="navigateTo('/blog/edit/' + blog.id)"
							>
								<i class="far fa-edit"></i> Edit
							</button>
							<button
								class="btn btn-sm btn-danger"
								v-on:click="deleteBlog(blog)"
							>
								<i class="fas fa-trash-alt"></i> Delete
							</button>
						</p>
					</div>
				</div>
			</transition-group>
		</div> -->

		<div class="container-fluid">
			<div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
				<table class="table table-bordered">
					<thead class="thead-light">
						<tr>
							<th scope="col">Picture</th>
							<th scope="col">Name Movie</th>
							<th scope="col">Details</th>
							<th scope="col">Type Movie</th>
							<th scope="col">Tool</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td width="15%">
								<div class="blog-pic">
									<div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
										<img
											:src="BASE_URL + blog.thumbnail"
											alt="thumbnail"
											width="200"
										/>
									</div>
								</div>
							</td>
							<td width="15%">{{ blog.title }}</td>
							<td width="40%">{{ blog.content }}</td>
							<td width="10%">{{ blog.category }}</td>
							<td width="20%">
								<center>
									<button
										class="btn btn-primary btn-lg"
										v-on:click="navigateTo('/blog/edit/' + blog.id)"
									>
										<i class="fas fa-edit"></i> Edit</button
									>&nbsp; &nbsp; &nbsp;
									<button
										class="btn btn-danger btn-lg"
										v-on:click="deleteBlog(blog)"
									>
										<i class="fas fa-trash-alt"></i>
										Delete
									</button>
								</center>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import BlogsService from "@/services/BlogsService";
import _ from "lodash";

export default {
	data() {
		return {
			blogs: [],
			BASE_URL: "http://localhost:8081/assets/uploads/",
		};
	},
	async created() {
		this.blogs = (await BlogsService.index()).data;
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
		async deleteBlog(blog) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await BlogsService.delete(blog);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.blogs = (await BlogsService.index()).data;
		},
	},
};
</script>
<style scoped>
img {
	border-radius: 5%;
}
</style>

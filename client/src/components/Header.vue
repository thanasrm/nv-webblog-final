<template>
	<div>
		<div class="nv-navbar">
			<ul class="nav">
				<li><router-link :to="{ name: 'blogs' }">monthly movie</router-link></li>
				<li><router-link :to="{ name: 'users' }">Users</router-link></li>
				<li><router-link :to="{ name: 'comments' }">Comments</router-link></li>
				<li><router-link :to="{ name: 'login' }">Login</router-link></li>
				<li><router-link :to="{ name: 'blogs' }">Blogs</router-link></li>
			</ul>
			<div class="clearfix" />
		</div>
	</div>
</template>
<script>   
export default {} ;
</script>
<style scoped>
.nv-navbar {
	background-color: rgb(151, 193, 228);
	width: 100%;
	padding: 10px 0px 10px 0px;
}
.nv-navbar .nav {
	list-style: none;
	margin: 0;
	padding: 0;
	float: left;
}
.nv-navbar .nav li {
	float: left;
}
.nv-navbar .nav li a {
	padding: 10px;
	text-decoration: none;
	color: grey;
	font-weight: bold;
}
.nv-navbar .nav li a:hover {
	padding: 10px;
	text-decoration: none;
	color: darkslategrey;
}
.nv-navbar .nav li a.router-link-active {
	background-color: rgb(137, 145, 190);
	color: darkslategrey;
}
.clearfix {
	clear: left;
}
</style>
  
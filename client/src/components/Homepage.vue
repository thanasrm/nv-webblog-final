<template>
	<div class="container-fluid">
		<back-header />
		<div class="container-fluid">
			<br />

			<div class="hero-wrapper">
				<img
					src="../assets/55.png"
					class="logo"
					style="float: left; width: 20%"
				/>
				<h1><b>Monthly Movie</b></h1>
				<p>
					<i class="fas fa-user-circle"></i> Tanawat intasamran &nbsp;&nbsp;<i
						class="fas fa-envelope"
					></i>
					<a href="mailto:khomsanc63@nu.ac.th" style="color: #000000"
						>tanawati63@nu.ac.th</a
					><br />
					<i class="fas fa-user-circle"></i> Surasit Komtong &nbsp;&nbsp;<i
						class="fas fa-envelope"
					></i>
					<a href="mailto:buraphons63@nu.ac.th" style="color: #000000"
						>Surasitk63@nu.ac.th</a
					>
				</p>
			</div>

			<div class="container-fluid">
				<div class="container">
					<div class="blog-wrapper">
						
						<br /><br />
						<ui>
						
						</ui>
					</div>
					<div class="footer"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.component-wrapper {
	padding-left: 5px;
	padding-right: 5px;
}
.hero-wrapper {
	margin-top: 80px;
	max-width: 1100px;
	margin-left: auto;
	margin-right: auto;
	border-radius: 5px;
	background: #1b64c4;
	height: 250px;
	color: #000000;
	padding: 20px;
}
.hero h1 {
	margin-top: 30px;
}
.logo {
	padding-right: 20px;
}
.empty-blog {
	width: 100%;
	text-align: center;
	padding: 10px;
	background: darksalmon;
	color: white;
}
/* thumbnail */
.thumbnail-pic img {
	width: 200px;
	padding: 5px 5px 5px 5px;
	border: solid 1px #ccc;
	margin: 10px 10px 0px 0px;
}
.blog-info {
	float: left;
}
.blog-pic {
	float: left;
}
.clearfix {
	clear: both;
}
.blog-list {
	border: solid 1px #dfdfdf;
	margin-bottom: 10px;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
	padding: 5px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
	margin-top: 80px;
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
}
#blog-list-bottom {
	padding-top: 4px;
}
.blog-load-finished {
	padding: 4px;
	text-align: center;
	background: rgb(140, 237, 182);
	color: white;
}
.categories {
	margin-top: 20px;
	padding: 0;
	list-style: none;
	float: left;
}
.categories li {
	float: left;
	padding: 2px;
}
.categories li a {
	padding: 5px 10px 5px 10px;
	background: rgb(243, 199, 223);
	color: black;
	text-decoration: none;
}
.categories li.clear a {
	background: tomato;
	color: white;
}
.create-blog {
	margin-top: 10px;
}
@media (max-width: 768px) {
	.logo {
		width: 120px;
	}
}
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
	background: #f1f1f2;
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
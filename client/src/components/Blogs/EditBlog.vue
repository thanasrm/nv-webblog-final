<template>
	<div>
		<main-header navsel="back"></main-header>

		<div class="container-fluid">
			<back-header /><br />
			<div class="container-fluid">
				<div class="container">
					<div class="blog-wrapper">
						<h4><i class="fas fa-boxes"></i> Edit Product</h4>
						<br />
						<span class="font2">
							<form v-on:submit.prevent="editBlog">
								<label for="exampleInputEmail1">Name Movie</label>
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" id="basic-addon1"
											><i class="fas fa-box"></i
										></span>
									</div>
									<input
										type="text"
										class="form-control"
										v-model="blog.title"
									/>
								</div>

								<br />
								<div class="form-group">
									<label for="exampleInputEmail1">Details Movie</label>
									<div class="input-group mb-3">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1"
												><i class="fas fa-box"></i
											></span>
										</div>
										<input
											required
											type="text"
											class="form-control"
											v-model="blog.content"
										/>
									</div>
								</div>
								<transition name="fade">
									<div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
										<img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
									</div>
								</transition>
								<form enctype="multipart/form-data" novalidate>
									<div class="dropbox">
										<input
											type="file"
											multiple
											:name="uploadFieldName"
											:disabled="isSaving"
											@change="
												filesChange($event.target.name, $event.target.files);
												fileCount = $event.target.files.length;
											"
											accept="image/*"
											class="input-file"
										/>
										<!-- <p v-if="isInitial || isSuccess"> -->
										<p v-if="isInitial">
											Drag your image files here.
											<br />
											or click to browse image files from your computer.
										</p>
										<p v-if="isSaving">Uploading {{ fileCount }} files...</p>
										<p v-if="isSuccess">Uploaded successfully</p>
									</div>
									<div>
										<ul class="pictures">
											<transition-group tag="ul" name="fade" class="pictures">
												<li v-for="picture in pictures" v-bind:key="picture.id">
													<img
														style="margin-bottom: 5px"
														:src="BASE_URL + picture.name"
														alt="picture image"
													/>
													<br />
													<button
														type="button"
														class="btn btn-success btn-sm"
														v-on:click.prevent="useThumbnail(picture.name)"
													>
														Select thumbnail
													</button>
													<button
														type="button"
														class="btn btn-danger btn-sm"
														v-on:click.prevent="delFile(picture)"
													>
														Delete picture
													</button>
												</li>
											</transition-group>
										</ul>
										<div class="clearfix"></div>
									</div>
								</form>

								<br />
								<div class="form-group">
									<label for="exampleInputEmail1">Type Movie</label>
									<div class="input-group mb-3">
										<select
											class="form-control"
											v-model="blog.category"
											required
										>
											<option disabled value="">
												Type
											</option>
											<option value="Action/Adventure">Action/Adventure</option>
											<option value="Mystery/Crime Film">Mystery/Crime Film</option>
											<option value="Musical/Children and Family">Musical/Children and Family</option>
											<option value="Sci-fi/Adventure ">Sci-fi/Adventure </option>
										</select> 
									</div>
								</div>
								
								<div class="row">
									<div class="col">
										<button
											type="submit"
											class="btn btn-success"
											style="width: 100%"
										>
											<i class="fas fa-save"></i> Save
										</button>
									</div>
									<div class="col">
										<button
											class="btn btn-danger"
											type="button"
											style="width: 100%"
											v-on:click="navigateTo('/blogs')"
										>
											<i class="fas fa-angle-double-left"></i> Back
										</button>
									</div>
								</div>
							</form></span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";

const STATUS_INITIAL = 0,
	STATUS_SAVING = 1,
	STATUS_SUCCESS = 2,
	STATUS_FAILED = 3;

export default {
	data() {
		return {
			BASE_URL: "http://localhost:8081/assets/uploads/",
			error: null,
			// uploadedFiles: [],
			uploadError: null,
			currentStatus: null,
			uploadFieldName: "userPhoto",
			uploadedFileNames: [],
			pictures: [],
			pictureIndex: 0,
			blog: {
				title: "",
				thumbnail: "null",
				pictures: "null",
				content: "",
				category: "",
				status: "",
			},
			config: {
				toolbar: [
					{
						name: "document",
						items: [
							"Source",
							"-",
							"Save",
							"NewPage",
							"Preview",
							"Print",
							"-",
							"Templates",
						],
					},
					{
						name: "clipboard",
						items: [
							"Cut",
							"Copy",
							"Paste",
							"PasteText",
							"PasteFromWord",
							"-",
							"Undo",
							"Redo",
						],
					},
					{
						name: "editing",
						items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
					},
					{
						name: "forms",
						items: [
							"Form",
							"Checkbox",
							"Radio",
							"TextField",
							"Textarea",
							"Select",
							"Button",
							"ImageButton",
							"HiddenField",
						],
					},
					"/",
					{
						name: "basicstyles",
						items: [
							"Bold",
							"Italic",
							"Underline",
							"Strike",
							"Subscript",
							"Superscript",
							"-",
							"CopyFormatting",
							"RemoveFormat",
						],
					},
					{
						name: "paragraph",
						items: [
							"NumberedList",
							"BulletedList",
							"-",
							"Outdent",
							"Indent",
							"-",
							"Blockquote",
							"CreateDiv",
							"-",
							"JustifyLeft",
							"JustifyCenter",
							"JustifyRight",
							"JustifyBlock",
							"-",
							"BidiLtr",
							"BidiRtl",
							"Language",
						],
					},
					{ name: "links", items: ["Link", "Unlink", "Anchor"] },
					{
						name: "insert",
						items: [
							"Image",
							"Flash",
							"Table",
							"HorizontalRule",
							"Smiley",
							"SpecialChar",
							"PageBreak",
							"Iframe",
							"InsertPre",
						],
					},
					"/",
					{ name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
					{ name: "colors", items: ["TextColor", "BGColor"] },
					{ name: "tools", items: ["Maximize", "ShowBlocks"] },
					{ name: "about", items: ["About"] },
				],
				height: 300,
			},
		};
	},
	methods: {
		async editBlog() {
			try {
				await BlogsService.put(this.blog);
				this.$router.push({
					name: "blogs",
				});
			} catch (err) {
				console.log(err);
			}
		},
		navigateTo(route) {
			console.log(route);
			this.$router.push(route);
		},
		wait(ms) {
			return (x) => {
				return new Promise((resolve) => setTimeout(() => resolve(x), ms));
			};
		},
		reset() {
			// reset form to initial state
			this.currentStatus = STATUS_INITIAL;
			// this.uploadedFiles = []
			this.uploadError = null;
			this.uploadedFileNames = [];
		},
		async save(formData) {
			// upload data to the server
			try {
				this.currentStatus = STATUS_SAVING;
				await UploadService.upload(formData);
				this.currentStatus = STATUS_SUCCESS;

				// update image uploaded display
				let pictureJSON = [];
				this.uploadedFileNames.forEach((uploadFilename) => {
					let found = false;
					for (let i = 0; i < this.pictures.length; i++) {
						if (this.pictures[i].name == uploadFilename) {
							found = true;
							break;
						}
					}
					if (!found) {
						this.pictureIndex++;
						let pictureJSON = {
							id: this.pictureIndex,
							name: uploadFilename,
						};
						this.pictures.push(pictureJSON);
					}
				});

				this.clearUploadResult();
			} catch (error) {
				console.log(error);
				this.currentStatus = STATUS_FAILED;
			}
		},
		filesChange(fieldName, fileList) {
			// handle file changes
			const formData = new FormData();
			if (!fileList.length) return;
			// append the files to FormData
			Array.from(Array(fileList.length).keys()).map((x) => {
				formData.append(fieldName, fileList[x], fileList[x].name);
				this.uploadedFileNames.push(fileList[x].name);
			});
			// save it
			this.save(formData);
		},
		clearUploadResult: function () {
			setTimeout(() => this.reset(), 5000);
		},
		async delFile(material) {
			let result = confirm("Want to delete?");
			if (result) {
				let dataJSON = {
					filename: material.name,
				};
				await UploadService.delete(dataJSON);
				for (var i = 0; i < this.pictures.length; i++) {
					if (this.pictures[i].id === material.id) {
						this.pictures.splice(i, 1);
						this.materialIndex--;
						break;
					}
				}
			}
		},
		useThumbnail(filename) {
			console.log(filename);
			this.blog.thumbnail = filename;
		},
	},
	async created() {
		this.reset();
		try {
			let blogId = this.$route.params.blogId;
			this.blog = (await BlogsService.show(blogId)).data;
		} catch (error) {
			console.log(error);
		}
	},
	computed: {
		isInitial() {
			return this.currentStatus === STATUS_INITIAL;
		},
		isSaving() {
			return this.currentStatus === STATUS_SAVING;
		},
		isSuccess() {
			return this.currentStatus === STATUS_SUCCESS;
		},
		isFailed() {
			return this.currentStatus === STATUS_FAILED;
		},
	},
	components: {
		VueCkeditor,
	},
};
</script>
<style scoped>
.dropbox {
	outline: 2px dashed grey; /* the dash box */
	outline-offset: -10px;
	background: lemonchiffon;
	color: dimgray;
	padding: 10px 10px;
	min-height: 200px; /* minimum height */
	position: relative;
	cursor: pointer;
	border-radius: 20px;
}
.input-file {
	opacity: 0; /* invisible but it's there! */
	width: 100%;
	height: 200px;
	position: absolute;
	cursor: pointer;
}
.dropbox:hover {
	background: khaki; /* when mouse over to the drop zone, change color */
	border-radius: 20px;
}
.dropbox p {
	font-size: 1.2em;
	text-align: center;
	padding: 50px 0;
}
ul.pictures {
	list-style: none;
	padding: 0;
	margin: 0;
	float: left;
	padding-top: 10px;
	padding-bottom: 10px;
}
ul.pictures li {
	float: left;
}
ul.pictures li img {
	max-width: 180px;
	margin-right: 20px;
}
.clearfix {
	clear: both;
}
/* thumbnail */
.thumbnail-pic img {
	width: 200px;
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
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.blog-tab {
	padding: 10px;
	background-color: #d3d3d3;
	text-align: left;
	text-indent: 0.5em;
	border-radius: 20px;
}
.footer {
	margin-top: 50px;
}
</style>
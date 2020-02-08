console.log("RUN");
const mongoose = require("mongoose");
const axios = require("axios").default;
mongoose.connect("mongodb://localhost:27017/heroku_g4vd37n3", {
	useNewUrlParser: true
}).then(() => {
	console.log("CONNECTION SUCCESS");
});
var db = require("./schemas.js");
db.product.basis
	.find(
		{
			//	name: 'NOW ASTAXANTHIN 4MG (60 VIÊN)'
		},
		async (err, docs) => {
			console.log(docs.length);
			docs.forEach(async p => {
				let query = await `query {
			allProducts(where: { name:"${p.name}" }) {
				id
			}
		}`;
				let { data } = await axios({
					url: "http://localhost:6005/admin/api",
					method: "post",
					data: { query: query }
				});
				let information = await db.product.information.find(
					{
						pointId: p.id
					}
				);
				const { id } = await data.data.allProducts[0];
				let content = await "";
				information[0].delta.forEach(action => {
					content += action.insert;
				});
				let guide = await "";
				information[2].delta.forEach(action => {
					guide += action.insert;
				});
				console.log(guide);
				let mutation = await `mutation {
			updateProduct(
				id: "${id}",
				data: { description: """${content}""", guide: """${guide}""" }
			) {
				name
			}
		}`;
				const res = await axios({
					url: "http://localhost:6005/admin/api",
					method: "post",
					data: { query: mutation }
				}).data;
				console.log(data.data.allProducts);
			});
		}
	)
	

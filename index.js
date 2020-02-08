console.log("RUN");
const mongoose = require("mongoose");
const axios = require("axios").default;
var fs = require("fs"),
  request = require("request");

var download = function(uri, filename) {
  return new Promise((res, rej) => {
    request.head(uri, function(err, res, body) {});
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", () => {
        res(true);
        rej(true);
      });
  });
};
mongoose
  .connect("mongodb://localhost:27017/heroku_g4vd37n3", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("CONNECTION SUCCESS");
  });
var db = require("./schemas.js");
db.product.basis.find(
  {
    //		name: "BPI Best Pre Workout 30SERS"
  },
  async (err, docs) => {
    console.log(docs.length);
    let p;
    for (let i = 0; i < docs.length; i++) {
      p = docs[i];
      console.log(i);
      await download(
        "https://shopwheydanang.com/store/" + p.images[0],
        "./p/" + i + "." + p.name + ".png"
      );
      let information = await db.product.information.find({
        pointId: p.id
      });
      let content = "";
      let guide = "";
      let detailImage = "";
      information.map(info => {
        if (info.name == "description") {
          info.delta.forEach(action => {
            content += action.insert;
          });
        } else if (info.name == "guide") {
          info.delta.forEach(action => {
            guide += action.insert;
          });
        } else {
          info.delta.forEach(e => {
            if (e && e.insert && e.insert.image) {
              detailImage = e.insert.image;
            }
          });
        }
      });
      if (detailImage) {
        await download(
          detailImage,
          "./d/" + p.name + detailImage.slice(detailImage.length - 4)
        );
      }
      let mutation = `mutation {
          createProduct(data: { 
            name: "${p.name}", 
            price: ${p.price},
            description: """${content}""",
            guide: """${guide}"""
          }) {
            name
          }
        }
        `;
      const res = await axios({
        url: "http://localhost:6005/admin/api",
        method: "post",
        data: { query: mutation }
      });
      if (!res.data.updateProduct) {
      }

      //   let query = `query {
      // 	allProducts(where: { name:"${p.name}" }) {
      // 	name,id
      // 	}
      // }`
      //     .replace(/ "/g, '"')
      //     .replace(/" /g, '"');
      //   console.log(query);
      //   let { data } = await axios({
      //     url: "http://localhost:6005/admin/api",
      //     method: "post",
      //     data: { query: query }
      //   });
      //   if (data.data.allProducts) {
      //     console.log(data.data.allProducts[0]);
      //   }

      //   const { id } = await data.data.allProducts[0];
      //   if (id) {

      // 	updateProduct(
      // 		id: "${id}",
      // 		data: { description: """${content}""", guide: """${guide}""" }
      // 	) {
      // 		name
      // 	}
      // }`;
    }
  }
);

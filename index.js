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
  .connect("mongodb://139.180.214.97:27017/heroku_g4vd37n3", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("CONNECTION SUCCESS");
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
          console.log(p.name);
          /*DOWNLOAD*
      await download(
        "https://shopwheydanang.com/store/" + p.images[0],
        "./p/" + i + "." + p.name + ".png"
      );
      /**/
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

          /*DOWNLOAD*
      await download(
      if (detailImage) {
        await download(
          detailImage,
          "./d/" + p.name + detailImage.slice(detailImage.length - 4)
        );
      }
	      /**/
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
            url: "https://ad.loaloa.me/admin/api",
            method: "post",
            data: { query: mutation }
          });
          console.log("res: ", res.data);
        }
      }
    );
  });

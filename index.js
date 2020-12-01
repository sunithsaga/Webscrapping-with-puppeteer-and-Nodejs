const puppeteer = require("puppeteer");
var PPTX = require("nodejs-pptx");
var fs = require("fs");
var request = require("request");
var pptx = new PPTX.Composer();
let dragonist = ['Night_Fury', 'Auroara']

const GetItems = async (name, callback) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://howtotrainyourdragon.fandom.com/wiki/${name}`);
  let imageHref = await page
    .waitForSelector(".pi-image-thumbnail")
    .then(() =>
      page.evaluate(() => {
        const ItemArray = [];
        const nitemNodeList = document.querySelectorAll(".pi-image-thumbnail");
        const filename = nitemNodeList[0].getAttribute("src");
        return filename;
      })
    )
    .catch((error) => console.log("Selector Error", error));
  return callback(imageHref, name);
};
const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on("close", callback);
  });
};

GetImageCallback = function(res, name){
        console.log(res);
        download(res, `./images/${name}.png`, ()=>{
            pptx.compose(pres => {
                pres.addSlide(slide => {
                  slide.addImage(image => {
                    image
                      .file(`./images/${name}.png`)
                      .x(500)
                      .y(100)
                      .cx(166)
                      .cy(100);
                  })
                });
              });
              pptx.save(`./ppt/dragons.pptx`);
        })    
    };
 
    dragonist.forEach((item)=>{
        GetItems(item, GetImageCallback);
    })


// GetDragonsList = async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//     waitUntil: "domcontentloaded",
//   });

//   const page = await browser.newPage();
//   const listDragons = await page.goto(
//     "https://howtotrainyourdragon.fandom.com/wiki/Category:Dragons"
//   );
//   //await page
//   //  .waitForSelector(".category-page__member-link")
//   //  .then(() =>
//       page.evaluate(() => {
//           document
//           .querySelectorAll(".category-page__member-link")
//           .forEach(function (item) {
//             console.log(item.getAttribute("title"));
//           });
//       })
//     //)
//    // .catch((error) => console.log("Selector Error", error));
// };

// GetDragonsList();

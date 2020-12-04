const puppeteer = require("puppeteer");
var PPTX = require("nodejs-pptx");
var fs = require("fs");
var request = require("request");
const { title } = require("process");
var pptx = new PPTX.Composer();
let drName;
let alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
require("events").EventEmitter.defaultMaxListeners = 100;
let i = process.argv.slice(2);
let j=0;
let speed = 0;
        let armor = 0
        let firepower = 0;
        let shotlimit = 0;
        let venom = 0;
        let jawstrength = 0;
        let stealth = 0;
        let attack = 0;
const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on("close", callback);
  });
};

var GetItems = async (name, callback) => {
  console.log(name)
  if(name == undefined) {
    process.exit(0);
  }
  
  name = name.replace(/ /g, "_");
  let browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();  
  await page.setDefaultNavigationTimeout(0);
  const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
  await page.goto(`https://howtotrainyourdragon.fandom.com/wiki/${name}`);
  await navigationPromise;
  let imageProp = await page
    .waitForSelector(".pi-image-thumbnail")
    .then(() =>
      page.evaluate(() => {        
        const ItemArray = [];
        const nitemNodeList = document.getElementsByClassName("pi-image-thumbnail");
        const filename = nitemNodeList[0].getAttribute("src");
        const stat = document.querySelectorAll('section > h2 > center');
        stat.forEach((item)=>{
            speed = (document.querySelector('div[data-source="Speed"] > div') != null)?  document.querySelector('div[data-source="Speed"] > div').innerHTML.replace(/[^0-9.]/g, ""): 0;            
            attack = (document.querySelector('div[data-source="Attack"] > div')!= null)? document.querySelector('div[data-source="Attack"] > div').innerHTML.replace(/[^0-9.]/g, ""): 0;
            armor = (document.querySelector('div[data-source="Armor"] > div')!= null)? document.querySelector('div[data-source="Armor"] > div').innerHTML.replace(/[^0-9.]/g, ""):0;            
            firepower = (document.querySelector('div[data-source="Firepower"] > div')!= null)? document.querySelector('div[data-source="Firepower"] > div').innerHTML.replace(/[^0-9.]/g, ""):0;
            shotlimit = (document.querySelector('div[data-source="Shot Limit"] > div')!= null)? document.querySelector('div[data-source="Shot Limit"] > div').innerHTML.replace(/[^0-9.]/g, ""):0;
            venom = (document.querySelector('div[data-source="Venom"] > div')!= null)? document.querySelector('div[data-source="Venom"] > div').innerHTML.replace(/[^0-9.]/g, ""):0;
            jawstrength = (document.querySelector('div[data-source="Jaw Strength"] > div')!= null)?  document.querySelector('div[data-source="Jaw Strength"] > div').innerHTML.replace(/[^0-9.]/g, ""):0;
            stealth = (document.querySelector('div[data-source="Stealth"] > div')!= null)? document.querySelector('div[data-source="Stealth"] > div').innerHTML.replace(/[^0-9.]/g, ""):0;
            ItemArray.push(speed, attack, armor, firepower, shotlimit, venom, jawstrength, stealth);
        })
        return [filename, ItemArray];
      })
     
    ).catch((error) => {
      console.log("Selector Error");
      browser.close();
      j = j+1;
      console.log(drName[j], j)
      GetItems(drName[j], GetImageCallback);
    });
    browser.close()
    return callback(imageProp, name);
};

let GetImageCallback = function (res, name) {
  console.log(res[1])
  download(res[0], `./images/${name}.png`, () => {
    console.log(`file download ${name}`);
    pptx.compose(pres => {
      pres.addSlide(slide => {    
        slide.backgroundColor('7b87C4');
        slide.addText(text => {
          text
          .value(name.replace(/_/g, " "))
          .x(280)
          .y(15)
          .fontFace('Alien Encounters')
          .fontSize(30)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('STATISTICS')
          .x(500)
          .y(100)
          .fontFace('Alien Encounters')
          .fontSize(30)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Attack:')
          .x(500)
          .y(140)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][1])
          .x(630)
          .y(140)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Speed:')
          .x(500)
          .y(180)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][0])
          .x(630)
          .y(180)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Armor:')
          .x(500)
          .y(220)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][2])
          .x(630)
          .y(220)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Firepower:')
          .x(500)
          .y(260)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][3])
          .x(630)
          .y(260)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Shot Limit:')
          .x(500)
          .y(300)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][4])
          .x(630)
          .y(300)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Venom:')
          .x(500)
          .y(340)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][5])
          .x(630)
          .y(340)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Jaw Strength:')
          .x(500)
          .y(380)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][6])
          .x(630)
          .y(380)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value('Stealth:')
          .x(500)
          .y(420)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addText(text => {
          text
          .value(res[1][7])
          .x(630)
          .y(420)
          .fontFace('Alien Encounters')
          .fontSize(20)
          .textColor('FFFFFF')
        });
        slide.addImage(image => {
          image
          .file(`./images/${name}.png`)
            .y(150)
            .x(25)
            .cx(350)
            .cy(250);
        });
      });
    });
      pptx.save(`./ppt/dragons_${alphabets[i]}.pptx`).then(()=>{
        j= j+1;
        console.log(`Slide created for ${name}`);
        GetItems(drName[j], GetImageCallback);
      }).catch((error) => console.log("failed"));    
  });
  
};

let GetDragonsList = async (alphabet, callback) => {
  if(alphabet == undefined) {
    process.exit(1);
  }
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  let itemNameList = [];
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    `https://howtotrainyourdragon.fandom.com/wiki/Category:Dragons?from=${alphabet}`
  );
  itemNameList = await page
    .waitForSelector(".category-page__member-link")
    .then(() =>
      page.evaluate(() => {
        const names = [];
        itemNameList = document.querySelectorAll(".category-page__member-link");
        itemNameList.forEach((item) => {
          names.push(item.getAttribute("title"));
        });
        return names;
      })
    )
    .catch((error) => console.log("Selector Error", error));
    browser.close()
  return callback(itemNameList, alphabet);
};

callBackList = function (res, alphabet) {
  console.log(JSON.stringify(res));
  fs.writeFile(`./tmp/${alphabet}.json`, JSON.stringify(res), function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("The file was saved!", i);
      i = i + 1;
      GetDragonsList(alphabets[i], callBackList);
    }
  });
};

//GetDragonsList(alphabets[i], callBackList);

fs.readFile(`./tmp/${alphabets[i]}.json`, (err, data) => {
  if (err) throw err;
  drName = JSON.parse(data);
  GetItems(drName[j], GetImageCallback)
});







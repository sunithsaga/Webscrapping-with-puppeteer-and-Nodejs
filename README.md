# Webscrapping-with-puppeteer-and-Nodejs
Webscrapping with puppeteer and writing data to pptx

This code will allow to scrap the content from the another website and paste/place in the desired position in the PPT 

This code will use puppeteer (headless chromium browser) which will help in run the website and nodejs-pptx for creating the PPTX with NodeJs.


<b>Steps 1 </b>

After done with npm install, add below code. <br />
<code>
const puppeteer = require("puppeteer");
var PPTX = require("nodejs-pptx");
var fs = require("fs");
var request = require("request");
var pptx = new PPTX.Composer();
</code>

Step 2

Create a async method which will check the content in website using html path which can be checked using native javascript. <code>document.querySelectorAll</code> 





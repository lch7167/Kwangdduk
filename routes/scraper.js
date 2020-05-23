const request = require('request');
const cheerio = require('cheerio');

exports.imgScrape = (url, cb) => {
  request(url, (error, resp, body) =>{
    if(error){
      cb({
        error:error
      });
    }
    let $ = cheerio.load(body);
    const $bodyList = $("div.list_area ul").children("li");
    let $url = url;
    let $img = $bodyList.find('div.thumb img').attr('src');
    let $title = $bodyList.find('a.name').attr('title');

  let image = {
    url:$url,
    img:"http:" + $img,
    title: $title,

  }
  console.log("scraped from scarper.js",image);
  cb(image);

});

}
//Promise Example
exports.imgScrape2 = (url) => {
  return new Promise((resolve,reject) => {
    request(url, (error, resp, body) =>{
      let ulList = [];
      if(error){
        reject(error);
      }
      let $ = cheerio.load(body);
      const $bodyList = $("div.list_area ul").children("li");



      let $url = url;
      let $img = $bodyList.find('div.thumb img').attr('src');
      let $title = $bodyList.find('a.name').attr('title');

    let image = {
      url:$url,
      img:"http:" + $img,
      title: $title,

    }

    console.log("scraped from scarper.js",image);
    resolve(image);

  });
  })
}

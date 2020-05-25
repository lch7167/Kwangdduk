var express = require('express');
var async = require('async');
var router = express.Router();
var passport = require('../config/passport');
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

var urlencode = require('urlencode');
var gugun_list = [
  "전체","가로수길","동대문","북촌한옥마을","압구정","이태원","인사동","삼성동","서초구","서울역","신촌",
  "전체","포곡읍",
  "전체","간석동","부평역","용현동",
  "전체","고잔역","중앙역","한대앞역",
  "전체","북한강","퇴계원","호평동",//
  "전체","남이섬","아침고요수목원","쁘띠프랑스",
  "전체","킨텍스","종합운동장","일산호수","일산 백석동",
  "전체","수원역","아주대","인계동","장안구",
  "전체","강릉시","경포해변",
  "전체","서대전","둔산동","용천동","대전궁동","탄방동","괴정동","대전역",
  "전체","대구중앙로","동성로","동대구역","수성구","계명대","두류동","수성구",
  "전체","전북대학교","전주대학교","월드컵경기장","효자공원",
  "전체","부산역","남천동","서면","부산교대역","센텀시티","해운대",
  "전체","제주시","서귀포시"
];

var sido_selected = '';
var gugun_selected = '';
//var json = require('../../first-json.json');
// Home

router.get('/', function(req, res, next){
  res.render('home/welcome');
  next();
});

router.get('/',function(req,res){
  console.log('testok');
});

router.get('/table',function(req,res){
  res.render('partials/search2');
});

router.get('/about', function(req, res, next){
/*
if(req.query.sido =='시/도선택' || req.query.gugun == '구/군선택')
{
  var sido req = req.query.sido;
  var sido req = req.query.gugun
}
  var sido_req = req.query.sido;
  var gugun_req = req.query.gugun;

  */


    res.render('home/about',{
      sido : 'unknown',
      gugun: 'unknown',
      option: 'normal',
      path : '../partials/twitter/all'
    });

});

router.get('/test',function(req,res,next){


        var test1 = req.query.sido;
        var test2 = req.query.gugun;

    if(test1 =='지역 선택' || test1 =='unknown'){
      res.render('home/about',{
        sido : 'unknown',
        gugun: 'unknown',
        option: 'error',
        path : path
      });
     next();
    }
    else{
      var testFolder = './views/partials/twitter/' + change_sido_KtoE(test1);
      fs.readdir(testFolder,function(error,filelist){
        //console.log(filelist[match_gugun_list(test1,test2)+1]);
        var path = '../partials/twitter/'+ change_sido_KtoE(test1) +'/' + filelist[match_gugun_list(test1,test2)];
        console.log(path);
       res.render('home/about',{
         sido: test1,
         gugun : test2,
         option: 'top10',
         path : path
       });
    next();
  });
    }

  //    fs.readFile('first-json.json', 'utf-8', function(err,data){
  //      var rData = JSON.stringify(data);
      //  console.log(rData);

  //  });
});
router.get('/categori',function(req,res,next){


        var test1 = req.query.sido;
        var test2 = req.query.gugun;
    if(test2 == '전체'){
      res.render('home/about',{
        sido : test1,
        gugun : test2,
        option : 'cerror',
        path : '../partials/twitter/all'
      });
      next();
    }

    if(test2 =='unknown'){
      res.render('home/about',{
        sido : 'unknown',
        gugun: 'unknown',
        option: 'error',
        path : '../partials/twitter/all'
      });
     next();
    }
    else{
      var testFolder = './views/partials/foursquare/' + change_sido_KtoE(test1);
      fs.readdir(testFolder,function(error,filelist){
        //console.log(filelist[match_gugun_list(test1,test2)+1]);
        var path = '../partials/foursquare/'+ change_sido_KtoE(test1) +'/' + filelist[match_gugun_list(test1,test2)];
        console.log(path);

        var partials = "unknown";
       res.render('home/about',{
         sido: test1,
         gugun : test2,
         option: 'categori',
         path : path
       });
    next();
  });
    }
});
router.get('/top10',function(req,res,next){


      var test1 = req.query.sido;
      var test2 = req.query.gugun;


  if(test1 =='unknown' || test1=='지역 구분'){
    res.render('home/about',{
      sido : 'unknown',
      gugun: 'unknown',
      option: 'error',
      path : '../partials/twitter/all'
    });
   next();
  }
  else{
    var testFolder = './views/partials/twitter/' + change_sido_KtoE(test1);
    fs.readdir(testFolder,function(error,filelist){
      //console.log(filelist[match_gugun_list(test1,test2)+1]);
      var path = '../partials/twitter/'+ change_sido_KtoE(test1) +'/' + filelist[match_gugun_list(test1,test2)];
      console.log(path);

     res.render('home/about',{
       sido: test1,
       gugun : test2,
       option: 'top10',
       path : path
     });
  next();
});
  }
      /*
      var path = '../partials/local/seoul/seoul_itaewon_topn'
      console.log('../partials/local/' + change_sido_KtoE(test1));
      console.log(match_gugun_list(test1,test2));*/

  //    fs.readFile('first-json.json', 'utf-8', function(err,data){
  //      var rData = JSON.stringify(data);
      //  console.log(rData);

  //  });
});


  //    fs.readFile('first-json.json', 'utf-8', function(err,data){
  //      var rData = JSON.stringify(data);
      //  console.log(rData);

  //  });

router.get('/hotplace',function(req,res,next){
  var query_sido = req.query.sido;
  var query_gugun = req.query.gugun;
  var query_gugun_for_path = req.query.gugun;

  if(query_sido == 'unknown' || query_sido =='지역 구분'){
    res.render('home/about',{
      sido : 'unknown',
      gugun: 'unknown',
      option: 'error',
      path : '../partials/twitter/all'
    });
    next();
  }
  var test1 = req.query.sido;
  var test2 = req.query.gugun;

  var query_category = '카페';
  let query1_value = 'false';
  let query2_value = 'false';
  var query3_value = 'false';
  const log = console.log;
  log("Query::"+findQuery(query_sido,query_gugun));

  var tasks = [
      function (callback) {
          setTimeout(function () {

              console.log('one');
              const getHtml = async () => {
                try {
                  log('0');
                  return await axios.get("https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q="+ urlencode(findQuery(query_sido,query_gugun)) + urlencode(query_category));
                } catch (error) {
                  console.error("error timing" + error);
                }
              };
              getHtml()
                    .then(html => {
                      let ulList = [];
                      let $ = cheerio.load(html.data);
                      const $bodyList = $("div.wrap_place ul").children("li");

                      $bodyList.each(function(i, elem) {
                        ulList[i] = {
                            title:$(this).find('a.fn_tit').text(),
                            href: $(this).find('a.fn_tit').attr('href'),
                            img: $(this).find('div.wrap_thumb img').attr('src'),
                            address: $(this).find('dt.cont').text()
                        };

                //          const bookJson = JSON.stringify(ulList[i]);

                //          if(i==0){
                //          fs.writeFileSync('first-json.json', bookJson);
                //        }else {
                //          fs.appendFileSync('first-json.json', bookJson);
                //        }
                      });
                      log('1');
                      //log("ARRRRRRRRRRRRRRRRR" + array + "test1=" + test1);
                      let data =  ulList.filter(n => n.title);
                      return data;

                    }).then(res => callback(null,res));



          }, 1500);
      },
      function (callback) {
          setTimeout(function () {
              console.log('two');

              const getHtml2 = async () => {
                try {
                  log('5');
                  return await axios.get("https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q="+ urlencode(findQuery(query_sido,query_gugun)) + urlencode('맛집'));
                  log('https://search.naver.com/search.naver?query=' + urlencode(query_sido) + urlencode(query_category));
                } catch (error) {
                  console.error("error timing" + error);
                }
              };
              getHtml2()
                    .then(html => {
                      let ulList = [];
                      let $ = cheerio.load(html.data);
                      let $bodyList = $("div.wrap_place ul").children("li");
                      log('6');
                      $bodyList.each(function(i, elem) {
                        ulList[i] = {
                            title:$(this).find('a.fn_tit').text(),
                            href: $(this).find('a.fn_tit').attr('href'),
                            img: $(this).find('div.wrap_thumb img').attr('src'),
                            address: $(this).find('dt.cont').text()
                        };

                //          const bookJson = JSON.stringify(ulList[i]);

                //          if(i==0){
                //          fs.writeFileSync('first-json.json', bookJson);
                //        }else {
                //          fs.appendFileSync('first-json.json', bookJson);
                //        }
                      });

                      //log("ARRRRRRRRRRRRRRRRR" + array + "test1=" + test1);
                      let data =  ulList.filter(n => n.title);
                      return data;

              }).then(res => callback(null, res));
          }, 1500);
      },

      function(callback){
        setTimeout(function() {
          console.log('three');
          var testFolder = './views/partials/img/' + change_sido_KtoE(query_sido);

         fs.readdir(testFolder,function(error,filelist){
                          log('13'+filelist[match_gugun_list(query_sido,query_gugun_for_path)]);

                           //console.log(filelist[match_gugun_list(test1,test2)+1]);
                           let path = change_sido_KtoE(query_sido) +'/' + filelist[match_gugun_list(query_sido,query_gugun_for_path)];
                          console.log("PATH :"+path);
                           callback(null,path);
                        });


        },500);
      }
  ];

  async.parallel(tasks, function (err, results) {

      res.render('home/about',{
         sido: query_sido,
         gugun : query_gugun,
         option: 'hotplace',
         dataexist: 'true',

         crawling : results[0],
         crawling2 : results[1],
         path : results[2]

     });
      // [ ['one-1', 'one-2'], 'two' ]
  });
});

// Login
router.get('/login', function (req,res) {
  var username = req.flash('username')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('home/login', {
    username:username,
    errors:errors
  });
});


// Post Login
router.post('/login',
  function(req,res,next){
    var errors = {};
    var isValid = true;

    if(!req.body.username){
      isValid = false;
      errors.username = 'Username is required!';
    }
    if(!req.body.password){
      isValid = false;
      errors.password = 'Password is required!';
    }

    if(isValid){
      next();
    }
    else {
      req.flash('errors',errors);
      res.redirect('/login');
    }
  },
  passport.authenticate('local-login', {
    successRedirect : '/posts',
    failureRedirect : '/login'
  }
));

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

//functions




module.exports = router;
//private functions
async function returnValue(path){
  var data = await fs.readFile(path,'utf-8');
  return data;
}
const readFile = (path, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

  function readdirAsync(path) {
    return new Promise(function (resolve, reject) {
      fs.readdir(path, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
function change_sido_KtoE(k_sido){

  if(k_sido == '서울시'){
    return 'seoul';
  } else if(k_sido=='용인시'){
    return 'yongin';
  } else if(k_sido=='인천시'){
    return 'incheon';
  } else if(k_sido=='안산시'){
    return 'ansan';
  }else if(k_sido=='남양주시'){
    return 'namyangju';
  }else if(k_sido=='가평군'){
    return 'gapyung';
  }else if(k_sido=='고양시'){
    return 'goyang';
  }else if(k_sido=='수원시'){
    return 'suwon';
  }else if(k_sido=='강릉시'){
    return 'gangleung';
  }else if(k_sido=='대구시'){
    return 'daegu';
  }else if(k_sido=='전주시'){
    return 'jeonju';
  }else if(k_sido=='부산시'){
    return 'busan';
  }else if(k_sido=='제주도'){
    return 'jeju'
  }else if(k_sido=='대전시'){
    return 'daejeon'
  }
  else
  {
      return 'seoul';
  }

}
function findQuery(query_sido, query_gugun){


if(query_sido == '부산시' && query_gugun =='서면'){
var result = query_gugun;
return result;
}
else if(query_gugun =='전체'){
  var result = query_sido + ' ';
  return result;
}
else if(query_gugun =='남이섬'){
var result = query_gugun;
return result;
}
else if(query_gugun =='아침고요수목원'){
  var result = query_gugun;
  return result;

}
else if(query_gugun == '쁘띠프랑스'){
var result = query_gugun;
return result;
}
else if(query_sido =='강릉시' && query_gugun =='강릉시내'){
var result = query_gugun;
return result;
}
else if(query_sido == '안산시' && query_gugun =='한대앞'){
  var result = query_gugun;
  return result;
}
else if(query_sido =='고양시' && query_gugun=='일산호수공원'){
  var result = query_gugun;
  return result;
}
else if(query_sido =='고양시' && query_gugun=='파주출판단지'){
  var result = query_gugun;
  return result;
}
else if(query_sido =='전주시' && query_gugun =='전주대'){
  var result = query_gugun;
  return result;
}
else if(query_sido =='남양주시' && query_gugun =='북한강'){
  var result = query_gugun;
  return result;
}
else{
  var result = query_sido + ' ' + query_gugun;
  return result;
}
}
function match_gugun_list(k_sido, k_gugun){

  var area0 = ["지역 구분","서울시","용인시","인천시","안산시","남양주시","가평군","고양시","수원시","강릉시","대전시","대구시","전주시","부산","제주도"];
  var area1 = ["전체","가로수길","동대문","북촌한옥마을","압구정역","이태원","종각","삼성동","서초구","서울역","신촌"];
   var area2 = ["전체","에버랜드"]; //용인시
   var area3 = ["전체","인천시청역","부평역","인하대"]; //인천시
   var area4 = ["전체","고잔역","중앙역","한대앞역"]; //안산시
   var area5 = ["전체","북한강","퇴계원","호평동"]; // 남양주시
   var area6 = ["전체","남이섬","아침고요수목원","쁘띠프랑스"]; //가평군
   var area7 = ["전체","킨텍스","종합운동장","일산호수공원","백석동"]; //고양시
   var area8 = ["전체","수원역","아주대","인계동","장안구"]; // 수원시
   var area9 = ["전체","강릉시내","경포대"]; //강릉시
   var area10 = ["전체","서대전역","시청","대전터미널","충남대","한남대","가장동","중앙로"]; //대전시
   var area11 = ["전체","대구중앙로","동성로","동대구역","수성구","계명대","두류동","수성"]; //대구시
   var area12 = ["전체","전북대","전주대","전주월드컵경기장","완산구","전주한옥마을"]; // 전주시
   var area13 = ["전체","중앙동","남천동","서면","교대역","센텀시티","해운대"]; //부산시
   var area14 = ["전체","제주시","서귀포시"]; //제주도시


  if(k_sido == '서울시'){
     var idx = area1.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   } else if(k_sido=='용인시'){
     var idx = area2.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   } else if(k_sido=='인천시'){
     var idx = area3.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   } else if(k_sido=='안산시'){
     var idx = area4.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='남양주시'){
     var idx = area5.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='가평군'){
     var idx = area6.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='고양시'){
     var idx = area7.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='수원시'){
     var idx = area8.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='강릉시'){
     var idx = area9.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;

   }else if(k_sido=='대전시'){
     var idx = area10.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='대구시'){
     var idx = area11.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='전주시'){
     var idx = area12.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='부산시'){
     var idx = area13.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else if(k_sido=='제주도'){
     var idx = area14.findIndex((item, idx) =>{
       return item == k_gugun;
     });
     return idx;
   }else {
     var idx = 0;
     return idx;
   }


}
function change_for_crawling(k_sido,k_gugun){
  if(k_gugun == '에버랜드'){
    return '포곡읍';
  }
  else if(k_gugun =='전체'){
    return ' ';
  }
  else if(k_gugun =='인천시청역'){
    return '간석동';
  }
  else if(k_gugun =='인하대'){
    return '용현동';
  }
  else if(k_gugun =='고성리'){
    return '쁘띠프랑스';
  }
  else if(k_gugun =='강릉시내'){
    return '강릉시';
  }
  else if(k_gugun =='경포대'){
    return '경포해변';
  }
  else if(k_gugun =='화랑유원지'){
    return '고잔역';
  }
  else if(k_gugun =='한양대에리카'){
    return '한대앞';
  }
  else if(k_gugun =='종각'){
    return '인사동';
  }
  else if(k_gugun =='경복궁'){
    return '북촌한옥마을';
  }
  else if(k_gugun =='신사'){
    return '가로수길';
  }
  else if(k_gugun =='서대전'){
    return '서대전역';
  }
  else if(k_gugun =='킨텍스' || k_gugun =='종합운동장'){
    return '대화동';
  }
  else if(k_gugun =='백석동'){
    return '일산 백석동';
  }
  else if(k_gugun =='전북대학교' || k_gugun =='전주대학교' || k_gugun =='효자공원'){
    return '전주';
  }
  else{
    return k_gugun;
  }
}

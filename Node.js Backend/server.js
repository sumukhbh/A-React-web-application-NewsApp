const express = require('express');
const request = require('request')
var cors = require('cors');
const port = 5000;
const app = express();
app.use(cors());


const guardianAPI = 'b36df35a-4808-4068-a468-503eb323edba';
const nytimesAPI = 'khehgSKGlKjIz2SzBv0SqQkjPArcjnXc';
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

// guardian home
app.get('/guardianhome', (req,res) => {
     var url = "https://content.guardianapis.com/search?api-key=b36df35a-4808-4068-a468-503eb323edba&section=(sport|business|technology|politics)&show-blocks=all"
     request({
        url: url,
        method: "GET",
        json: true
    }, 
function (error, response, body){
    //console.log(body)
    var jsonresponse = body.response.results
    var resarray = []
    for(var i=0; i<jsonresponse.length; i++) 
    {
        if(jsonresponse[i].sectionId && jsonresponse[i].blocks.main.elements[0].assets && jsonresponse[i].id && jsonresponse[i].webTitle && jsonresponse[i].webPublicationDate && jsonresponse[i].blocks.body[0].bodyTextSummary && jsonresponse[i].webUrl){
        var result = {}
        var sectionid = jsonresponse[i].sectionId
        if (jsonresponse[i].blocks.hasOwnProperty("main") == true) {
            var assetarray = jsonresponse[i].blocks.main.elements[0].assets.length
            if (assetarray === 0) {
                result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
        
             }
            else {
                result['imageURL'] = jsonresponse[i].blocks.main.elements[0].assets[assetarray-1].file
            }
        }
        else {
            result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
        }

        result['id'] = jsonresponse[i].id
        result['title'] = jsonresponse[i].webTitle
        result['description'] = jsonresponse[i].blocks.body[0].bodyTextSummary
        result['date'] = jsonresponse[i].webPublicationDate.split('T')[0]
        result['sectionId'] = sectionid
        result['url'] = jsonresponse[i].webUrl
        resarray.push(result)
    }
    }
res.send({"result": resarray});
});
});

// guardian section
app.get('/guardiansection', (req,res) => {
    console.log("Entering")
    var sectionname =  req.query.section
    var url = 'https://content.guardianapis.com/' + sectionname + '?api-key=' + guardianAPI +'&show-blocks=all'
    request({
        url: url,
        method: "GET",
        json: true
    }, 
function (error, response, body){
    //console.log(body)
    var jsonresponse = body.response.results
    var resarray = []
    for(var i=0; i<jsonresponse.length; i++) 
    {
        if(jsonresponse[i].sectionId && jsonresponse[i].blocks.main && jsonresponse[i].id && jsonresponse[i].webTitle && jsonresponse[i].webPublicationDate && jsonresponse[i].blocks.body[0].bodyTextSummary && jsonresponse[i].webUrl) {
        var result = {}
        var sectionid = jsonresponse[i].sectionId
        if (jsonresponse[i].blocks.hasOwnProperty("main")) {
           var assetarray = jsonresponse[i].blocks.main.elements[0].assets.length
           if (assetarray === 0) {
              result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
        
            }
           else {
              result['imageURL'] = jsonresponse[i].blocks.main.elements[0].assets[assetarray-1].file
            }
        }
        else {
            result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
        }

        result['id'] = jsonresponse[i].id
        result['title'] = jsonresponse[i].webTitle
        result['description'] = jsonresponse[i].blocks.body[0].bodyTextSummary
        result['date'] = jsonresponse[i].webPublicationDate.split('T')[0]
        result['sectionId'] = sectionid
        result['url'] = jsonresponse[i].webUrl
        resarray.push(result)
    }
}
res.send({"result": resarray});
});
});

// NY times home 
app.get('/NYtimeshome', (req,res) => {
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + nytimesAPI
    request({
        url: url,
        method: "GET",
        json: true
    }, 
function (error, response, body){
    var jsonresponse = body.results
    var resarray = []
    for(var i=0; i<jsonresponse.length; i++) 
    {
        if(jsonresponse[i].section && jsonresponse[i].title && jsonresponse[i].abstract && jsonresponse[i].published_date && jsonresponse[i].url){
        var result = {}
        var section = jsonresponse[i].section
        result['title'] = jsonresponse[i].title
        result['description'] = jsonresponse[i].abstract
        result['date'] = jsonresponse[i].published_date.split('T')[0]
        result['id'] = jsonresponse[i].url
        result['url'] = jsonresponse[i].url
        result['sectionId'] = section
        if (jsonresponse[i].multimedia) {
            for(var j=0;j < jsonresponse[i].multimedia.length;j++){
                 if (jsonresponse[i].multimedia[j].width >= 2000) {
                    result['imageURL'] =  jsonresponse[i].multimedia[j].url
                    break
            }
           
            }
        } 
        if(!result['imageURL']){
            result['imageURL'] = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

        }
        resarray.push(result)
    }
}
res.send({"result": resarray});
});
});

//NY times section
app.get('/NYtimessection', (req,res) => {
     var sectionname =  req.query.section
     var url = 'https://api.nytimes.com/svc/topstories/v2/'+ sectionname +'.json?api-key=' + nytimesAPI
     request({
            url: url,
            method: "GET",
            json: true
},
function (error, response, body){
    var jsonresponse = body.results
    var resarray = []
    for(var i=0; i<jsonresponse.length; i++) 
    {
        if(jsonresponse[i].section && jsonresponse[i].title && jsonresponse[i].abstract && jsonresponse[i].published_date && jsonresponse[i].url){
        var result = {}
        var section = jsonresponse[i].section
        result['title'] = jsonresponse[i].title
        result['description'] = jsonresponse[i].abstract
        result['date'] = jsonresponse[i].published_date.split('T')[0]
        result['id'] = jsonresponse[i].url
        result['url'] = jsonresponse[i].url
        result['sectionId'] = section
        if (jsonresponse[i].multimedia) {
            for(var j=0;j < jsonresponse[i].multimedia.length;j++){
                 if (jsonresponse[i].multimedia[j].width >= 2000) {
                     result['imageURL'] = jsonresponse[i].multimedia[j].url
                     break
            }
           
        }
        }
        if(!result['imageURL']){
            result['imageURL'] = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

        }
        if (resarray.length != 10) {
              resarray.push(result)
        }
    }
}
res.send({"result": resarray});
});
});

// guardian detailed article
app.get('/guardiandetailed', (req,res) => {
    console.log("hello");
    var idvalue = req.query.id
    var url = 'https://content.guardianapis.com/'+ idvalue +'?api-key='+ guardianAPI +'&show-blocks=all'
    console.log(idvalue)
    console.log(url)
    request({
        url: url,
        method: "GET",
        json: true
    }, 
function (error, response, body){
    //console.log(body)
    var jsonresponse = body.response.content
    if(jsonresponse.sectionId && jsonresponse.webTitle && jsonresponse.blocks.body[0].bodyTextSummary && jsonresponse.webPublicationDate && jsonresponse.webUrl) {
    var resarray = []
    var result = {}
    var sectionid = jsonresponse.sectionId
    if (jsonresponse.blocks.hasOwnProperty("main")) {
        var assetarray = jsonresponse.blocks.main.elements[0].assets.length
        if (assetarray === 0) {
            result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
        
        }
        else {
            result['imageURL'] = jsonresponse.blocks.main.elements[0].assets[assetarray-1].file
        }
    }
    else {
        result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
    }

    result['id'] = jsonresponse.id
    result['title'] = jsonresponse.webTitle
    result['description'] = jsonresponse.blocks.body[0].bodyTextSummary
    result['date'] = jsonresponse.webPublicationDate.split('T')[0]
    result['sectionId'] = sectionid
    result['url'] = jsonresponse.webUrl
    result['source'] = 'GUARDIAN'
    resarray.push(result)
    res.send({"result": resarray});
    }
});
});

//NY times detailed article
app.get('/NYtimesdetailed', (req,res) => {
    var urlvalue = req.query.id
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:('+ "\"" + urlvalue + "\"" + ')&api-key=' + nytimesAPI
    console.log(url)
    request({
        url: url,
        method: "GET",
        json: true
},
function (error, response, body){
    var jsonresponse = body.response.docs[0]
    var resarray = [] 
    var result = {}
    if(jsonresponse.headline.main && jsonresponse.abstract && jsonresponse.pub_date && jsonresponse.web_url && jsonresponse.news_desk){
    result['title'] = jsonresponse.headline.main
    result['description'] = jsonresponse.abstract
    result['date'] = jsonresponse.pub_date.split('T')[0]
    result['id'] = jsonresponse.web_url
    result['url'] = jsonresponse.web_url
    result['source'] = 'NYTIMES'
    result['sectionId'] = jsonresponse.news_desk
    
    if (jsonresponse.multimedia) {
           for(var j=0;j < jsonresponse.multimedia.length;j++){
                if (jsonresponse.multimedia[j].width >= 2000) {
                    result['imageURL'] =  "https://nyt.com/" + jsonresponse.multimedia[j].url
                    break
                }  
            }
    }

        
    if(!result['imageURL']){
            result['imageURL'] = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

        }
        resarray.push(result)

    
res.send({"result": resarray});
}
});
});

// Guardian Search
app.get('/guardiansearch', (req,res) => {
    var searchval = req.query.id
    var url = 'https://content.guardianapis.com/search?q='+ searchval + '&api-key=' + guardianAPI+ '&show-blocks=all'
     request({
        url: url,
        method: "GET",
        json: true
    }, 
function (error, response, body){
    //console.log(body)
    var jsonresponse = body.response.results
    var resarray = []
    for(var i=0; i<jsonresponse.length; i++) 
    {
        var result = {}
        if(jsonresponse[i].sectionId && jsonresponse[i].id  && jsonresponse[i].webTitle && jsonresponse[i].blocks.body[0].bodyTextSummary && jsonresponse[i].webPublicationDate && jsonresponse[i].webUrl){
        var sectionid = jsonresponse[i].sectionId
        if (jsonresponse[i].blocks.hasOwnProperty("main")) {
            var assetarray = jsonresponse[i].blocks.main.elements[0].assets.length
            if (assetarray === 0) {
                result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
        
            }
            else {
                result['imageURL'] = jsonresponse[i].blocks.main.elements[0].assets[assetarray-1].file
            }
        }
        else {
            result['imageURL'] = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
        }

        result['id'] = jsonresponse[i].id
        result['title'] = jsonresponse[i].webTitle
        result['description'] = jsonresponse[i].blocks.body[0].bodyTextSummary
        result['date'] = jsonresponse[i].webPublicationDate.split('T')[0]
        result['sectionId'] = sectionid
        result['url'] = jsonresponse[i].webUrl
        result['source'] = 'GUARDIAN'
        if(resarray.length < 10) {
            resarray.push(result)
        }
    }
    }
res.send({"result": resarray});
});
});

// NYtimes Search
app.get('/NYtimessearch', (req,res) => {
    var searchval = req.query.id
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ searchval + '&api-key=' + nytimesAPI
    request({
        url: url,
        method: "GET",
        json: true
    }, 
function (error, response, body){
    var jsonresponse = body.response.docs
    var resarray = []
    for(var i=0; i<jsonresponse.length; i++) 
    {
        var result = {}
        if( jsonresponse[i].headline.main && jsonresponse[i].abstract && jsonresponse[i].pub_date && jsonresponse[i].web_url && jsonresponse[i].news_desk){
        result['title'] = jsonresponse[i].headline.main
        result['description'] = jsonresponse[i].abstract
        result['date'] = jsonresponse[i].pub_date.split('T')[0]
        result['id'] = jsonresponse[i].web_url
        result['url'] = jsonresponse[i].web_url
        result['sectionId'] = jsonresponse[i].news_desk
        result['source'] = 'NYTIMES'
        if (jsonresponse[i].multimedia) {
             for(var j=0;j < jsonresponse[i].multimedia.length;j++){
                if (jsonresponse[i].multimedia[j].width >= 2000) {
                    console.log(jsonresponse[i].multimedia[j].url)
                    result['imageURL'] =  "https://www.nytimes.com/" + jsonresponse[i].multimedia[j].url
                    break
                }
           
            }
        }
        if(!result['imageURL']){
            result['imageURL'] = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

        }
        if (resarray.length < 10){
        resarray.push(result)
    }
    }
}
res.send({"result": resarray});
});
});





app.listen(process.env.PORT || port)

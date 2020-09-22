"use strict";
import { urlDBOperation } from "./database"
import * as URL from "url"
import { UrlObject } from "./entity/urlObject";
import { url } from "inspector";
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("statics"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
let urloperator = new urlDBOperation();

//router
app.all('/*', async function (req, res, next) {
    // next()
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', 'Content-type')
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
    res.header('Access-Control-Max-Age', 1728000)
    next();
    if (req.url.search("get_short_url") != -1 || req.url.search("get_full_url") != -1 || req.url.search("get_url_list") != -1) {
        console.log("The common request")
    } else {
        let index = req.url.indexOf("http://localhost:8851/")
        console.log("The index is:" + index)
        let shortUrl = req.url.substring(1)
        console.log("The short url in body is:" + shortUrl);
        let urlInfo = await urloperator.getFullUrl(shortUrl);
        console.log("The redirect url is:" + urlInfo.fullurl);
        res.header("Access-Control-Allow-Origin", "*")
        res.header('Access-Control-Allow-Headers', 'Content-type')
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
        res.header('Access-Control-Max-Age', 1728000)
        res.writeHead(301, { 'Location': urlInfo.fullurl })
        res.status(200)
    }
})

app.get("/", function (req, res) {
    res.send(`<p>
				my first express！
			</p>`);
})

app.post("/get_short_url", async function (req, res) {
    try {
        console.log("The request body is:" + req.body)
        let full_url = req.body.full_url;
        if (full_url === undefined) {
            res.status(500).json({ error: 'The full url is necessary!' })
        }
        console.log("The request body is:" + req.body.full_url);
        let shorturl = '';
        urloperator.saveUrl(full_url)
            .then((res) => {
                console.log("the invoke success")
                res.json({
                    shorturl: res.shorturl
                })
            })
            .catch((err) => {
                res.status(500).json({ error: 'get short url failed!' })
            })
    } catch (error) {
        console.error("The error in the get short url is: " + error)
        res.status(500).json({ error: 'get short url failed!' })
    }

})

app.post("/get_full_url", async function (req, res) {
    try {
        console.log("The request body is:" + req.body);
        let short_url = req.body.short_url;
        if (short_url === undefined) {
            res.status(500).json({ error: 'The short url is necessary!' })
        }
        urloperator.getFullUrl(short_url)
            .then((res) => {
                console.log("the invoke success")
                res.json({
                    msg: res.fullurl
                })
            })
            .catch((err) => {
                res.status(500).json({ error: 'get full url failed!' })
            })
    } catch (error) {
        console.error("The error in the get full url is: " + error)
        res.status(500).json({ error: 'get full url failed!' })
    }
})

app.post("/get_url_list", async function (req, res) {
    try {
        console.log("The request body is:" + req.body);
        urloperator.getUrlList()
            .then((res) => {
                console.log("the invoke success")
                res.json({
                    msg: res
                })
            })
            .catch((err) => {
                res.status(500).json({ error: 'get url list failed!' })
            })
    } catch (error) {
        console.error("The error in the get url list is: " + error)
        res.status(500).json({ error: 'get url list failed!' })
    }


})

app.listen(8851, () => {
    console.log("start succeed!");
})
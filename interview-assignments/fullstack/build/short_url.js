"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
process.on('unhandledRejection', function (reason, p) {
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
}));
var urloperator = new database_1.urlDBOperation();
//router
app.all('/*', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var index, shortUrl, urlInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.url.search("get_short_url") != -1 || req.url.search("get_full_url") != -1 || req.url.search("get_url_list") != -1)) return [3 /*break*/, 1];
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header('Access-Control-Allow-Headers', 'Content-type');
                    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
                    res.header('Access-Control-Max-Age', 1728000);
                    next();
                    return [3 /*break*/, 3];
                case 1:
                    index = req.url.indexOf("http://localhost:8851/");
                    console.log("The index is:" + index);
                    shortUrl = req.url.substring(1);
                    console.log("The short url in body is:" + shortUrl);
                    return [4 /*yield*/, urloperator.getFullUrl(shortUrl)];
                case 2:
                    urlInfo = _a.sent();
                    console.log("The redirect url is:" + urlInfo.fullurl);
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header('Access-Control-Allow-Headers', 'Content-type');
                    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
                    res.header('Access-Control-Max-Age', 1728000);
                    res.writeHead(301, { 'Location': urlInfo.fullurl });
                    res.status(200);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.get("/", function (req, res) {
    res.send("<p>\n\t\t\t\tmy first express\uFF01\n\t\t\t</p>");
});
app.post("/get_short_url", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var full_url, shorturl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("The request body is:" + req.body);
                    debugger;
                    full_url = req.body.full_url;
                    console.log("The request body is:" + req.body.full_url);
                    shorturl = '';
                    return [4 /*yield*/, urloperator.saveUrl(full_url)];
                case 1:
                    shorturl = _a.sent();
                    if (shorturl != '' && shorturl != undefined) {
                        res.json({
                            shorturl: shorturl
                        });
                    }
                    else {
                        res.status(500).json({ error: 'get short url failed!' });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/get_full_url", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var short_url, urlInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("The request body is:" + req.body);
                    short_url = req.body.short_url;
                    debugger;
                    return [4 /*yield*/, urloperator.getFullUrl(short_url)];
                case 1:
                    urlInfo = _a.sent();
                    if (urlInfo != null && urlInfo != '') {
                        res.json({
                            msg: urlInfo.fullurl
                        });
                    }
                    else {
                        res.status(500).json({ error: 'get full url failed!' });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/get_url_list", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var short_url, urlInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("The request body is:" + req.body);
                    short_url = req.body.short_url;
                    debugger;
                    return [4 /*yield*/, urloperator.getUrlList()];
                case 1:
                    urlInfo = _a.sent();
                    if (urlInfo != null && urlInfo != '' && urlInfo.length > 0) {
                        res.json({
                            msg: urlInfo
                        });
                    }
                    else {
                        res.status(500).json({ error: 'get url list failed!' });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
app.listen(8851, function () {
    console.log("start succeed!");
});
//# sourceMappingURL=short_url.js.map
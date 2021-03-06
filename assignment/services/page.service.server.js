var app = require('../../express');
var pageModel = require('../models/page/page.model.server');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.send(err);
        });
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.send(page);
}

function findAllPagesForWebsite(req, res) {
    // var results = [];
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        }, function (err) {
            res.send(err);
        });

    // for (var p in pages) {
    //     if (pages[p].websiteId === req.params.websiteId) {
    //         pages[p].created = new Date();
    //         pages[p].accessed = new Date();
    //         results.push(pages[p]);
    //     }
    // }
    // res.json(results);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.send(err);
        });
    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // res.send(page);
}

function updatePage(req, res) {
    var newPage = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatePage(pageId, newPage)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
    // var page = req.body;
    // var pageId = req.params.pageId;
    // for (var p in pages) {
    //     if (pages[p]._id === pageId) {
    //         pages[p] = page;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
}

function deletePage(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .deletePage(pageId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // var index = pages.indexOf(page);
    // pages.splice(index, 1);
    // res.sendStatus(200);
}
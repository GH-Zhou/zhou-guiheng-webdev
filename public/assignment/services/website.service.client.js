(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);

    function websiteService () {
        // "this" is private
        // APIs
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;

        // only API can access the data
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        function findWebsitesByUser (userId) {
            var results = [];

            for (var v in websites) {
                if (websites[v].developerId === userId) {
                    websites[v].created = new Date();
                    websites[v].accessed = new Date();
                    results.push(websites[v]);
                }
            }
            return results;
        }

        function findWebsiteById (WebsiteId) {
            // find() implements a filter
            return websites.find(function (website) {
                return website._id === WebsiteId;
            })
        }

        function deleteWebsite (WebsiteId) {
            var website = findWebsiteById(WebsiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);
        }

        function createWebsite (website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }

        function updateWebsite (WebsiteId, website) {
            for (var v in websites) {
                if (websites[v]._id === WebsiteId)
                    websites[v] = website;
            }
        }
    }
})();
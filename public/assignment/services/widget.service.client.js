(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);

    function widgetService () {

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;

        var widgets = [
            {"_id": "123", "name": "heading1", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "name": "heading2", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "345", "name": "image1", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/", "text": "Lorem ipsum"},
            {"_id": "456", "name": "html1", "widgetType": "HTML", "pageId": "321", "text": "<p>American Airlines Group’s total revenue passenger miles (RPMs) were a record 18.6 billion, up 3.1 percent versus April 2016. Total capacity was 22.6 billion available seat miles (ASMs), up 0.8 percent versus April 2016. Total passenger load factor was 82.2 percent, up 1.8 percentage points versus April 2016.</p>"},
            {"_id": "567", "name": "heading3", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "678", "name": "youtube1", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E", "text": "Lorem ipsum"},
            {"_id": "789", "name": "html2", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function findWidgetsByPageId (pageId) {
            var results = [];

            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    results.push(widgets[w]);
                }
            }
            return results;
        }

        function findWidgetById (widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            })
        }

        function deleteWidget (widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }

        function createWidget (widgetType, pageId) {
            switch (widgetType) {
                case "HEADING":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'size': '', 'text': ''};
                    break;
                case "IMAGE":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                    break;
                case "YOUTUBE":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                    break;
                default:
                    break;
            }
            widget.pageId = pageId;
            widget._id = (new Date()).getTime() + "";
            widget.widgetType = widgetType;
            widgets.push(widget);
            return widget._id;
        }

        function updateWidget (widgetId, widget) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetId)
                    widgets[wg] = widget;
            }
        }
    }
})();
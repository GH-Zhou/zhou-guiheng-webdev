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
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>American Airlines Group’s total revenue passenger miles (RPMs) were a record 18.6 billion, up 3.1 percent versus April 2016. Total capacity was 22.6 billion available seat miles (ASMs), up 0.8 percent versus April 2016. Total passenger load factor was 82.2 percent, up 1.8 percentage points versus April 2016.</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
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

        function createWidget (widget, widgetType) {
            widget._id = (new Date()).getTime() + "";
            widget.widgetType = widgetType;
            widgets.push(widget);
        }

        function updateWidget (widgetId, widget) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetId)
                    widgets[wg] = widget;
            }
        }
    }
})();
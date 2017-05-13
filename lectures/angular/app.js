// app.js for server:
// 1. access to database, file system, unrestricted network
// 2. different from public/lectures/angular/app.js for client
// 3. running on server
// 4. express differently from server.js, this responds to requests for data

// receive data to be stored, or send data already stored

// exports: create an API into the module, make files, private functions available outside the module.
module.exports = function (app) {
    // without "/api", assume "/getPosts" in public folder
    app.get('/api/post', findAllPosts);
    // multi-parameters -> "/:index/:asdf/:sdfsdf"
    app.get     ('/api/post/:index', findPostByIndex);
    app.delete  ('/api/post/:index', deletePostByIndex);
    app.put     ('/api/post/:index', updatePostByIndex);

    var posts = [
        {title: 'post 123', body: 'body 123'},
        {title: 'post 234', body: 'body 234'},
        {title: 'post 345', body: 'body 345'},
        {title: 'post 456', body: 'body 456'}
    ];

    function findAllPosts(req, res) {
        res.json(posts);
    }

    // req: query coming from the client request
    function findPostByIndex(req, res) {
        var index = req.params['index'];
        res.json(posts[index]); // close connection, request has gone
    }

    function deletePostByIndex(req, res) {
        var index = req.params.index;
        posts.splice(index, 1);
        // res.json(posts);
        res.json(200);
    }

    function updatePostByIndex(req, res) {

    }
};
// app.js for client, running on browser

(function(){ // IIFE = Immediately Invoked Function Expression
    // avoid global variables
    angular
        .module("BlogApp", [])
        .controller("BlogPostListController", BlogPostListController);

    // CONTROLLER Part
    // $scope allows talking with view, $http allows interaction with web service
    function BlogPostListController($scope, $http) {
        // declare variables
        $scope.hello = 'hello world!!!!!';
        $scope.post = {title: '何かを入力しましょうか。', body:'何かを入力しましょうか。'};
        $scope.posts = [];

        function init() {
            findBlogPosts();
        }
        init();

        function findBlogPosts() {
            // asynchronous call
            $http.get('/api/post')
                .then(function (response) {
                    $scope.posts = response.data
                });
        }

        // event handlers
        $scope.deletePost = deletePost;
        $scope.addPost = addPost;
        $scope.selectPost = selectPost;
        $scope.updatePost = updatePost;

        function addPost(post) {
            var newPost = {
                title: post.title,
                body: post.body,
                date: new Date()
            };
            $scope.posts.push(newPost);
            console.log($scope.posts);
        }

        function deletePost(index) {
            // arg 0: insert the third argument at index
            // arg 1: remove one element at index
            // $scope.posts.splice(index, 1);
            $http
                .delete('/api/post/' + index)
                // .then(function (response) {
                //     $scope.posts = response.data
                // });
                .then(findBlogPosts);
        }

        function selectPost(index) {
            $scope.post = angular.copy($scope.posts[index]);
            // which post is selected?
            $scope.index = index;
        }

        function updatePost(post) {
            $scope.posts[$scope.index] = angular.copy(post)
        }
    }
})();
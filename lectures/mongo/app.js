//
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/webdev');
// mongoose.Promise = require('q').Promise;
//
// // native data type of javascript: configure data type in the schema
// var blogPostSchema = mongoose.Schema({
//     title: String,
//     body: String,
//     postDate: {type: Date, default: Date.now},
//     thumbsUp: {type: Number, default: 0}
// }, {collection: 'blogpost'});
//
// var blogModel = mongoose.model("BlogPost", blogPostSchema);
//
//
// deleteBlogPost("5939a0beafcf8e06b4528339")
//     .then(function (status) {
//         return findAllBlogPosts();
//     })
//     .then(function (posts) {
//         console.log(posts);
//     });
//
// function deleteBlogPost(postId) {
//     return blogModel.remove({_id: postId});
// }
//
// function updateBlogPost(postId, newPost) {
//     return blogModel
//         .update({_id: postId}, {
//             $set: newPost
//     });
// }
//
// // only find() method return actually data!!!
// function findBlogPostByTitle(title) {
//     return blogModel.find({title: title});
// }
//
// function findBlogPostById(postId) {
//     // return blogModel.findOne({_id: postId});
//     return blogModel.findById(postId);
// }
//
// function findAllBlogPosts() {
//     return blogModel.find();
// }
//
// function createBlogPost(blogPost) {
//     return blogModel
//         .create(blogPost);
// }
//
// // createBlogPost({title: 'Post 890', body: 'Body 890'})
// //     .then(function (doc) {
// //         console.log(doc);
// //     }, function (err) {
// //         console.error(err);
// //     });
//
// // findAllBlogPosts()
// //     .then(function (posts) {
// //         console.log(posts);
// //     });
//
// // findBlogPostById("59399dc122561b068654ccf4")
// //     .then(function (blogPost) {
// //         console.log(blogPost);
// //     });
//
// // findBlogPostByTitle('Post 456')
// //     .then(function (doc) {
// //         console.log(doc);
// //     }, function (err) {
// //         console.error(err);
// //     });
//
// // // update, create will return statuses ONLY.
// // updateBlogPost("5939a0beafcf8e06b4528339", {
// //     body: 'Body 890 Body 890 Body 890 Body 890'
// // })
// //     .then(function (status) {
// //         return findBlogPostById("5939a0beafcf8e06b4528339");
// //     }, function (err) {
// //         console.error(err);
// //     })
// //     .then(function (post) {
// //         console.log(post);
// //     }, function (err) {
// //         console.error(err);
// //     });
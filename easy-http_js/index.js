const http = new easyHTTP();

// http.get("https://jsonplaceholder.typicode.com/posts/1", function (
//   error,
//   posts
// ) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(posts);
//   }
// });

const data = {
  title: "Custom post",
  body: "This is a custom post",
};

// http.post("https://jsonplaceholder.typicode.com/posts", data, function (
//   error,
//   post
// ) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });

// http.put("https://jsonplaceholder.typicode.com/posts/1", data, function (
//   error,
//   post
// ) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });

// http.delete("https://jsonplaceholder.typicode.com/posts/1", function (
//   error,
//   post
// ) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });

// const data = http.get("https://jsonplaceholder.typicode.com/posts/1");
// data.then((res) => console.log(res)).catch((e) => console.log(e));

http
  .post("https://jsonplaceholder.typicode.com/posts", data)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

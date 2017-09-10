export default {
  getPosts: state => state.posts,
  getPostById: state => id => state.posts.find(post => +post.id === +id),
  getUserById: state => id => state.users.find(user => +user.id === +id),
  getCommentsByPostId: state => id =>
    state.comments.filter(({ postId }) => +postId === +id)
};

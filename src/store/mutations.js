import Vue from 'vue';

export default {
  SHOW_ALERT(state, alert) {
    state.alerts.push(alert);
  },
  HIDE_ALERT(state) {
    state.alerts.splice(0, 1);
  },
  SHOW_LOADER(state) {
    state.loading = true; // eslint-disable-line no-param-reassign
  },
  HIDE_LOADER(state) {
    state.loading = false; // eslint-disable-line no-param-reassign
  },
  SET_USERS(state, users) {
    Vue.set(state, 'users', [state.user, ...users]);
  },
  SET_POSTS(state, posts) {
    Vue.set(state, 'posts', posts);
  },
  SET_COMMENTS(state, comments) {
    Vue.set(state, 'comments', comments);
  },
  SET_POST(state, post) {
    const index = state.posts.findIndex(({ id }) => +id === +post.id);
    if (index === -1) {
      state.posts.push(post);
    } else {
      Vue.set(state.posts, index, post);
    }
  },
  SET_COMMENT(state, comment) {
    const index = state.comments.findIndex(({ id }) => id === comment.id);
    if (index === -1) {
      state.comments.push(comment);
    } else {
      Vue.set(state.comments, index, comment);
    }
  },
  DELETE_POST(state, id) {
    const index = state.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      state.posts.splice(index, 1);
    }
  },
  DELETE_COMMENT(state, id) {
    const index = state.comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
      state.comments.splice(index, 1);
    }
  },
  LAST_POST_ID_INCREMENT(state) {
    state.lastPostId += 1; // eslint-disable-line no-param-reassign
  },
  LAST_COMMENT_ID_INCREMENT(state) {
    state.lastCommentId += 1; // eslint-disable-line no-param-reassign
  }
};

import { axios, apiCases } from '@/api';

const postsApi = apiCases('posts');
const commentsApi = apiCases('comments');
const usersApi = apiCases('users');

// 'axios.delete('/posts/520')' will return error (404 Not found)
// but post with id === 520 can be in our store
const fakeResponse = ({ id, url, status, method }) => ({
  status,
  method,
  config: {
    baseURL: '',
    url: id ? `${url}/${id}` : url
  }
});

export default {
  alert({ commit }, alert) {
    if (!alert) return;
    commit('SHOW_ALERT', alert);
    setTimeout(() => commit('HIDE_ALERT'), 3000);
  },
  fetchDB({ dispatch }) {
    dispatch('fetchPosts');
    dispatch('fetchComments');
    dispatch('fetchUsers');
  },
  async fetchPosts({ commit, dispatch }) {
    commit('SHOW_LOADER');
    try {
      const response = await axios(postsApi.getAll);
      commit('SET_POSTS', response.data);
      dispatch('alert', response);
    } catch ({ message, response }) {
      dispatch('alert', response || { message });
    }
    commit('HIDE_LOADER');
  },
  async fetchComments({ commit, dispatch }) {
    commit('SHOW_LOADER');
    try {
      const response = await axios(commentsApi.getAll);
      commit('SET_COMMENTS', response.data);
      dispatch('alert', response);
    } catch ({ message, response }) {
      dispatch('alert', response || { message });
    }
    commit('HIDE_LOADER');
  },
  async fetchUsers({ commit, dispatch }) {
    commit('SHOW_LOADER');
    try {
      const response = await axios(usersApi.getAll);
      commit('SET_USERS', response.data);
      dispatch('alert', response);
    } catch ({ message, response }) {
      dispatch('alert', response || { message });
    }
    commit('HIDE_LOADER');
  },
  async deletePost({ commit, dispatch }, id) {
    commit('SHOW_LOADER');
    try {
      const isNewPost = id > 100;
      const req = postsApi.delete(id);
      const response = !isNewPost
        ? await axios(req)
        : fakeResponse({ ...req, status: 201 });
      commit('DELETE_POST', id);
      dispatch('alert', response);
    } catch ({ message, response }) {
      dispatch('alert', response || { message });
    }
    commit('HIDE_LOADER');
  },
  async deleteComment({ commit, dispatch }, id) {
    commit('SHOW_LOADER');
    try {
      const isNewComment = +id > 500;
      const req = commentsApi.delete(id);
      const response = !isNewComment
        ? await axios(req)
        : fakeResponse({ ...req, status: 201 });
      commit('DELETE_COMMENT', id);
      dispatch('alert', response);
    } catch ({ message, response }) {
      dispatch('alert', response || { message });
    }
    commit('HIDE_LOADER');
  },
  editPost({ commit, dispatch }, post) {
    commit('SHOW_LOADER');
    const isNewPost = post.id > 100;
    const req = postsApi.update(post.id, post);
    if (isNewPost) {
      const response = fakeResponse({ ...req, status: 200 });
      return new Promise(resolve => {
        commit('SET_POST', post);
        dispatch('alert', response);
        commit('HIDE_LOADER');
        resolve();
      });
    }
    return new Promise((resolve, reject) => {
      axios(req)
        .then(response => {
          commit('SET_POST', response.data);
          dispatch('alert', response);
          commit('HIDE_LOADER');
          resolve();
        })
        .catch(({ message, response }) => {
          dispatch('alert', response || { message });
          commit('HIDE_LOADER');
          reject(response || { message });
        });
    });
  },
  createPost({ commit, dispatch }, post) {
    commit('SHOW_LOADER');
    return new Promise((resolve, reject) => {
      axios(postsApi.create(post))
        .then(response => {
          commit('SET_POST', response.data);
          commit('LAST_POST_ID_INCREMENT');
          dispatch('alert', response);
          commit('HIDE_LOADER');
          resolve(response.data.id);
        })
        .catch(({ message, response }) => {
          dispatch('alert', response || { message });
          commit('HIDE_LOADER');
          reject(response || { message });
        });
    });
  },
  editComment({ commit, dispatch }, comment) {
    commit('SHOW_LOADER');
    const isNewComment = comment.id > 500;
    const req = commentsApi.update(comment.id, comment);
    if (isNewComment) {
      const response = fakeResponse({ ...req, status: 200 });
      return new Promise(resolve => {
        commit('SET_COMMENT', comment);
        dispatch('alert', response);
        commit('HIDE_LOADER');
        resolve();
      });
    }
    return new Promise((resolve, reject) => {
      axios(req)
        .then(response => {
          commit('SET_COMMENT', response.data);
          dispatch('alert', response);
          commit('HIDE_LOADER');
          resolve();
        })
        .catch(({ message, response }) => {
          dispatch('alert', response || { message });
          commit('HIDE_LOADER');
          reject(response || { message });
        });
    });
  },
  createComment({ commit, dispatch }, comment) {
    commit('SHOW_LOADER');
    return new Promise((resolve, reject) => {
      axios(commentsApi.create(comment))
        .then(response => {
          commit('SET_COMMENT', response.data);
          commit('LAST_COMMENT_ID_INCREMENT');
          dispatch('alert', response);
          commit('HIDE_LOADER');
          resolve(response.data.id);
        })
        .catch(({ message, response }) => {
          dispatch('alert', response || { message });
          commit('HIDE_LOADER');
          reject(response || { message });
        });
    });
  }
};

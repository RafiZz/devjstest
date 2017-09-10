import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      name: 'Rafis Bikbov',
      username: 'DRIBBLER',
      email: 'dribblerafis@gmail.com',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    },
    loading: false,
    lastPostId: 100,
    lastCommentId: 500,
    posts: [],
    users: [],
    comments: [],
    alerts: []
  },
  mutations,
  actions,
  getters
});

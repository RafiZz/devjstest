import Vue from 'vue';
import Router from 'vue-router';
import posts from '@/containers/posts';
import post from '@/containers/post';
import scrollBehavior from './scrollBehavior';

Vue.use(Router);

export default new Router({
  base: '/',
  mode: 'history',
  scrollBehavior,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/posts',
      name: 'posts',
      component: posts
      // children: [{ name: 'post', path: ':id', component: post }]
    },
    { name: 'post', path: '/posts/:id', component: post },
    { path: '*', redirect: '/posts' }
  ]
});

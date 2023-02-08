import Vue from 'vue';
import Router from 'vue-router';
import Homepage from './src/components/HomePage.vue';
import SearchPage from './src/components/SearchPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/search',
      name: 'searchpage',
      component: SearchPage
    }
  ]

});
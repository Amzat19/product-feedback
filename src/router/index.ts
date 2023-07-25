import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SuggestionsView from '../views/SuggestionsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Suggestions',
    component: SuggestionsView,
  },
  {
    path: '/feedback-detail/:id',
    name: 'feedback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FeedbackDetailView.vue'),
  },
  {
    path: '/create-new-feedback',
    name: 'newFeedback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "newFeedback" */ '../views/NewFeedBackView.vue'),
  },
  {
    path: '/edit-feedback/:id',
    name: 'editFeedback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "editFeedback" */ '../views/EditFeedBackView.vue'),
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Roadmap" */ '../views/RoadMapView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

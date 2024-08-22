import { createRouter, createWebHistory } from 'vue-router';
import InputForm from './components/InputForm.vue';
import ResultsDisplay from './components/ResultsDisplay.vue';

const routes = [
  { path: '/', component: InputForm },
  { path: '/results', component: ResultsDisplay },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

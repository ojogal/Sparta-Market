import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import HorsesPage from '@/views/HorsesPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import HorsePage from '@/views/HorsePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import PolicyPage from '@/views/PolicyPage.vue';
import TermsPage from '@/views/TermsPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import AdminPage from '@/views/AdminPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/horses',
      name: 'horses',
      component: HorsesPage
    },
    {
      path: '/horse/:id',
      name: 'horse',
      component: HorsePage,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/policy',
      name: 'policy',
      component: PolicyPage
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      meta: { type: "admin" }
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: AdminPage,
      meta: { type: "adminLogin" }
    },
    {
      path: '/admin/new',
      name: 'admin-new',
      component: AdminPage,
      meta: { type: "new" }
    },
    {
      path: '/admin/edit/:id',
      name: 'admin-edit',
      component: AdminPage,
      meta: { type: "edit" }
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: NotFoundPage
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
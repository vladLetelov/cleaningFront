import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../Pages/MainPage.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../Pages/AboutPage.vue")
    },
    {
      path: "/service",
      name: "service",
      component: () => import("../Pages/ServicesPage.vue"),
    },
    {
      path: "/requests",
      name: "request",
      component: () => import("../Pages/AdminRequestsPage.vue"),
      meta: { requiresAuth: true, requiredRole: 'Администратор' }
    },
    {
      path: "/createRequests",
      name: "createRequests",
      component: () => import("../Pages/CreateRequest.vue"),
      meta: { requiresAuth: true, requiredRole: 'Пользователь' }
    },
    {
      path: "/reviews",
      name: "reviews",
      component: () => import("../Pages/ReviewsPage.vue"),
    },
    {
      path: "/services/:id/reviews",
      name: "serviceReviews",
      component: () => import("../Pages/ServiceReviewsPage.vue"),
    },
    {
      path: "/admin/requests",
      name: "adminRequests",
      component: () => import("../Pages/AdminRequestsPage.vue"),
      meta: { 
        requiresAuth: true, 
        requiredRole: 'Администратор' 
      }
    },
  ],
});

// Навигационный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('role');
  
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Перенаправляем на главную, если не авторизован
      next('/');
      return;
    }
    
    if (to.meta.requiredRole && userRole !== to.meta.requiredRole) {
      // Перенаправляем, если роль не подходит
      next('/');
      return;
    }
  }
  
  next();
});

export default router;
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: 'dashboard',
        name: 'dashbaord',
        meta: { requiresAuth: true },
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'ledger',
        name: 'ledger',
        meta: { requiresAuth: true },
        component: () => import('pages/LedgerPage.vue'),
      },
      {
        path: 'loan',
        name: 'loan',
        meta: { requiresAuth: true },
        component: () => import('pages/LoanPage.vue'),
      },
      {
        path: 'deposit',
        name: 'deposit',
        meta: { requiresAuth: true },
        component: () => import('pages/LoanPage.vue'),
      },
      {
        path: 'voucher',
        name: 'voucher',
        meta: { requiresAuth: true },
        component: () => import('pages/VoucherPage.vue'),
      },
      {
        path: 'scheme',
        name: 'scheme',
        meta: { requiresAuth: true },
        component: () => import('pages/SchemePage.vue'),
      },
      {
        path: 'users',
        name: 'users',
        meta: { requiresAuth: true },
        component: () => import('pages/UserPage.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import('pages/ProfilePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

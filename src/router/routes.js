import LoginLayout from 'layouts/LoginLayout.vue';
import Login from 'pages/Login.vue' ;
import ExamStaff from 'pages/ExamStaff.vue';
import GoExam from 'pages/GoExam.vue' ;


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'home' },
      { path: 'examStaff/:contestId', component: ExamStaff , name: 'examStaff'},
      {path: 'toExam/:examStaffId', component: GoExam, name: 'toExam' },
    ],
    meta: {
      authentication: true,
    }
  },

  {
    path:'/',
    component: LoginLayout,
    children: [
      {path: 'login', component: Login , name: 'login'},
    ],
    meta: {
      authentication: false,
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

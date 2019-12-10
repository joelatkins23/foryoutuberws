import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Configurations
const TradeSettings = () => import('@/views/configurations/TradeSettings')
const Privacy = () => import('@/views/configurations/Privacy')
const Notifications = () => import('@/views/configurations/Notifications')
const Mentor = () => import('@/views/configurations/Mentor')
const ImportTrades = () => import('@/views/configurations/ImportTrades')

// Profile
const PersonalInformation = () => import('@/views/profile/PersonalInformation')
const AccountPlan = () => import('@/views/profile/AccountPlan')
const Invoices = () => import('@/views/profile/Invoices')

// Reports View
const ReportOverview = () => import('@/views/reports/ReportOverview')
const HourlyReport = () => import('@/views/reports/HourlyReport')

// Performance View
const Performance = () => import('@/views/performance/Performance')
const Simulator = () => import('@/views/performance/Simulator')
const Comparative = () => import('@/views/performance/Comparative')

const Trades = () => import('@/views/Trades')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
// const ServicesLogin = () => import('@/views/pages/ServicesLogin')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

//methods / functions
import ServicesLogin from '@/views/pages/ServicesLogin'

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          // beforeEnter: requiredAuth
        },
        {
          path: 'layout',
          name: 'Layout',          // beforeEnter: requiredAuth
        },
        {
          path: 'reports',
          name: 'Reports',
          redirect: '/reports/overview',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'overview',
              name: 'Report Overview',
              component: ReportOverview,
            },
            {
              path: 'hourly',
              name: 'Hourly Reports',
              component: HourlyReport
            },
          ]
        },
        {
          path: 'trades',
          name: 'Trades',
          component: Trades,
        },
        {
          path: 'performance',
          redirect: '/performance/evaluator',
            component: {
                render (c) { return c('router-view') }
            },
            children: [
                {
                    path: 'evaluator',
                    name: 'Performance',
                    component: Performance
                },
                {
                    path: 'comparative',
                    name: 'Comparative',
                    component: Comparative
                },
                {
                    path: 'simulator',
                    name: 'Simulator',
                    component: Simulator
                }
            ]
        },
        {
          path: 'configurations',
          name: 'Configuration',
          redirect: '/configuration/trades',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'trades',
              name: 'Trade Settings',
              component: TradeSettings,
            },
            {
              path: 'notifications',
              name: 'Notifications',
              component: Notifications,
            },
            {
              path: 'privacy',
              name: 'Privacy',
              component: Privacy,
            },
            {
              path: 'mentor',
              name: 'Mentor',
              component: Mentor,
            },
            {
              path: 'import',
              name: 'Import Trades',
              component: ImportTrades,
            },
          ]
        },
        {
          path: 'profile',
          name: 'Profile',
          redirect: '/profile/profile',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'profile',
              name: 'PersonalInformation',
              component: PersonalInformation,
            },
            {
              path: 'account',
              name: 'Account Plan',
              component: AccountPlan,
            },
            {
              path: 'invoices',
              name: 'Invoices',
              component: Invoices,
            },
          ]
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
function requiredAuth (to, from, next) {
  if (!ServicesLogin.isLoguedIn()) {
    next({
      path: '/pages/login',
      // query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function readyIsLogued (to, from, next) {
  if (ServicesLogin.isLoguedIn()) {
    next({
      path: '/', //dashboard
      // query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

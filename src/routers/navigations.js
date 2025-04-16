import { h } from 'vue'
// views 
import ProjectsPage from '@/pages/dashboard/projects/ProjectsPage.vue'
import TasksPage from '@/pages/dashboard/tasks/TasksPage.vue'
import ProfilePage from '@/pages/dashboard/profile/ProfilePage.vue'
import WorkTimePage from '@/pages/dashboard/worktime/WorkTimePage.vue'
// icons
import IconProject from '@/components/icons/IconProject.vue'
import IconTasks from '@/components/icons/IconTasks.vue'
import IconTripleUser from '@/components/icons/IconTripleUser.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
// views components

const navigations = [
  // {
  //   path: 'clients',
  //   name: 'DashboardClientsView',
  //   component: DashboardClientsView,
  //   redirect: { name: 'ClientsView' },
  //   meta: {
  //     showMenu: true,
  //     icon: () => h(IconTripleUser)
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'ClientsView',
  //       component: ClientsView
  //     },
  //     {
  //       path: 'transactions/:clientId',
  //       name: 'ClientsTransactionsView',
  //       component: TransactionsView
  //     }
  //   ]
  // },

  {
    path: 'projects',
    name: 'ProjectsView',
    component: ProjectsPage,
    // redirect: { name: 'TransactionsView' },
    meta: {
      showMenu: true,
      icon: () => h(IconProject)
    },
    // children: [
    //   {
    //     path: '',
    //     name: 'TransactionsView',
    //     component: TransactionsView
    //   }
    // ]
  },
  {
    path: 'tasks',
    name: 'tasksView',
    component: TasksPage,
    meta: {
      showMenu: true,
      icon: () => h(IconTasks)
    },
  },
  {
    path: 'profile',
    name: 'profileView',
    component: ProfilePage,
    meta: {
      showMenu: true,
      icon: () => h(IconProfile)
    },
  },
  {
    path: 'workings',
    name: 'workingView',
    component: WorkTimePage,
    meta: {
      showMenu: true,
      icon: () => h(IconCalendar)
    },
  },
]
export default navigations

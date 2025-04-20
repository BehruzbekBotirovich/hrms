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
import ProjectTasks from '../pages/dashboard/projects/views/FolderTasks.vue'
import ProjectDeatils from '../pages/dashboard/projects/views/ProjectView.vue'
import ProjectsList from '../pages/dashboard/projects/components/ProjectsList.vue'
const navigations = [
  {
    path: 'projects',
    name: 'ProjectsView',
    component: ProjectsPage,
    redirect: { name: 'ProjectsList' },
    meta: {
      showMenu: true,
      icon: () => h(IconProject)
    },
    children: [
      {
        path: '',
        name: 'ProjectsList',
        component: ProjectsList,
      },
      {
        path: 'view/:id',
        name: 'ProjectDetails',
        component: ProjectDeatils,
      },
      {
        path: 'tasks/:id/',
        name: 'ProjectTasks',
        component: ProjectTasks,
      }

    ]
  },
  {
    path: 'tasks',
    name: 'TasksView',
    component: TasksPage,
    meta: {
      showMenu: true,
      icon: () => h(IconTasks)
    },
  },
  {
    path: 'profile',
    name: 'ProfileView',
    component: ProfilePage,
    meta: {
      showMenu: true,
      icon: () => h(IconProfile)
    },
  },
  {
    path: 'workings',
    name: 'WorkingView',
    component: WorkTimePage,
    meta: {
      showMenu: true,
      icon: () => h(IconCalendar)
    },
  },
]
export default navigations

import { h } from 'vue'
// views 
import ProjectsPage from '@/pages/dashboard/projects/ProjectsPage.vue'
import TasksPage from '@/pages/dashboard/tasks/TasksPage.vue'
import ProfilePage from '@/pages/dashboard/profile/ProfilePage.vue'
// icons
import IconProject from '@/components/icons/IconProject.vue'
import IconTasks from '@/components/icons/IconTasks.vue'
import IconTripleUser from '@/components/icons/IconTripleUser.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
// views components
import ProjectTasks from '../pages/dashboard/projects/views/FolderTasks.vue'
import ProjectDeatils from '../pages/dashboard/projects/views/ProjectView.vue'
import ProjectsList from '../pages/dashboard/projects/components/ProjectsList.vue'
import EmployeesPage from '../pages/dashboard/employees/EmployeesPage.vue'

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
    path: 'employees',
    name: 'EmployeesView',
    component: EmployeesPage,
    meta: {
      showMenu: true, // отображать только для админа и менеджера
      icon: () => h(IconTripleUser)
    },
  },
 ]

export default navigations

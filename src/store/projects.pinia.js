import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import { all } from 'axios'

const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    employees: [],
    all_employees: [],
    boards: [],
    project_members: [],
    loading: false,
    loadingModal: false,
  }),

  actions: {
    //projects
    getProjects() {
      this.projects = []
      this.loading = true
      const core = useCore()
      // core.loadingMain = true
      api({
        url: '/projects',
        method: 'GET'
      })
        .then(({ data }) => {
          this.projects = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loading = false
        })
    },

    addProject(project) {
      const core = useCore()
      console.log(project);
      // core.loadingMain = true
      api({
        url: '/projects',
        method: 'POST',
        data: project
      })
        .then(({ data }) => {
          this.getProjects()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

    getMembersOfProject(projectId) {
      const core = useCore()
      this.loadingModal = true
      api({
        url: `/projects/${projectId}/members`,
        method: 'GET'
      })
        .then(({ data }) => {
          this.project_members = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loadingModal = false
        })
    },

    patchMemberOfProject(projectId, userIds, action) {
      const core = useCore()
      this.loadingModal = true
      api({
        url: `/projects/${projectId}/members`,
        method: 'PATCH',
        data: {
          userIds,
          action
        }
      })
        .then(({ data }) => {
          this.getMembersOfProject(projectId)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loadingModal = false
        })
    },

    //boards
    getBoardsForProject(projectId) {
      const core = useCore()
      this.loading = true
      this.boards = []
      api({
        url: `/projects/${projectId}/boards`,
        method: 'GET'
      })
        .then(({ data }) => {
          this.boards = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          this.loading = false
        })
    },

    addBoardToProject(projectId, boardName) {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: `/projects/${projectId}/boards`,
        method: 'POST',
        data: {
          name: boardName
        }
      })
        .then(({ data }) => {
          this.getBoardsForProject(projectId)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

    // globals
    getAllEmployees() {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: '/users',
        method: 'GET'
      })
        .then(({ data }) => {
          this.all_employees = data
          console.log(data);
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },
  }
})

export default useProjectsStore
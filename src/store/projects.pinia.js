import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [{
      id: 1,
      name: "Project1",
      description: "Project 1",
      members_count: 12,
      creater: "Jone",
      status: "ACTIVE",
    },
    {
      id: 1,
      name: "Project2",
      description: "Project 2",
      members_count: 12,
      creater: "Beha",
      status: "CLOSED",
    }]
  }),
  actions: {

  }
})

export default useProjectsStore


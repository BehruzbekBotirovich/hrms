import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useUser = defineStore('User', {
  state: () => ({
    user: null,
    branches: {
      content: [],
      total: 15
    }
  }),
  actions: {
    getUserMe() {
      const core = useCore()
      core.loadingMain = true
      api({
        url: '/users/me'
      })
        .then(({ data }) => {
          this.user = data
          console.log(this.user)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingMain = false
        })
    },

    updateMe(data) {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: `/users/${this.user._id}`,
        method: 'PATCH',
        data: data
      })
        .then(({ data }) => {
          this.user = data
          core.setToast({
            locale: 'user.update_success',
            type: 'success'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

    updateAvatar(data) {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: `/upload/upload-avatar`,
        method: 'POST',
        data: data
      })
        .then(({ data }) => {
          this.user = data
          core.setToast({
            locale: 'user.update_success',
            type: 'success'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

    getMyKpi() {
      const core = useCore()
      const currentDate = new Date()
      api({
        url: 'users/me/kpi',
        method: 'GET',
        params: {
          month: currentDate.getMonth() + 1, // getMonth() returns 0-11, so add 1
          year: currentDate.getFullYear()
        }
      })
        .then(({ data }) => {
          this.user.kpi = data
          console.log(this.user)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
    }
  }
})

export default useUser

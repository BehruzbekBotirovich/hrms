import { defineStore } from 'pinia'
import useCore from '@/store/core.pinia.js'
import { api } from '@/utils/api/index.js'
import { loginWithPasswordApi } from '@/api/auth.api.js'
import useModal from '@/store/modal.pinia.js'
import { shallowRef } from 'vue'

const useAuth = defineStore('auth', {
  state: () => ({
    otpData: null,
    loading: false
  }),
  actions: {
    // Number password login & OTP
    loginWithPassword(form) {
      this.loading = true
      const { switchStatus, redirect, loadingUrl } = useCore()
      loadingUrl.add('get-token')
      loginWithPasswordApi(form) // POST auth/sign-in
        .then(({ data }) => {
          localStorage.setItem('access_token', data?.accessToken)
          localStorage.setItem('refresh_token', data?.refreshToken)
          redirect(`/dashboard/projects`)
        })
        .catch((err) => {
          switchStatus(err)
        })
        .finally(() => {
          this.loading = false
          loadingUrl.delete('get-token')
        })
    }
  }
})

export default useAuth

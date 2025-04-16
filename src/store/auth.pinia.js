import { defineStore } from 'pinia'
import useCore from '@/store/core.pinia.js'
import { api } from '@/utils/api/index.js'
import {
  authLoginWithEimzoApi,
  authRegisterApi,
  authTokenApi,
  loginWithPasswordApi,
  getMobileQrScannedApi
} from '@/api/auth.api.js'
import useModal from '@/store/modal.pinia.js'
import { shallowRef } from 'vue'

const useAuth = defineStore('auth', {
  state: () => ({
    otpData: null,
    loading: false
  }),
  actions: {
    // open OTP modal helper
    openOtpModal(otpData) {
      const modal = useModal()
      const { redirect } = useCore()

      modal.open({
        props: {
          url: 'auth/token',
          otpData: otpData,
          data: {
            grantType: 'VERIFY_OTP'
          }
        },
        emits: {
          success: (data) => {
            localStorage.setItem('access_token', data?.access_token)
            localStorage.setItem('refresh_token', data?.refresh_token)
            redirect(`/payplan/dashboard`)
          },
        }
      })
    },

    // open OTP modal for register
    openOtpModalRegister(otpData) {
      const modal = useModal()
      const { redirect } = useCore()

      modal.open({
        props: {
            url: 'auth/sign-up/verify-otp',
          otpData: otpData,
          data: {
            grantType: 'VERIFY_OTP'
          }
        },
        emits: {
          success: (data) => {
            localStorage.setItem('access_token', data?.access_token)
            localStorage.setItem('refresh_token', data?.refresh_token)
            redirect(`/dashboard`)
          },
        }
      })
    },

    // E-imzo login & OTP
    loginWithEimzo(pkcs7) {
      const { switchStatus } = useCore()
      this.loading = true
      authLoginWithEimzoApi(pkcs7) // api-->  auth/login/e-imzo
        .then(({ data }) => {
          this.openOtpModal(data)
        })
        .catch((err) => {
          switchStatus(err)
        })
        .finally(() => {
          this.loading = false
        })
    },

    // Number password login & OTP
    loginWithPassword(form) {
      const { switchStatus } = useCore()
      this.loading = true
      loginWithPasswordApi(form) // api--> auth/sign-in
        .then(({ data }) => {
          this.openOtpModal(data)
        })
        .catch((err) => {
          switchStatus(err)
        })
        .finally(() => {
          this.loading = false
        })
    },

    // When QR scanned check status and get data
    getMobileQrScannedData(documentId, callback) {
      const corePinia = useCore()
      corePinia.loadingUrl.add('/auth/eimzo')
      getMobileQrScannedApi(documentId) // api--> auth/e-imzo/mobile/auth-doc/{documentId}
        .then(({ data }) => {
          this.loginWithEimzoMobile(data.id, callback)
        })
        .catch((error) => {
          corePinia.switchStatus(error)
        })
        .finally(() => {
          corePinia.loadingUrl.delete('/auth/eimzo')
        })
    },

    // Login with e-imzo mobile QR Code scanned then if data 200
    loginWithEimzoMobile(docId, callback) {
      const { switchStatus } = useCore()
      api({
        url: 'auth/e-imzo/mobile/auth-info',
        open: true,
        hasOsession: false,
        pk: docId
      }) 
        .then(({ data }) => {
          this.openOtpModal(data)
          callback?.()
        })
        .catch((err) => {
          switchStatus(err)
        })
        .finally(() => {
          this.loading = false
        })
    },

    // Register with E-IMZO
    registerWithEImzo(form) {
      const core = useCore()
      authRegisterApi(form) // api--> auth/sign-up/e-imzo
        .then(({ data }) => {
          this.openOtpModalRegister(data)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
    }
  }
})

export default useAuth
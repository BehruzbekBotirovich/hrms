import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useModal from './modal.pinia'

const useEmployeesStroe = defineStore('tasks', {
    state: () => ({
        loading: false,
        employees: [],
        employeesKpi: [],
    }),

    actions: {
        getAllEmployees() {
            this.loading = true
            const core = useCore()
            api({
                url: `/users`,
                method: 'GET',
            })
                .then(({ data }) => {
                    this.employees = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        addEmployee(employee) {
            this.loading = true
            const core = useCore()
            const modal = useModal()
            // 👉 собираем formData
            const formData = new FormData()
            formData.append('fullName', employee.fullName)
            formData.append('email', employee.email)
            formData.append('password', employee.password)
            formData.append('role', employee.role)
            formData.append('chatId', employee.chatId)
            formData.append('department', employee.department)
            formData.append('position', employee.position)
            formData.append('phone', employee.phone)

            if (employee.image) {
                formData.append('avatar', employee.image)  // ⬅️ 'avatar' должен совпадать с именем поля multer
            }

            api({
                url: `/users`,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(({ data }) => {
                    this.employees.push(data)
                    core.setToast({
                        locale: 'employee.add_success',
                        type: 'success'
                    })
                    modal.close()
                    this.getAllEmployees()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        deleteEmployee(employee_id) {
            this.loading = true
            const core = useCore()
            const modal = useModal()
            api({
                url: `/users/${employee_id}`,
                method: 'DELETE',
            })
                .then(({ data }) => {
                    core.setToast({
                        locale: 'employee.delete_success',
                        type: 'success'
                    })
                    modal.close()
                    this.getAllEmployees()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        updateEmployee(employee) {
            this.loading = true
            const core = useCore()
            const modal = useModal()
            api({
                url: `/users/${employee._id}`,
                method: 'PATCH',
                data: employee
            })
                .then(({ data }) => {
                    core.setToast({
                        locale: 'employee.update_success',
                        type: 'success'
                    })
                    modal.close()
                    this.getAllEmployees()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        reActiveEmployee(employee_id) {
            this.loading = true
            const core = useCore()
            const modal = useModal()
            api({
                url: `/users/reactivate/${employee_id}`,
                method: 'PATCH',
            })
                .then(({ data }) => {
                    core.setToast({
                        locale: 'employee.reactivate_success',
                        type: 'success'
                    })
                    modal.close()
                    this.getAllEmployees()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        getEmployeesKpi(month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
            this.loading = true
            api({
                url: `/users/kpi`,
                method: 'GET',
                params: { month, year },
            })
                .then(({ data }) => {
                    this.employeesKpi = data
                })
                .catch((error) => {
                    console.error('Error fetching employee KPI:', error);
                })
                .finally(() => {
                   this.loading = false
                });
        },

    }
})

export default useEmployeesStroe
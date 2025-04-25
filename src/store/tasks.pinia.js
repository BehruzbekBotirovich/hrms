import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useModal from './modal.pinia'

const useTasksStore = defineStore('tasks', {
    state: () => ({
        board_tasks: [],
        project_members: [],
        current_task: null,
        loading: true,
    }),

    actions: {
        //tasks for current board
        getBoardTasks(boardId) {
            const core = useCore()
            // core.loadingMain = true
            api({
                url: `/boards/${boardId}`,
                method: 'GET'
            })
                .then(({ data }) => {
                    this.board_tasks = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    // core.loadingMain = false
                })
        },

        changeTaskStatus(taskId, status, boardId) {
            const core = useCore()
            api({
                url: `/tasks/${taskId}/status`,
                method: 'PATCH',
                data: {
                    status: status
                }
            })
                .then(({ data }) => {
                    this.getBoardTasks(boardId)
                    core.setToast({
                        locale: 'task.change_success',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },

        getOneTask(taskId) {
            this.loading = true
            const core = useCore()
            // core.loadingMain = true
            api({
                url: `/tasks/${taskId}`,
                method: 'GET'
            })
                .then(({ data }) => {
                    this.current_task = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                    // core.loadingMain = false
                })
        },

        updateTask(taskId, payload, boardId) {
            const core = useCore()
            const modal = useModal()

            api({
                url: `/tasks/${taskId}`,
                method: 'PATCH',
                data: payload
            })
                .then(() => {
                    this.getBoardTasks(boardId)
                    modal.close()
                    core.setToast({
                        locale: 'task.update_success',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },


        addNewTask(task, boardId) {
            const modal = useModal()
            const core = useCore()

            const filteredFormData = new FormData()

            for (const [key, value] of task.entries()) {
                // Проверка для обычных значений
                const isEmptyString = typeof value === 'string' && value.trim() === ''
                const isEmptyArray = Array.isArray(value) && value.length === 0

                // Не добавляем пустые строки, null, undefined, пустые массивы
                if (value !== null && value !== undefined && !isEmptyString && !isEmptyArray) {
                    // Дополнительно: фильтруем priority, если он не из списка допустимых
                    if (key === 'priority') {
                        const allowed = ['muhim', 'shoshilinch', 'yuqori', 'normal', 'past']
                        if (allowed.includes(value)) {
                            filteredFormData.append(key, value)
                        }
                    } else {
                        filteredFormData.append(key, value)
                    }
                }
            }
            console.log(...filteredFormData);

            api({
                url: `/boards/${boardId}/tasks`,
                method: 'POST',
                data: filteredFormData
            })
                .then(({ data }) => {
                    this.getBoardTasks(boardId)
                    core.setToast({
                        locale: 'task.add_success',
                        type: 'success'
                    })
                    modal.close()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },

        // get all employees
        getMembersOfProject(projectId) {
            const core = useCore()
            // core.loadingMain = true
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
                    // core.loadingMain = false
                })
        },

    }
})

export default useTasksStore
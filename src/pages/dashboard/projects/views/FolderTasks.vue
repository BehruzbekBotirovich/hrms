<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useTasksStore from '@/store/tasks.pinia.js'
import useUser from '@/store/user.pinia.js'
import TaskBoard from '../components/TaskBoard.vue'

const router = useRouter()
const route = useRoute()
const tasksStore = useTasksStore()
const userStore = useUser()

const search = ref(route.query.task_id || '')

const statusFilterSelected = ref(null)
const projectName = route.query.projectName
const boardName = route.query.boardName
const boardId = route.params.id
const projectId = route.query.projectId
// Статусы задач для фильтрации         enum: ['Low', 'Normal', 'Medium', 'High', 'Urgent'],

const statusFilters = [
    { value: 'Urgent', label: 'Muhim' },
    { value: 'High', label: 'Yuqori' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Medium', label: "O'rta" },
    { value: 'Low', label: 'Past' },
    { value: null, label: 'Barchasi' },
]

// Флаг для "Мои задачи"
const myTasksActive = ref(false)

// Получаем задачи для доски
onMounted(() => {
    filterTasks()
    tasksStore.getMembersOfProject(projectId)
})

// Функция для активации кнопки "Мои задачи"
const filterMyTasks = () => {
    myTasksActive.value = !myTasksActive.value
    if (myTasksActive.value) {
        // Фильтруем задачи по текущему пользователю
        statusFilterSelected.value = null // Сбросить фильтр по статусу
        search.value = '' // Сбросить поисковый запрос
        tasksStore.getBoardTasks(boardId, {
            assignedTo: userStore.user._id, // Фильтруем по текущему пользователю
        })
    } else {
        // Возвращаем все задачи без фильтрации
        tasksStore.getBoardTasks(boardId)
    }
}
// Функция для фильтрации задач по поиску и статусу
const filterTasks = () => {
    if (!search.value || search.value.length == 24) {
        const params = {
            id: search.value,
            priority: statusFilterSelected.value,
        }

        tasksStore.getBoardTasks(boardId, params)
    }

}
</script>

<template>
    <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <router-link to="/dashboard/projects" class="hover:underline">Проекты</router-link>
        <span>/</span>
        <span class="text-black font-semibold">{{ projectName }} / {{ boardName }}</span>
    </div>
   
   
    <div class="flex items-center justify-between mb-6">
        <div class="flex gap-2 items-center">
            <a-button @click="router.back()">
                <icon-back />
            </a-button>
            <h2 class="text-2xl font-bold mb-0">{{ $t('task.boards') }} </h2>
        </div>
        <div class="flex space-x-2">
            <a-input v-model:value="search" type="text" placeholder="Id boʻyicha izlash"
                class="input input-bordered input-sm w-60" @input="filterTasks" />
            <a-select v-model:value="statusFilterSelected" allowClear :options="statusFilters" placeholder="Status"
                class="w-[120px]" @change="filterTasks" />
            <a-button :class="{ 'bg-blue-500': myTasksActive, 'text-white': myTasksActive }" class="btn-sm gap-1"
                @click="filterMyTasks">
                {{ $t('task.mine') }}
            </a-button>
            <a-button class="btn-sm gap-1">
                <icon-triple-user />
                {{ $t('task.members') }}
            </a-button>
        </div>
    </div>

    <!-- tasks board -->
    <TaskBoard />
</template>

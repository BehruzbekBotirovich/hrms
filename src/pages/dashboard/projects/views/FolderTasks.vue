<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import TaskBoard from '../components/TaskBoard.vue'
const router = useRouter()

const search = ref('')
const statusFilterSelected = ref(null)

const statusFilters = [
    { value: 'URGENT', label: 'MUHIM' },
    { value: 'HIGHT', label: 'PAST' },
    { value: "MEDIUM", label: 'ORTA' },
    { value: 'LOW', label: 'SHOSHILINCH' },
]
</script>

<template>

    <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <router-link to="/dashboard/projects" class="hover:underline">Проекты</router-link>
        <span>/</span>
        <span class="text-black font-semibold">Project name / board name</span>
    </div>

    <div class="flex items-center justify-between mb-6">
        <div class="flex gap-2 items-center">
            <a-button @click="router.back()">
                <icon-back />
            </a-button>
            <h2 class="text-2xl font-bold mb-0">Jarayonlar roʻyxati</h2>
        </div>
        <div class="flex space-x-2">
            <a-input v-model="search" type="text" placeholder="Id boʻyicha izlash"
                class="input input-bordered input-sm w-32" />
            <a-select v-model:value="statusFilterSelected" allowClear :options="statusFilters" placeholder="Status"
                class="w-[120px]" />
            <a-button class="btn-sm gap-1">
                <icon-user />
                Мои задачи
            </a-button>
            <a-button class="btn-sm gap-1">
                <icon-triple-user />
                Bajaruvchilar
            </a-button>
        </div>
    </div>

    <!-- tasks board -->
    <TaskBoard />



</template>

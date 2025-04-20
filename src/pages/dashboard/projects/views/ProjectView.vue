<template>
    <section>
        <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <router-link to="/dashboard/projects" class="hover:underline">Проекты</router-link>
            <span>/</span>
            <span class="text-black font-semibold">{{ project.name }}</span>
        </div>

        <div class="flex items-center justify-between mb-6">
            <div class="flex gap-2 items-center">
                <a-button @click="router.back()">
                    <icon-back />
                </a-button>
                <h2 class="text-2xl font-bold mb-0">Board</h2>
            </div>
            <div class="flex space-x-2">
                <a-input v-model="search" type="text" placeholder="Введите название Board..."
                    class="input input-bordered input-sm w-52" />
                <a-select v-model="statusFilter" class="w-[140px]" allowClear placeholder="Ustuvorlik tanlang">
                    <a-select-option value="all">Barchasi</a-select-option>
                    <a-select-option value="ACTIVE">Jarayonda</a-select-option>
                    <a-select-option value="INACTIVE">Yopilgan</a-select-option>
                </a-select>

                <a-button class="btn-sm gap-1">
                    <icon-triple-user />
                    Прикрепленные сотрудники
                </a-button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div v-for="board in filteredBoards" :key="board.id"
                class="border bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <router-link :to="`/dashboard/projects/tasks/${board.id}`">
                    <div class="flex items-center gap-2">
                        <icon-folder />
                        <h3 class="text-lg font-semibold mb-0">{{ board.title }}</h3>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                        Прикрепленные задачи: {{ board.tasks_count }}
                    </p>
                    <div class="flex items-center space-x-3 text-xs">
                        <badge-component :status="board.status" />
                        <div class="text-gray-700 border gap-1 p-1 rounded-lg flex items-center">
                            <icon-pinned />
                            {{ board.creator }}
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BadgeComponent from '@/components/BadgeComponent.vue'

import IconFolder from '@/components/icons/IconFolder.vue'
import IconPinned from '@/components/icons/IconPinned.vue'
import IconArrowNarrowLeft from '@/components/icons/IconArrowNarrowLeft.vue'
import IconBack from '@/components/icons/IconBack.vue'
import IconTripleUser from '@/components/icons/IconTripleUser.vue'

const route = useRoute()
const router = useRouter()
const projectId = route.params.id

// Пример данных проекта
const project = ref({
    id: projectId,
    name: 'Z-post'
})

// Пример данных досок (board)
const boards = ref([
    { id: 1, title: 'Mobile app', tasks_count: '36', status: 'ACTIVE', creator: 'Dilshod Mirsoatov' },
    { id: 2, title: 'Mobile bug fix', tasks_count: '33', status: 'ACTIVE', creator: 'Dilshod Mirsoatov' },
    { id: 3, title: 'Front end', tasks_count: '14', status: 'ACTIVE', creator: 'Dilshod Mirsoatov' },
    { id: 4, title: 'Backend', tasks_count: '9', status: 'ACTIVE', creator: 'Dilshod Mirsoatov' },
    { id: 5, title: 'Managment', tasks_count: '3', status: 'ACTIVE', creator: 'Dilshod Mirsoatov' },
    { id: 6, title: 'Delivery Front', tasks_count: '14', status: 'ACTIVE', creator: 'Abdurahim Zaynobiddinov' },
])

const search = ref('')
const statusFilter = ref('all')

const filteredBoards = computed(() => {
    return boards.value.filter(b => {
        const matchesTitle = b.title.toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || b.status === statusFilter.value
        return matchesTitle && matchesStatus
    })
})

</script>

<style scoped>
.input,
.select,
.btn {
    border-radius: 8px;
}
</style>
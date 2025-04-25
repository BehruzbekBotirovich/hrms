<template>
    <section class="p-4">
        <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <router-link to="/dashboard/projects" class="hover:underline">Проекты</router-link>
            <span>/</span>
            <span class="text-black font-semibold">{{ projectName }}</span>
        </div>

        <div class="flex items-center justify-between mb-6">
            <div class="flex gap-2 items-center">
                <a-button @click="router.back()">
                    <icon-back />
                </a-button>
                <h2 class="text-2xl font-bold mb-0">Boards</h2>
            </div>
            <div class="flex items-center space-x-2">
                <!-- <a-select v-model="statusFilter" class="w-[140px]" allowClear placeholder="Ustuvorlik tanlang">
                    <a-select-option value="all">Barchasi</a-select-option>
                    <a-select-option value="ACTIVE">Jarayonda</a-select-option>
                    <a-select-option value="INACTIVE">Yopilgan</a-select-option>
                </a-select> -->

                <a-button @click="showDrawer" class="btn-sm gap-1">
                    <icon-triple-user />
                    {{ $t('common.linked_employees') }}
                </a-button>
                <a-button @click="openAddBoardModal" class="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
                    {{ $t('board_page.add') }}
                </a-button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div v-for="board in productsStore.boards" :key="board.id"
                class="border bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <router-link
                    :to="`/dashboard/projects/tasks/${board._id}?projectName=${projectName}&boardName=${board.name}&projectId=${projectId}`"
                    class="flex flex-col h-full">
                    <div class="flex items-center gap-2">
                        <icon-folder />
                        <h3 class="text-lg font-semibold mb-0">{{ board.name }}</h3>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">
                        {{ $t('board_page.linked_employees') }}:
                        <span class="text-blue-800 font-bold"> {{ board.taskCount }}</span>
                    </p>
                    <div class="flex items-center space-x-3 text-xs">
                        <badge-component status="false" content="Open" />
                        <div class="text-gray-700 border gap-1 p-1 rounded-lg flex items-center">
                            <icon-pinned />
                            {{ board.createdBy }}
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </section>

    <a-drawer v-model:open="open" size="large" class="custom-class" placement="right" title="Участники проекта"
        @after-open-change="afterOpenChange">
        <projects-members-component :project-id="projectId" />
    </a-drawer>

</template>

<script setup>
import { ref, computed, onMounted, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useProjectsStore from '@/store/projects.pinia.js'
import useModal from '@/store/modal.pinia.js'

// components
import ProjectsMembersComponent from '@/components/ProjectsMembersComponent.vue'
import BadgeComponent from '@/components/BadgeComponent.vue'
import AddBoardModal from '@/components/AddBoardModal.vue'

const productsStore = useProjectsStore()

const route = useRoute()
const router = useRouter()
const modal = useModal()

const projectName = route.query.projectName;
const projectId = route.params.id

onMounted(() => {
    productsStore.getBoardsForProject(projectId)
})

// Пример данных досок (board)
const statusFilter = ref('all')
// add modalka
function openAddBoardModal() {
    modal.open({
        component: shallowRef(AddBoardModal), props: { projectId: route.params.id },
    })
}

// employyes of project drawer
const open = ref(false);
const showDrawer = () => {
    productsStore.getMembersOfProject(projectId)
    open.value = true;
};

</script>

<style scoped>
.input,
.select,
.btn {
    border-radius: 8px;
}
</style>
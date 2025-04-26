<script setup>
import { onMounted, ref, computed, shallowRef } from 'vue'
import draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
import useTasksStore from '@/store/tasks.pinia.js'
import useModal from '@/store/modal.pinia.js'

import currentTaskModal from '@/components/CurrentTaskModal.vue'
import TaskAddModal from '@/components/AddTaskModal.vue'
import TaskCard from './TaskCard.vue'

const modal = useModal()
const tasksStore = useTasksStore()
const route = useRoute()

const boardId = route.params.id
const projectId = route.query.projectId

const statuses = ['Created', 'InProgress', 'Review', 'Test', 'Merge']

const board_list = {
    Created: 'Yaratilgan',
    InProgress: 'Jarayonda',
    Review: 'Ko‘rib chiqilmoqda',
    Test: 'Sinovda',
    Merge: 'Merge'
}


// Переводим пришедшие с API статусы в нижний регистр
const groupedTasks = computed(() => {
    const result = {
        Created: [],
        InProgress: [],
        Review: [],
        Test: [],
        Merge: []
    }

    const rawTasks = tasksStore.board_tasks

    if (rawTasks && typeof rawTasks === 'object') {
        for (const [statusKey, tasks] of Object.entries(rawTasks)) {
            if (result[statusKey]) {
                result[statusKey] = tasks
            }
        }
    }

    return result
})


function openTaskModal(status) {
    console.log('status', status) // ← теперь будет видно "Created", "InProgress", и т.д.
    modal.open({
        component: shallowRef(TaskAddModal),
        props: {
            status,
            boardId,
        }
    })
}

function openCurrentTaskModal(element) {
    modal.open({
        component: shallowRef(currentTaskModal),
        props: {
            element,
            boardId,
            projectId
        }
    })
}

function onMove(evt, fromStatus, toStatus) {
    if (fromStatus !== toStatus) {
        const movedTask = evt.item._underlying_vm_
        movedTask.status = toStatus
        tasksStore.changeTaskStatus(movedTask._id, toStatus, boardId)
    }
}

onMounted(() => {
    tasksStore.getBoardTasks(boardId);
    tasksStore.getMembersOfProject(projectId)
})
</script>

<template>
    <div class="cankan-container">
        <div class=" flex gap-4 p-4">
            <div v-for="status in statuses" :key="status"
                class="w-[300px] bg-white rounded-xl shadow-lg p-4 flex-shrink-0 overflow-y-auto">
                <h3 class="font-bold text-center pb-2 border-b-2">
                    {{ board_list[status] }} / {{ groupedTasks[status]?.length || 0 }}
                </h3>

                <draggable :list="groupedTasks[status]" :group="{ name: 'tasks' }" item-key="_id"
                    class="h-fit space-y-3" @add="evt => onMove(evt, evt.from.dataset.status, status)"
                    :data-status="status">
                    <template #item="{ element }">
                        <TaskCard :task="element" :boardId="boardId" @selfClick="openCurrentTaskModal(element._id)" />
                    </template>
                </draggable>

                <button class="mt-3 w-full bg-blue-500 text-white py-1 rounded" @click="() => openTaskModal(status)">
                    {{ $t('add_task') }}
                </button>
            </div>
        </div>
    </div>

</template>

<style scoped>
.cankan-container {
    overflow-y: scroll;
    width: calc(100%);
}
</style>
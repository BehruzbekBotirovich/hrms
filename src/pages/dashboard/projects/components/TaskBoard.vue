<script setup>
import { reactive, ref } from 'vue'
import draggable from 'vuedraggable'
import TaskAddModal from './TaskAddModal.vue'
import TaskCard from './TaskCard.vue'

const statuses = ['created', 'inProcess', 'review', 'finished']

const board_list = {
    created: 'Yaratilgan',
    inProcess: 'Jarayonda',
    review: 'Ko‘rib chiqilmoqda',
    finished: 'Tugallangan'
}

const tasksByStatus = reactive({
    created: [
        { id: 1469, title: 'API larga zapros berilganda loadinglar qo‘ylish kerak', priority: 'URGENT' },
        { id: 1470, title: 'Frontendda validation yo‘q', priority: 'NORMAL' }
    ],
    inProcess: [
        { id: 2, title: 'Zadacha 2', priority: 'HIGH' },
        { id: 3, title: 'Zadacha 3' }
    ],
    review: [
    ],
    finished: [
        { id: 5, title: 'Zadacha 5' }
    ]
})

const isModalVisible = ref(false)
const selectedTask = ref(null)

function openTaskModal(task = null) {
    selectedTask.value = task
    isModalVisible.value = true
}

function onMove(evt, fromStatus, toStatus) {
    if (fromStatus !== toStatus) {
        const movedTask = evt.item._underlying_vm_
        movedTask.status = toStatus
    }
}
</script>

<template>
    <div class="grid grid-cols-4 gap-4 p-4">
        <div v-for="status in statuses" :key="status"
            class="col-span-1 bg-white rounded-xl shadow-lg p-4 flex-shrink-0 overflow-y-auto " >
            <h3 class="font-bold text-center pb-2 border-b-2">
                {{ board_list[status] }} / {{ tasksByStatus[status].length }}
            </h3>

            <draggable :list="tasksByStatus[status]" :group="{ name: 'tasks' }" item-key="id" class="space-y-2"
                @add="evt => onMove(evt, evt.from.dataset.status, status)" :data-status="status">
                <template #item="{ element }">
                    <TaskCard :task="element" @selfClick="openTaskModal(element)" />
                </template>
            </draggable>

            <button class="mt-3 w-full bg-blue-500 text-white py-1 rounded" @click="() => openTaskModal({ status })">
                {{ $t('add_task') }}
            </button>
        </div>
    </div>

    <a-modal v-model:open="isModalVisible" :footer="null" width="900px" @cancel="isModalVisible = false">
        <TaskAddModal :task="selectedTask" @close="isModalVisible = false" />
    </a-modal>
</template>
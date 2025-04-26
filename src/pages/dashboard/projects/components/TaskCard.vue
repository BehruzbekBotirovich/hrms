<script setup>
import BadgePriorityComponent from '@/components/BadgePriorityComponent.vue';
import useTasksStore from '@/store/tasks.pinia.js';

const tasksStore = useTasksStore()

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    boardId: {
        type: String,
        required: true
    }
})


</script>

<template>
    <div @click="$emit('selfClick')"
        class="bg-gray-50 border rounded-lg p-3 shadow hover:shadow-md cursor-pointer space-y-2 transition-all">
        <!-- Заголовок задачи -->
        <div class="flex justify-between h-fit">
            <p class="text-sm mb-0 font-medium leading-snug text-gray-800">
                {{ task.title }}
            </p>
            <a-dropdown :trigger="['click']">
                <a-button size="small" class="ant-dropdown-link" @click.stop>
                    <svg width="14px" height="14px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 12.3252C4 12.5904 4.10536 12.8448 4.29289 13.0323C4.48043 13.2198 4.73478 13.3252 5 13.3252C5.26522 13.3252 5.51957 13.2198 5.70711 13.0323C5.89464 12.8448 6 12.5904 6 12.3252C6 12.06 5.89464 11.8056 5.70711 11.6181C5.51957 11.4306 5.26522 11.3252 5 11.3252C4.73478 11.3252 4.48043 11.4306 4.29289 11.6181C4.10536 11.8056 4 12.06 4 12.3252Z"
                            stroke="#354052" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M11 12.3252C11 12.5904 11.1054 12.8448 11.2929 13.0323C11.4804 13.2198 11.7348 13.3252 12 13.3252C12.2652 13.3252 12.5196 13.2198 12.7071 13.0323C12.8946 12.8448 13 12.5904 13 12.3252C13 12.06 12.8946 11.8056 12.7071 11.6181C12.5196 11.4306 12.2652 11.3252 12 11.3252C11.7348 11.3252 11.4804 11.4306 11.2929 11.6181C11.1054 11.8056 11 12.06 11 12.3252Z"
                            stroke="#354052" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M18 12.3252C18 12.5904 18.1054 12.8448 18.2929 13.0323C18.4804 13.2198 18.7348 13.3252 19 13.3252C19.2652 13.3252 19.5196 13.2198 19.7071 13.0323C19.8946 12.8448 20 12.5904 20 12.3252C20 12.06 19.8946 11.8056 19.7071 11.6181C19.5196 11.4306 19.2652 11.3252 19 11.3252C18.7348 11.3252 18.4804 11.4306 18.2929 11.6181C18.1054 11.8056 18 12.06 18 12.3252Z"
                            stroke="#354052" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a-button>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="0">
                            <div @click="$emit('selfClick')" class="flex items-center gap-1">
                                <icon-edit /> <span>Tahrirlash</span>
                            </div>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a-popconfirm :title="$t('confirm.delete')"
                                @confirm="tasksStore.deleteTask(task._id, props.boardId)" :ok-text="$t('confirm.yes')"
                                :cancel-text="$t('confirm.no')">
                                <div class="flex items-center gap-1">
                                    <icon-delete /><span>O'chirish</span>
                                </div>
                            </a-popconfirm>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <!-- Аватар -->
        <div class="flex gap-2">
            <a-avatar v-for="employee in task.assignedTo" :key="employee.id" size="">
                <template #icon>
                    <img crossorigin="anonymous" :src="`http://localhost:5000/user/avatar/` + employee.avatarUrl"
                        alt="avatar" />
                </template>
            </a-avatar>
        </div>
        <!-- Нижняя информация -->
        <div class="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
            <!-- Приоритет -->
            <badge-priority-component v-if="task.priority" :status="task.priority" />

            <!-- Дата (заглушка) -->
            <span class="flex items-center border p-1 rounded-lg bg-gray-50  gap-1">
                <svg width="16px" height="16px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.984 12.8555C21.0938 10.9948 20.6232 9.14583 19.6371 7.56405C18.6511 5.98226 17.1982 4.74566 15.4792 4.02503C13.7601 3.30439 11.8598 3.13527 10.0405 3.54102C8.22123 3.94678 6.57282 4.90738 5.32292 6.29018C4.07303 7.67298 3.28331 9.40975 3.06283 11.2606C2.84235 13.1115 3.20198 14.9852 4.09207 16.6229C4.98216 18.2606 6.35878 19.5816 8.03183 20.4033C9.70487 21.2251 11.5918 21.5071 13.432 21.2105M12 7.32549V12.3255L15 15.3255M19 16.3255L17 19.3255H21L19 22.3255"
                        stroke="#354052" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Apr 05
            </span>

            <!-- ID задачи -->
            <span @click.stop="navigator.clipboard.writeText(task._id)"
                class="text-blue-600 font-semibold hover:text-blue-800">#copy</span>

            <!-- Иконка комментариев -->
            <i class="bi bi-chat-left-text text-gray-400 ml-auto"></i>
        </div>
    </div>
</template>

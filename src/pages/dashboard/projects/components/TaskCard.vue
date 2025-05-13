<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useTasksStore from '@/store/tasks.pinia.js'
import { notification } from 'ant-design-vue'
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

function copyCurrentRoute(id) {
    const currentRoute = window.location.href; // Получаем текущий URL
    navigator.clipboard.writeText(currentRoute + `&task_id=${id}`) // Копируем URL в буфер обмена
        .then(() => {
            notification.success({
                message: 'Ссылка скопирована!',
                duration: 1, // Длительность уведомления в секундах
            })
        })
        .catch((err) => {
            console.error('Ошибка при копировании в буфер обмена:', err);
            notification.error({
                message: 'Ошибка при копировании',
                duration: 2, // Длительность уведомления в секундах
            })
        });
}
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
                    <icon-triple-dots />
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
            <a-avatar v-for="employee in task.assignedTo" :key="employee.id" size="medium">
                <template #icon>
                    <img crossorigin="anonymous"
                        :src="`https://hrms-backend-mvdb.onrender.com/api/upload/avatar/` + employee.avatarUrl"
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
                {{ task.dueDate ? new Date(task.dueDate).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }) : $t('task.noDueDate') }}
            </span>

            <!-- ID задачи -->
            <span @click.stop="copyCurrentRoute(task._id)" class="text-blue-600 font-semibold hover:text-blue-800">
                #copy
            </span>

            <!-- Иконка комментариев -->
            <i class="bi bi-chat-left-text text-gray-400 ml-auto"></i>
        </div>
    </div>
</template>

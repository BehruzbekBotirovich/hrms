<script setup>
import { computed, ref } from 'vue'
import useProjectsStore from '@/store/projects.pinia.js'
import defaultAvatar from '/src/assets/images/def_ava.png'
import SelectEmployeeComponent from './SelectEmployeeComponent.vue'
import { useRoute } from 'vue-router'
const route = useRoute()


const projectsStore = useProjectsStore()
const projectId = route.params.id
// Подключаем список участников проекта
const members = computed(() => projectsStore.project_members)

</script>

<template>
    <a-table :dataSource="members" :pagination="false" rowKey="_id" :loading="projectsStore.loadingModal">
        <a-table-column title="F.I.SH">
            <template #default="{ record }">
                <div class="flex items-center gap-2">
                    <img class="w-10 h-10 rounded-full object-cover border"
                        :src="`https://hrms-backend-mvdb.onrender.com/api/upload/avatar/` + record.avatarUrl"
                        alt="User photo" crossorigin="anonymous" />
                    <span>{{ record.fullName }}</span>
                </div>
            </template>
        </a-table-column>
        <a-table-column title="Bo‘lim" dataIndex="department" />
        <a-table-column title="Lavozim" dataIndex="position" />
        <a-table-column title="Roli" dataIndex="role" />
        <a-table-column title="Action">
            <template #default="{ record }">
                <a-popconfirm :title="$t('project_page.delete_confirm')"
                    @confirm="projectsStore.patchMemberOfProject(projectId, [record._id], 'remove')"
                    :okText="$t('confirm.yes')" :cancelText="$t('confirm.no')">
                    <a-button type="text" danger>
                        <icon-delete class="text-xl" />
                    </a-button>
                </a-popconfirm>
            </template>
        </a-table-column>
    </a-table>

    <select-employee-component :projectId="projectId" />

</template>

<style scoped>
/* Улучшенные стили для выбранных элементов в мульти-селекте */
.ant-select-selector {
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
}

.ant-select-selection-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px;
    border-radius: 6px;
}

.ant-select-dropdown {
    max-height: 300px;
    overflow-y: auto;
}
</style>

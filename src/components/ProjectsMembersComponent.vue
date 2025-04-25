<script setup>
import { computed } from 'vue'
import useProjectsStore from '@/store/projects.pinia.js'
import defaultAvatar from '/src/assets/images/def_ava.png'

const props = defineProps({
    projectId: {
        type: String,
        required: true
    }
})

const projectsStore = useProjectsStore()

// Подключаем список участников проекта
const members = computed(() => projectsStore.project_members)
</script>

<template>
    <a-table :dataSource="members" :pagination="false" rowKey="_id">
        <a-table-column title="F.I.SH">
            <template #default="{ record }">
                <div class="flex items-center gap-2">
                    <img :src="record.avatarUrl ? '/uploads/' + record.avatarUrl : defaultAvatar"
                        class="w-8 h-8 rounded-full object-cover" alt="avatar" />
                    <span>{{ record.fullName }}</span>
                </div>
            </template>
        </a-table-column>
        <a-table-column title="Bo‘lim" dataIndex="department" />
        <a-table-column title="Lavozim" dataIndex="position" />
        <a-table-column title="Roli" dataIndex="role" />
    </a-table>
</template>

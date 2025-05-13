<template>
    <!-- Таблица сотрудников -->
    <a-table :columns="columns" :dataSource="employeesStore.employees" rowKey="_id" :loading="employeesStore.loading">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'fullName'">
                <div class="flex items-center">
                    <img :src="record.avatarUrl ? `https://hrms-backend-mvdb.onrender.com/api/upload/avatar/${record.avatarUrl}` : def_ava"
                        alt="Avatar" class="w-10 h-10 rounded-full mr-2 object-cover" crossorigin="anonymous" />
                    <span>{{ record.fullName }}</span>
                </div>
            </template>
            
            <template v-if="column.key === 'isActive'">
                <a-tag :color="record.isActive ? 'green' : 'red'">
                    {{ record.isActive ? 'Active' : 'Inactive' }}
                </a-tag>
            </template>
            <template v-if="column.key === 'action'">
                <div class="flex items-center">

                    <a-button type="link" class="hover:bg-slate-200">
                        <icon-edit class="text-lg" />
                    </a-button>

                    <!-- Confirm Delete -->
                    <a-popconfirm title="Confirm Delete" ok-text="Yes" cancel-text="No" @confirm="confirm(record._id)"
                        @cancel="cancel">
                        <a-button :disabled="record.isActive == false" type="link" class="hover:bg-slate-200" danger>
                            <icon-delete class="text-lg" />
                        </a-button>
                    </a-popconfirm>

                    <!-- Reactivate Employee -->
                    <a-popconfirm title="Are you sure you want to reactivate this employee?" ok-text="Yes"
                        cancel-text="No" @confirm="reActiveEmployee(record._id)" @cancel="cancel">
                        <a-button :disabled="record.isActive == true" type="link" class="hover:bg-slate-200">
                            <icon-reload class="text-lg " />
                        </a-button>
                    </a-popconfirm>
                </div>
            </template>
        </template>
    </a-table>
</template>

<script setup>
import { ref, reactive, computed, onMounted, shallowRef } from 'vue'
import useEmployeesStore from '@/store/employees.pinia.js';

const employeesStore = useEmployeesStore()

onMounted(() => {
    employeesStore.getAllEmployees()
})

// Столбцы для таблицы
const columns = [
    {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: 'status',
        dataIndex: 'isActive',
        key: 'isActive',
    },
    {
        title: 'Actions',
        align: 'center',
        key: 'action',
        width: 100,
        scopedSlots: { customRender: 'action' }
    }
]

const confirm = async (id) => {
    try {
        await employeesStore.deleteEmployee(id)
    } catch (error) {
        console.error("Error deleting employee:", error)
    }
};

const cancel = () => {
    console.log('Delete action was cancelled')
}

const reActiveEmployee = async (id) => {
    try {
        await employeesStore.reActiveEmployee(id)
    } catch (error) {
        console.error("Error reactivating employee:", error)
    }
}
</script>

<style></style>
<template>
  <!-- Таблица сотрудников -->
  <a-table
    :columns="columns"
    :dataSource="employeesStore.employees"
    rowKey="_id"
    :loading="employeesStore.loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'fullName'">
        <div class="flex items-center">
          <img
            :src="
              record.avatarUrl
                ? `https://hrms-backend-mvdb.onrender.com/api/upload/avatar/${record.avatarUrl}`
                : def_ava
            "
            alt="Avatar"
            class="w-10 h-10 rounded-full mr-2 object-cover"
            crossorigin="anonymous"
          />
          <span>{{ record.fullName }}</span>
        </div>
      </template>
      <template v-if="column.key === 'role'">
        <a-tag
          :color="
            record.role == 'admin'
              ? 'cyan'
              : record.role == 'manager'
                ? 'pink'
                : 'blue'
          "
          >{{ record.role }}
        </a-tag>
      </template>
      <template v-if="column.key === 'isActive'">
        <a-tag :color="record.isActive ? 'green' : 'red'">
          {{
            record.isActive ? $t('employee.active') : $t('employee.inactive')
          }}
        </a-tag>
      </template>
      <template v-if="column.key === 'action'">
        <div class="flex items-center">
          <!--          <a-button type="link" class="hover:bg-slate-200">-->
          <!--            <icon-edit class="text-lg" />-->
          <!--          </a-button>-->
          <!-- Confirm Delete -->
          <a-popconfirm
            title="$t('confirm.delete')"
            :ok-text="$t('confirm.yes')"
            :cancel-text="$t('confirm.no')"
            @confirm="confirm(record._id)"
            @cancel="cancel"
          >
            <a-button
              :disabled="record.isActive == false"
              type="link"
              class="hover:bg-slate-200"
              danger
            >
              <icon-delete class="text-lg" />
            </a-button>
          </a-popconfirm>

          <!-- Reactivate Employee -->
          <a-popconfirm
            title="Are you sure you want to reactivate this employee?"
            :ok-text="$t('confirm.yes')"
            :cancel-text="$t('confirm.no')"
            @confirm="reActiveEmployee(record._id)"
            @cancel="cancel"
          >
            <a-button
              :disabled="record.isActive == true"
              type="link"
              class="hover:bg-slate-200"
            >
              <icon-reload class="text-lg" />
            </a-button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { ref, reactive, computed, onMounted, shallowRef } from 'vue'
import useEmployeesStore from '@/store/employees.pinia.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const employeesStore = useEmployeesStore()

onMounted(() => {
  employeesStore.getAllEmployees()
})

// Столбцы для таблицы
const columns = [
  {
    title: t('employee.fullName'),
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: t('employee.email'),
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: t('employee.role'),
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: t('employee.phone'),
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: t('employee.status'),
    dataIndex: 'isActive',
    key: 'isActive'
  },
  {
    title: t('employee.actions'),
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
    console.error('Error deleting employee:', error)
  }
}

const cancel = () => {
  console.log('Delete action was cancelled')
}

const reActiveEmployee = async (id) => {
  try {
    await employeesStore.reActiveEmployee(id)
  } catch (error) {
    console.error('Error reactivating employee:', error)
  }
}
</script>

<style></style>

<template>
    <div class="container">
        <h2 class="text-2xl font-bold mb-6">Employee Management</h2>

        <!-- Добавить нового сотрудника -->
        <a-button type="primary" @click="openAddEmployeeModal">Add Employee</a-button>
        <br>
        <!-- Таблица сотрудников -->
        <a-table :columns="columns" :dataSource="employees" rowKey="_id">
            <template #action="{ text, record }">
                <a-button @click="editEmployee(record)" type="link">Edit</a-button>
                <a-button @click="deleteEmployee(record._id)" type="link" danger>Delete</a-button>
            </template>
        </a-table>

        <!-- Модальное окно для добавления/редактирования сотрудника -->
        <a-modal v-model:visible="isModalVisible" class="" @ok="handleOk" @cancel="handleCancel">
            <a-form :form="form" :initialValues="formValues" class="p-4">
                <h3>Add employee</h3>
                <a-form-item label="Full Name" name="fullName">
                    <a-input v-model:value="formValues.fullName" />
                </a-form-item>

                <a-form-item label="Email" name="email">
                    <a-input v-model:value="formValues.email" />
                </a-form-item>

                <a-form-item label="Department" name="department">
                    <a-input v-model:value="formValues.department" />
                </a-form-item>

                <a-form-item label="Position" name="position">
                    <a-input v-model:value="formValues.position" />
                </a-form-item>

                <a-form-item label="Role" name="role" class="pt-6">
                    <a-select v-model:value="formValues.role" :options="roles" />
                </a-form-item>

                <a-form-item label="password" name="password">
                    <a-input v-model:value="formValues.password" />
                </a-form-item>

                <a-form-item label="Phone" name="phone">
                    <a-input v-model:value="formValues.phone" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useEmployeesStore from '@/store/employees.pinia.js'
import { notification, Modal, Form, Input, Select, Button, Table } from 'ant-design-vue'

const employeesStore = useEmployeesStore()
const router = useRouter()

// Состояния для модального окна и формы
const isModalVisible = ref(false)
const form = Form.useForm()
const formValues = reactive({
    fullName: '',
    email: '',
    department: '',
    position: '',
    role: 'employee',
    phone: '',
    password: '',
})

onMounted(() => {
    employeesStore.getAllEmployees()
})

// Роли сотрудников
const roles = [
    { label: 'Employee', value: 'employee' },
    { label: 'Manager', value: 'manager' },
    { label: 'Admin', value: 'admin' }
]

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
        title: 'Actions',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
]

// Получаем сотрудников из хранилища
const employees = computed(() => employeesStore.employees)

// Функция для открытия модального окна для добавления сотрудника
const openAddEmployeeModal = () => {
    formValues.fullName = ''
    formValues.email = ''
    formValues.department = ''
    formValues.position = ''
    formValues.role = 'employee'
    formValues.phone = ''
    isModalVisible.value = true
}   

// Функция для обработки отправки формы
const handleOk = async () => {
    employeesStore.addEmployee(formValues)
    notification.success({ message: 'Employee added successfully!' })
    isModalVisible.value = false
}

// Функция для обработки отмены в модальном окне
const handleCancel = () => {
    isModalVisible.value = false
}

// Функция для редактирования сотрудника
const editEmployee = (record) => {
    formValues.fullName = record.fullName
    formValues.email = record.email
    formValues.department = record.department
    formValues.position = record.position
    formValues.role = record.role
    formValues.phone = record.phone
    formValues._id = record._id
    isModalVisible.value = true
}

// Функция для удаления сотрудника
const deleteEmployee = (id) => {
    employeesStore.deleteEmployee(id)
    notification.success({ message: 'Employee deleted successfully!' })
}
</script>

<style scoped>
/* Стили для таблицы и модального окна */
.container {
    padding: 20px;
}

.ant-table {
    width: 100%;
}

.ant-modal-footer {
    display: flex;
    justify-content: flex-end;
}
</style>
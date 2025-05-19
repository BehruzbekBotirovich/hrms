<template>
    <div class="flex itemcenter justify-between mt-2 pr-4"> 
        <h2 class="text-2xl font-bold">Employee Management</h2>
        <a-button type="primary" @click="openAddEmployeeModal">Add Employee</a-button>
    </div>
    <a-tabs default-active-key="1">
        <a-tab-pane key="1" :tab="$t('employee.list')">
            <EmployeeList />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('employee.stat')">
            <EmployeesStatistics />
        </a-tab-pane>
    </a-tabs>
</template>

<script setup>
import { ref, reactive, computed, onMounted, shallowRef } from 'vue'
// components
import useModal from '@/store/modal.pinia.js'
import useEmployeesStore from '@/store/employees.pinia.js'
import AddEmployeeModal from './components/AddEmployeeModal.vue'
import def_ava from '@/assets/images/def_ava.png'
import EmployeesStatistics from './components/EmployeesStatistics.vue'
import EmployeeList from './components/EmployeeList.vue'
// constants
const modal = useModal()
const employeesStore = useEmployeesStore()

const openAddEmployeeModal = () => {
    modal.open({
        component: shallowRef(AddEmployeeModal),
    })
}
</script>

<style scoped>
.ant-table {
    width: 100%;
}

.ant-modal-footer {
    display: flex;
    justify-content: flex-end;
}
</style>

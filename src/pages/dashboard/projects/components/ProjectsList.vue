<template>
    <section class="p-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold">Проекты</h3>
            <div class="flex gap-2">
                <input type="text" v-model="searchQuery" placeholder="Введите название проекта..."
                    class="border rounded px-3 py-1" />
                <select v-model="filterStatus" class="border rounded px-3 py-1">
                    <option value="">Все</option>
                    <option value="Активный">Активный</option>
                    <option value="Завершён">Завершён</option>
                </select>
                <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Добавить проект
                </button>
            </div>
        </div>

        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div v-for="project in filteredProjects" :key="project.id"
                class="border cursor-pointer bg-white hover:border-blue-400 hover:shadow-lg  rounded-xl p-4">
                <router-link :to="`/dashboard/projects/view/${project.id}`">
                    <h4 class="text-lg font-semibold mb-2">{{ project.name }}</h4>
                    <p class="text-gray-600 mb-3">{{ project.description }}</p>
                    <div class="flex flex-wrap items-center gap-2">
                        <badge-component :status="project.status" />
                        <span
                            class="text-sm border text-gray-800 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                            {{ project.creater }}
                            <icon-pinned />
                        </span>
                        <span class="text-sm border bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <icon-triple-user />
                            {{ project.members_count }}
                        </span>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref } from "vue";
import useProjectsStore from "@/store/projects.pinia.js";
import BadgeComponent from "@/components/BadgeComponent.vue";
// icons
import IconPinned from "@/components/icons/IconPinned.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconTripleUser from "@/components/icons/IconTripleUser.vue";
const store = useProjectsStore();

const searchQuery = ref("");
const filterStatus = ref("");

// Фильтрация по названию и статусу
const filteredProjects = computed(() => {
    return store.projects.filter((project) => {
        const matchesSearch = project.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        const matchesStatus =
            !filterStatus.value || project.status === filterStatus.value;
        return matchesSearch && matchesStatus;
    });
});
</script>
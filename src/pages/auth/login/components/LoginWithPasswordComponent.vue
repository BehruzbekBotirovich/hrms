<script setup>
import { reactive, ref } from 'vue'
import { formatPhoneNumber, reformatPhoneNumber } from '@/helpers/index.js'
import { useValidator } from '@/composables/index.js'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'
import { useI18n } from 'vue-i18n'

const { requiredField, phoneNumberValidator } = useValidator()
const {t} = useI18n()
const coreStore = useCore()
const authStore = useAuth()

const formRef = ref()
const form = reactive({
    username: '',
    password: ''
})

async function inputTypingEvent() {
    form.username = await formatPhoneNumber(form.username)
}

function submitForm() {
    formRef.value
        .validate()
        .then((valid) => {
            const data = { ...form, username: reformatPhoneNumber(form.username) }
            authStore.loginWithPassword(data)
        })
        .catch(() => { })
}
</script>

<template>
    <a-card class="w-[460px] border-none">

        <a-form ref="formRef" :model="form">
            <div class="flex gap-2">
                <div class="w-[70px]">
                    <a-form-item :label="$t('auth_view.code')">
                        <a-input @input="inputTypingEvent" disabled size="large" value="+998" />
                    </a-form-item>
                </div>
                <div class="flex-grow">
                    <a-form-item :rules="[phoneNumberValidator]" :label="$t('auth_view.phone_number')" name="username">
                        <a-input @input="inputTypingEvent" size="large" v-model:value="form.username" />
                    </a-form-item>
                </div>
            </div>

            <a-form-item :rules="[requiredField]" name="password" :label="$t('auth_view.password')">
                <a-input-password autocomplete="" size="large" v-model:value="form.password" />
            </a-form-item>
        </a-form>
        <div class="flex justify-end items-center gap-2 mt-4">
            <a-button type="text" size="large" class="text-primary">
                {{ t('auth_view.reset_password') }}
            </a-button>
            <a-button @click="submitForm" :loading="coreStore.isLoading('get-token')" size="large" type="primary"
                class="!px-8 text-lg">
                {{ t('auth_view.login') }}
            </a-button>
        </div>
        <div class="w-full flex justify-between mt-4 text-base">
            <span class="">Agar akkauntingiz bo‘lmasa</span>
            <router-link to="/auth/register" class="text-primary underline text-base">Ro'yhatdan o'tish</router-link>
        </div>
    

    </a-card>
</template>

<style scoped lang="scss"></style>

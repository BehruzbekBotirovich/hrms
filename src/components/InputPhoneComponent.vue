<template>
    <div>
        <div class="flex items-center border-2 border-blue rounded-lg overflow-hidden text-sm">
            <span class="bg-gray-100 p-2 text-gray-500 border-r-2 border-blue">+998</span>
            <input v-model="formattedNumber" type="tel" class="flex-1 p-2 outline-none" placeholder="(99) 123-45-67"
                @input="validatePhoneNumber" maxlength="12" required />
        </div>
        <p v-if="errorMessage" class="text-red text-xs mt-1">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'update:valid']);

const formattedNumber = ref(props.modelValue || '');
const errorMessage = ref('');

const validCodes = ['90', '91', '92', '93', '94', '95', '97', '98', '99', '88', '33', '71', '50'];

const validatePhoneNumber = () => {
    let rawValue = formattedNumber.value.replace(/\D/g, ''); // Оставляем только цифры
    if (rawValue.length > 9) rawValue = rawValue.slice(0, 9); // Ограничиваем длину

    // Форматируем номер на лету
    formattedNumber.value = rawValue.replace(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/, (match, p1, p2, p3, p4) => {
        let result = '';
        if (p1) result += p1;
        if (p2) result += ' ' + p2;
        if (p3) result += '-' + p3;
        if (p4) result += '-' + p4;
        return result;
    });

    if (rawValue.length < 9) {
        errorMessage.value = t('phone.length_error');
        emit('update:valid', false);
    } else {
        const code = rawValue.slice(0, 2);
        if (!validCodes.includes(code)) {
            errorMessage.value = t('phone.operator_error');
            emit('update:valid', false);
        } else {
            errorMessage.value = '';
            emit('update:valid', true);
        }
    }

    emit('update:modelValue', formattedNumber.value);
};

// Следим за внешними изменениями
watch(() => props.modelValue, (newValue) => {
    formattedNumber.value = newValue;
});
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>Оформление заявки</v-card-title>
      <v-form @submit.prevent="submitForm">
        <!-- Информация о пользователе -->
        <v-card-text class="user-info">
          <div><strong>Пользователь:</strong> {{ currentUser }}</div>
          <div><strong>Дата создания:</strong> {{ currentDateTime }}</div>
        </v-card-text>

        <!-- Выбор услуг -->
        <v-card-text>
          <v-select
            v-model="selectedServices"
            :items="services"
            :item-props="serviceProps"
            label="Выберите услуги"
            multiple
            chips
            return-object
            :loading="loadingServices"
            :error="!!loadError"
            :error-messages="loadError"
          >
            <template v-slot:chip="{ item }">
              <v-chip>
                {{ item.raw.Наименование }} ({{ item.raw.Цена }} руб.)
              </v-chip>
            </template>
          </v-select>
        </v-card-text>

        <!-- Телефон -->
        <v-card-text>
          <v-text-field 
            v-model="phone" 
            label="Телефон"
            required
            :rules="phoneRules"
          ></v-text-field>
        </v-card-text>

        <!-- Итоговая цена -->
        <v-card-text class="price-summary">
          <h3>Итоговая цена: {{ totalPrice }} руб.</h3>
        </v-card-text class="submit_btn">
        <hr style="padding: 10px; border:rgb(238, 240, 148)">
          <v-btn 
            type="submit" 
            color="primary"
            :disabled="!isFormValid"
            :loading="submitting"
          >
            Отправить заявку
          </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

// Состояния загрузки
const loadingServices = ref(true);
const loadError = ref(null);
const submitting = ref(false);

// Данные формы
const phone = ref("");
const selectedServices = ref([]);
const currentUser = ref(localStorage.getItem("userLogin") || "");
const currentDateTime = ref(new Date().toLocaleString());
const services = ref([]);

// Функция для определения свойств элемента
const serviceProps = (item) => {
  return {
    title: item.Наименование,
    subtitle: `Цена: ${item.Цена} руб.`,
    value: item.ID,
  };
};

// Правила валидации
const phoneRules = [
  v => !!v || 'Телефон обязателен',
  v => /^[\d\s+\-()]+$/.test(v) || 'Некорректный номер телефона'
];

// Загрузка услуг
onMounted(async () => {
  try {
    const response = await axios.get("https://cleaningdb.onrender.com/api/services");
    services.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении услуг:', error);
    loadError.value = 'Не удалось загрузить список услуг';
  } finally {
    loadingServices.value = false;
  }
});

// Вычисляемые свойства
const totalPrice = computed(() => {
  return selectedServices.value.reduce((sum, service) => Number(sum) + Number(service.Цена), 0);
});

const isFormValid = computed(() => {
  return phone.value && selectedServices.value.length > 0;
});

const submitForm = async () => {
  try {
    submitting.value = true;
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("Пользователь не авторизован");

    const response = await axios.post(
      "https://cleaningdb.onrender.com/api/requests",
      {
        userId: localStorage.getItem("userId"),
        phone: phone.value,
        services: selectedServices.value,
        totalPrice: totalPrice.value
      },
      {
        responseType: 'blob', // Получаем данные как бинарный файл
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Создание ссылки для скачивания PDF
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Создание скрытой ссылки для скачивания
    const link = document.createElement('a');
    link.href = url;
    link.download = 'заявка.pdf'; // Имя файла
    link.click(); // Симулируем клик по ссылке для скачивания
    URL.revokeObjectURL(url); // Освобождаем ресурс после скачивания
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    alert('Произошла ошибка при отправке заявки');
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.user-info {
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 16px;
}

.price-summary {
  background-color: #e8f5e9;
  border-radius: 4px;
  margin-top: 20px;
  padding: 16px;
  font-size: 1.2em;
}

.v-select {
  margin-bottom: 20px;
}
</style>
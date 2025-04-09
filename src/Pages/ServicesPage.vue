<template>
  <div class="services-container">
    <h1>Наши Услуги</h1>

    <div class="service-card" v-for="item in data" :key="item.ID">
      <img :src="item.Картинка"/>
      <h2>{{ item.Наименование }}</h2>
      <p>
        {{ item.Описание }}
      </p>
      <h3>Цена: {{ item.Цена }}руб.</h3>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getServicesData } from "../data/services";

const data = ref([]);

onMounted(async () => {
  try {
    data.value = await getServicesData(); // Получаем данные с помощью функции из authService
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
});
</script>

<style scoped>
.services-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.service-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
  text-align: center;
}

.service-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.service-card h2 {
  margin-top: 10px;
  font-size: 1.5em;
  color: #333;
}

.service-card p {
  color: #666;
}
</style>

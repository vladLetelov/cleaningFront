<template>
  <div>
    <h1>Данные из базы</h1>
    <table v-if="data.length">
      <thead>
        <tr>
          <th>ID Роли</th>
          <th>Роль</th>
          <th>Пароль</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in data" :key="item.ID">
          <td>{{ item.ID }}</td>
          <td>{{ item.Роль }}</td>
          <td>{{ item.пароль }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Загрузка данных...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuthData } from '../data/userInfo';

const data = ref([]);

onMounted(async () => {
  try {
    data.value = await getAuthData(); // Получаем данные с помощью функции из authService
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
});
</script>

<style>
td{
  border: 2px solid black;
  padding: 10px;
}
</style>
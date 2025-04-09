<template>
    <v-container>
      <v-card>
        <v-card-title>Отзывы</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="service in services"
              :key="service.ID"
              @click="goToServiceReviews(service.ID)"
            >
              <v-list-item-title>{{ service.Наименование }}</v-list-item-title>
              <v-list-item-subtitle>Оставить отзыв</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const services = ref([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('https://cleaningdb.onrender.com/api/services');
      services.value = await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке услуг:', error);
    }
  });
  
  const goToServiceReviews = (serviceId) => {
    router.push({ name: 'serviceReviews', params: { id: serviceId } });
  };
  </script>
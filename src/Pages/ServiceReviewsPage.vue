<template>
    <v-container>
      <v-card>
        <v-card-title>Отзывы о {{ service?.Наименование || 'услуге' }}</v-card-title>
        
        <!-- Форма добавления отзыва -->
        <v-card-text v-if="isAuthenticated">
        <v-form @submit.prevent="submitReview" ref="reviewForm">
            <div class="d-flex align-center mb-4">
            <span class="mr-2 text-body-1">Оценка:</span>
            <v-rating
              v-model="newReview.rating"
              color="rating"
              background-color="grey lighten-1"
              hover
              size="32"
              :rules="[v => !!v || 'Укажите оценку']"
            >
              <template v-slot:item="props">
                <v-icon
                  :color="props.isFilled ? 'rating' : 'grey lighten-1'"
                  size="32"
                  @click="props.onClick"
                >
                  {{ props.isFilled ? 'mdi-star' : 'mdi-star-outline' }}
                </v-icon>
              </template>
            </v-rating>
          </div>
          <v-textarea
            v-model="newReview.text"
            label="Текст отзыва"
            :rules="[v => !!v || 'Введите текст отзыва']"
            required
          ></v-textarea>
          
          <v-btn 
            type="submit" 
            color="primary"
            :loading="loading"
            :disabled="loading"
          >
            Оставить отзыв
          </v-btn>
          
          <v-alert
            v-if="submitError"
            type="error"
            class="mt-3"
          >
            {{ submitError }}
          </v-alert>
        </v-form>
      </v-card-text>
        <v-card-text v-else>
          <p>Чтобы оставить отзыв, пожалуйста, <a @click="openAuthDialog">авторизуйтесь</a>.</p>
        </v-card-text>
        
        <!-- Список отзывов -->
        <v-card-text>
          <v-list v-if="reviews.length > 0">
            <v-list-item
              v-for="review in reviews"
              :key="review.ID"
            >
              <template v-slot:prepend>
                <v-rating
                  :model-value="review.Оценка"
                  readonly
                  color="yellow-darken-3"
                  size="24"
                  density="compact"
                ></v-rating>
              </template>
              
              <v-list-item-title>{{ review.Пользователь }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(review.Дата_создания) }}</v-list-item-subtitle>
              
              <div class="mt-2 text-body-1">
                {{ review.Текст }}
              </div>
            </v-list-item>
          </v-list>
          
          <v-alert
            v-else
            type="info"
            variant="tonal"
          >
            Пока нет отзывов об этой услуге
          </v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const reviewForm = ref(null);

const serviceId = route.params.id;
const service = ref(null);
const reviews = ref([]);
const loading = ref(false);
const submitError = ref(null);
const newReview = ref({
  rating: null,
  text: ''
});

const isAuthenticated = computed(() => {
  return localStorage.getItem('isAuthenticated') === 'true' && 
         localStorage.getItem('userId');
});

const submitReview = async () => {
  submitError.value = null;
  
  // Валидация формы
  const { valid } = await reviewForm.value.validate();
  if (!valid) return;
  
  try {
    loading.value = true;
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      throw new Error('Не удалось определить пользователя');
    }
    
    const response = await fetch('https://cleaningdb.onrender.com/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: parseInt(userId),
        serviceId: parseInt(serviceId),
        rating: parseInt(newReview.value.rating),
        text: newReview.value.text.trim()
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Не удалось добавить отзыв');
    }
    
    // Сброс формы и обновление списка отзывов
    newReview.value = { rating: null, text: '' };
    await fetchReviews();
    reviewForm.value.reset();
    
  } catch (err) {
    console.error('Ошибка при добавлении отзыва:', err);
    submitError.value = err.message;
  } finally {
    loading.value = false;
  }
};
  
  const openAuthDialog = () => {
    router.push('/');
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };
  
  const fetchService = async () => {
    try {
      const response = await fetch(`https://cleaningdb.onrender.com/api/services/${serviceId}`);
      if (!response.ok) throw new Error('Услуга не найдена');
      service.value = await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке услуги:', error);
      // Можно добавить обработку ошибки, например, перенаправление
    }
  };
  
  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://cleaningdb.onrender.com/api/services/${serviceId}/reviews`);
      if (!response.ok) throw new Error('Не удалось загрузить отзывы');
      reviews.value = await response.json();
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
      reviews.value = [];
    }
  };
    
  onMounted(async () => {
    await fetchService();
    await fetchReviews();
  });
  </script>
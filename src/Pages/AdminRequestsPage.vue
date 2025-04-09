<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Управление заявками</span>
        <v-btn
          color="primary"
          @click="fetchRequests"
          :loading="loading"
        >
          <v-icon left>mdi-refresh</v-icon>
          Обновить
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="requests"
          :loading="loading"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item.Пользователь="{ item }">
            <div>
              {{ item.Пользователь }}
              <v-chip
                v-if="item.Скидка !== 'Нет'"
                small
                color="green"
                text-color="white"
                class="ml-2"
              >
                Постоянный клиент
              </v-chip>
            </div>
          </template>

          <template v-slot:item.ВыбранныеУслуги="{ item }">
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="(service, index) in parseServices(item.ВыбранныеУслуги)"
                :key="index"
                class="ma-1"
                color="primary"
                small
              >
                {{ service.Наименование }} ({{ service.Цена }}₽)
              </v-chip>
            </div>
          </template>

          <template v-slot:item.Цена="{ item }">
            <div class="d-flex align-center">
              <span>{{ item.Цена }}₽</span>
              <v-tooltip v-if="item.Скидка !== 'Нет'" bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    color="green"
                    class="ml-2"
                    v-on="on"
                  >
                    mdi-percent
                  </v-icon>
                </template>
                <span>Скидка {{ item.Скидка }} (было {{ item.ИсходнаяЦена }}₽)</span>
              </v-tooltip>
            </div>
          </template>

          <template v-slot:item.ДатаПриема="{ item }">
            {{ formatDate(item.ДатаПриема) }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              color="error"
              @click="completeRequest(item.ID)"
              title="Завершить заявку"
            >
              <v-icon>mdi-check-circle-outline</v-icon>
            </v-btn>
          </template>

          <template v-slot:item.Статус="{ item }">
            <v-chip :color="getStatusColor(item.Статус)" dark>
              {{ item.Статус }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const requests = ref([]);
const loading = ref(false);

const headers = [
  { title: 'ID', key: 'ID', width: '80px' },
  { title: 'Пользователь', key: 'Пользователь' },
  { title: 'Телефон', key: 'Телефон' },
  { title: 'Услуги', key: 'ВыбранныеУслуги', width: '300px' },
  { title: 'Цена', key: 'Цена', align: 'end' },
  { title: 'Дата приёма', key: 'ДатаПриема' },
  { title: 'Статус', key: 'Статус', width: '150px' },
  { title: 'Действия', key: 'actions', sortable: false, width: '100px' },
];

const parseServices = (services) => {
  try {
    if (typeof services === 'string') {
      return JSON.parse(services);
    }
    return services || [];
  } catch (e) {
    console.error('Ошибка парсинга услуг:', e);
    return [];
  }
};

const getStatusColor = (status) => {
  const statusColors = {
    'Новая': 'orange',
    'В работе': 'blue',
    'Завершена': 'green',
    'Отменена': 'red'
  };
  return statusColors[status] || 'grey';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    // Форматируем только дату без времени
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (e) {
    console.error('Ошибка форматирования даты:', e);
    return dateString; // Возвращаем исходную строку в случае ошибки
  }
};

const fetchRequests = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://cleaningdb.onrender.com/api/admin/requests');
    
    if (!response.ok) {
      throw new Error('Не удалось загрузить заявки');
    }

    const data = await response.json();
    requests.value = data;
    
  } catch (error) {
    console.error('Ошибка загрузки заявок:', error);
    alert(`Ошибка: ${error.message}`);
  } finally {
    loading.value = false;
  }
};

const completeRequest = async (id) => {
  if (!confirm('Вы уверены, что хотите завершить эту заявку?')) return;
  
  try {
    const response = await fetch(`https://cleaningdb.onrender.com/api/admin/requests/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка при завершении заявки');
    }
    
    await fetchRequests();
    alert('Заявка успешно завершена');
  } catch (error) {
    console.error('Ошибка завершения заявки:', error);
    alert(`Ошибка: ${error.message}`);
  }
};

onMounted(() => {
  fetchRequests();
});
</script>

<style scoped>
.v-data-table {
  width: 100%;
}

.v-chip {
  margin: 2px;
}

.v-icon {
  cursor: pointer;
}
</style>
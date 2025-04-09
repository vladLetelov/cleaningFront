<template>
    <v-container class="about-container">
      <!-- О компании -->
      <v-card class="mb-8">
        <v-img
          src="https://avatars.mds.yandex.net/get-altay/14209766/2a0000019192da45def737a269468cd31a9c/XXL_height"
          height="300"
          gradient="to top, rgba(0,0,0,.2), rgba(0,0,0,.5)"
          class="align-end"
        >
          <v-card-title class="text-h2 white--text">О компании</v-card-title>
        </v-img>
        
        <v-card-text class="pa-6">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <h2 class="text-h4 primary--text mb-4">Наша история</h2>
                <p class="text-body-1 mb-4">
                  Химчистка "Белоснежка" была основана в 2021 году с целью предоставления высококачественных услуг по уходу за текстилем. 
                  Начиная с небольшого цеха, мы выросли в современное предприятие с 5 филиалами по городу.
                </p>
                <p class="text-body-1 mb-4">
                  Наше название символизирует безупречную чистоту, к которой мы стремимся в работе с каждой вещью.
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <h2 class="text-h4 primary--text mb-4">Наши ценности</h2>
                <v-list lines="two">
                  <v-list-item
                    v-for="(value, i) in values"
                    :key="i"
                    :prepend-icon="value.icon"
                  >
                    <template v-slot:title>
                      <strong>{{ value.title }}</strong>
                    </template>
                    <template v-slot:subtitle>
                      {{ value.text }}
                    </template>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
  
      <!-- Наша команда -->
      <v-card class="mb-8">
        <v-card-title class="text-h3 primary--text text-center justify-center py-6">
          Наша команда
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="3" v-for="(member, i) in team" :key="i">
                <v-card hover>
                  <v-img
                    :src="member.photo"
                    height="250"
                    class="white--text align-end"
                    gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,.1)"
                  >
                    <v-card-title class="people_name">{{ member.name }}</v-card-title>
                  </v-img>
                  <v-card-text class="text-center">
                    <p class="text-subtitle-1 font-weight-bold">{{ member.position }}</p>
                    <p class="text-caption">{{ member.description }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
  
      <!-- Наше оборудование -->
      <v-card>
        <v-card-title class="text-h3 primary--text text-center justify-center py-6">
          Наше оборудование
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-img
                  src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7"
                  height="300"
                  class="rounded-lg mb-4"
                ></v-img>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="text-h4 mb-4">Современные технологии</h3>
                <p class="text-body-1 mb-4">
                  Мы используем только профессиональное оборудование ведущих мировых производителей:
                </p>
                <div class="d-flex flex-wrap gap-2 mb-4">
                  <v-chip
                    v-for="(tech, i) in technologies"
                    :key="i"
                    color="primary"
                    variant="outlined"
                    prepend-icon="mdi-check"
                  >
                    {{ tech }}
                  </v-chip>
                </div>
                <p class="text-body-1 mt-4">
                  Все наши машины регулярно обслуживаются и обновляются для обеспечения наилучшего качества обработки.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  const values = [
    {
      icon: 'mdi-quality-high',
      title: 'Качество',
      text: 'Мы гарантируем безупречное качество всех услуг'
    },
    {
      icon: 'mdi-hand-heart',
      title: 'Забота',
      text: 'Индивидуальный подход к каждой вещи'
    },
    {
      icon: 'mdi-leaf',
      title: 'Экологичность',
      text: 'Используем только безопасные средства'
    },
    {
      icon: 'mdi-account-group',
      title: 'Клиентоориентированность',
      text: 'Ваше удовлетворение - наш приоритет'
    }
  ];
  
  const team = [
    {
      photo: 'https://psv4.userapi.com/s/v1/d/vUJ5mbzBblGYhHc_Kpo3mwWFQAX7i7-unel2awAlat-OaDqAnvN13JDWX2UM8urbEvn9V6PYJBOlrYNUvrs8g2R9ZaGCAtADceyw8KwMuxf9_2Vyxzl8nw/photo_2025-02-28_13-46-07.jpg',
      name: 'Летелов Влад',
      position: 'Основатель, директор и программист',
      description: 'Опыт работы в индустрии более 20 лет'
    },
    {
      photo: 'https://sun9-75.userapi.com/impg/QGo-8bJZgXttzoZ6n2umaLg9hacsBT9oRKaQuA/KXyQdKqwfXY.jpg?size=1610x2160&quality=95&sign=c3fcef9270129dff6dcb130b88ec97ae&type=album',
      name: 'Климина Тая',
      position: 'Технолог, программист',
      description: 'Специалист по критической оценке'
    },
    {
      photo: 'https://psv4.userapi.com/s/v1/d/6QrPxroE9ANPfAUiwAsU8h7bH9hZeh4AcgAW1jC9lIMBjXuBhmNhr9qtD4X7P-DF4uDgBVWpabADZ98uq--t_OVnGE0Rhz3LfdM2Xz-wN8VvQYpR7VYt0g/photo_2024-07-16_16-56-52.jpg',
      name: 'Морозов Глеб',
      position: 'Мастер-приемщик, программист',
      description: 'Поможет подобрать оптимальный уход'
    },
    {
      photo: 'https://sun9-2.userapi.com/impg/Dxg8rd0v66Mlb70j_fO6drysEFid7bUoT_YeOQ/32Q-mFIYMeM.jpg?size=1440x2160&quality=95&sign=fe15f1ac23d844adbb71c3a007c2acef&type=album',
      name: 'Зыблев Василий',
      position: 'Оператор, программист',
      description: 'Всегда вежлив и внимателен'
    }
  ];
  
  const technologies = [
    'Итальянские машины для химчистки',
    'Немецкое паровое оборудование',
    'Японские системы контроля качества',
    'Экологичные моющие средства',
    'Системы автоматической глажки'
  ];
  </script>
  
  <style scoped>
  .about-container {
    max-width: 1200px;
  }
  
  .v-card {
    border-radius: 12px;
    overflow: hidden;
  }
  
  .gap-2 {
    gap: 8px;
  }
  .people_name{
    color:white;
  }
  </style>
<template>
  <v-container class="home-container">
    <!-- Герой-баннер -->
    <v-card class="hero-banner mb-8" color="primary" dark>
      <v-img
        src="https://avatars.mds.yandex.net/get-altay/14209766/2a0000019192da45def737a269468cd31a9c/XXL_height"
        height="400"
        gradient="to top right, rgba(0,0,0,.7), rgba(25,118,210,.7)"
      >
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <h1 class="text-h2 font-weight-bold mb-4">Химчистка "Белоснежка"</h1>
              <p class="text-h5 mb-6">Профессиональный уход за вашими вещами</p>
              <v-btn 
                color="white" 
                outlined 
                large
                :to="{ name: 'service' }"
              >
                Наши услуги
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-card>

    <!-- Преимущества -->
    <v-row class="mb-8">
      <v-col cols="12" md="4" v-for="(feature, i) in features" :key="i">
        <v-card height="100%" hover>
          <v-card-text class="text-center pa-6">
            <v-icon x-large color="primary" class="mb-4">{{ feature.icon }}</v-icon>
            <h3 class="text-h5 mb-3">{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- О компании кратко -->
    <v-card class="mb-8" color="grey lighten-4">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-img
              src="https://sun9-63.userapi.com/s/v1/ig2/kBJBJmqoOvEcXcsHLcW0-p231h9rwG0KZXiDlpRPxKX5u7SzM8lD2GT5xl2baEOKqQXU0sxktuQ9BavzKuBBHaF1.jpg?quality=96&as=32x23,48x34,72x51,108x76,160x113,240x169,360x254,480x339,540x381,640x452,720x508,993x701&from=bu&u=ko8R-fyXzEet-B9fCbOuIteioXepDmHkPdgbtsGLve4&cs=993x701"
              height="300"
              class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-title class="text-h4 primary--text">О нашей компании</v-card-title>
            <v-card-text>
              <p class="text-h6 mb-4">"Белоснежка" - это современная химчистка с инновационным подходом к уходу за текстилем.</p>
              <p>Мы используем только экологически чистые средства и современное оборудование, чтобы ваши вещи выглядели как новые.</p>
              <v-btn
                color="primary"
                class="mt-4"
                :to="{ name: 'about' }"
              >
                Узнать больше
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <!-- Отзывы -->
    <v-card class="mb-8">
      <v-card-title class="text-h4 primary--text text-center justify-center py-6">
        Что говорят наши клиенты
      </v-card-title>
      <v-card-text>
        <v-carousel cycle height="auto" hide-delimiters>
          <v-carousel-item v-for="(review, i) in reviews" :key="i">
            <v-sheet height="100%" color="transparent" class="pa-8">
              <v-card class="mx-auto" max-width="600" outlined>
                <v-card-text class="text-center pa-8">
                  <v-icon large color="amber" class="mb-4">mdi-format-quote-open</v-icon>
                  <p class="text-h5 font-italic mb-6">{{ review.text }}</p>
                  <p class="text-subtitle-1 font-weight-bold">{{ review.author }}</p>
                </v-card-text>
              </v-card>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const features = [
  {
    icon: 'mdi-star',
    title: 'Высокое качество',
    text: 'Используем только профессиональные средства и оборудование'
  },
  {
    icon: 'mdi-clock-fast',
    title: 'Быстрая обработка',
    text: 'Срочная химчистка за 24 часа без потери качества'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Гарантия',
    text: '100% гарантия качества на все виды услуг'
  }
];

const reviews = [
  {
    text: 'Отличный сервис! Пальто после чистки выглядит как новое. Буду обращаться только сюда.',
    author: 'Анна К.'
  },
  {
    text: 'Быстро, качественно и недорого. Рекомендую всем, кто ценит свое время и вещи.',
    author: 'Дмитрий С.'
  },
  {
    text: 'Впервые воспользовался услугами химчистки и остался очень доволен. Спасибо!',
    author: 'Михаил П.'
  }
];
</script>

<style scoped>
.home-container {
  max-width: 1200px;
}

.hero-banner {
  border-radius: 12px;
  overflow: hidden;
}

.v-card {
  transition: transform 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>
<template>
  <v-container id="App" class="cardStyle">
    <v-card class="menuCard">
      <nav class="d-flex justify-space-between btnStyle">
        <v-btn color="info" text="Главная" :to="{ name: 'home' }" />
        <v-btn color="info" text="Услуги" :to="{ name: 'service' }" />
        <v-btn color="info" text="Отзывы" :to="{ name: 'reviews' }" />
        <v-btn
          color="info"
          text="Создать заявку"
          :to="{ name: 'createRequests' }"
          v-if="isAuthenticated && role === 'Пользователь'"
        />
        <v-btn
          color="info"
          text="Управление заявками"
          :to="{ name: 'adminRequests' }"
          v-if="isAuthenticated && role === 'Администратор'"
        />
        <v-btn color="info" text="О компании" :to="{ name: 'about' }" />
        <v-btn
          v-if="isAuthenticated"
          @click="logout"
          color="info"
          text="Выйти из аккаунта"
        />
        <v-btn
          v-else
          color="info"
          @click="authDialog = true"
          text="Авторизоваться"
        />

        <v-dialog v-model="authDialog" width="500">
          <v-card>
            <v-tabs v-model="tab">
              <v-tab value="login">Вход</v-tab>
              <v-tab value="register">Регистрация</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="login">
                  <v-text-field v-model="loginForm.login" label="Логин" />
                  <v-text-field
                    v-model="loginForm.password"
                    label="Пароль"
                    type="password"
                  />
                  <v-btn color="primary" @click="login" :loading="loading">
                    Войти
                  </v-btn>
                </v-window-item>

                <v-window-item value="register">
                  <v-text-field v-model="registerForm.login" label="Логин" />
                  <v-text-field
                    v-model="registerForm.password"
                    label="Пароль"
                    type="password"
                  />
                  <v-btn color="primary" @click="register" :loading="loading">
                    Зарегистрироваться
                  </v-btn>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-dialog>
      </nav>
    </v-card>

    <v-card class="content">
      <router-view />
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const authDialog = ref(false);
const tab = ref("login");
const loading = ref(false);
const loginForm = ref({ login: "", password: "" });
const registerForm = ref({ login: "", password: "" });

const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true");
const role = ref(localStorage.getItem("role") || "");

const login = async () => {
  try {
    loading.value = true;
    console.log("Trying to login with:", loginForm.value); // Логирование

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: loginForm.value.login,
        password: loginForm.value.password,
      }),
    });

    const data = await response.json();
    console.log("Login response:", data); // Логирование ответа

    if (!response.ok) {
      throw new Error(data.error || "Ошибка авторизации");
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userLogin", data.login);

    isAuthenticated.value = true;
    role.value = data.role;

    authDialog.value = false;
    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

const register = async () => {
  try {
    loading.value = true;
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm.value),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ошибка регистрации");
    }

    alert("Регистрация успешна. Теперь вы можете войти.");
    tab.value = "login";
    loginForm.value.login = registerForm.value.login;
    registerForm.value = { login: "", password: "" };
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  isAuthenticated.value = false;
  role.value = "";
  router.push("/");
};
</script>

<style>
.menuCard {
  display: flex;
}
.btnStyle .v-btn {
  margin: 10px;
}
.cardStyle .v-card {
  margin: 10px;
  background-color: rgb(238, 240, 148);
}
#App {
  min-height: 100vh !important;
  display: flex;
  flex-direction: column;
}
.content {
  height: 100%;
}
</style>

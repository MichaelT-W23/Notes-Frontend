<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="input-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <router-link to="/" class="sign-in-link">Already Have an Account? Sign In</router-link>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { createNewUser, loginExistingUser } from "../services/userService";
import { useRouter } from 'vue-router';
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
  try {
    const userData = { username: name.value, email: email.value, password: password.value };
    const response = await createNewUser(userData);

    if (response && !response.error) {
      const loginResponse = await loginExistingUser({ username: name.value, password: password.value });

      if (loginResponse && loginResponse.user) {
        authStore.logout();
        authStore.login(loginResponse.user);
        router.push('/Dashboard');
      } else {
        errorMessage.value = "Failed to log in after registration";
      }
    } else {
      errorMessage.value = response.error || "Registration failed";
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = "An error occurred during registration";
  }
};

</script>


<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.sign-in-link {
  display: block;
  margin-top: 20px;
  color: #007BFF;
  text-decoration: none;
}

.sign-in-link:hover {
  color: #0056b3;
}
</style>

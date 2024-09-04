<template>
  <div class="sign-in-container">
    <h1>Sign In</h1>
    <form @submit.prevent="handleSignIn">
      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
    <router-link to="/Register" class="register-link">Don't Have an Account? Sign up</router-link>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { loginExistingUser } from "../services/userService";
import { useRouter } from 'vue-router';
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSignIn = async () => {
  try {
    const userData = { username: username.value, password: password.value };
    const response = await loginExistingUser(userData);
    
    if (response && response.user) {
      authStore.logout();
      authStore.login(response.user);
      router.push('/Dashboard');
    } else {
      errorMessage.value = "Invalid username or password";
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = "An error occurred during sign-in";
  }
};

onMounted(() => {
  authStore.logout();
});

</script>


<style scoped>
.sign-in-container {
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

.register-link {
  display: block;
  margin-top: 20px;
  color: #007BFF;
  text-decoration: none;
}

.register-link:hover {
  color: #0056b3;
}

</style>

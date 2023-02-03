<template>
  <div>
    <h3 class="p-4 text-center">Login</h3>
    <form class="p-5">
      <div class="form-group form-input-group">
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="E-mail *"
          v-model="user.email"
          @blur="validateEmail"
        />

        <transition name="fade-validation" mode="out-in">
          <p v-if="!isValidEmail" class="validation">This field is required.</p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>
      <div class="form-group form-input-group">
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Password *"
          v-model="user.password"
          @blur="validatePassword"
        />

        <transition name="fade-validation" mode="out-in">
          <p v-if="!isValidPassword" class="validation">
            This field is required.
          </p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>

      <div class="button-container py-3">
        <button @click.prevent="login">Login</button>
        <p>
          <router-link to="/forgotPassword" class="forgot-text">
            Forgot your password?
          </router-link>
        </p>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link to="/signup" class="signup-text">Signup</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isValidEmail: true,
      isValidPassword: true,
    };
  },
  methods: {
    validatePassword() {
      return !this.user.password.length
        ? (this.isValidPassword = false)
        : (this.isValidPassword = true);
    },
    validateEmail() {
      return !this.user.email.length
        ? (this.isValidEmail = false)
        : (this.isValidEmail = true);
    },
    login() {
      if (!this.validateEmail() && !this.validatePassword()) {
        return;
      }
      // SEND TO BACK
      // INIT DATA
      this.user.password = '';
      this.user.email = '';

      return;
    },
    signup() {
      console.log('Go to signup');
    },
  },
};
</script>

<style scoped>
/** BUTTON */

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.forgot-text {
  font-size: 80%;
  color: rgb(177, 177, 177);
  text-decoration: none;
}

.forgot-text:hover {
  color: rgb(123, 123, 123);
  text-decoration: underline;
}

.signup-text {
  font-weight: 600;
  color: #07c;
  text-decoration: none;
}

.signup-text:hover {
  color: #0af;
  text-decoration: underline;
}
</style>

<template>
  <div>
    <h3 class="p-4 text-center">Signup</h3>
    <div v-if="isLoading" class="loader">
      <i class="fa fa-spinner fa-spin" style="font-size: 42px"></i>
    </div>
    <form class="p-5">
      <div class="form-group form-input-group">
        <input
          id="name"
          type="text"
          class="form-control"
          placeholder="Name *"
          v-model="user.name"
          @blur="validateName"
          :disabled="isLoading"
        />

        <transition name="fade-validation" mode="out-in">
          <p v-if="!isValidName" class="validation">This field is required.</p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>
      <div class="form-group form-input-group">
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="E-mail *"
          v-model="user.email"
          @blur="validateEmail"
          :disabled="isLoading"
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
          :disabled="isLoading"
        />

        <transition name="fade-validation" mode="out-in">
          <p v-if="!isValidPassword" class="validation">
            This field is required.
          </p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>
      <div class="form-group form-input-group">
        <input
          id="password-confirm"
          type="password"
          class="form-control"
          placeholder="Confirm password *"
          v-model="user.passwordConfirm"
          @blur="validatePasswordConfirm"
          :disabled="isLoading"
        />

        <transition name="fade-validation" mode="out-in">
          <p v-if="!isValidPasswordConfirm" class="validation">
            This field is required.
          </p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>

      <div class="d-flex justify-content-center py-3">
        <button @click.prevent="signup">Signup</button>
      </div>
      <div>
        <p>
          Already have an account?
          <router-link to="/login" class="login-text">Login</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Api from '../../services/Api';
export default {
  name: 'SignupForm',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      isValidName: true,
      isValidEmail: true,
      isValidPassword: true,
      isValidPasswordConfirm: true,
      isLoading: false,
    };
  },
  methods: {
    validateName() {
      return !this.user.name.length
        ? (this.isValidName = false)
        : (this.isValidName = true);
    },
    validateEmail() {
      return !this.user.email.length
        ? (this.isValidEmail = false)
        : (this.isValidEmail = true);
    },
    validatePassword() {
      return !this.user.password.length
        ? (this.isValidPassword = false)
        : (this.isValidPassword = true);
    },
    validatePasswordConfirm() {
      return !this.user.passwordConfirm.length
        ? (this.isValidPasswordConfirm = false)
        : (this.isValidPasswordConfirm = true);
    },
    async signup() {
      try {
        this.isLoading = true;
        // VALIDATE DATE
        if (
          !this.validateName() &&
          !this.validateEmail() &&
          !this.validatePassword() &&
          !this.validatePasswordConfirm()
        ) {
          return;
        }
        // SEND TO BACK
        await Api.signupUser(this.user);
        // INIT DATA
        this.user.name = '';
        this.user.email = '';
        this.user.password = '';
        this.user.passwordConfirm = '';
        this.isLoading = false;

        return;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    login() {
      console.log('Go to login');
    },
  },
};
</script>

<style scoped>
/* SPINNER */

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

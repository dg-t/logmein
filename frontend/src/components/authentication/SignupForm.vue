<template>
  <div>
    <h3 class="p-4 text-center">Signup</h3>
    <form class="p-5">
      <div class="form-group form-input-group">
        <input
          id="name"
          type="text"
          class="form-control"
          placeholder="Name *"
          v-model="user.name"
          @blur="validateName"
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
      <div class="form-group form-input-group">
        <input
          id="password-confirm"
          type="password"
          class="form-control"
          placeholder="Confirm password *"
          v-model="user.passwordConfirm"
          @blur="validatePasswordConfirm"
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
    signup() {
      if (
        !this.validateName() &&
        !this.validateEmail() &&
        !this.validatePassword() &&
        !this.validatePasswordConfirm()
      ) {
        return;
      }
      // SEND TO BACK
      // INIT DATA
      this.user.name = '';
      this.user.email = '';
      this.user.password = '';
      this.user.passwordConfirm = '';

      return;
    },
    login() {
      console.log('Go to login');
    },
  },
};
</script>

<template>
  <div>
    <h3 class="p-4 text-center">Forgot your password?</h3>
    <form class="p-5">
      <div class="form-group form-input-group">
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="E-mail *"
          v-model="email"
          @blur="validateEmail"
        />

        <transition name="fade-validation" mode="out-in">
          <p v-if="!isValidEmail" class="validation">This field is required.</p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>

      <div class="d-flex justify-content-center py-3">
        <button @click.prevent="forgotPassword">
          Request Password Reset Email
        </button>
      </div>
      <div>
        <p>
          <router-link to="/login" class="login-text">
            Back to login
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordForm',
  data() {
    return {
      email: '',
      isValidEmail: true,
    };
  },
  methods: {
    validateEmail() {
      return !this.email.length
        ? (this.isValidEmail = false)
        : (this.isValidEmail = true);
    },
    forgotPassword() {
      console.log('Send recovery password email');
    },
  },
};
</script>

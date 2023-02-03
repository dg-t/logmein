<template>
  <div>
    <LoginForm />
    <SignupForm />
  </div>
</template>

<script>
import LoginForm from '../../components/authentication/LoginForm.vue';
import SignupForm from '../../components/authentication/SignupForm.vue';
export default {
  name: 'AppAuthentication',
  components: {
    LoginForm,
    SignupForm,
  },
};
</script>

<style scoped></style>

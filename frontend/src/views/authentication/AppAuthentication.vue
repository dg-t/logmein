<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../../components/authentication/LoginForm.vue';
export default {
  name: 'AppAuthentication',
  components: {
    LoginForm,
  },
};
</script>

<style scoped></style>

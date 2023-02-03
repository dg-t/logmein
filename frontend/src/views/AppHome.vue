<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <router-link to="/login">
      <h1 class="fw-bold">Log Me In</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
};
</script>

<style scoped>
/* CONTAINER */

div {
  background: radial-gradient(#0af, #004b71);
}

/* LINK */

a {
  text-decoration: none;
  color: #e3e3e3;
  letter-spacing: 2px;
  transition: all 0.5s ease-in;
}

a:hover {
  color: rgb(240, 240, 240);
  letter-spacing: 5px;
}

a::after {
  content: '';
  width: 0px;
  height: 1px;
  display: block;
  background: black;
  transition: 300ms;
}

a:hover::after {
  width: 100%;
}
</style>

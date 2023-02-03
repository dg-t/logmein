<template>
  <div>
    <router-view v-slot="slotProps">
      <transition name="fade-route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

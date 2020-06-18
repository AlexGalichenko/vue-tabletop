<template>
  <div>
    <div v-for="obj in objects" :key=obj.id>{{obj}}</div>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    objects() {
      return this.$store.state.objects
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch('init');
  }
};
</script>

<style scoped>
</style>
<template>
  <div>
    <md-field>
      <label>Name</label>
      <md-input v-model="name"></md-input>
    </md-field>
    <md-button class="md-raised md-primary" @click="login">Login</md-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: ''
    }
  },
  methods: {
    login() {
      window.localStorage.setItem("name", this.name);
      this.$router.push('/game');
    }
  },
};
</script>

<style scoped>
</style>
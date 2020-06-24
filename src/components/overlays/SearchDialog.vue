<template>
  <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
    <md-dialog-title>Search</md-dialog-title>

    <md-dialog-content>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeDialog')">Close</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    showDialog: Boolean
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
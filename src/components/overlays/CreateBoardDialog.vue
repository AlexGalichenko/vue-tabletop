<template>
  <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
    <md-dialog-title>Create Board</md-dialog-title>

    <md-dialog-content>
      <md-field>
        <label>Board Name</label>
        <md-input v-model="name" />
      </md-field>
      <md-field>
        <label>Height</label>
        <md-input v-model="height" />
      </md-field>
      <md-field>
        <label>Width</label>
        <md-input v-model="width" />
      </md-field>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeDialog')">Close</md-button>
      <md-button class="md-primary" @click="createBoard">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    showDialog: Boolean
  },
  data() {
    return {
      name: null,
      height: 700,
      width: 800
    };
  },
  methods: {
    createBoard() {
      this.$store.dispatch('createBoard', {
        name: this.name,
        height: this.height,
        width: this.width
      });
      this.$emit('closeDialog');
    }
  },
};
</script>

<style scoped>
</style>
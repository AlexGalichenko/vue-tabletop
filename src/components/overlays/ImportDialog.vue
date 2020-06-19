<template>
  <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
    <md-dialog-title>Import</md-dialog-title>

    <md-dialog-content>
      <md-field>
        <label>File</label>
        <md-file @md-change="getFileList"/>
      </md-field>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeDialog')">Close</md-button>
      <md-button class="md-primary" @click="saveImportDialog">Import</md-button>
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
      file: null,
    };
  },
  methods: {
    getFileList(event) {
      this.file = event[0];
    },
    saveImportDialog() {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          this.$store.dispatch("loadGame", JSON.parse(event.target.result));
          this.$emit('closeDialog');
        });
        reader.readAsText(this.file);
    }
  },
};
</script>

<style scoped>
</style>
<template>
  <md-speed-dial class="actions">
    <md-speed-dial-target>
      <md-icon>+</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="md-icon-button">
        <i class="fas fa-door-open" />
      </md-button>
      <md-button class="md-icon-button">
        <i class="fas fa-door-closed" />
      </md-button>
      <md-button class="md-icon-button"  @click="$emit('showCreateDialog')">
        <i class="fas fa-plus-circle" />
      </md-button>
      <md-button class="md-icon-button">
        <i class="fas fa-file-image" />
      </md-button>
      <md-button class="md-icon-button" @click="saveGame">
        <i class="fas fa-download" />
      </md-button>
      <md-button class="md-icon-button" @click="$emit('showImportDialog')">
        <i class="fas fa-upload" />
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
</template>

<script>
export default {
  components: {},
  methods: {
    saveGame() {
      const element = document.createElement('a');
      const url = element.setAttribute(
        'href',
        'data:text/json;charset=utf-8,' +
        window.encodeURIComponent(JSON.stringify(this.$store.state.objects))
      );
      element.setAttribute('download', 'game.json');
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }
};
</script>

<style scoped>
.actions {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
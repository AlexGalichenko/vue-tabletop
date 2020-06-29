<script>
export default {
  computed: {
    menuStyle() {
      return {
        position: 'absolute',
        top: `${this.$store.state.contextMenu.y - 10}px`,
        left: `${this.$store.state.contextMenu.x - 10}px`
      };
    },
    showContextMenu() {
      return this.$store.state.contextMenu.show;
    }
  },
  data() {
    return {
      menuClass: 'md-menu-content-bottom-start md-menu-content-big md-menu-content md-theme-default',
      liClass: 'md-list-item md-menu-item md-theme-demo-light',
      buttonClass: 'md-list-item-button md-list-item-container md-button-clean',
      divClass: 'md-list-item-content md-ripple'
    };
  },
  methods: {
    hideContextMenu() {
      this.$store.commit('hideContextMenu');
    }
  }
};
</script>

<style scoped>
.md-list-item {
  cursor: pointer;
}
.md-list-item.md-menu-item.md-theme-demo-light:active {
  background-color: gray;
}
#context-menu {
  z-index: 1000;
}
</style>
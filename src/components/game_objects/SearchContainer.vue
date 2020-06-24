<script>
import Container from "./HandContainer.vue";
import HasSearchContextMenu from "../mixins/HasSearchContextMenu.js";

export default {
  extends: Container,
  props: {
    index: Number
  },
  mixins: [HasSearchContextMenu]
};
</script>
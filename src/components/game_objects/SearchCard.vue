<script>
import Card from './HandCard.vue';
import HasSearchContextMenu from '../mixins/HasSearchContextMenu.js';

export default {
  extends: Card,
  props: {
    index: Number
  },
  mixins: [HasSearchContextMenu],
};
</script>
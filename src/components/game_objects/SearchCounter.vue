<script>
import Counter from './BaseCounter.vue';
import HasSearchContextMenu from '../mixins/HasSearchContextMenu.js';

export default {
  extends: Counter,
  mixins: [HasSearchContextMenu],
  props: {
    index: Number
  }
};
</script>
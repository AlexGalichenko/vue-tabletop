<script>
import Card from './BaseCard.vue';
import { previewFrontCardStyle, previewBackCardStyle } from '../utils/styles.js';

export default {
  extends: Card,
  computed: {
    frontStyle() {
      return previewFrontCardStyle(this.object)
    },

    backStyle() {
      return previewBackCardStyle(this.object)
    }
  }
};
</script>
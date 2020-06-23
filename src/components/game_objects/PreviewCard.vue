<script>
import Card from './Card.vue';
import { previewFrontCardStyle, previewBackCardStyle } from '../utils/styles.js';

export default {
  extends: Card,
  mixins: [],
  computed: {
    objectClass() {
      return {
        'card': true
      }
    },

    frontStyle() {
      return previewFrontCardStyle(this.object)
    },

    backStyle() {
      return previewBackCardStyle(this.object)
    }
  }
};
</script>
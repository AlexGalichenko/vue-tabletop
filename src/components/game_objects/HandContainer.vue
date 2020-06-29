<script>
import Container from './BaseContainer.vue';

import { frontContainerStyle, backContainerStyle } from '../utils/styles.js';

export default {
  extends: Container,
  computed: {
    frontStyle() {
      return frontContainerStyle(this.object);
    },

    backStyle() {
      return backContainerStyle(this.object);
    }
  }

};
</script>
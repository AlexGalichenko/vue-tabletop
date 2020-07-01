<script>
import Container from './BaseContainer.vue';
import DraggableContainer from '../mixins/DraggableContainer.js';
import HasContextMenu from '../mixins/HasContextMenu.js';

import { tableFrontContainerStyle, tableBackContainerStyle } from '../utils/styles.js';

export default {
  extends: Container,
  mixins: [DraggableContainer, HasContextMenu],
  computed: {
    frontStyle() {
      return tableFrontContainerStyle(this.object);
    },

    backStyle() {
      return tableBackContainerStyle(this.object);
    }
  }

};
</script>
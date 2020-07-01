<template>
  <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
    <md-dialog-title>Create Object</md-dialog-title>

    <md-dialog-content>
      <md-field>
        <label for="type">Type</label>
        <md-select v-model="type" name="type" id="type">
          <md-option value="Deck">Deck</md-option>
          <md-option value="Tile">Tile</md-option>
          <md-option value="Counter">Counter</md-option>
          <md-option value="Container">Container</md-option>
          <md-option value="Dice">Dice</md-option>
          <md-option value="Chip">Chip</md-option>
        </md-select>
      </md-field>

      <md-field v-if="!['Counter', 'Dice', 'Chip'].includes(type)">
        <label>Front URL</label>
        <md-input v-model="frontUrl" />
      </md-field>

      <md-field v-if="!['Counter', 'Dice', 'Chip'].includes(type)">
        <label>Back URL</label>
        <md-input v-model="backUrl" />
      </md-field>

      <md-field v-if="type === 'Deck'">
        <label>Rows</label>
        <md-input v-model="rows" />
      </md-field>

      <md-field v-if="type === 'Deck'">
        <label>Columns</label>
        <md-input v-model="columns" />
      </md-field>

      <md-field v-if="['Deck', 'Tile', 'Container', 'Chip'].includes(type)">
        <label>Height</label>
        <md-input v-model="height" />
      </md-field>

      <md-field v-if="['Deck', 'Tile', 'Container', 'Chip'].includes(type)">
        <label>Width</label>
        <md-input v-model="width" />
      </md-field>

      <md-field v-if="['Dice'].includes(type)">
        <label>Values</label>
        <md-input v-model="values" />
      </md-field>

      <md-field v-if="['Dice', 'Chip'].includes(type)">
        <label>Color</label>
        <md-input v-model="color" :style="`background: #${color}`"/>
      </md-field>

      <md-field>
        <label>Scale</label>
        <md-input v-model="scale" />
      </md-field>

      <md-checkbox
        v-if="['Container'].includes(type)"
        v-model="infinite"
        class="md-primary"
      >Infinite</md-checkbox>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeDialog')">Close</md-button>
      <md-button class="md-primary" @click="saveCreateDialog">Save</md-button>
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
      frontUrl: '',
      backUrl: '',
      type: 'Deck',
      rows: 1,
      columns: 1,
      height: 300,
      width: 200,
      scale: 1,
      infinite: false,
      values: '1,2,3,4,5,6',
      color: 'FFF'
    };
  },
  methods: {
    saveCreateDialog() {
      this.$store.dispatch('createObject', {
        x: 150 - this.$store.state.table.x,
        y: 150 - this.$store.state.table.y,
        ...this.$data
      });
      this.$emit('closeDialog');
    }
  }
};
</script>

<style scoped>
</style>
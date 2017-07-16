<template>
  <div id="app">
    <n-header @tools="openTools"></n-header>
    <section class="container" :class="{'hide': table}">
      <event-add></event-add>
      <event-list></event-list>
    </section>
    <event-table :is-show="table"></event-table>
    <slider-bar :is-show="tools"
                @openEdit="table=true; tools=false"
    ></slider-bar>
  </div>
</template>

<script>
import nHeader from './components/Header.vue'
import EventAdd from './components/EventAdd.vue'
import EventList from './components/EventList.vue'
import EventTable from './components/EventTable.vue'
import SliderBar from './components/SliderBar.vue'
export default {
  name: 'app',
  data() {
    return {
      table: false,
      tools: false
    }
  },
  components: {
    nHeader,EventAdd,EventList,EventTable,SliderBar
  },
  methods: {
    openTools() {
      if (this.table) {
        this.table = !this.table;
        this.tools = !this.tools
      }
      this.tools = !this.tools
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: "Microsoft Yahei", sans-serif;
  list-style: none;
}
html, body {
  height: 100%;
}
body, #app {
  width: 100%;

}
#app {
  height: 100%;
}
.container {
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 0 10px;
  box-sizing: border-box;
}
.container.hide {
  display: none;
}

</style>

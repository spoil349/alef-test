<template>
  <div class="preview">
    <div class="personal-data">
      <div class="personal-data__header">
        <h3 class="personal-data__header">Персональные данные</h3>
      </div>
      <span>{{parent.name}}, {{parent.age}}</span>
    </div>
    <div class="children-data">
        <div class="children-data__header">
          <h4 class="children-data__header">Дети</h4>
        </div>
        <div
          class="children-data__children"
          v-for="children in childrens"
          :key="children.id"
        >
          <span>{{children.name}}, {{children.age}}</span>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Preview',
  data() {
    return {
      parent: {name: '', age: null},
      childrens: [],
    }
  },
  components: {
  },
  mounted() {
    if (localStorage.childrens) {
      this.childrens = JSON.parse(localStorage.childrens)
    }

    if(localStorage.parent) {
      this.parent = JSON.parse(localStorage.parent)
    }
  }
}
</script>

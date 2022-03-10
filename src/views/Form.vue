<template>
  <div class="form">
        <div class="personal-data">
            <div class="personal-data__header">
                <h3 class="personal-data__header">Персональные данные</h3>
            </div>
            <input
                v-model="parent.name"
                placeholder="Имя"
                type="text"
                class="children-data__name"
            >
            <input
                v-model="parent.age"
                placeholder="Возраст"
                type="text"
                class="children-data__age"
            >
        </div>
        <div class="children-data">
            <div class="children-data__header">
                <h4 class="children-data__header">Дети (макс. 5)</h4>
                <button
                    :class="['children-data__add-button', { active: isAddChildButtonActive }]"
                    @click="addChild"
                >Добавить ребенка</button>
            </div>
            <div
                class="children-data__children"
                v-for="children in childrens"
                :key="children.id"
            >
                <div
                    :class="['children-data__inputs-group', { active: currentChildren === children }]"
                    @click="setCurrentChild(children)"
                >
                    <input
                        class="children-data__name"
                        placeholder="Имя"
                        type="text"
                        v-model="children.name"
                    >
                    <input
                        class="children-data__age"
                        placeholder="Возраст"
                        type="number"
                        v-model="children.age"
                    >
                </div>
                <button
                    class="children-data__delete-button"
                    @click="deleteChild(children)"
                >Удалить</button>
            </div>
        </div>
      <button
        class="form__save-button"
        @click="saveFormData"
      >
        Сохранить
      </button>
      
  </div>
</template>

<script>

export default {
  name: 'Form',
  data() {
    return {
        MAX_CHILDRENS_COUNT: 5,
        parent: {name: '', age: null},
        childrens: [],
        isAddChildButtonActive: true,
        currentChildren: null
    }
  },
  components: {
  },
  methods: {
    addChild() {
        if (this.childrens.length < this.MAX_CHILDRENS_COUNT ) {
            this.childrens.push({id: Date.now(), name: '', age: null, saved: false})
        }
    },
    setCurrentChild(children) {
        this.currentChildren = children
    },
    deleteChild(children) {
        this.childrens = this.childrens.filter(child => {
            return child.id !== children.id
        })
    },
    saveFormData() {
        this.childrens.map(child => child.saved = true)
        localStorage.childrens = JSON.stringify(this.childrens)
        localStorage.parent = JSON.stringify(this.parent)
    }
  },
  watch: {
    childrens: {
        handler(newChildrens) {
            newChildrens = newChildrens.filter(child => {
                return child.saved
            })
            localStorage.childrens = JSON.stringify(newChildrens)
            if(localStorage.childrens.length >= this.MAX_CHILDRENS_COUNT) {
                this.isAddChildButtonActive = false
            }
        },
        deep: true
    }
  },
  mounted() {
    if (localStorage.childrens) {
        this.childrens = JSON.parse(localStorage.childrens)
        if(localStorage.childrens.length >= this.MAX_CHILDRENS_COUNT) {
            this.isAddChildButtonActive = false
        }
    }

    if(localStorage.parent) {
        this.parent = JSON.parse(localStorage.parent)
    }
  },
}
</script>

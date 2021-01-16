<template>
  <div class="todos">
    <h1 class="todos__header header">Список задач</h1>
    <div class="profile__content content">
      <div class="content__header">
        <span>Задача</span>
        <span>Статус</span>
      </div>
      <div>
        <div v-for="todo in todos" class="todos__todo" :key="todo.id">
          <div class="todos__text">
            {{todo.title}}
          </div>
          <div class="todos__status">
            <input type="checkbox" :id=todo.id @change="updateTodos(todo.id)" :checked=todo.complited>
            <label :for=todo.id></label>
            <span>Выполнено</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async fetch() {
      if (this.$store.getters['todos/getRandomTodos'].length == 0) {
        this.$store.dispatch('todos/fetch');
      }
    },
    methods: {
      updateTodos(id) {
        this.$store.dispatch('todos/updateTodos', id)
      }
    },
    data() {
      return {
        todos: []
      }
    },
    mounted() {
      this.todos = this.$store.getters['todos/getRandomTodos'];
    }
  }
</script>

<style lang="less">
  .todos{
    background: #EFF1F9;
    width: 100%;
    padding:40px 56px 0 48px;
    .header{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 32px;
      margin-bottom: 24px;
    }
    .content{
      background: #FFFFFF;
      border-radius: 10px;
      padding: 48px 40px 33px 40px;
      max-width: 920px;
      .content__header{
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #BABABA;
        border-bottom: 1px solid #EFF1F9;
        padding-bottom: 16px;
      }
      .todos__todo{
        display: flex;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid #EFF1F9;
        .todos_text{
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #303136;
        }
        .todos__status{
          display: flex;
          align-items: center;
          color: #C2C2C2;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          input{
            display: none;
          }
          label{
            position: relative;
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 1px solid #BABABA;
            margin-right: 7px;
            cursor: pointer;
          }
          label:after{
            display: none;
            position: absolute;
            content: "";
            width: 7px;
            height: 11px;
            border-bottom: 2.17px solid #6FBC9A;
            border-right: 2.17px solid #6FBC9A;
            transform: rotate(45deg);
            margin-left: 7px;
            margin-top: 2px;
          }
          input[type="checkbox"]:checked + label:after{
            display: block;
          }
           input[type="checkbox"]:checked ~ span{
             color: #51CB3D;
           }
        }
      }
    }
  }
  @media(max-width: 414px) {
    .todos{
      padding-left: 17px;
      padding-right: 16px;
      height: 100vh;
      .header{
        margin-top: 60px;
      }
      .content{
        padding: 24px 16px 54px 16px;
      }
    }
  }
</style>

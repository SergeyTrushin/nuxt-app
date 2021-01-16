<template>
  <div class="login">
    <div class="login__logo">
      <img src="../assets/logo.svg" alt="logo">
    </div>
    <div class="alert" v-if="showAlert">
      Неверный логин или пароль
    </div>
    <form @submit.prevent="signIn" class="login__form">
      <input type="text" class="login__input" placeholder="Логин" name="login" v-model:value="name">
      <input type="password" class="login__input" placeholder="Пароль" name="password" v-model:value="password">
      <button type="submut" class="login__button">
        <span v-if="check()">Войти</span>
        <span v-else>Регистрация</span> 
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      name: '',
      password: '',
      showAlert: false,
    }
  },
  computed: {
    login() {
      return this.$store.getters['account/status'];
    } 
  },
  methods: {
    signIn() {
      if (this.login) {
        if (localStorage.getItem('login') == this.name && localStorage.getItem('password') == this.password) {
          this.$router.push('/')
        } else {
          this.showAlert = true;
          this.name = '';
          this.password = '';
        }
      } else {
        if (localStorage.getItem('login')) {
          if (localStorage.getItem('login') == this.name && localStorage.getItem('password') == this.password) {
            this.$store.dispatch('account/switchStatus', true)
            this.$router.push('/')
          } else {
            this.showAlert = true;
            this.name = '';
            this.password = '';
          }
        } else {
          localStorage.setItem('login', this.name);
          localStorage.setItem('password', this.password)
          this.$store.dispatch('account/switchStatus', true)
          this.name = '';
          this.password = '';
          this.showAlert = false;
          alert('Аккаунт создан')
        }
      }
    },
    check() {
      if (localStorage.getItem('login')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less">
.login{
  margin-top: 137px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .login__logo{
    width: 157px;
    height: 40px;
    margin-bottom: 60px;
  }
  .login__form{
    display: flex;
    flex-direction: column;
    .login__input{
      font-family: 'Montserrat', sans-serif;
      width: 358px;
      height: 44px;
      font-size: 16px;
      line-height: 20px;
      padding-left: 20px;
      border: 1px solid #CBCBCB;
      box-sizing: border-box;
      border-radius: 10px;
      margin-bottom:16px;
    }
    .login__button{
      font-family: 'Montserrat', sans-serif;
      width: 100%;
      height: 44px;
      border: none;
      background: #D6073D;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      line-height: 20px;
      cursor: pointer;
    }
  }
  .alert{
    color:red;
    margin-bottom:10px;
  }
}

@media(max-width: 414px){
  .login{
    .login__form{
      .login__input{
        width: 296px;
      }
    }
  }
}

</style>

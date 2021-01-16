<template>
  <div class="profile">
    <h1 class="profile__header header">Мой профиль</h1>
    <div class="profile__content content">
      <form @submit.prevent="update" class="profile__form">
        <div class="profile__input-container" v-bind:class="{err:$v.name.$error}">
          <label for="name">Имя</label>
          <input type="text" id="name" 
                 class="profile__input" 
                 v-model:value="name" 
                 v-model.trim="name"
                 :class="{invalid: ($v.name.$dirty && !$v.name.required)}">
          <span v-if="$v.name.$dirty && !$v.name.required">
            Пожалуйста заполните поле
          </span>
        </div>
        <div class="profile__input-container" v-bind:class="{err:$v.pass.$error}">
          <label for="password">Сменить пароль</label>
          <input type="password" 
                 id="password" 
                 class="profile__input" 
                 v-model:value="pass"
                 v-model.trim="pass"
                 :class="{invalid: ($v.pass.$dirty && !$v.pass.minLength)}">
          <span v-if="$v.pass.$dirty && !$v.pass.minLength">
            Пароль должен содержать минимум 6 символов
          </span>
        </div>
        <div class="profile__input-container" v-bind:class="{err:$v.secondName.$error}">
          <label for="second-name">Фамилия</label>
          <input type="text" 
                 id="second-name" 
                 class="profile__input"  
                 v-model:value="secondName"
                 v-model.trim="secondName"
                 :class="{invalid: ($v.secondName.$dirty && !$v.secondName.required)}">
          <span v-if="$v.secondName.$dirty && !$v.secondName.required">
            Пожалуйста заполните поле
          </span>
        </div>
        <div class="profile__input-container" v-bind:class="{err:$v.login.$error}">
          <label for="account-name">Сменить логин</label>
          <input type="text" 
                 id="account-name" 
                 class="profile__input" 
                 v-model:value="login"
                 v-model.trim="login"
                 :class="{invalid: ($v.login.$dirty && !$v.login.required)}">
          <span v-if="$v.login.$dirty && !$v.login.required">
            Пожалуйста заполните поле
          </span>
        </div>
        <div class="button-container">
          <button type="submit" class="profile__button">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  mounted() {
    if (localStorage.getItem('name')) {
      this.name = localStorage.getItem('name');
    }
    if (localStorage.getItem('secondName')) {
      this.secondName = localStorage.getItem('secondName');
    }
  },
  data() {
    return {
      name: '',
      pass: '',
      secondName: '',
      login: '',
    }
  },
  validations: {
    name: {
      required,
    },
    secondName: {
      required,
    },
    pass: {
      minLength: minLength(6)
    },
    login: {
    }
  },
  methods: {
    update() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      } else {
        this.login ? localStorage.setItem('login', this.login) : "";
        this.pass ? localStorage.setItem('password', this.pass) : "";
        this.name ? localStorage.setItem('name', this.name) : "";
        this.secondName ? localStorage.setItem('secondName', this.secondName) : "";
        alert('Данные успешно изменены')
      }
    }
  }
}
</script>

<style lang="less">
  .profile{
    background: #EFF1F9;
    width: 100%;
    height: 100%;
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
      .profile__form{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .profile__input-container{
          width: 100%;
          max-width: 360px;
          flex-grow: 0.5;
          position: relative;
          margin: 0 80px 24px 0;
          &:nth-child(even){
            margin-right: 0;
          }
          label{
            position: absolute;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            color: #6F849C;
            transform: translateY(-100% - 8px);
          }
          .profile__input{
            width: 100%;
            border: none;
            border-bottom: 1px solid #EFF1F9;
            font-family: Montserrat;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            padding-bottom: 8px;
            color: #303136;
            margin-bottom: 24px;
            &:focus{
              border-color:#6F849C;
            }
          }
          span{
            display: none;
            position: absolute;
            bottom: 0;
            color: #D6073D;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            line-height: 16px
          }
        }
        .profile__input-container.err{
          span{
            display: block;
          }
          .profile__input{
            border-color: #D6073D;
          }
        }
        .button-container{
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          .profile__button{
            margin-left: auto;
            background: #D6073D;
            border-radius: 10px;
            width: 202px;
            height: 44px;
            border: none;
            cursor: pointer;
            font-family: Montserrat;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #fff;
          }
        }
      }
    }
  }
  @media(max-width: 414px) {
    .profile{
      .header{
        margin-top: 70px;
      }
      height: 100%;
      padding: 23px 16px;
      .content{
        padding: 47px 16px 32px 16px;
        .profile__form{
          justify-content: center;
          align-items: center;
          .profile__input-container{
            margin-right: 0!important;
            &:nth-child(1){
              order: 1;
            }
            &:nth-child(2){
              order: 3;
            }
            &:nth-child(3){
              order: 2;
            }
            &:nth-child(4){
              order: 4;
            }
            label{
              transform: translateY(-150%);
            }
            span{
              margin-bottom: 5px;
            }
          }
          .button-container{
            order: 5;
            justify-content: center!important;
            margin:0;
            .profile__button{
              margin-left: 0!important;
              width:296px!important;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="welcome">
    <h2 class="welcome__title">
      Пройти тест по ПДД
    </h2>
    <div class="welcome__form">
      <div class="welcome__form_title">
        Введите имя пользователя
      </div>
      <div class="welcome__user_name">
        <input type="text" placeholder="Иван" v-model="userName">
      </div>
      <div class="welcome__btn" @click="authorization(userName)">
          Начать тест
        </div>
    </div>
  </div>
</template>

<script>
/* Компонент для авторизации пользователя */
import { mapActions } from 'vuex'

export default {
  name: 'Welcome',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    ...mapActions(['setUserName']),
    /* Загружаем имя пользователя в state */
    authorization (userName) {
      this.setUserName({name: userName})
      this.$router.push('/test')
    }
  }
}
</script>

<style>
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: #fafafa;
}

.welcome__title {
  font-family: "Montserrat SB", sans-serif;
  font-size: calc(24px + 16 * ((100vw - 320px) / (1370 - 320)));
  text-align: center;
  padding-bottom: 50px;
  color: #191919;
  user-select: none;
}

.welcome__form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 250px;
  background-color: #998676;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}

.welcome__form_title {
  font-family: "Montserrat R", sans-serif;
  font-size: calc(14px + 10 * ((100vw - 320px) / (1370 - 320)));
  user-select: none;
  color: #fff;
}

.welcome__user_name > input {
  width: 230px;
  height: 40px;
  margin: 30px 0px;
  padding-left: 10px;
  border-radius: 3px;
  border: 0;
  font-family: "Montserrat L", sans-serif;
  font-size: calc(14px + 4 * ((100vw - 320px) / (1370 - 320)));
  outline: none;
  transition: .3s;
}
.welcome__user_name > input:focus {
  transform: scale(1.1);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  transition: .3s;
}

.welcome__btn {
  position: absolute;
  bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 30px;
  border-radius: 5px;
  font-family: "Montserrat R", sans-serif;
  background-color: #666;
  color: #fff;
  box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.5);
  transition-duration: .3s, .1s;
  transition-property: box-shadow, height;
  cursor: pointer;
}
.welcome__btn:hover {
  height: 29px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.5);
  transition-duration: .3s, .1s;
  transition-property:box-shadow, height;
}
@media (min-width: 1800px) {
  .welcome__form {
    width: 600px;
  }
}

@media (max-width: 426px) {
  .welcome__form {
    width: 230px;
  }
  .welcome__user_name > input {
    width: 160px;
  }
}
</style>

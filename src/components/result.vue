<template>
  <div class="result">
    <div class="result__points">
      <div class="container">
        <div class="result__col">
          <div class="result__points_count">
            Вы набрали {{this.$store.state.points}} из {{complitePoints}} баллов
          </div>
          <div class="result__complite">
            {{this.$store.state.points >= 18 ? 'Вы сдали тест' : 'Вы не сдали тест'}}
          </div>
          <div class="result__col">
            <div class="result__list">
              <div class="list__title">
                Ваши ответы
              </div>
              <div class="list__item" v-for="(item, index) in this.$store.state.answers" :key="item.index">
                {{(index + 1) + ':'}}<span>{{item}}</span>
              </div>
            </div>
          </div>
          <div class="result__row">
            <div class="result__btn" @click="redirectToTest()">
              Попробовать еще раз
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      complitePoints: 20
    }
  },
  methods: {
    redirectToTest () {
      this.$router.push('/test')
    }
  }
}
</script>

<style>
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: #444;
  color: #fff;
}

.result__col {
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
}
.result__points {
  min-width: 100%;
}
.result__points_count {
  font-family: 'Montserrat R', sans-serif;
  font-size: 32px;
  padding-bottom: 20px;
  text-align: center;
}

.result__complite {
  font-family: 'Montserrat R', sans-serif;
  font-size: 28px;
  padding-bottom: 20px;
  text-align: center;
}

.list__title {
  font-family: 'Montserrat L', sans-serif;
  font-size: 18px;
  padding-bottom: 20px;
}
.list__item {
  font-family: 'Montserrat L', sans-serif;
  font-size: 18px;
  padding-bottom: 5px;
  text-align: start;
}
.list__item > span {
  width: 20px;
  padding-left: 15px;
}

.result__row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.result__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 40px;
  margin: 30px 0px;
  border-radius: 5px;
  font-family: 'Montserrat R', sans-serif;
  background-color: #222;
  color: #fff;
  transition: .3s;
  cursor: pointer;
}
.result__btn:hover {
  transform: scale(1.1);
  transition: .3s;
}
</style>

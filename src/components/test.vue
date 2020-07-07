<template>
  <div class="test">
    <div class="test__header">
      <div class="container">
        <div class="header__row">
          <div class="header__user">{{this.$store.state.name}}</div>
        </div>
      </div>
    </div>
    <div class="test__content">
      <div class="questions">
        <div class="container">
          <div class="content__question"
            v-for="(item, index) in questions"
            :key="item.id"
          >
          <div class="question__title">
            {{item.section}}
          </div>
            <div class="question__body" ref="forSlide">
              <div class="tickets"
                v-for="(ticket, index) in item.tickets"
                :key="ticket.id"
              >
              <div class="tickets__image">
                <img :src="getImgUrl(ticket.image)" alt="ticketImage">
              </div>
              <div class="tickets__title">
                {{ticket.title}}
              </div>
              <div class="tickets__answers">
                <div
                  class="answer"
                  v-for="answer in ticket.answers"
                  :key="answer.id"
                >
                  {{answer}}
                </div>
              </div>
              <div class="tickets__answers_variable">
                <span>Введите правильный ответ:</span>
                <input
                  type="text"
                  min="0"
                  max="4"
                  maxlength="1"
                  @change="viewAnswer(item, index, $event.target.value)"
                >
              </div>
              <div class="tickets__hint">
                <div class="hint__btn">
                  <span @click="activeHints[index].activeHint = !activeHints[index].activeHint">Подсказка</span>
                </div>
                <div class="hint__text" v-show="activeHints[index].activeHint">
                  {{ticket.hint}}
                </div>
              </div>
              </div>
            </div>
            <div class="slider">
              <div class="slider__row">
                <div
                  class="slider__left"
                  @click="slideToLeft(index)"
                  v-show="activeSlides[index].activeSlide> 1"
                >
                  Предыдущий вопрос
                </div>
                <div
                  class="slider__right"
                  @click="slideToRight(index)"
                  v-show="activeSlides[index].activeSlide < 4"
                >
                  Следующий вопрос
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="result_test">
        <div class="container">
          <div class="result__btn" @click="checkingAnswer()">
              Завершить тест
          </div>
        </div>
      </div>
    </div>
    <div class="test__footer">
      <div class="container">
        <div class="footer__title">
          <span>2020 Ingwaaz</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* Компонент тестирования */
import questions from "../questions.json";
import { mapActions, mapState } from "vuex";

export default {
  name: "Test",
  data () {
    return {
      questions: [...questions],
      /* Массив ответов */
      answers: [
        {
          sections: [
            { ticket: "" },
            { ticket: "" },
            { ticket: "" },
            { ticket: "" }
          ]
        },
        {
          sections: [
            { ticket: "" },
            { ticket: "" },
            { ticket: "" },
            { ticket: "" }
          ]
        },
        {
          sections: [
            { ticket: "" },
            { ticket: "" },
            { ticket: "" },
            { ticket: "" }
          ]
        },
        {
          sections: [
            { ticket: "" },
            { ticket: "" },
            { ticket: "" },
            { ticket: "" }
          ]
        },
        {
          sections: [
            { ticket: "" },
            { ticket: "" },
            { ticket: "" },
            { ticket: "" }
          ]
        }
      ],
      readyAnswers: [],
      /* Массив активных подсказок */
      activeHints: [
        { activeHint: false },
        { activeHint: false },
        { activeHint: false },
        { activeHint: false },
        { activeHint: false }
      ],
      activeSlide: 1,
      /* Массив активных слайдов для удобного управления секциями */
      activeSlides: [
        { activeSlide: 1 },
        { activeSlide: 1 },
        { activeSlide: 1 },
        { activeSlide: 1 },
        { activeSlide: 1 }
      ]
    };
  },
  computed: {
    ...mapState({
      stateCurrentAnswers: state => state.currentAnswers
    })
  },
  methods: {
    ...mapActions(["setAnswersUser", "setPoints"]),

    /* Подгружаем картинку */
    getImgUrl (image) {
      return require("../assets/images/tickets/" + image);
    },

    slideToRight (index) {
      let activeSession = this.$refs.forSlide;

      /* Делаем слайд вправо */
      if (this.activeSlides[index].activeSlide < 4) {
        this.activeSlides[index].activeSlide = this.activeSlides[index].activeSlide + 1;
        activeSession[index].style.transform = `translateX(${ "-100" * (this.activeSlides[index].activeSlide - 1) + "%" })`;

        /* Закрываем подсказку */
        this.activeHints[index].activeHint = false;
      } else {
        /* Возвращаем 1 слайд */
        this.activeSlides[index].activeSlide = 1;
        activeSession[index].style.transform = `translateX(-0%)`;
      }
    },

    slideToLeft (index) {
      let activeSession = this.$refs.forSlide;
      /* Переменная для вычесления transform */
      let rangeTransform = "-100";

      if (this.activeSlides[index].activeSlide === 1) {
        /* Возвращаем 1 слайд */
        this.activeSlides[index].activeSlide = 1;
        activeSession[index].style.transform = `translateX(-0%)`;
      } else {
        /* Делаем слайд влево */
        this.activeSlides[index].activeSlide = this.activeSlides[index].activeSlide - 1;
        activeSession[index].style.transform = `translateX(${ rangeTransform * (this.activeSlides[index].activeSlide - 2) - "100" + "%" }`;

        /* Закрываем подсказку */
        this.activeHints[index].activeHint = false;
      }
    },

    viewAnswer (item, index, value) {
      let arr = [];
      /* Записываем данные ответов в массив */
      this.answers[item.id - 1].sections[index].ticket = value;
      /* Получаем массив всех ответов */
      for (let i = 0; i < this.answers.length; i++) {
        for (let j = 0; j < this.answers[i].sections.length; j++) {
          arr.push(this.answers[i].sections[j]);
        }
      }
      /* Записываем подготовленный массив в date */
      this.readyAnswers = arr;
    },

    checkingAnswer () {
      /* Сравниваем результаты с правильными ответами */
      let arr = this.readyAnswers.map((el, index) => {
        if (el.ticket !== this.stateCurrentAnswers[index]) {
          el.ticket = "Не верно";
        }
        return el.ticket;
      });
      /* Вычисляем количество баллов */
      let points = arr.filter(item => {
        return item > 0;
      });
      /* Обновляем результаты в state */
      this.setAnswersUser({
        answers: arr
      });
      this.setPoints({
        points: points.length
      });
      /* Переходим на страницу результатов */
      this.$router.push("/test/result");
    }
  }
};
</script>

<style>
.test {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
}

.test__header {
  background-color: #666;
  font-size: calc(14px + 4 * ((100vw - 320px) / (1370 - 320)));
  padding: 0px 10px;
}

.header__row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 75px;
  color: #fff;
  font-family: 'Montserrat R', sans-serif;
}

.header__user {
  cursor: pointer;
}

.control_btn {
  padding-right: 15px;
  cursor: pointer;
}
.control_btn:last-child {
  padding-right: 0px;
}

.test__content {
  flex: 1 0 auto;
}

.content__question {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 35px;
  overflow: hidden;
}
.question {
  padding: 0px 10px;
}

.question__title {
  font-family: 'Montserrat SB', sans-serif;
  font-size: calc(16px + 12 * ((100vw - 320px) / (1370 - 320)));
  text-align: center;
  padding-bottom: 15px;
}

.question__body {
  display: flex;
  width: 100%;
  padding-bottom: 50px;
  transition: .5s;
}

.tickets {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    overflow: hidden;
}

.tickets__image > img {
  min-width: 100%;
  max-width: 100%;
  object-fit: cover;
}

.tickets__title {
  padding: 30px 0px;
  font-family: 'Montserrat SB', sans-serif;
  font-size: calc(18px + 6 * ((100vw - 320px) / (1370 - 320)));
  color: #000;
}

.tickets__answers {
  font-family: "Montserrat R", sans-serif;
  font-size: calc(12px + 6 * ((100vw - 320px) / (1370 - 320)));
  padding-bottom: 30px;
}
.answer {
  padding: 5px 0px;
}

.tickets__answers_variable {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  font-family: 'Montserrat R', sans-serif;
  font-size: calc(12px + 4 * ((100vw - 320px) / (1370 - 320)));
}
.tickets__answers_variable > span {
  padding-right: 10px;
}
.tickets__answers_variable > input {
  width: 230px;
  height: 30px;
  padding-left: 10px;
  border-radius: 3px;
  border: 1px solid #000;
  font-family: "Montserrat L", sans-serif;
  font-size: calc(14px + 4 * ((100vw - 320px) / (1370 - 320)));
  outline: none;
}
@media (max-width: 426px) {
  .tickets__answers_variable > input {
    width: 100px;
    height: 20px;
  }
}

.hint__btn {
  font-family: "Montserrat SB", sans-serif;
  cursor: pointer;
  padding-bottom: 20px;
}
.hint__text {
  font-family: "Montserrat R", sans-serif;
  font-size: calc(14px + 4 * ((100vw - 320px) / (1370 - 320)));
  padding-bottom: 10px;
}

.slider__row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Montserrat R', sans-serif;
  font-size: calc(10px + 8 * ((100vw - 320px) / (1370 - 320)));
  padding-bottom: 10px;
}
.slider__left, .slider__right {
  padding-left: 30px;
  cursor: pointer;
}
.slider__left {
  padding-left: 0px;
}

.result_test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0px
}

.result__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border-radius: 5px;
  font-family: 'Montserrat R', sans-serif;
  background-color: #444;
  color: #fff;
  transition: .3s;
  cursor: pointer;
}
.result__btn:hover {
  transform: scale(1.1);
  transition: .3s;
}

.test__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #191919;
  height: 50px;
}
.footer__title {
  font-family: "Montserrat L", sans-serif;
  font-size: 14px;
  color: #666;
}
</style>

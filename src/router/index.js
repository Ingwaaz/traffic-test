import Vue from "vue";
import Router from "vue-router";
import Welcome from "../components/welcome.vue";
import Test from "../components/test.vue";
import Result from "../components/result.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: "/test/result",
      name: "Test-Result",
      component: Result
    }
  ]
});

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Обнуление стилей */
html, body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
*, *::before, *::after {
  box-sizing: border-box;
}
#app {
  height: 100%;
}

.container {
  max-width: 1170px;
  margin: 0px auto;
}

/* Шрифты */
@font-face {
  font-family: 'Montserrat L';
  src: url('./assets/fonts/Montserrat-Light.ttf');
}
@font-face {
  font-family: 'Montserrat R';
  src: url('./assets/fonts/Montserrat-Regular.ttf');
}
@font-face {
  font-family: 'Montserrat SB';
  src: url('./assets/fonts/Montserrat-SemiBold.ttf');
}
</style>

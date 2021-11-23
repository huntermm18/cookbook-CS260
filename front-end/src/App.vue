<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img class="logo" src="../public/images/Hand-drawn-chef-Clip-art-PNG.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Hunter's Recipes</h1>
    </div>

  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <router-link to="/admin"><h1>Edit Library</h1></router-link>
    <a href="https://github.com/huntermm18/cookbook-CS260">Link to github repository</a>
  </div>
</div>
</template>

<style>

html {
  box-sizing: border-box;
}


body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #68a5ff;
  color: #1C454F;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 40px 100px;
  background: #e3e3e3;
  font-size: 12px;
  text-align: center;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
.logo {
  width: 35%;
}
</style>

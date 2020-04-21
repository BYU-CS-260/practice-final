<template>
<div id="app">
  <div id="brand">
    <h1>Tranquility</h1>
  </div>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/post">Post</router-link>
  </div>
  <div id="content">
    <router-view />
  </div>
</div>
</template>

<style>
body {
  padding: 0px;
  margin: 0px;
  font-family: "Cabin", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.5;
  font-size: 1rem;
}

#brand {
  margin: 30px 100px;
}

#nav {
  padding: 0px 100px 20px 100px;
  border-bottom: 1px solid #eee;
  display: flex;
  font-family: monospace;
  text-transform: uppercase;
}

#nav a {
  margin-right: 50px;
  text-decoration: none;
  color: #000;
}

#content {
  padding: 30px 100px;
}
</style>

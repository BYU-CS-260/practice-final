<template>
<div id="app">
  <div id="brand">
    <router-link to="/">
      <h1>Organizer</h1>
    </router-link>
    <p>Simplify your life</p>
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
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.5;
  letter-spacing: 0.1em;
  font-size: 1rem;
}

#brand {
  background-color: #2c5b90;
  color: white;
  padding: 10px 100px;
}

#brand h1 {
  margin: 0px;
  font-size: 16px;
}

#brand p {
  margin: 0px;
  font-style: italic;
  font-size: 12px;
}

#content {
  padding: 30px 100px;
}

.pure-button-primary {
  background-color: #2c5b90;
}

h1 {
  font-size: 16px;
}

#brand a {
  color: inherit;
  text-decoration: none;
}
</style>

<template>
<div class="home">
  <h1>Add a Project</h1>
  <form class="pure-form" @submit.prevent="addProject">
    <input placeholder="Project" v-model="project" />
    <Compact v-model="colors" />
    <button class="pure-button pure-button-primary">Submit</button>
  </form>
  <p v-if="error">{{error}}</p>
  <div class="projects">
    <h1>Projects</h1>
    <div class="projects-wrapper">
      <div v-for="project in projects" :key="project._id">
        <router-link :to="'/project/' + project._id">
          <button class="pure-button" :style="{ 'background-color': project.color, 'color': project.textColor}">{{project.text}}</button>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  Compact
} from 'vue-color';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Compact
  },
  data() {
    return {
      projects: [],
      project: '',
      error: '',
      colors: {
        hex: '#9F0500FF',
        rgba: {
          a: 1,
          b: 0,
          g: 5,
          r: 159
        }
      },
    }
  },
  computed: {
    color() {
      if (this.colors.hex)
        return this.colors.hex;
      else
        return "#00ff00";
    },
    textColor() {
      const red = this.colors.rgba.r;
      const green = this.colors.rgba.g;
      const blue = this.colors.rgba.b;
      if ((red * 0.299 + green * 0.587 + blue * 0.114) > 150)
        return "#000000";
      else
        return "#ffffff"
    }
  },
  created() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      try {
        let response = await axios.get('/api/project');
        this.projects = response.data.projects;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async addProject() {
      try {
        await axios.post('/api/project', {
          text: this.project,
          color: this.color,
          textColor: this.textColor
        });
        this.project = '';
        this.getProjects();
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
.projects {
  margin-top: 50px;
}

.projects-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.projects button {
  min-width: 150px;
  min-height: 100px;
  margin-right: 30px;
}
</style>

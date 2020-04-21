<template>
<div class="home">
  <div class="nav">
    <div class="projects">
      <div class="projects-wrapper">
        <div class="projectMenu" v-for="project in projectMenu" :key="project._id">
          <div :class="{selector:true, hide: !project.active}">
            <i class="fas fa-arrow-right" :key="project._id"></i>
          </div>
          <div class="link">
            <router-link :to="'/project/' + project._id">
              <button class="pure-button" :style="{ 'background-color': project.color, 'color': project.textColor}">{{project.text}}</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="itemsArea">
    <p class="error" v-if="error">{{error}}</p>
    <h1>Add an Item</h1>
    <form class="pure-form" @submit.prevent="addItem">
      <input placeholder="Item" v-model="text" />
      <input placeholder="URL" v-model="url" />
      <input type="file" @input="fileChanged">
      <p>
        <img v-if="imgURL" :src="imgURL" />
      </p>
      <button class="pure-button pure-button-primary">Submit</button>
    </form>
    <div class="items">
      <div class="item" v-for="item in items" :key="item._id">
        <img v-if="item.photo" :src="item.photo">
        <p v-if="item.text">{{item.text}}</p>
        <p v-if="item.url"><a href="item.url">{{item.url}}</a></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      projects: [],
      project: {},
      items: [],
      error: '',
      text: '',
      url: '',
      imgURL: '',
    }
  },
  computed: {
    projectMenu() {
      return this.projects.map(p => {
        let newP = Object.assign({}, p);
        this.$set(newP, 'active', newP.text === this.project.text);
        return newP;
      });
    }
  },
  created() {
    this.getProjects();
    this.startup();
  },
  watch: {
    '$route.params.id': function() {
      console.log("changed");
      this.getProject();
      this.startup();
    }
  },
  methods: {
    active(project) {
      return project.text === this.project.text;
    },
    startup() {
      this.getProject();
      this.getItems();
    },
    async getProjects() {
      try {
        let response = await axios.get('/api/project');
        this.projects = response.data.projects;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getProject() {
      try {
        let response = await axios.get('/api/project/' + this.$route.params.id);
        this.project = response.data.project;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getItems() {
      try {
        let response = await axios.get('/api/project/' + this.$route.params.id + "/item");
        this.items = response.data.items;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0];
      this.imgURL = URL.createObjectURL(this.file);
    },
    async addItem() {
      try {
        let form = new FormData();
        form.append('photo', this.file);
        form.append('text', this.text);
        form.append('url', this.url);
        await axios.post('/api/project/' + this.project._id + "/item", form);
        this.text = '';
        this.url = '';
        this.file = '';
        this.imgURL = '';
        this.getItems();
      } catch (error) {
        this.error = error.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  margin-top: 50px;

}

.nav {
  margin-right: 50px;
}

.projects-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.projectMenu {
  display: flex;
}

.selector {
  width: 20px;
  min-height: 30px;
  padding-top: 7px;
}

input {
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
}

button {
  min-width: 100px;
  min-height: 30px;
  margin-bottom: 10px;
}

.hide {
  visibility: hidden;
}

img {
  width: 200px;
}

.item {
  background-color: #eee;
  padding: 20px;
  margin: 20px 0px;
}

.error {
  margin: 0px;
  background-color: #C32D13;
  padding: 10px 30px;
  color: #fff;
  border-radius: 30px;
  font-size: 12px;
}
</style>

<template>
<div class="admin">
    <h1>Add or Edit The Recipe Library</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a Recipe</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title"><br><br>
        <input v-model="imageLink" placeholder="image url"><br>
        <p></p>
        <textarea v-model="recipeBody" rows = "12" cols = "70" name = "recipeBody">
            Enter recipe here...
         </textarea><br>
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>Uploaded: {{addItem.title}}</h2>
        <img :src="addItem.imageLink" />
      </div>
    </div>


<div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title"><br><br>
        <input v-model="findItem.imageLink"><br>
        <p> {{findItem.recipeBody}}  </p>
        <img :src="findItem.imageLink"/><br>
        <i>enter updated recipe</i><br>
        <textarea v-model="findItem.recipeBody" rows = "9" cols = "50" name = "recipeBody">
            
         </textarea><br>
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Update Recipe</button>
      </div>

    </div>


</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      recipeBody: "",
      imageLink: "",
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,

    }
  },

  created() {
    this.getItems();
  },

  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },


  methods: {
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },

    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          imageLink: this.findItem.imageLink,
          //description: this.findItem.description,
          recipeBody: this.findItem.recipeBody,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },


    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },


    fileChanged(event) {
      this.file = event.target.files[0]
    },

    async upload() {
      try {
        //const formData = new FormData();
        //formData.append('photo', this.file, this.file.name)
        //let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          //path: r1.data.path,
          //description: this.description,
          recipeBody: this.recipeBody,
          imageLink: this.imageLink,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>




<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

* {
  white-space: pre-wrap; /* keep newlines on recipe input */
}
button {
  margin: 7px;
}
</style>

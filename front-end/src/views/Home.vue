<template>

<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <h1>{{item.title}}</h1>
      <img :src="item.imageLink" />
      <p>{{item.recipeBody}}</p><br>
    </div>
  </section>
</div>


</template>


<script>
// @ is an alias to /src

import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },

  created() {
    this.getItems();
  },

  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }


}
</script>


<style scoped>
  * {
  white-space: pre-wrap; /* keep newlines on recipe input */
}

.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
  text-align: center;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 40%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    /*column-count: 4; */
    column-count: 2;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    /*column-count: 3; */
    column-count: 1;
  }
  .image img {
    width: 25%;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    /*column-count: 2;*/
    column-count: 1;
  }
  .image img {
    width: 25%;
  }
}
</style>


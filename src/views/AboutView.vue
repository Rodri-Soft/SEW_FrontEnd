<template>
  <div class="about">

    <h1>This is an about page</h1>
    <router-link v-if="isAuthenticated" to="/login">Go to home</router-link> |
    <!-- <h3 v-if="token">{{token}}</h3> -->
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'About',
    components: {},
    setup() {          
      return {
      };
    },
    mounted() {
      
    },
    methods: {

    },  
    computed: {
      ...mapGetters(['isAuthenticated'])
    } 
  };
</script>
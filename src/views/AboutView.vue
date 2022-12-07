<template>
  <div class="about">

    <h1>This is an about page</h1>
    <h2>{{testTile}}</h2>
    <!-- <router-link v-if="isAuthenticated" to="/login">Go to home</router-link> | -->
  </div>
</template>

<script>

  export default {
    name: 'About',     
    data() {
      return {
        testTile: this.$store.getters.test.title,
      }
    }, 
    created() {      
    },  
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
      // ...mapGetters(['isAuthenticated'])
    } 
  };
</script>
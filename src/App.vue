<template>
  <v-app>
    <v-content>
      
      <calendar/>
    </v-content>
  </v-app>
</template>

<script>
import calendar from './components/calendar';


export default {
  name: 'App',

  components: {
    calendar,
   
  },

  data: () => ({
    //
  }),
};
</script>

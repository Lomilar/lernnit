<template>
    <div class="page">
        <person
         v-for="item in people"
         v-bind:key="item.id"
         :uri="item.id"/>
    </div>
</template>

<script>
import person from "@/controls/game/person.vue";
export default {
    name: "People",
    props: {},
    computed: {
        people: function() { return this.$store.state.gamePersons; }
    },
    components: {person}
};
</script>
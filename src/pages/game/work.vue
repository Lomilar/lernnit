<template>
    <div class="page">
        <profile v-if="me" :pk="me"></profile>
        <timeline/>
    </div>
</template>

<script>
import tasks from "@/controls/game/tasks.vue";
import taskInventory from "@/controls/game/taskInventory.vue";
export default {
    name: "TimelinePage",
    props: {},
    computed: {
        me: function() {
            return this.$store.state.me;
        }
    },
    components: {}
};
</script>
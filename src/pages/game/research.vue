<template>
    <div class="page">
        <researchArea uri="https://dev.cassproject.org/api/data/schema.cassproject.org.0.4.Framework/e29981e1-e36f-4343-88ef-ea85592c3f8f"/>
    </div>
</template>

<script>
import researchArea from "@/controls/game/researchArea.vue";
export default {
    name: "Research",
    props: {},
    computed: {
        me: function() {
            return this.$store.state.me;
        }
    },
    components: {researchArea}
};
</script>
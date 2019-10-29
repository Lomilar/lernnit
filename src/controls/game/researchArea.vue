<template>
    <div class="framework" v-observe-visibility="{callback: initialize}">
    <div class="frameworkNameAndDescription">{{ name }}<small v-if="description" class="block">{{ description }}</small></div>
    <ul v-if="competencies">
        <competency
         v-for="item in competencies"
         v-bind:key="item.id"
         :uri="item.id"
         :hasChild="item.hasChild"
         :subjectPerson="subjectperson"
         :frameworkUri="uri"
         :computedState="computedState"
         :subject="subject"/>
    </ul>
    <div v-else><br>Loading Framework...</div></div>
</template>
<style scoped>

.framework{
    margin-top:1rem;
}

.frameworkTitle {
}

.frameworkNameAndDescription {
    font-size: large;
    padding-bottom: .5rem;
}

.frameworkSelect {
    margin-top: .25rem;
    padding: .5rem;
    min-height: 30px;
}

.frameworkSelectName {
    margin-left: 0rem;
}

.frameworkSelectDescription {
    display: block;
    margin-top: .25rem;
    margin-left: 0rem;
}

</style>
<script>
import competency from "@/controls/game/competency.vue";
export default {
    props: ['uri', 'subject', 'subjectperson', 'competencyUri'],
    components: {competency},
    data: function() {
        return {
            competency: null,
            computedStateActual: null,
            computedStateAssertionLength: -1,
            visible: false,
            once: false,
            calculate: false
        };
    },
    computed: {
        queryParams: function() {
            return queryParams == null ? {} : queryParams;
        },
        showButtons: function() {
            return this.queryParams.hideFrameworkButtons == null;
        },
        competencies: {
            get: function() {
                var me = this;
                if (!this.once) return null;
                if (this.uri == null) return null;
                if (this.competency != null) { return this.competency; }
                EcFramework.get(this.uri, function(f) {
                    var precache = [];
                    if (f.competency != null) precache = precache.concat(f.competency);
                    if (f.relation != null) precache = precache.concat(f.relation);
                    repo.multiget(precache, function(success) {
                        var r = {};
                        var top = {};
                        if (f == null) { return r; }
                        if (f.competency !== null) {
                            for (var i = 0; i < f.competency.length; i++) {
                                var c = EcCompetency.getBlocking(f.competency[i]);
                                if (c !== null) { r[f.competency[i]] = r[c.shortId()] = top[c.shortId()] = c; }
                            }
                        }
                        if (f.relation != null) {
                            for (var i = 0; i < f.relation.length; i++) {
                                var a = null;
                                a = EcAlignment.getBlocking(f.relation[i]);
                                if (a != null) {
                                    if (a.relationType === Relation.NARROWS) {
                                        if (r[a.target] == null) continue;
                                        if (r[a.source] == null) continue;
                                        if (r[a.target].hasChild == null) { r[a.target].hasChild = []; }
                                        r[a.target].hasChild.push(r[a.source]);
                                        delete top[a.source];
                                    }
                                }
                            }
                        }
                        if (f.competency != null) {
                            for (var i = 0; i < f.competency.length; i++) {
                                if (r[f.competency[i]].hasChild == null) continue;
                                r[f.competency[i]].hasChild.sort(function(a, b) {
                                    return f.competency.indexOf(a.shortId()) - f.competency.indexOf(b.shortId());
                                });
                            }
                        }
                        me.competency = [];
                        var keys = EcObject.keys(top);
                        if (me.competencyUri != null) { me.competency.push(r[me.competencyUri]); } else {
                            for (var i = 0; i < keys.length; i++) { me.competency.push(top[keys[i]]); }
                        }
                        me.competency.sort(function(a, b) {
                            return f.competency.indexOf(a.shortId()) - f.competency.indexOf(b.shortId());
                        });
                    }, console.error, console.log);
                }, console.error);
                return this.competency;
            },
            set: function(v) {
                this.competency = v;
            }
        },
        name: function() {
            if (this.uri == null) { return "N/A"; }
            return EcFramework.getBlocking(this.uri).getName();
        },
        description: function() {
            if (this.uri == null) { return null; }
            return EcFramework.getBlocking(this.uri).getDescription();
        }
    },
    watch: {
        uri: function(newUri, oldUri) {
            this.competency = null;
            this.computedStateAssertionLength = -1;
            this.once = false;
        },
        subject: function(newSubject, oldSubject) {
            this.computedStateAssertionLength = -1;
        }
    },
    methods: {
        initialize: function(isVisible, entry) {
            this.visible = isVisible;
            if (isVisible && this.once !== true) {
                this.once = true;
            }
        }
    }
};
</script>
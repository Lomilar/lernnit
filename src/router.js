import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'timeline',
            component: () => import(/* webpackChunkName: "timelinePage" */ './pages/0Timeline.vue')
        },
        {
            path: '/people',
            name: 'people',
            component: () => import(/* webpackChunkName: "frameworksPage" */ './pages/game/people.vue')
        },
        {
            path: '/research',
            name: 'research',
            component: () => import(/* webpackChunkName: "frameworkPage" */ './pages/game/research.vue')
        },
        {
            path: '/work',
            name: 'work',
            component: () => import(/* webpackChunkName: "resourcesPage" */ './pages/game/work.vue')
        },
        {
            path: '/goals',
            name: 'goals',
            component: () => import(/* webpackChunkName: "goalsPage" */ './pages/4GoalsPage.vue')
        },
        {
            path: '/profiles',
            name: 'profiles',
            component: () => import(/* webpackChunkName: "profilesPage" */ './pages/5ProfilesPage.vue')
        },
        {
            path: '/people',
            name: 'people',
            component: () => import(/* webpackChunkName: "peoplePage" */ './pages/6PeoplePage.vue')
        },
        {
            path: '/jobPostings',
            name: 'jobPostings',
            component: () => import(/* webpackChunkName: "jobPostingsPage" */ './pages/7JobPostingsPage.vue')
        },
        {
            path: '/jobPosting',
            name: 'jobPosting',
            component: () => import(/* webpackChunkName: "jobPostingPage" */ './pages/8JobPostingPage.vue')
        }
    ]
});

<template>
    <div>
        <PageLoader />

        <Snackbar />
    </div>
</template>

<script>
// Single file component imports
import PageLoader from '../components/page_loading_screen/PageLoader'
import Snackbar from '../components/snackbar/Snackbar'
//-------------------------------------

// Imported mixins
import index_page_mounted from '../mixins/mounted/index_page_mounted'
//-------------------------------------

export default {
    name: 'index', // Route name

    // Registered components
    components: {
      PageLoader,

      Snackbar
    },
    //-------------------------

    // Registered mixins
    mixins: [
        index_page_mounted
    ],
    //------------------------

    // Meta data information for the route
    head: {
        titleTemplate: '',

        title: 'Apex-Learning',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'keywords', content: 'Index apex learning, Home page, Apex Learning' },
            { hid: 'description', name: 'description', content: 'Welcome to apex learning' },
            { name: 'format-detection', content: 'telephone=no' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    //-----------------------------------

    // All code in the mounted life cycle hook are executed
    // Any time the page is visited.
    mounted(){
        this.$nextTick(() => {
            this.index_page_mounted(); // Index page mounted mixin method
        });
    }
    //----------------------------------------------------------
}
</script>
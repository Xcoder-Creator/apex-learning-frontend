<template>
    <v-col md="9" id="container-sect">
        <div id="announcement-box" @click="display_box()" v-ripple v-if="view_box === false">
            <v-list-item two-line style="padding-bottom: 0px; padding-top: 0px;">
                <v-list-item-avatar size="34">
                    <img style="object-fit: cover;" :src="`${$config.apiUrl}${profile_img}`">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-subtitle id="data-placeholder">Share something with your class...</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </div>

        <CreatePostBox v-else-if="view_box === true" />

        <StreamPosts />
    </v-col>
</template>

<script>
// Single file component imports
import StreamPosts from '../../components/stream_page_comp/StreamPosts'
import CreatePostBox from '../../components/stream_page_comp/CreatePostBox'
//--------------------------------------

export default {
    name: 'AnnouncementBox', // Component name

    // Registered components
    components: {
        StreamPosts,

        CreatePostBox
    },
    //------------------------------

    // Computed property
    computed: {
        // Users profile image from vuex
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //----------------------------------

        // View box property from vuex
        view_box: {
            get(){
                return this.$store.state.text_editor_control.view_box;
            },

            set(value){
                this.$store.commit('text_editor_control/update_view_box', { value: value });
            }
        }
        //----------------------------------
    },
    //-------------------------------------------------

    // Methods property
    methods: {
        // Display the create post box text editor
        display_box(){
            this.view_box = true;
        }
        //-------------------------------
    }
    //-------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
<template>
    <div>
        <v-list-item two-line style="padding-bottom: 0px; padding-top: 9px; padding-left: 0px; text-align: left;">
            <v-list-item-avatar size="34">
                <img style="object-fit: cover;" :src="(post_data.post_creators_id === user_id) ? `${$config.apiUrl}${profile_img}` : `${$config.apiUrl}${post_data.user_image}`">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title id="plain-comp-title">{{ (post_data.post_creators_id === user_id) ? user_name : post_data.user_name }}</v-list-item-title>
                <v-list-item-subtitle id="plain-comp-sub">{{ post_data.date }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider style="border-color: rgb(0 0 0 / 51%);"></v-divider>
        <div v-html="post_data.post_data" id="post_data_content"></div>
    </div>
</template>

<script>
export default {
    name: 'PlainPostComp', // Component name

    // Computed property
    computed: {
        // Post data property from vuex
        post_data: function(){
            return this.$store.state.dialog.view_post_dialog.post_data;
        },
        //--------------------------------------

        // User id property from vuex
        user_id: function(){
            return this.$store.state.user_details.user_details.details.user_id;
        },
        //----------------------------------

        // User name property from vuex
        user_name: function(){
            return this.$store.state.user_details.user_details.details.user_name;
        },
        //----------------------------------

        // Users profile image from vuex
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //----------------------------------
    }
    //------------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
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

        <div v-if="post_data.post_type === 'post_with_attachment'" id="file_attachment">
            <p id="att-txt">Attachments</p>

            <div id="all-attachments">
                <v-list-item
                    v-for="item in post_data.att_files"
                    :key="item.id"
                    link
                    @click="view_file_data(post_data.post_creators_id, post_data.user_name, item.file_name, item.file_type, item.file_size, item.file_url, item.post_creation_date, item.post_creation_time)"
                >
                    <v-list-item-icon id="marg_fix">
                        <v-icon color="orange darken-2" id="file_att_icon" v-text="(item.file_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') ? 'mdi-file-powerpoint-box-outline' : (item.file_type === 'image/jpeg' || item.file_type === 'image/gif' || item.file_type === 'image/png' || item.file_type === 'image/svg+xml') ? 'mdi-file-image-outline' : (item.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ? 'mdi-file-word-outline' : (item.file_type === 'application/pdf') ? 'mdi-file-pdf-box' : (item.file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? 'mdi-file-excel-box-outline' : (item.file_type === 'audio/mp4' || item.file_type === 'audio/mpeg' || item.file_type === 'audio/wave' || item.file_type === 'audio/wav') ? 'mdi-volume-high' : (item.file_type === 'video/mp4' || item.file_type === 'video/webm') ? 'mdi-movie-outline' : (item.file_type === 'application/x-zip-compressed') ? 'mdi-folder-zip-outline' : (item.file_type === 'application/zip') ? 'mdi-folder-zip-outline' : (item.file_type === 'text/html' || item.file_type === 'text/css' || item.file_type === 'text/javascript') ? 'mdi-file-document-outline' : ''"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title id="file_att_name" v-text="item.file_name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostWithAttachmentComp', // Component name

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
    },
    //------------------------------

    // Methods property
    methods: {
        // View a particular file
        view_file_data(post_creators_id, user_name, file_name, file_type, file_size, file_url, post_creation_date, post_creation_time){
            this.$store.commit('dialog/view_file_dialog/update_data', {
                value: false,
                post_creators_id: post_creators_id,
                user_name: user_name,
                file_name: file_name,
                file_type: file_type,
                file_size: file_size,
                file_url: file_url,
                post_creation_date: post_creation_date,
                post_creation_time: post_creation_time
            });

            setTimeout(() => {
                this.$store.commit('dialog/view_file_dialog/update_value', { value: true });
            }, 50);
        }
        //-----------------------------------------------
    }
    //-------------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
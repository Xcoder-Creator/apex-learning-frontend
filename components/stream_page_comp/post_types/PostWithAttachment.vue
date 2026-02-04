<template>
    <div class="post_contents">
        <div id="top-head-comp">
            <div id="profile-head-data">
                <v-list-item two-line style="padding-bottom: 0px; padding-top: 9px; text-align: left;">
                    <v-list-item-avatar size="34">
                        <img style="object-fit: cover;" :src="(item.post_creators_id === user_id) ? `${$config.apiUrl}${profile_img}` : `${$config.apiUrl}${item.user_image}`">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title id="plain-comp-title">{{ (item.post_creators_id === user_id) ? user_name : item.user_name }}</v-list-item-title>
                        <v-list-item-subtitle id="plain-comp-sub">{{ item.date }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <div id="options-btn">
                    <v-menu
                        left
                        bottom
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item link @click="view_post(item.user_name, item.post_creators_id, item.post_comments, item.new_material_files, item.assignment_status, item.score_value, item.added_att, item.post_point, item.title, item.post_due_date, item.user_image, item.date, item.post_data, item.att_files, item.post_type)">
                                <v-list-item-title id="refresh_btn">View post</v-list-item-title>
                            </v-list-item>

                            <v-list-item v-if="$route.name === 'student-stream' && item.post_creators_id === user_id" @click="delete_post(item.id)" link>
                                <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>

                            <v-list-item v-if="$route.name === 'teacher-stream'" @click="delete_post(item.id)" link>
                                <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>

                            <v-list-item v-if="item.post_creators_id !== user_id && $route.name === 'teacher-stream'" @click="open_report_dialog(item.id)" link>
                                <v-list-item-title>Report abuse</v-list-item-title>
                            </v-list-item>

                            <v-list-item v-if="item.post_creators_id !== user_id && $route.name === 'student-stream'" @click="open_report_dialog(item.id)" link>
                                <v-list-item-title>Report abuse</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </div>

        <div id="body-comp">
            <div v-html="item.post_data" id="data-content"></div>

            <div v-if="item.post_type === 'post_with_attachment'" id="file_attachment">
                <p id="att-txt">Attachments</p>

                <div id="all-attachments">
                    <v-list-item
                        v-for="item_val in item.att_files"
                        :key="item_val.id"
                        link
                        @click="view_file_data(item.post_creators_id, item.user_name, item_val.file_name, item_val.file_type, item_val.file_size, item_val.file_url, item_val.post_creation_date, item_val.post_creation_time)"
                    >
                        <v-list-item-icon id="marg_fix">
                            <v-icon color="orange darken-2" id="file_att_icon" v-text="(item_val.file_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') ? 'mdi-file-powerpoint-box-outline' : (item_val.file_type === 'image/jpeg' || item_val.file_type === 'image/gif' || item_val.file_type === 'image/png' || item_val.file_type === 'image/svg+xml') ? 'mdi-file-image-outline' : (item_val.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ? 'mdi-file-word-outline' : (item_val.file_type === 'application/pdf') ? 'mdi-file-pdf-box' : (item_val.file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? 'mdi-file-excel-box-outline' : (item_val.file_type === 'audio/mp4' || item_val.file_type === 'audio/mpeg' || item_val.file_type === 'audio/wave' || item_val.file_type === 'audio/wav') ? 'mdi-volume-high' : (item_val.file_type === 'video/mp4' || item_val.file_type === 'video/webm') ? 'mdi-movie-outline' : (item_val.file_type === 'application/x-zip-compressed') ? 'mdi-folder-zip-outline' : (item_val.file_type === 'application/zip') ? 'mdi-folder-zip-outline' : (item_val.file_type === 'text/html' || item_val.file_type === 'text/css' || item_val.file_type === 'text/javascript') ? 'mdi-file-document-outline' : (item_val.file_type === 'application/vnd.ms-powerpoint') ? 'mdi-file-powerpoint-box-outline' : ''"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title id="file_att_name" v-text="item_val.file_name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </div>
        </div>

        <div id="footer-comp" @click="open_comment_dialog(item)" v-if="item.post_comments.length === 0" v-ripple>
            Add class comment
            <v-icon id="comment-ico">
                mdi-comment-multiple-outline
            </v-icon>
        </div>

        <div id="footer-comp" @click="open_comment_dialog(item)" v-else-if="item.post_comments.length > 0" v-ripple>
            {{ item.post_comments.length }} class comment{{ (item.post_comments.length === 1) ? '' : (item.post_comments.length > 1) ? 's' : '' }}
            <v-icon id="comment-ico">
                mdi-comment-multiple-outline
            </v-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostWithAttachment', // Component name

    props: ['item'], // Registered props

    // Computed property
    computed: {
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
    //-------------------------------

    // Methods property
    methods: {
        // Delete a particular post from a class
        delete_post(post_id){
            this.$store.commit('dialog/delete_post_dialog/update_post_id', { value: post_id });
            this.$store.commit('dialog/delete_post_dialog/update_dialog', { value: true });
        },
        //-----------------------------------------------

        // Open the comment dialog
        open_comment_dialog(item){
            this.$store.commit('dialog/comment_dialog/update_comment_data', { post_data: item, class_code: this.$route.query.class_code });
            this.$store.commit('dialog/comment_dialog/update_dialog', { value: true });
        },
        //-----------------------------------------------

        // Open report dialog
        open_report_dialog(post_id){
            let class_code = this.$route.query.class_code;
            this.$store.commit('dialog/report_dialog/update_class_code', { class_code: class_code });
            this.$store.commit('dialog/report_dialog/update_post_id', { post_id: post_id });
            this.$store.commit('dialog/report_dialog/update_dialog', { value: true });
        },
        //------------------------------------------

        // View a particular post for a class
        view_post(user_name, post_creators_id, post_comments, new_material_files, assignment_status, score_value, added_att, post_point, title, post_due_date, user_image, date, post_data, att_files, post_type){
            this.$store.commit('dialog/view_post_dialog/update_post_data', {
                user_name: user_name,
                post_creators_id: post_creators_id,
                post_comments: post_comments,
                new_material_files: new_material_files,
                assignment_status: assignment_status,
                score_value: score_value,
                added_att: added_att,
                post_point: post_point,
                title: title,
                post_due_date: post_due_date,
                user_image: user_image,
                date: date,
                post_data: post_data,
                att_files: att_files,
                post_type: post_type
            });

            setTimeout(() => {
                this.$store.commit('dialog/view_post_dialog/update_dialog', { value: true });
            }, 33);
        },
        //-----------------------------------------------

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
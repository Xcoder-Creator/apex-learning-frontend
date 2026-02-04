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
    name: 'PlainPost', // Component name

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
        }
        //-----------------------------------------------
    }
    //-------------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
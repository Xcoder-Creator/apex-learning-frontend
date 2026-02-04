<template>
    <div class="post_contents">
        <div id="top-head-comp">
            <div id="profile-head-data">
                <v-list-item v-if="item.post_type === 'quiz_post'" two-line style="padding-bottom: 5px; padding-top: 5px; text-align: left;">
                    <v-avatar size="34" id="mr" color="#2393ff">
                        <v-icon id="mr_edit_ico" dark>
                            mdi-format-list-bulleted
                        </v-icon>
                    </v-avatar>

                    <v-list-item-content>
                        <v-list-item-title id="plain-comp-title">New quiz: {{ item.title }}</v-list-item-title>
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
                            <v-list-item link @click="view_post(item.user_name, item.post_comments, item.new_material_files, item.assignment_status, item.score_value, item.added_att, item.post_point, item.title, item.post_due_date, item.user_image, item.date, item.post_data, item.att_files, item.post_type)">
                                <v-list-item-title id="refresh_btn">View post</v-list-item-title>
                            </v-list-item>

                            <v-list-item v-if="item.post_creators_id === user_id" @click="delete_post(item.id)" link>
                                <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>

                            <v-list-item link>
                                <v-list-item-title>Report abuse</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </div>

        <div id="footer-comp" v-if="item.post_comments.length === 0" v-ripple>
            Add class comment
            <v-icon id="comment-ico">
                mdi-comment-multiple-outline
            </v-icon>
        </div>

        <div id="footer-comp" v-else-if="item.post_comments.length > 0" v-ripple>
            {{ item.post_comments.length }} class comment{{ (item.post_comments.length === 1) ? '' : (item.post_comments.length > 1) ? 's' : '' }}
            <v-icon id="comment-ico">
                mdi-comment-multiple-outline
            </v-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuizPost', // Component name

    props: ['item'], // Registered props

    // Computed property
    computed: {
        // User id property from vuex
        user_id: function(){
            return this.$store.state.user_details.user_details.details.user_id;
        }
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

        // View a particular post for a class
        view_post(user_name, post_comments, new_material_files, assignment_status, score_value, added_att, post_point, title, post_due_date, user_image, date, post_data, att_files, post_type){

        }
        //-----------------------------------------------
    }
    //-------------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
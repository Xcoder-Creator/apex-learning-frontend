<template>
    <div>
        <div id="assignment_content_block">
            <p id="due_date_txt">Due {{ post_data.post_due_date }}</p>

            <p id="post_title">{{ post_data.title }}</p>

            <p id="post_points">{{ post_data.post_point }} points</p>

            <div id="assignment_comment_pad">
                <div id="comment_icon">
                    <v-icon id="comm-ico">
                        mdi-comment-multiple-outline
                    </v-icon>
                </div>

                <div id="post-comment-data-txt">
                    {{ post_data.post_comments.length }} class comment{{ (post_data.post_comments.length === 1) ? '' : (post_data.post_comments.length > 1) ? 's' : '' }}
                </div>
            </div>

            <v-divider style="border-color: rgb(0 0 0 / 51%);"></v-divider>

            <div v-html="post_data.post_data" id="post_data_content" style="margin-bottom: 28px;"></div>

            <div v-if="post_data.post_type === 'assignment_post_with_attachment'" id="file_attachment">
                <p id="att-txt">Attachments</p>
                <div id="all-attachments">
                    <v-list-item
                        v-for="item in post_data.att_files"
                        :key="item.id"
                        link
                    >
                        <v-list-item-icon id="marg_fix">
                            <v-icon color="orange darken-2" id="file_att_icon" v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title id="file_att_name" v-text="item.file_name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AssignmentPostWithAttachmentComp', // Component name

    // Computed property
    computed: {
        // Post data property from vuex
        post_data: function(){
            return this.$store.state.dialog.view_post_dialog.post_data;
        }
        //--------------------------------------
    },
    //------------------------------

    // Methods property
    methods: {

    }
    //-------------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
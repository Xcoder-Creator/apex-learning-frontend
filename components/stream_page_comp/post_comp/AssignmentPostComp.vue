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

            <div v-html="post_data.post_data" id="post_data_content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AssignmentPostComp', // Component name

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
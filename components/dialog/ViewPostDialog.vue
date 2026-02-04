<template>
    <v-row justify="center">
        <v-dialog
            v-model="view_post_dialog"
            scrollable
            :fullscreen="(window_width <= 415) ? true : false"
            max-width="500px"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    View post

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
                            <v-list-item @click="send_feedback()" link>
                                <v-list-item-title>Send feedback</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text style="height: 320px;">
                    <div v-if="post_type === 'plain_post'" id="view_post_head">
                        <PlainPostComp />
                    </div>

                    <div v-else-if="post_type === 'post_with_attachment'" id="view_post_head">
                        <PostWithAttachmentComp />
                    </div>

                    <div v-else-if="post_type === 'assignment_post'" id="view_post_head">
                        <AssignmentPostComp />
                    </div>

                    <div v-else-if="post_type === 'assignment_post_with_attachment'" id="view_post_head">
                        <AssignmentPostWithAttachmentComp />
                    </div>

                    <div v-else-if="post_type === 'new_material_post'" id="view_post_head">
                        <NewMaterialPostComp />
                    </div>

                    <div v-else-if="post_type === 'quiz_post'" id="view_post_head">
                        <QuizPostComp />
                    </div>
                </v-card-text>

                <div id="open_assignment" v-if="post_type === 'assignment_post_with_attachment' || post_type === 'assignment_post'">
                    <div id="ripple-slide-up" v-ripple>
                        <div id="plus-pad">
                            <v-icon id="plus_ico">
                                mdi-arrow-up-bold-box
                            </v-icon>
                        </div>

                        <div id="string_txt">
                            Open Assignment
                        </div>
                    </div>
                </div>

                <div id="open_assignment" v-if="post_type === 'quiz_post'">
                    <div id="ripple-slide-up" v-ripple>
                        <div id="plus-pad">
                            <v-icon id="plus_ico">
                                mdi-arrow-up-bold-box
                            </v-icon>
                        </div>

                        <div id="string_txt">
                            Open Quiz
                        </div>
                    </div>
                </div>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn
                        color="primary"
                        text
                        @click="close_dialog()"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported components
import AssignmentPostComp from '../../components/stream_page_comp/post_comp/AssignmentPostComp'
import AssignmentPostWithAttachmentComp from '../../components/stream_page_comp/post_comp/AssignmentPostWithAttachmentComp'
import NewMaterialPostComp from '../../components/stream_page_comp/post_comp/NewMaterialPostComp'
import PlainPostComp from '../../components/stream_page_comp/post_comp/PlainPostComp'
import PostWithAttachmentComp from '../../components/stream_page_comp/post_comp/PostWithAttachmentComp'
import QuizPostComp from '../../components/stream_page_comp/post_comp/QuizPostComp'
//--------------------------------------

export default {
    name: 'ViewPostDialog', // Component name

    // Registered components
    components: {
        AssignmentPostComp,

        AssignmentPostWithAttachmentComp,

        NewMaterialPostComp,

        PlainPostComp,

        PostWithAttachmentComp,

        QuizPostComp
    },
    //------------------------------

    // Data property
    data(){
        return {
            window_width: '' // Window width property
        }
    },
    //------------------------------

    // Computed property
    computed: {
        // Post type property from vuex
        post_type: function(){
            return this.$store.state.dialog.view_post_dialog.post_data.post_type;
        },
        //-------------------------------------------

        // View post dialog property from vuex
        view_post_dialog: {
            get(){
                if (this.$store.state.dialog.view_post_dialog.value === true){
                    // Listen to changes in window screen width
                    window.onresize = () => {
                        this.window_width = window.innerWidth;
                    }
                    //------------------------------------
                }

                return this.$store.state.dialog.view_post_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/view_post_dialog/update_dialog', { value: value });
            }
        }
        //-------------------------------------------
    },
    //------------------------------

    // Methods property
    methods: {
        // Close view post dialog
        close_dialog(){
            this.view_post_dialog = false;
        },
        //-------------------------------

        // Send feedback
        send_feedback(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        }
        //-------------------------------
    },
    //------------------------------

    // Created lifecycle hook
    created(){
        this.window_width = window.innerWidth; // Current window screen width
    }
    //-----------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
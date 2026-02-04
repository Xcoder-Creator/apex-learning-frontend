<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            scrollable
            v-resize="onResize"
            :fullscreen="(window_width <= 415) ? true : false"
            max-width="500px"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    Profile picture

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

                <v-card-text style="height: 393px;">
                    <p id="pp_txt">A picture helps people recognize you and lets you know when you’re signed in to your account.</p>
                    <v-divider style="border-width: 0.7px;"></v-divider>
                    <v-progress-linear
                        :active="loading_linear"
                        :indeterminate="loading_linear"
                        absolute
                        top
                        color="primary"
                        height="10px"
                    >
                    </v-progress-linear>
                    <div id="xccccza">
                        <v-img @click="open_explorer()" max-width="249px" style="display: inline-block; width: 249px; cursor: pointer; border-radius: 50%; height: 249px;" :src="`${$config.apiUrl}${profile_img}`"></v-img>
                    </div>
                </v-card-text>

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
        <input @change="upload_image" accept="image/png, image/jpeg" type="file" ref="file_upload" style="display: none;">
    </v-row>
</template>

<script>
// Imported mixins
import upload_profile_image from '../../mixins/upload_profile_image/upload_profile_image'
import upload_profile_image_request from '../../mixins/upload_profile_image/upload_profile_image_request'
import upload_profile_image_response from '../../mixins/upload_profile_image/upload_profile_image_response'
//---------------------------

export default {
    name: 'UploadProfileImageDialog', // Component name

    // Registered mixins
    mixins: [
        upload_profile_image,

        upload_profile_image_request,

        upload_profile_image_response
    ],
    //----------------------------

    // Data property
    data(){
        return {
            window_width: '', // Window width property
            loading_linear: false, // Loading linear property
            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------------

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the upload profile img dialog
        dialog: {
            get(){
                return this.$store.state.dialog.upload_profile_img_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/upload_profile_img_dialog/update_value', { value: value });
            }
        },
        //--------------------------------------------

        // Vuex property that holds the users profile image
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //-----------------------------------------------

        // Abort controller for canceling pending fetch api requests
        controller: {
            get(){
                return this.controller_x;
            },

            set(value){
                this.controller_x = value;
            }
        }
        //--------------------------------------------------------
    },
    //--------------------------

    // Methods or functions
    methods: {
        // Close msg dialog from vuex
        close_dialog(){
            this.$store.commit('dialog/upload_profile_img_dialog/update_value', { value: false });
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //---------------------------------

        // Open the users file explorer
        open_explorer(){
            let enable_update_profile_image = this.$store.state.settings_page.settings_route_config.enable_update_profile_image;

            if (enable_update_profile_image === true){
                if (this.loading_linear === false){
                    this.$refs.file_upload.value = '';
                    this.$refs.file_upload.click();
                }
            }
        },
        //---------------------------------

        // Upload new profile image
        upload_image(e){
            this.loading_linear = true;
            const file = e.target.files[0];
            this.upload_profile_image(file);
        },
        //---------------------------------

        // Detect screen resize
        onResize(){
            this.window_width = window.innerWidth;
        },
        //---------------------------------

        // Send feedback
        send_feedback(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        }
        //-------------------------------
    },
    //------------------------

    // Created lifecycle hook
    created(){
        this.onResize();
    },
    //-----------------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
@import url('../../assets/settings_page.css'); /* CSS stylesheet file for the settings page */
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the student classes page */
</style>
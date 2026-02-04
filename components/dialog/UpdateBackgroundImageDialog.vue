<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            scrollable
            v-resize="onResize"
            :fullscreen="(window_width <= 415) ? true : false"
            max-width="800px"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    Customize appearance

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
                    <div id="qoo8bc_xz">
                        <div id="bg_img_cover">
                            <img id="skk9cxz" :src="$config.apiUrl + bg_image" alt="">
                        </div>

                        <div id="xnn7unz_x">
                            <p id="znnsi8x_zz">Select stream header image</p>
                            <div id="pplo9x">
                                <div id="amncbv6">
                                    <v-btn
                                        color="primary"
                                        class="mr-4"
                                        style="margin-right: 0px !important;"
                                        @click="open_bg_class_img_list_dialog()"
                                    >
                                        <v-icon
                                            left
                                            dark
                                        >
                                            mdi-image
                                        </v-icon>
                                        Select photo
                                    </v-btn>
                                </div>
                            </div>
                        </div>
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
    </v-row>
</template>

<script>
export default {
    name: 'UpdateBackgroundImageDialog', // Component name

    // Data property
    data(){
        return {
            window_width: '', // Window width property
            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------------

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the class bg image dialog
        dialog: {
            get(){
                return this.$store.state.dialog.class_bg_image_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/class_bg_image_dialog/update_dialog', { value: value });
            }
        },
        //--------------------------------------------

        // Class background image from vuex
        bg_image: function(){
            return this.$store.state.dialog.class_bg_image_dialog.bg_image;
        },
        //--------------------------------------------

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
            this.$store.commit('dialog/class_bg_image_dialog/update_dialog', { value: false });
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //---------------------------------

        // Open bg class img list dialog
        open_bg_class_img_list_dialog (){
            this.$store.commit('dialog/bg_class_img_list_dialog/update_dialog', { value: true });
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
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */

::v-deep .v-dialog:not(.v-dialog--fullscreen){
    max-height: 430px;
}

@media only screen and (max-width: 495px){
    #xnn7unz_x {
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: unset;
    }

    #pplo9x {
        margin-top: 15px;
    }

    #skk9cxz {
        height: 120px;
        object-fit: cover;
    }
}

@media only screen and (max-height: 460px){
    ::v-deep .v-dialog:not(.v-dialog--fullscreen){
        max-height: 90% !important;
    }
}
</style>
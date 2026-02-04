<template>
    <v-row justify="center">
        <v-dialog
            v-model="logout_dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    <v-icon>
                        mdi-logout
                    </v-icon>

                    <span id="logout_txt">Logout</span>
                </v-card-title>

                <v-card-text id="card_txt_body">Are you sure you want to logout of your account?</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        :loading="logout_loading"
                        class="ma-1"
                        text
                        @click="logout_user()"
                    >
                        Yes
                    </v-btn>

                    <v-btn
                        color="primary"
                        text
                        @click="logout_dialog = false"
                    >
                        No
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import logout_from_account from '../../mixins/logout/logout_from_account'
import logout_from_account_request from '../../mixins/logout/logout_from_account_request'
import logout_from_account_response from '../../mixins/logout/logout_from_account_response'
//-------------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'LogOutDialog', // Component name

    // Registered mixins
    mixins: [
        logout_from_account,

        logout_from_account_request,

        logout_from_account_response
    ],
    //---------------------------------

    // Computed property
    computed: {
        // Logout dialog vuex property
        logout_dialog: {
            get(){
                return this.$store.state.dialog.logout_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/logout_dialog/update_dialog', { value: value });
            }
        },
        //------------------------------------

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
    //---------------------------

    // Data property
    data(){
        return {
            logout_loading: false, // Logout loading property

            loader: 'loading', // Loader property

            loading: true, // Loading property

            controller_x: new AbortController() // Abort Controller
        }
    },
    //---------------------------

    // Watch property
    watch: {
        loader () {
            const l = this.loader
        },

        // Watch class code query parameter
        '$route.query.class_code'(){
            this.controller.abort(); // Cancel all pending requests
            this.controller = new AbortController(); // Generate a new abort controller object
        }
        //--------------------------------------
    },
    //----------------------------

    // Methods property
    methods: {
        // Log user out of their account
        logout_user(){
            let can_refresh = this.$store.state.app_components.refresh_data; // Refresh data property from vuex

            // Check if the user can refresh or not
            if (can_refresh === false){
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t logout at this time!' }); // Display the msg dialog
            } else {
                this.logout_loading = true; // Logout loading property
                this.logout_from_account(); // Logout from account mixin method
            }
            //--------------------------------------------
        }
        //----------------------------------
    },
    //---------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the student classes page */
    #logout_txt {
        margin-left: 6px;
        font-size: 1.2rem;
        margin-top: 3px;
    }
</style>
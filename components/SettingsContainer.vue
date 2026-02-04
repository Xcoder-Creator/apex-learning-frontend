<template>
    <v-container>
        <v-row>
            <v-col id="center_container" md="12">
                <div id="settings-content-one">
                    <p id="set_title_txt">Profile</p>

                    <p id="title_text" style="font-weight: 500; margin-bottom: 8px; margin-top: 5px;">Profile picture</p>
                    
                    <div id="pro_img_holder">
                        <div id="space_fix">
                            <button id="change_prof_img" @click="change_profile_img()" v-ripple>
                                <div id="img_xcc">
                                    <v-avatar size="30">
                                        <v-img :src="`${$config.apiUrl}${profile_img}`"></v-img>
                                    </v-avatar>
                                </div>

                                <div id="change_txt">
                                    Change
                                </div>
                            </button>
                        </div>
                    </div>

                    <div id="acct_sett">
                        <p id="title_text" style="font-weight: 500; margin-bottom: 0px; margin-top: 5px;">Account settings</p>
                        <p id="desc_text">Change your name and email. <a id="blue_lnk" @click="open_dialog(1)" href="javascript:void(0)">Manage</a></p>
                    </div>
                    
                    <div id="chg_name">
                        <p id="title_text" style="font-weight: 500; margin-bottom: 0px; margin-top: 5px;">Change password</p>
                        <p id="desc_text" style="margin-bottom: 5px;">Change your password to improve security. <a id="blue_lnk" @click="open_dialog(2)" href="javascript:void(0)">Click here</a></p>
                    </div>
                </div>
            </v-col>

            <v-col id="center_container" style="margin-top: 10px;" md="12">
                <div id="settings-content-one" style="padding-bottom: 10px;">
                    <p id="set_title_txt">Notifications</p>
                    
                    <p id="title_text" style="font-weight: 400; margin-bottom: 0px; margin-top: 5px; font-size: 1.375rem;">Email</p>
                    
                    <div id="switch_space">
                        <p id="desc_text" style="margin-bottom: 3px;">Allow email notifications</p>
                        <div id="switch_label">
                            <v-switch
                                v-model="option_one"
                                :disabled="display_one"
                                @change="switch_state(1)"
                            ></v-switch>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// Imported mixins
import update_user_settings from '../mixins/update_user_settings/update_user_settings'
import update_user_settings_request from '../mixins/update_user_settings/update_user_settings_request'
import update_user_settings_response from '../mixins/update_user_settings/update_user_settings_response'
//---------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'SettingsContainer', // Component name

    // Registered mixins
    mixins: [
        update_user_settings,

        update_user_settings_request,

        update_user_settings_response
    ],
    //-------------------------

    // Data property
    data(){
        return {
            option_one: this.$store.state.user_details.user_details.details.user_settings.allow_email_notif,

            switch_clicked: false,

            display_one: false,

            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------------

    // Computed property
    computed: {
        // Users profile image from vuex
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //----------------------------------

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
    //------------------------------

    // Methods property
    methods: {
        // Detect the switch option
        switch_state(option){
            this.update_user_settings(option); // Update user settings mixin method
        },
        //-------------------------------

        // Profile image dialog
        change_profile_img(){
            this.$store.commit('dialog/upload_profile_img_dialog/update_value', { value: true });
        },
        //-------------------------------

        // Open dialog
        open_dialog(opt){
            if (opt === 1){
                this.$store.commit('dialog/change_name_and_email_dialog/update_dialog', { value: true });
            } else if (opt === 2){
                this.$store.commit('dialog/update_password_dialog/update_dialog', { value: true });
            }
        }
        //-------------------------------
    },
    //------------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../assets/settings_page.css'); /* CSS stylesheet file for the settings page */
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the student classes page */
</style>
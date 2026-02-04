export default {
    methods: {
        // Archived classes page mounted mixin method
        archived_classes_page_mounted(){
            // Detect internet explorer web browsers
            function detect_ie(){
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");

                // If Internet Explorer, return version number
                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
                    return true;
                } else {
                    return false;
                }
            }
            //------------------------------------

            if (detect_ie() === true){
                // Update snackbar text from vuex
                let obj = {
                    value: true,
                    text: 'Error, Your browser is unsupported!'
                }

                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                //--------------------------------------
            } else if (detect_ie() === false){
                if (!('fetch' in window) || !('AbortController' in window)){
                    // Update snackbar text from vuex
                    let obj = {
                        value: true,
                        text: 'Error, Please upgrade your browser!'
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                    //--------------------------------------
                } else {
                    this.general_route_leave(); // Route leave
                    this.$store.commit('app_components/update_loading_linear', { value: true });
                    this.$store.commit('class_id/update_class_id', { value: null });
                    this.$store.commit('watch_navdrawer_items/update_value', { sect: 3, value: 0 }); // Target the classes tab on the nav drawer
                    let is_snackbar_displayed = this.$store.state.classes_home_page.utils.is_snackbar_displayed; // Is snackbar displayed property from vuex

                    // Check if is snackbar displayed property is true or false
                    if (is_snackbar_displayed === true){
                        // Update snackbar text from vuex
                        let obj = {
                            value: true,
                            text: 'An error just occured!'
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //--------------------------------------
                    }
                    //---------------------------------------------------

                    let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // Is logged in property from vuex

                    // Check if the user is logged in or not
                    if (is_logged_in === true){
                        // Check if the user is making use of a student or teachers account
                        if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                            if (this.$route.name === 'student-archived_classes'){
                                let value = this.$store.state.classes_home_page.config.value;

                                if (value === 0){
                                    let count = value + 1;
                                    this.$store.commit('classes_home_page/config/update_value', { value: count });

                                    this.isLoading = false; // Disabling the page loading screen
                                } else if (value >= 1){
                                    this.isLoading = false; // Disabling the page loading screen
                                }

                                this.fetch_class_list(); // A mixin method to fetch all available classes that a user is part of
                            } else {
                                this.page_view = false;
                                this.$router.push('/student/classes/'); // Redirect user to the classes home page
                            }
                        } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                            if (this.$route.name === 'teacher-archived_classes'){
                                let value = this.$store.state.classes_home_page.config.value;

                                if (value === 0){
                                    let count = value + 1;
                                    this.$store.commit('classes_home_page/config/update_value', { value: count });

                                    this.isLoading = false; // Disabling the page loading screen
                                } else if (value >= 1){
                                    this.isLoading = false; // Disabling the page loading screen
                                }

                                this.teacher_fetch_class_list(null, null, null, null); // A mixin method to fetch all available classes that a user is part of
                            } else {
                                this.page_view = false;
                                this.$router.push('/teacher/classes/'); // Redirect user to the classes home page
                            }
                        }
                        //--------------------------------------------------------
                    } else if (is_logged_in === false){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            // Check if the access and refresh tokens are set
                            if (localStorage.getItem('access_token')){
                                if (localStorage.getItem('refresh_token')){
                                    let access_token = localStorage.getItem('access_token'); // Access token
                                    let refresh_token = localStorage.getItem('refresh_token'); // Refresh token

                                    this.keep_user_logged_in(access_token, refresh_token); // A mixin method to check if the user is logged in
                                } else {
                                    localStorage.removeItem('access_token'); // Access token
                                    this.page_view = false;
                                    this.$router.push('/login/'); // Redirect user to the login page
                                }
                            } else if (localStorage.getItem('refresh_token')){
                                localStorage.removeItem('refresh_token'); // Refresh token
                                this.page_view = false;
                                this.$router.push('/login/'); // Redirect user to the login page
                            } else {
                                this.page_view = false;
                                this.$router.push('/login/'); // Redirect user to the login page
                            }
                            //----------------------------------------------------
                        } else if (environment === 'production'){
                            let access_token = this.$store.state.app_tokens.login_access_token;

                            // Check if the access token is set
                            if (access_token === 'TEST_TOKEN'){
                                this.login_activity_operation(); // Check if there was any recent login activity on the users device
                            } else if (access_token === null){
                                this.page_view = false;
                                this.$router.push('/login/'); // Redirect user to login page
                            } else {
                                // Check if the user is making use of a student or teachers account
                                if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                    this.$router.push('/student/classes/'); // Redirect user to the classes home page
                                } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                    this.$router.push('/teacher/classes/'); // Redirect user to the classes home page
                                }
                            }
                            //----------------------------------------------------
                        }
                    }
                    //-------------------------------------------------
                }
            }
        }
        //-------------------------------------
    }
}
export default {
    methods: {
        // Signup page mounted mixin method
        signup_page_mounted(){
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
                    let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // is-logged-in property from vuex

                    // Check if user is logged in or not
                    if (is_logged_in === true){
                        this.isLoading = false; // Disable the page loading screen
                        this.page_view = false; // Disable page view
                        let user_role = this.$store.state.user_details.user_details.details.user_role; // Fetch user role from vuex

                        // Check if the user is making use of a student or teachers account
                        if (user_role === 'Student'){
                            this.$router.push(this.$config.student_classesUrl);
                        } else if (user_role === 'Teacher'){
                            this.$router.push(this.$config.teacher_classesUrl);
                        }
                        //-----------------------------------------------------
                    } else {
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

                                    setTimeout(() => {
                                        this.isLoading = false; // Disabling the page loading screen
                                    }, 3000);
                                }
                            } else if (localStorage.getItem('refresh_token')){
                                localStorage.removeItem('refresh_token'); // Refresh token

                                setTimeout(() => {
                                    this.isLoading = false; // Disabling the page loading screen
                                }, 3000);
                            } else {
                                setTimeout(() => {
                                    this.isLoading = false; // Disabling the page loading screen
                                }, 3000);
                            }
                            //--------------------------------------------------
                        } else if (environment === 'production'){
                            let access_token = this.$store.state.app_tokens.login_access_token; // Access token

                            // Check if the access token is set
                            if (access_token === 'TEST_TOKEN'){
                                this.login_activity_operation(); // Check if there was any recent login activity on the users device
                            } else if (access_token === null){
                                setTimeout(() => {
                                    this.$store.commit('page_loading/page_loading/update_data', { value: false }); // Update page loading
                                }, 3000);
                            } else {
                                this.page_view = false; // Hide the contents of the login page

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
                    //---------------------------------------
                }
            }
        }
        //-------------------------------------
    }
}
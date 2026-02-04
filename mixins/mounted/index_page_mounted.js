export default {
    methods: {
        // Index page mounted mixin method
        index_page_mounted(){
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
                    let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // is-logged-in property from vuex

                    // Check if user is logged in or not
                    if (is_logged_in === true){
                        let user_role = this.$store.state.user_details.user_details.details.user_role; // Fetch user role from vuex

                        // Check if the user is making use of a student or teachers account
                        if (user_role === 'Student'){
                            this.$router.push(this.$config.student_classesUrl);
                        } else if (user_role === 'Teacher'){
                            this.$router.push(this.$config.teacher_classesUrl);
                        }
                        //-----------------------------------------------------
                    } else if (is_logged_in === false){
                        this.$router.push('/login/'); // Redirect user to the login page
                    }
                    //---------------------------------------
                }
            }
        }
        //-------------------------------------
    }
}
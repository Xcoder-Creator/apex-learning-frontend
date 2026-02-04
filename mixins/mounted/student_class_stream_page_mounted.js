export default {
    methods: {
        // Student class stream page mounted mixin method
        student_class_stream_page_mounted(){
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
                    this.$store.commit('student_streams_page/active_tab/update_active_tab', { tab: 0 });

                    this.general_route_leave(); // Route leave

                    this.$store.commit('watch_navdrawer_items/reset_data'); // Reset navbar items from vuex

                    this.$store.commit('bottom_nav/update_tab_value', { value: 0 }); // Update tab value property from vuex

                    let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // Is logged in property from vuex

                    // Check if the user is logged in or not
                    if (is_logged_in === true){
                        // Check if the user is making use of a student or teachers account
                        if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                            let class_code = this.$route.query.class_code; // Class code from router parameter
                            let class_info = [];

                            if (class_code){
                                let class_array = this.$store.state.class_details.class_list;

                                if (class_array.length > 0){
                                    class_array.forEach(class_data => {
                                        if (class_data.class_code === class_code){
                                            class_info.push(class_data);
                                        }
                                    });

                                    if (class_info.length > 0 && class_info.length === 1){
                                        this.$store.commit('class_info/update_class_info', { value: class_info[0] }); // Update class info property from vuex
                                        this.$store.commit('class_id/update_class_id', { value: class_info[0].id }); // Update class id property from vuex
                                        
                                        let active_class_posts = this.$store.state.student_streams_page.stream_comp.active_class_posts;

                                        if (active_class_posts){
                                            if (active_class_posts.hasOwnProperty(class_code)){
                                                setTimeout(() => {
                                                    // Update snackbar text from vuex
                                                    let obj2 = {
                                                        value: false,
                                                        text: ''
                                                    }

                                                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj2);
                                                    //--------------------------------------

                                                    let all_upcoming_work = this.$store.state.student_streams_page.stream_comp.active_upcoming_work_data;
                                                    let current_data = all_upcoming_work[class_code];
                                                    this.$store.commit('student_streams_page/stream_comp/update_upcoming_work_from_mounted', { value: current_data });

                                                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });

                                                    let active_class_posts = this.$store.state.student_streams_page.stream_comp.active_class_posts;
                                                    this.$store.commit('student_streams_page/stream_comp/update_posts_array', { value: active_class_posts[class_code] }); // Update posts array from vuex
                                                    this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }) // Update loaded posts property from vuex
                                                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex

                                                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                                                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                                                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });

                                                    this.$store.commit('class_info/update_class_info', { value: class_info[0] }); // Update class info property from vuex
                                                    this.$store.commit('class_id/update_class_id', { value: class_info[0].id }); // Update class id property from vuex
                                                }, 200);
                                            } else {
                                                this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: false }) // Update loaded posts property from vuex
                                                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex

                                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                                                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                                                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

                                                this.$store.commit('student_streams_page/stream_comp/update_posts_array', { value: [] }); // Update posts array property from vuex
                                                this.$store.commit('class_info/update_class_info', { value: class_info[0] }); // Update class info property from vuex
                                                this.$store.commit('class_id/update_class_id', { value: class_info[0].id }); // Update class id property from vuex
                                                this.fetch_class_posts(class_code, 0); // Fetch class posts
                                            }
                                        } else {
                                            this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: false }) // Update loaded posts property from vuex
                                            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex

                                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                                            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                                            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

                                            this.$store.commit('student_streams_page/stream_comp/update_posts_array', { value: [] }); // Update posts array property from vuex
                                            this.$store.commit('class_info/update_class_info', { value: class_info[0] }); // Update class info property from vuex
                                            this.$store.commit('class_id/update_class_id', { value: class_info[0].id }); // Update class id property from vuex
                                            this.fetch_class_posts(class_code, 0); // Fetch class posts
                                        }
                                    } else {
                                        this.page_view = false; // Hide page contents from user

                                        // Check if the user is making use of a student or teachers account
                                        if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                            this.$router.push('/student/classes/');
                                        } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                            this.$router.push('/teacher/classes/');
                                        }
                                        //-------------------------------------------------------
                                    }
                                } else {
                                    this.page_view = false; // Display a blank page to the user

                                    // Check if the user is making use of a student or teachers account
                                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                        this.$router.push('/student/classes/');
                                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                        this.$router.push('/teacher/classes/');
                                    }
                                    //-------------------------------------------------------
                                }
                            } else {
                                // Check if the user is making use of a student or teachers account
                                if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                    this.$router.push('/student/classes/');
                                } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                    this.$router.push('/teacher/classes/');
                                }
                                //-------------------------------------------------------
                            }
                        } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                            this.page_view = false;
                            this.$router.push('/teacher/classes/'); // Redirect user to the classes home page
                        }
                        //-------------------------------------------------------
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

                                    this.$router.push('/login/'); // Redirect user to the login page
                                }
                            } else if (localStorage.getItem('refresh_token')){
                                localStorage.removeItem('refresh_token'); // Refresh token
                                this.page_view = false; // Disable page contents
                                this.$router.push('/login/'); // Redirect user to the login page
                            } else {
                                this.page_view = false; // Disable page contents
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
                                let class_code = this.$route.query.class_code; // Class code from router parameter

                                if (class_code){
                                    this.fetch_class_list(class_code);
                                } else {
                                    this.page_view = false; // Hide the contents of the login page

                                    // Check if the user is making use of a student or teachers account
                                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                        this.$router.push('/student/classes/'); // Redirect user to the classes home page
                                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                        this.$router.push('/teacher/classes/'); // Redirect user to the classes home page
                                    }
                                }
                            }
                            //----------------------------------------------------
                        }
                    }
                    //-------------------------------------------------
                }
            }
        }
        //---------------------------------------
    }
}
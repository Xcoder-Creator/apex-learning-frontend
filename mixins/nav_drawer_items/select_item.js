export default {
    methods: {
        // Select item mixin method to detect what item that the user clicked on from the nav drawer
        select_item(item){
            if (item === 'class_list'){
                this.lnk_sect1 = 0; // Select classes tab in nav drawer
                let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // Is logged in property from vuex

                // Check if the user is logged in
                if (is_logged_in === true){
                    let user_role = this.$store.state.user_details.user_details.details.user_role; // The role of the user, Eg: as a teacher or student

                    // Navigate the user to the respective classes home page depending on their role
                    if (user_role === 'Student'){
                        this.$router.push('/student/classes');
                    } else if (user_role === 'Teacher'){
                        this.$router.push('/teacher/classes');
                    }
                    //-------------------------------------------------
                }
                //----------------------------------
            } else if (item === 'calendar'){
                this.lnk_sect1 = 1; // Select calendar tab in nav drawer
                this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
            } else if (item === 'to_do'){
                this.lnk_sect2 = 0; // Select to-do tab in nav drawer
                this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
            } else if (item === 'help'){
                this.lnk_sect3 = 2; // Select help tab in nav drawer
                this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
            } else if (item === 'privacy_policy'){
                this.lnk_sect3 = 3; // Select privacy policy tab in nav drawer
                this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
            } else if (item === 'about_us'){
                this.lnk_sect3 = 4; // Select about us tab in nav drawer
                window.location.href = `/about_us/`;
            } else if (item === 'archived_classes'){
                this.lnk_sect3 = 0; // Select archived classes tab in nav drawer
                let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // Is logged in property from vuex

                // Check if the user is logged in
                if (is_logged_in === true){
                    let user_role = this.$store.state.user_details.user_details.details.user_role; // The role of the user, Eg: as a teacher or student

                    // Navigate the user to the respective archived classes page depending on their role
                    if (user_role === 'Student'){
                        this.$router.push('/student/archived_classes');
                    } else if (user_role === 'Teacher'){
                        this.$router.push('/teacher/archived_classes');
                    }
                    //-------------------------------------------------
                }
                //----------------------------------
            } else if (item === 'settings'){
                this.lnk_sect3 = 1; // Select settings tab in nav drawer
                let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // Is logged in property from vuex

                // Check if the user is logged in
                if (is_logged_in === true){
                    let user_role = this.$store.state.user_details.user_details.details.user_role; // The role of the user, Eg: as a teacher or student

                    // Navigate the user to the respective archived classes page depending on their role
                    if (user_role === 'Student'){
                        this.$router.push('/student/settings');
                    } else if (user_role === 'Teacher'){
                        this.$router.push('/teacher/settings');
                    }
                    //-------------------------------------------------
                }
                //----------------------------------
            } else if (item === 'logout'){
                this.lnk_sect3 = 5; // Select logout tab in nav drawer
                let is_logged_in = this.$store.state.user_details.user_details.is_logged_in; // Is logged in property from vuex

                // Check if the user is logged in
                if (is_logged_in === true){
                    this.$store.commit('dialog/logout_dialog/update_dialog', { value: true });
                }
                //----------------------------------
            }
            //--------------------------------------------------------------
        }
        //-------------------------------------------------------------------------
    }
}
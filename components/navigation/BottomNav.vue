<template>
    <div id="bottom-nav">
        <v-bottom-navigation
            :value="value"
            color="primary"
            grow
        >
            <v-btn @click="go_to_page(0)" id="left-radius">
                <span>Stream</span>

                <v-icon>mdi-post-outline</v-icon>
            </v-btn>

            <v-btn @click="go_to_page(1)">
                <span>Classwork</span>

                <v-icon>mdi-clipboard-edit-outline</v-icon>
            </v-btn>

            <v-btn @click="go_to_page(2)" id="right-radius">
                <span>People</span>

                <v-icon>mdi-account-box-multiple-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
export default {
    name: 'BottomNav', // Component name

    // Computed properties
    computed: {
        // Vuex property to select the tabs based on the current page
        value: function(){
            return this.$store.state.bottom_nav.tab_value;
        }
        //-----------------------------------------------
    },
    //---------------------------------------

    // Methods property
    methods: {
        go_to_page(value){
            if (this.$route.name === 'student-stream'){
                this.$store.commit('student_streams_page/active_tab/update_active_tab', { tab: value }); // Update active tab from vuex
            } else if (this.$route.name === 'teacher-stream'){
                this.$store.commit('teacher_streams_page/active_tab/update_active_tab', { tab: value }); // Update active tab from vuex
            }

            this.$store.commit('bottom_nav/update_tab_value', { value: value }); // Update tab value property from vuex

            if (value === 0){
                // Check if the user is making use of a student or teachers account
                if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                    this.$router.push({ path: '/student/stream', query: { class_code: this.$route.query.class_code } });
                } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                    this.$router.push({ path: '/teacher/stream', query: { class_code: this.$route.query.class_code } });
                }
                //-------------------------------------------------------
            } else if (value === 1){
                // Check if the user is making use of a student or teachers account
                if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                    this.$router.push({ path: '/student/classwork', query: { class_code: this.$route.query.class_code } });
                } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                    this.$router.push({ path: '/teacher/classwork', query: { class_code: this.$route.query.class_code } });
                }
                //-------------------------------------------------------
            } else if (value === 2){
                // Check if the user is making use of a student or teachers account
                if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                    this.$router.push({ path: '/student/people', query: { class_code: this.$route.query.class_code } });
                } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                    this.$router.push({ path: '/teacher/people', query: { class_code: this.$route.query.class_code } });
                }
                //-------------------------------------------------------
            }
        }
    }
    //---------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
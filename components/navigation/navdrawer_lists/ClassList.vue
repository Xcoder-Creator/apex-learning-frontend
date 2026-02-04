<template>
    <v-list dense nav style="padding-top: 0px;">
        <v-list-item-group
            color="#1976d2"
            v-model="class_id"
            :mandatory="value"
        >
            <v-list-item
                two-line
                link
                v-for="item in class_list"
                :key="item.id"
                @click="go_to_stream(item.class_code, item.id)"
            >
                <v-avatar
                    color="primary"
                    size="34"
                >
                    <span class="white--text text-h5">{{ item.profile_initials }}</span>
                </v-avatar>

                <v-list-item-content style="margin-left: 16px;">
                    <v-list-item-title>{{ item.class_name }}</v-list-item-title>

                    <v-list-item-subtitle>{{ item.class_section }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
export default {
    name: 'ClassList', // Component name

    data(){
        return {
            value: false
        }
    },

    // Computed property
    computed: {
        // Class ID from vuex
        class_id: {
            get(){
                return this.$store.state.class_id.class_id;
            },

            set(value){
                this.$store.commit('class_id/update_class_id', { value: value });
            }
        },
        //--------------------------------------------------------

        // Users class list from vuex
        class_list: function(){
            let class_data = this.$store.state.class_details.class_list;

            if (class_data.length > 0 && this.$route.name === 'student-stream'){
                if (this.$route.name === 'student-stream' || this.$route.name === 'student-classwork' || this.$route.name === 'student-people' || this.$route.name === 'teacher-stream' || this.$route.name === 'teacher-classwork' || this.$route.name === 'teacher-people'){
                    this.value = true;
                } else {
                    this.value = false;
                }
            } else if (class_data.length > 0 && this.$route.name === 'teacher-stream'){
                if (this.$route.name === 'teacher-stream' || this.$route.name === 'teacher-classwork' || this.$route.name === 'teacher-people'){
                    this.value = true;
                } else {
                    this.value = false;
                }
            } else {
                this.value = false;
            }

            return this.$store.state.class_details.class_list;
        }
        //----------------------------------
    },
    //-------------------------------------------------

    // Methods property
    methods: {
        // Take the user to the stream page based on the class selected by the user
        go_to_stream(class_code, id){
            this.class_id = id; // Update class ID from vuex

            // Check if the user is making use of a student or teachers account
            if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                this.$router.push({ path: '/student/stream', query: { class_code: class_code } });
            } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                this.$router.push({ path: '/teacher/stream', query: { class_code: class_code } });
            }
            //-------------------------------------------------------
        }
        //-------------------------------------------------------
    },
    //-------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
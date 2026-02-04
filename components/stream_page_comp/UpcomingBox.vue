<template>
    <v-col md="3" id="sect-x">
        <div id="upcoming-box" style="margin-bottom: 25px;" v-if="$route.name === 'teacher-stream'">
            <div id="ub-title-xx">
                <div>
                    Class code
                </div>

                <v-menu
                    right
                    top
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
                        <v-list-item @click="copy_to_clipboard(class_info.class_code)" link>
                            <v-list-item-title id="items_menu">
                                <v-icon>mdi-content-copy</v-icon>
                                <span id="menu_txtx">Copy class code</span>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <p id="ub-desc" class="uu7gxz" style="margin-top: 5px;">{{ class_info.class_code }}</p>
        </div>

        <div id="upcoming-box" v-if="$route.name === 'student-stream'">
            <p id="ub-title">Upcoming</p>
            <p id="ub-desc" v-if="student_upcoming_classwork.length === 0">No work due soon!</p>
            <div v-else-if="student_upcoming_classwork.length === 1">
                <p id="due_date_xcv">Due {{ student_upcoming_classwork[0].due_date }}</p>

                <div id="shhsic4" v-if="$route.name === 'student-stream'">
                    <nuxt-link id="lnk_kki3" :to="`/student/view_classwork?class_code=${student_upcoming_classwork[0].class_code}&id=${student_upcoming_classwork[0].id}`">
                        <span>{{ student_upcoming_classwork[0].due_time }}</span> - {{ student_upcoming_classwork[0].title }}
                    </nuxt-link>
                </div>
            </div>

            <p id="ub-view-all">
                <v-btn
                    class="ma-1"
                    color="primary"
                    plain
                    id="view-all-btn"
                    @click="go_to_classwork_page()"
                >
                    View all
                </v-btn>
            </p>
        </div>

        <div id="upcoming-box" v-if="$route.name === 'teacher-stream'">
            <p id="ub-title">Upcoming</p>
            <p id="ub-desc" v-if="teacher_upcoming_classwork.length === 0">No work due soon!</p>
            <div v-else-if="teacher_upcoming_classwork.length === 1">
                <p id="due_date_xcv">Due {{ teacher_upcoming_classwork[0].due_date }}</p>

                <div id="shhsic4">
                    <nuxt-link id="lnk_kki3" :to="`/teacher/view_classwork?class_code=${teacher_upcoming_classwork[0].class_code}&id=${teacher_upcoming_classwork[0].id}`">
                        <span>{{ teacher_upcoming_classwork[0].due_time }}</span> - {{ teacher_upcoming_classwork[0].title }}
                    </nuxt-link>
                </div>
            </div>

            <p id="ub-view-all">
                <v-btn
                    class="ma-1"
                    color="primary"
                    plain
                    id="view-all-btn"
                    @click="go_to_classwork_page()"
                >
                    View all
                </v-btn>
            </p>
        </div>
    </v-col>
</template>

<script>
export default {
    name: 'UpcomingBox', // Component name

    // Computed property
    computed: {
        // Class info property from vuex
        class_info: function(){
            return this.$store.state.class_info.class_info;
        },
        //--------------------------------------------------------

        // Upcoming classwork property from vuex
        teacher_upcoming_classwork: function(){
            return this.$store.state.teacher_streams_page.stream_comp.current_upcoming_work;
        },
        //--------------------------------------------------------

        // Upcoming classwork property from vuex
        student_upcoming_classwork: function(){
            return this.$store.state.student_streams_page.stream_comp.current_upcoming_work;
        }
        //--------------------------------------------------------

    },
    //-----------------------------------------

    // Methods property
    methods: {
        // Copy class code to clipboard
        copy_to_clipboard(class_code){
            navigator.clipboard
                .writeText(class_code)
                .then(() => {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Class code copied!',
                        err: false
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------  
                })
                .catch(() => {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Error, Couldn\'t copy class code!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------  
                });
        },
        //-------------------------------------------------------

        // Redirect user to the classwork page
        go_to_classwork_page(){
            if (this.$route.query.class_code){
                let class_code = this.$route.query.class_code;

                if (this.$route.name === 'student-stream'){
                    this.$router.push(`/student/classwork?class_code=${class_code}`);
                } else if (this.$route.name === 'teacher-stream'){
                    this.$router.push(`/teacher/classwork?class_code=${class_code}`);
                }
            }
        }
        //-------------------------------------------------------
    }
    //---------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
#due_date_xcv {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(0,0,0,.549);
    margin-bottom: 3px;
}

#lnk_kki3 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #333;
    text-decoration: none;
}

::v-deep .v-btn {
    text-transform: unset;
}

#view-all-btn {
    font-size: 0.85rem !important;
}

#shhsic4 {
    margin-bottom: 16px;
}
</style>
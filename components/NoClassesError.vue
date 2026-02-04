<template>
    <v-row>
        <v-col md="12">
            <div :style="($route.name === 'student-archived_classes') ? 'margin-top: 30px;' : ''" id="no_classes">
                <div id="no_classes_img"></div>

                <div id="mob_no_classes_img">
                    <img id="img_cover" src="/images/no_classes.png" alt="">
                </div>

                <h3 v-if="$route.name === 'student-classes' || $route.name === 'teacher-classes'">No classes here!</h3>

                <h3 v-if="$route.name === 'student-archived_classes' || $route.name === 'teacher-archived_classes'">No archived classes!</h3>

                <h4 v-if="$route.name === 'student-classes' || $route.name === 'teacher-classes'" id="txt_color">You have no classes at all.</h4>

                <h4 v-if="$route.name === 'student-archived_classes'" id="txt_color">When teachers archive classes, they move here.</h4>

                <h4 v-if="$route.name === 'teacher-archived_classes'" id="txt_color">None of your classes have been archived.</h4>

                <h4 v-if="$route.name === 'student-classes' || $route.name === 'teacher-classes'" id="txt_color">Check " Archived classes " in the Learning menu to see classes that have been archived.</h4>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'NoClassesError', // Component name
}
</script>

<style scoped>
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>
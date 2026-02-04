<template>
    <div v-if="$route.name === 'student-stream'">
        <div :id="(item.post_type === 'plain_post') ? 'plain-text-post' : (item.post_type === 'post_with_attachment') ? 'post-attachment' : (item.post_type === 'assignment_post') ? 'assignment-post' : (item.post_type === 'assignment_post_with_attachment') ? 'assignment-post-attachment' : (item.post_type === 'new_material_post') ? 'new-material-post' : (item.post_type === 'quiz_post') ? 'quiz-post' : ''" v-for="item in posts_array" :key="item.id">
            <PlainPost v-if="item.post_type === 'plain_post'" :item="item" />

            <PostWithAttachment v-else-if="item.post_type === 'post_with_attachment'" :item="item" />

            <AssignmentPost v-else-if="item.post_type === 'assignment_post'" :item="item" />

            <AssignmentPostWithAttachment v-else-if="item.post_type === 'assignment_post_with_attachment'" :item="item" />

            <NewMaterialPost v-else-if="item.post_type === 'new_material_post'" :item="item" />

            <QuizPost v-else-if="item.post_type === 'quiz_post'" :item="item" />
        </div>
    </div>

    <div v-else-if="$route.name === 'teacher-stream'">
        <div :id="(item.post_type === 'plain_post') ? 'plain-text-post' : (item.post_type === 'post_with_attachment') ? 'post-attachment' : (item.post_type === 'assignment_post') ? 'assignment-post' : (item.post_type === 'assignment_post_with_attachment') ? 'assignment-post-attachment' : (item.post_type === 'new_material_post') ? 'new-material-post' : (item.post_type === 'quiz_post') ? 'quiz-post' : ''" v-for="item in teacher_posts_array" :key="item.id">
            <PlainPost v-if="item.post_type === 'plain_post'" :item="item" />

            <PostWithAttachment v-else-if="item.post_type === 'post_with_attachment'" :item="item" />

            <AssignmentPost v-else-if="item.post_type === 'assignment_post'" :item="item" />

            <AssignmentPostWithAttachment v-else-if="item.post_type === 'assignment_post_with_attachment'" :item="item" />

            <NewMaterialPost v-else-if="item.post_type === 'new_material_post'" :item="item" />

            <QuizPost v-else-if="item.post_type === 'quiz_post'" :item="item" />
        </div>
    </div>
</template>

<script>
import PlainPost from '../../components/stream_page_comp/post_types/PlainPost'
import PostWithAttachment from '../../components/stream_page_comp/post_types/PostWithAttachment'
import AssignmentPost from '../../components/stream_page_comp/post_types/AssignmentPost'
import AssignmentPostWithAttachment from '../../components/stream_page_comp/post_types/AssignmentPostWithAttachment'
import NewMaterialPost from '../../components/stream_page_comp/post_types/NewMaterialPost'
import QuizPost from '../../components/stream_page_comp/post_types/QuizPost'

export default {
    name: 'ClassPosts', // Component name

    // Registered components
    components: {
        PlainPost,

        PostWithAttachment,

        AssignmentPost,

        AssignmentPostWithAttachment,

        NewMaterialPost,

        QuizPost
    },
    //----------------------------

    // Computed properties
    computed: {
        // Posts loaded from vuex
        posts_array: function(){
            return this.$store.state.student_streams_page.stream_comp.posts_array;
        },
        //----------------------------------------------

        // Posts loaded from vuex
        teacher_posts_array: function(){
            return this.$store.state.teacher_streams_page.stream_comp.posts_array;
        },
        //----------------------------------------------
    }
    //----------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>
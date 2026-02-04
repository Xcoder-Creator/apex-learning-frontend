<template>
    <div id="component_loader">
        <div id="fill_up">
            <div id="page_load_icon_container">
                <img style="user-select: none;" draggable="false" src="/images/logo_apex.png" id="page_load_icon" alt="">
            </div>

            <p id="page_load_title">
                <span id="title">
                    <span id="title_left" draggable="false" style="user-select: none;">Apex-<span id="title_right">Learning</span></span>
                </span>
            </p>

            <div id="progress_loader_spin">
                <v-progress-circular
                    indeterminate
                    color="primary"
                >
                </v-progress-circular>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageLoader' // Component name
}
</script>

<style scoped>
@import url('../../assets/page_loader.css'); /* CSS styles for the page loader component */
</style>
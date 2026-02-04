<template>
    <div id="asdaww2232zq" class="jjsut3" v-if="$route.name === 'student-activity_forms'">
        <div id="asdsa349hs" class="nnh6">
            <v-skeleton-loader
                type="list-item-avatar"
                v-for="i in 10" :key="i"
                style="margin-top: 20px;"
            >
            </v-skeleton-loader>
        </div>
    </div>

    <div id="asdaww2232zq" v-else>
        <div id="asdsa349hs">
            <v-skeleton-loader
                type="list-item-avatar"
                v-for="i in 10" :key="i"
                style="margin-top: 20px;"
            >
            </v-skeleton-loader>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingComp' // Component name
}
</script>

<style scoped>
@import url('../../assets/class_classwork_page.css'); /* CSS stylesheet file for the classwork page */
.jjsut3 {
    width: 100% !important;
    background: #fff;
    border-radius: 20px;
    margin-top: 20px;
}

.nnh6 {
    padding-top: 20px;
    padding-bottom: 35px;
}
</style>
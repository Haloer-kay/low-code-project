<template>
    <div class="app">
        <Editor v-model="state"></Editor>
    </div>
</template>

<script>
import { ref ,provide} from "vue"
import data from "./data.json"
import Editor from "./components/Material/index.vue"
import {registerConfig as config} from "./utils/material-config.js"

export default{
    components:{
        Editor
    },
    setup(){
        provide('config',config); 
        const state=ref(data)
        return {
            state
        }
    }
}
</script>

<style lang="scss">
.app{
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 20px;
    top: 20px;
}
</style>

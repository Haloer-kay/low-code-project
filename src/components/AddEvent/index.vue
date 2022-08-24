<template>
    <div>
        {{ msg }}
    </div>
</template>

<script>
import {computed} from 'vue';
import Event from "./Event.vue"
export default {

    components: {
        
    },
    props: {
        modelValue: { type: Object }
    },
    setup(props) {

        const data = computed({
            get() {
                return props.modelValue
            }
        })
        let msg="请先选中按钮组件";
        return () => {
            data.value.blocks.forEach((block,index)=>{
                if(block.focus && block.key=='button'){
                    msg=<Event v-model={data} index={index}></Event>
                }else{
                    msg="请先选中按钮组件"
                }
            })
            return msg
        }
    }

}
</script>

<style>
</style>
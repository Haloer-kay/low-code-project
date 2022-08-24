<template>
    <div>
        <div>
            <p>单击事件</p>
            <el-input v-model="oneText" :rows="5" type="textarea" placeholder="请直接输入单击事件代码" />
        </div>
        <div>
            <p>双击事件</p>
            <el-input v-model="doubleText" :rows="5" type="textarea" placeholder="请直接输入双击事件代码" />
        </div>
        <el-button type="primary" plain @click="addEvent">完成</el-button>
    </div>
</template>

<script>

import { ElInput, ElButton } from "element-plus"
import { ref, computed, reactive } from 'vue';

export default {
    components: {
        ElInput,
        ElButton
    },
    props: {
        modelValue: { type: Object },
        index: { type: Number }
    },
    setup(props) {
        let data = computed(() => {
            return props.modelValue.value
        })

        let oneText = ref("")
        let doubleText = ref("");
        let addEvent = () => {
            let clickEvent = {
                oneEvent: '',
                doubleEvent: ''
            }
            clickEvent.oneEvent=oneText
            clickEvent.doubleEvent=doubleText
            if (data.value.blocks[props.index].key == 'button') {
                data.value.event.push(clickEvent)
            }
            console.log(data.value);
        }

        return {
            oneText,
            doubleText,
            addEvent
        }
    }

}
</script>

<style>
</style>
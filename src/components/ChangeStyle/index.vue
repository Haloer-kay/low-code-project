<template>
    <div>
        {{ msg }}
    </div>
</template>

<script>
import { ElInputNumber, ElForm, ElFormItem } from "element-plus"
import Checked from "../Check/Checked.vue"
import NoChecked from "../Check/NoChecked.vue"
import { computed } from 'vue'
export default {

    components: {
        ElInputNumber,
        ElFormItem,
        ElForm,
        Checked,
        NoChecked,
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

        return () => {
            const attrs_style = computed(() => {
                let attribute = null;
                let block = null;
                return { attribute, block }
            })

            data.value.blocks.forEach((block, id) => {
                if (block.focus === true) {
                    attrs_style.value.block = data.value.blocks[id];
                    attrs_style.value.attribute = data.value.style[id];
                }
            })
            let msg = <NoChecked></NoChecked>
            if (attrs_style.value.block != null) {
                msg = <Checked v-model={attrs_style.value}></Checked>
            }
            return msg
        }
    }

}
</script>

<style>
</style>
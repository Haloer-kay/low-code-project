import {computed, defineComponent} from "vue";
import {ElButton} from "element-plus";
import './preview.scss'
import PreviewBlock from "./preview-block.jsx"

export default defineComponent({
    props: {
        modelValue: {type: Object}
    },
    components: {
        ElButton
    },

    setup: function (props) {
        const data = computed({
            get() {
                return props.modelValue
            }
        })

        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px',
        }))

        return () => {
            if (data.value.previewDemo === true) {
                return (<div class="bg">
                    <ElButton class="close" onclick={() => data.value.previewDemo = false}>关闭</ElButton>
                    <div class="canvas-container">
                        <div class="canvas" style={containerStyles.value}>
                            {
                                (data.value.blocks.map((block, index) => {
                                    return <PreviewBlock
                                        block={block}
                                        data={data}
                                        index={index}
                                    />
                                }))
                            }
                        </div>
                    </div>
                </div>)
            } else {
                return <div></div>
            }
        }
    }
})
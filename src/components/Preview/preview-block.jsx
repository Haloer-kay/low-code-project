import {computed, defineComponent, inject, onMounted, ref} from "vue";
import './preview.scss'
import { previewDraw } from "@/utils/styleConfig/previewDraw";
import {previewEvent} from "@/utils/eventConfig/previewEvent"

export default defineComponent({
    props: {
        data: {type: Object},
        block: {type: Object},
        index: {type: Number}
    },

    setup(props) {

        const blockStyles = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`,
        }));

        // console.log(props.block)


        const config = inject('config')

        let blockRef = ref(null);

        onMounted(() => {
            previewDraw(blockRef, props.data, props.index)
            previewEvent(blockRef, props.data,props.index)
        })

        return () => {
            const component = config.componentMap[props.block.key];

            const RenderComponent = component.render();
            // console.log(RenderComponent)
            return <div class="preview-block" style={blockStyles.value}  ref={blockRef}>
                {RenderComponent}
            </div>
        }
    }
})
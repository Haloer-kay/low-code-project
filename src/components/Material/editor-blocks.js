import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUpdated,
  ref,
} from "vue";
import { firstDraw } from "@/utils/styleConfig/firstDraw";
import { updateDraw } from "@/utils/styleConfig/updateDraw";
import { lastDraw } from "@/utils/styleConfig/lastDraw";

export default defineComponent({
  props: ["block", "data", "index"],
  setup(props) {
    const blockStyles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
    }));
    const config = inject("config");
    let blockRef = ref(null);
    onMounted(() => {
      let { offsetWidth, offsetHeight } = blockRef.value;
      if (props.block.alignCenter) {
        props.block.left = props.block.left - offsetWidth / 2;
        props.block.top = props.block.top - offsetHeight / 2;
        props.block.alignCenter = false;
      }
      props.block.width = offsetWidth;
      props.block.height = offsetHeight;
      firstDraw(
        blockRef,
        props.data,
        offsetWidth,
        offsetHeight,
        props.index
      );
    });

    onUpdated(() => {
      updateDraw(blockRef, props.block, props.data, props.index);
    });
    return () => {
      const component = config.componentMap[props.block.key];
      if (props.block.focus === true) {
        props.data.blocks.forEach((block, id) => {
          if (block.focus === true) {
            lastDraw(blockRef, props.block, props.data, id);
          }
        });
      }
      const RenderComponent = component.render();
      return (
        <div style={blockStyles.value} class="editor-block" ref={blockRef}>
          {RenderComponent}
        </div>
      );
    };
  },
});

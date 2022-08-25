<template>
  <div class="editor">
    <div class="editor-left">
      <div class="editor-left-title">
        <h2>
          low-code平台
        </h2>
      </div>
      <div class="editor-left-item" v-for="(component, index) in config.componentList" :key="index" draggable="true"
        @dragstart="dragstart($event, component)" @dragend="dragend">
        <ElButton>
          {{ component.label }}
        </ElButton>

      </div>
    </div>
    <div class="editor-top">
      <div class="editor-top-button" v-for="(btn, index) in buttons" :key="index" @click="btn.handle">
        <ElButton>{{ btn.label }}</ElButton>
      </div>
    </div>
    <div class="editor-right">
      <ElTabs class="editor-right-form-tabs" type="card">
        <ElTabPane label="属性">
          <Changestyle v-model="data"></Changestyle>
        </ElTabPane>
        <ElTabPane label="事件">
          <AddEvent v-model="data"></AddEvent>
        </ElTabPane>
       
      </ElTabs>
    </div>
    <div class="editor-container">
      
      <div class="editor-container-canvas_content" :style="containerStyles" ref="containerRef"
        @mousedown="containerMousedown">
        <Grid></Grid>
        <PreviewDemo v-model="data"></PreviewDemo>
        <div v-for="(block, index) in data.blocks" :key="index">
          <EditorBlock :class="block.focus ? 'editor-block-focus' : ''"
            @mousedown="blockMousedown($event, block, index)" :block="block" :data="data" :index="index"></EditorBlock>
        </div>
        <div class="line-x" :style="{ left: markLine.x + 'px' }" v-show="markLine.x != null"></div>
        <div class="line-y" :style="{ top: markLine.y + 'px' }" v-show="markLine.y != null"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, ref } from "vue";
import { ElButton, ElTabPane, ElTabs } from "element-plus"
import "./editor.scss";
import EditorBlock from "./material.js";
import deepcopy from "deepcopy";
import { useMenuDragger } from "../../hooks/useMenuDragger";
import { useFocus } from "../../hooks/useFocus";
import { useBlockDragger } from "../../hooks/useBlockDragger";
import Grid from "../Grid"
import { useCommand } from "../../hooks/useCommand"
import PreviewDemo from "../Preview/previewDemo.js"
import Changestyle from "../ChangeStyle/index.vue"
import AddEvent from "../AddEvent/index.vue";

export default {
  components: {
    EditorBlock,
    Grid,
    ElButton,
    PreviewDemo,
    ElTabPane,
    ElTabs,
    Changestyle,
    AddEvent,
    AddEvent
  },
  props: {
    modelValue: { type: Object }
  },
  emits: ["update:modelValue"], //要触发的事件
  setup(props, ctx) {

    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        ctx.emit("update:modelValue", deepcopy(newValue));
      }
    });
    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px"
    }));
    const config = inject("config");
    const containerRef = ref(null);
    const { dragstart, dragend } = useMenuDragger(containerRef, data);

    //3、实现拖拽多个元素
    const {
      blockMousedown,
      containerMousedown,
      focusData,
      lastSelectBlock
    } = useFocus(data, e => {
      mousedown(e);
    });

    const { mousedown, markLine } = useBlockDragger(
      focusData,
      lastSelectBlock,
      data
    );

    function preview(text) {
      let data = new FormData();
      data.append("page", text);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://haloerkay.top:8888/post");
      xhr.send(data);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let a = document.createElement("a");
            // console.log(xhr.responseText)
            let id =xhr.responseText
            document.body.appendChild(a);
            a.style = "display: none";
            a.target = "_blank";
            a.href = "http://haloerkay.top:8888/" + id
            a.click();
            document.body.removeChild(a);
            console.log(200)
          } else {
            window.alert("发布失败");
          }
        }
      }
    }

    const out = "<!DOCTYPE html>\n" +
              "<html lang=\"en\">\n" +
              "<head>\n" +
              "<meta charset=\"UTF-8\">\n" +
              "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
              "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
              `<title>project</title>\n` +
              `<style></style>\n` +
              "</head>\n" +
              "<body>" +
               "<h1>实在是不知道怎么做了！！<h1>"+
              "\n</body>\n" +
              "</html>"


    const { commands } = useCommand(data)
    const buttons = [
      { label: "撤销", handle: () => commands.undo() },
      { label: "重做", handle: () => commands.redo() },
      {
        label: "清空", handle: () => {
          if (confirm("该操作将清空页面，是否确认清空？")) {
            data.value.blocks = []
          } else {
            return
          }
        }
      },
      { label: "预览", handle: () => commands.preview() },
      {label:"导出",handle:()=>{alert(JSON.stringify(data.value))}},
      {
        label: "发布", handle: () => {
              
            preview(out);
        }
      },
    ]

    return {
      data,
      containerStyles,
      config,
      containerRef,
      dragstart,
      dragend,
      blockMousedown,
      containerMousedown,
      focusData,
      lastSelectBlock,
      mousedown,
      markLine,
      buttons
    };
  }
};
</script>

<style>
</style>

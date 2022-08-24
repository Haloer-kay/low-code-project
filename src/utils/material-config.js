import {ElButton, ElInput} from "element-plus"
import './config.scss'

function createEditorConfig(){
    const componentList=[];
    const componentMap={}

    return {
        componentList,
        componentMap,
        register:(component)=>{
            componentList.push(component)
            componentMap[component.key]=component
        }
    }
}

export let registerConfig = createEditorConfig();
registerConfig.register({
    label:"文本",
    render:()=><span>默认文本</span>,
    key:'text'
})
registerConfig.register({
    label:"链接",
    render:()=><a href="https://www.bytedance.com">默认链接</a>,
    key:'a'
})
// registerConfig.register({
//     label:"输入",
//     render:()=><ElInput placeholder="默认输入框"></ElInput>,
//     key:'input'
// })

registerConfig.register({
    label:"按钮",
    render:()=><ElButton>默认按钮</ElButton>,
    key:'button'
})


registerConfig.register({
    label:"图片",
    render:()=><img src="./static/imgs/index.png" alt="默认图片" class='img'></img>,
    key:'img'
})
registerConfig.register({
    label:"视频",
    render:()=><video  src="./static/video/index.mp4" class='video' controls> </video>,
    key:'video'
})
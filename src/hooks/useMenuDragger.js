import {events} from "../packages/events"

export function useMenuDragger(containerRef,data){
    let currentComponent=null

    const dragenter=(e)=>{
        e.dataTransfer.dropEffect='move'
    }
    const dragover=(e)=>{
        e.preventDefault();
    }
    const dragleave=(e)=>{
        e.dataTransfer.dropEffect='none'

    }
    const drop=(e)=>{

        let blocks=data.value.blocks  //之前的
        data.value= {
            ...data.value,blocks:[
                ...blocks,
                {
                    top:e.offsetY,
                    left:e.offsetX,
                    zIndex:1,
                    key:currentComponent.key,
                    alignCenter:true //希望居中
                }
            ]
        }
        currentComponent=null

    }
    const dragstart=(e,component)=>{
        //dragenter进入元素中 添加一个移动的标识
        //dragover在目标元素经过，阻止默认行为
        //dragleave离开元素，增加禁用标识
        //drop 根据拖拽的组件 添加一个组件
        containerRef.value.addEventListener('dragenter',dragenter)
        containerRef.value.addEventListener('dragover',dragover)
        containerRef.value.addEventListener('dragleave',dragleave)
        containerRef.value.addEventListener('drop',drop)
        currentComponent=component
        events.emit("start")
    }
    const dragend=(e,component)=>{
        containerRef.value.addEventListener('dragenter',dragenter)
        containerRef.value.addEventListener('dragover',dragover)
        containerRef.value.addEventListener('dragleave',dragleave)
        containerRef.value.addEventListener('drop',drop)
        events.emit("end")
    }

    return{
        dragend,
        dragstart
    }
}

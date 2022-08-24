import { events } from '@/packages/events'
import {reactive} from 'vue'
export function useBlockDragger(focusData,lastSelectBlock,data){

    let dragState = {
        startX: 0,
        startY: 0,
        dragging:false
    }
  
    let markLine=reactive({
        x:null,
        y:null
    })
    const mousemove = (e) => {
        let { clientX: moveX, clientY: moveY } = e
        if(!dragState.dragging){
            dragState.dragging=true
            events.emit("start")
        }
        //计算当前元素最新的left和top，找到显示线
        let x=null
        let y=null
        //鼠标移动后-鼠标移动前+left
        let left=moveX-dragState.startX+dragState.startLeft
        let top=moveY-dragState.startY+dragState.startTop

        for(let i=0;i<dragState.lines.x.length;i++){
            const {left:l,showLeft:s } =dragState.lines.x[i]
            if(Math.abs(l-left)<5){
                x=s
                moveX=dragState.startX-dragState.startLeft+l;
                break;
            }
        }
        for(let i=0;i<dragState.lines.y.length;i++){
            const {top:t,showTop:s } =dragState.lines.y[i]
            if(Math.abs(t-top)<5){
                y=s
                moveY=dragState.startY-dragState.startTop+t;
                break;
            }
        }

        markLine.x=x;
        markLine.y=y


        let durX = moveX - dragState.startX
        let durY = moveY - dragState.startY
        focusData.value.focus.forEach((block, idx) => {
            block.top = dragState.startPos[idx].top + durY
            block.left = dragState.startPos[idx].left + durX
            if(block.top<0) block.top=0
            if(block.left<0) block.left=0
            if(block.top>=parseInt(data.height)){
                console.log("cao")
                block.top=Number(data.height)
            }
        })
    }
    const mouseup = (e) => {
        document.removeEventListener("mousemove", mousemove)
        document.removeEventListener("mouseup", mouseup)
        markLine.x=null
        markLine.y=null
        if(dragState.dragging){
            events.emit("end")
        }
    }

    const mousedown = (e) => {
        const {width:BWidth,height:BHeight}=lastSelectBlock.value
        dragState = {
            startX: e.clientX,
            startY: e.clientY,//记录每一个选中的位置
            startLeft:lastSelectBlock.value.left,
            startTop:lastSelectBlock.value.top,
            dragging:false,

            startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })),
            lines:(()=>{
                const {unfocus}=focusData.value

                let lines={x:[],y:[]};
                [...unfocus,
                    {
                     top:0,
                     left:0,
                     width:data.value.container.width,
                     height:data.value.container.height
                }].forEach((block)=>{
                    const {top:ATop,left:ALeft,width:AWidth,height:AHeight}=block
                    lines.y.push({showTop:ATop,top:ATop})
                    lines.y.push({showTop:ATop,top:ATop-BHeight})//顶对底
                    lines.y.push({showTop:ATop+AHeight/2,top:ATop+AHeight/2-BHeight/2})//中对中
                    lines.y.push({showTop:ATop+AHeight,top:ATop+AHeight})//底对顶
                    lines.y.push({showTop:ATop+AHeight,top:ATop+AHeight-BHeight})//底对顶

                    lines.x.push({showLeft:ALeft,left:ALeft})
                    lines.x.push({showLeft:ALeft+AWidth,left:ALeft+AWidth})
                    lines.x.push({showLeft:ALeft+AWidth/2,left:ALeft+AWidth/2-BWidth/2})
                    lines.x.push({showLeft:ALeft+AWidth,left:ALeft+AWidth-BWidth})
                    lines.x.push({showLeft:ALeft,left:ALeft-BWidth})

                })
                return lines
                
            })()
        }

        document.addEventListener("mousemove", mousemove)
        document.addEventListener("mouseup", mouseup)
    }
    return{
        mousedown,
        markLine
    }
}
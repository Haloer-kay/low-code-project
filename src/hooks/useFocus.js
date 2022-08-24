import {computed,ref} from "vue";

export function useFocus(data,callback){


    let selectIndex=ref(-1)
    const lastSelectBlock=computed(()=>data.value.blocks[selectIndex.value])

    //知道哪些元素被选中
    const focusData=computed(()=>{
        let focus=[]
        let unfocus=[]
        data.value.blocks.forEach(block => (block.focus ? focus : unfocus).push(block))
        return {focus,unfocus}
    })
    const  clearBlockFocus=()=>{
        data.value.blocks.forEach(block=>block.focus=false)
    }
    const blockMousedown=(e,block,index)=>{ 
    console.log(focusData);

        e.preventDefault()
        e.stopPropagation()
    
        if(e.ctrlKey){
            
                block.focus=!block.focus
        }else{
            if(!block.focus){
                clearBlockFocus()
                block.focus=true
            }
        }
        selectIndex.value=index
      callback(e)
    }
    //点击容器，让选中的失去焦点
    const containerMousedown=()=>{
        clearBlockFocus()
        selectIndex.value=-1
    }
 
    return{
        blockMousedown,
        focusData,
        containerMousedown,
        lastSelectBlock
    }    
}
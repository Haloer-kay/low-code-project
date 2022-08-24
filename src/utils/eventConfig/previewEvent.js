export function previewEvent(blockRef, data,index) {

    console.log(blockRef,data,index);
    blockRef.value.addEventListener('click',()=>{
        console.log(data);
        let fn=new Function(data.value.event[index].oneEvent)
        fn()
    })
    blockRef.value.ondblclick=()=>{
        console.log(data);
        let fn=new Function(data.value.event[index].doubleEvent)
        fn()
    }
}
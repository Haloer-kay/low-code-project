export function previewDraw(blockRef, data, index){
    blockRef.value.children[0].style.width = `${data.value.style[index].width}px`;
    blockRef.value.children[0].style.height = `${data.value.style[index].height}px`;
    blockRef.value.children[0].style.color = data.value.style[index].color;
    blockRef.value.children[0].innerHTML = data.value.style[index].innerHTML;
    blockRef.value.children[0].style.background = data.value.style[index].background;
    if(data.value.blocks[index].key=='a'){
        blockRef.value.children[0].href=data.value.style[index].href
    }
    if(data.value.blocks[index].key=='img'){
        blockRef.value.children[0].src=data.value.style[index].src
    }
}
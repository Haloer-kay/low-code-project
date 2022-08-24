export function lastDraw(blockRef, block, data, id) {
    if (blockRef.value != null) {
        blockRef.value.children[0].style.width = `${data.style[id].width}px`;
        block.width = data.style[id].width;
        blockRef.value.children[0].style.height = `${data.style[id].height}px`;
        block.height = data.style[id].height;
        blockRef.value.children[0].style.color = data.style[id].color;
        blockRef.value.children[0].innerHTML = data.style[id].innerHTML;
        blockRef.value.children[0].style.background = data.style[id].background ;
        if(data.blocks[id].key=='a'){
            blockRef.value.children[0].href=data.style[id].href
        }
        if(data.blocks[id].key=='img'){
            blockRef.value.children[0].src=data.style[id].src
        }

    }
}
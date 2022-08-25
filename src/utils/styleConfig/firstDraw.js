export function firstDraw(blockRef, data, offsetWidth, offsetHeight, id) {
  blockRef.value.children[0].style.color = "#000000";
  let style = data.style;
  data.style = [
    ...style,
    {
      width: offsetWidth,
      height: offsetHeight,
      color: blockRef.value.children[0].style.color,
      innerHTML: "",
      background: "",
    },
  ];
  switch (data.blocks[id].key) {
    case "text":
      data.style[id].innerHTML = "默认文本";
      break;
    case "button":
      data.style[id].innerHTML = "默认按钮";
      break;
    case "a":
      data.style[id].innerHTML = "默认链接";
      data.style[id].href = "https://www.bytedance.com";
      break;
    case "input":
      data.style[id].innerHTML = "默认输入框";
      break;
    case "img":
      data.style[id].src = "./static/imgs/index.png";
      break;
    default:
      data.style[id].innerHTML = "";
  }
  blockRef.value.children[0].style.width = `${data.style[id].width}px`;
  blockRef.value.children[0].style.height = `${data.style[id].height}px`;
  blockRef.value.children[0].innerHTML = data.style[id].innerHTML;
  blockRef.value.children[0].style.color = data.style[id].color;
  blockRef.value.children[0].style.background = data.style[id].background;
  if (data.blocks[id].key == "a") {
    blockRef.value.children[0].href = data.style[id].href;
  }
}

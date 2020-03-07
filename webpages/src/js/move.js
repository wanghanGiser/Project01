function moveTo(el,func) {
  let startx, starty, endx, endy;
  let $el = el;

  function cons() { //独立封装这个事件可以保证执行顺序，从而能够访问得到应该访问的数据。  
    if (startx > endx&&(Math.abs(startx-starty)/Math.abs(endx-endy))>2) { 
      //判断左右移动程序  
      func("left")
    } else {
      func("right")
    }
    func("")
  }
  $el.addEventListener('touchstart', function (e) {
    var touch = e.changedTouches;
    startx = touch[0].clientX;
    starty = touch[0].clientY;
  });
  $el.addEventListener('touchend', function (e) {
    var touch = e.changedTouches;
    endx = touch[0].clientX;
    endy = touch[0].clientY;
    cons();//startx endx 的数据收集应该放在touchend事件后执行，而不是放在touchstart事件里执行，这样才能访问到touchstart和touchend这2个事件产生的startx和endx数据。另外startx和endx在_touch事件函数里是全局性的，所以在此函数中都可以访问得到，所以只需要注意事件执行的先后顺序即可。  
  });
}
export default moveTo;
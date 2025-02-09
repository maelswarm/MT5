// 2kb one liner. full version: https://github.com/nelsonic/range-touch
(function (e) { function a(e, t, n, r) { return Math.abs(e - t) >= Math.abs(n - r) ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down" } function f() { s = null; if (t.last) { t.el.trigger("longTap"); t = {} } } function l() { if (s) clearTimeout(s); s = null } function c() { if (n) clearTimeout(n); if (r) clearTimeout(r); if (i) clearTimeout(i); if (s) clearTimeout(s); n = r = i = s = null; t = {} } function h(e) { return (e.pointerType == "touch" || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary } function p(e, t) { return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t } var t = {}, n, r, i, s, o = 750, u; e(document).ready(function () { var d, v, m = 0, g = 0, y, b; if ("MSGesture" in window) { u = new MSGesture; u.target = document.body } e(document).bind("MSGestureEnd", function (e) { var n = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null; if (n) { t.el.trigger("swipe"); t.el.trigger("swipe" + n) } }).on("touchstart MSPointerDown pointerdown", function (r) { if ((b = p(r, "down")) && !h(r)) return; y = b ? r : r.touches[0]; if (r.touches && r.touches.length === 1 && t.x2) { t.x2 = undefined; t.y2 = undefined } d = Date.now(); v = d - (t.last || d); t.el = e("tagName" in y.target ? y.target : y.target.parentNode); n && clearTimeout(n); t.x1 = y.pageX; t.y1 = y.pageY; if (v > 0 && v <= 250) t.isDoubleTap = true; t.last = d; s = setTimeout(f, o); if (u && b) u.addPointer(r.pointerId) }).on("touchmove MSPointerMove pointermove", function (e) { if ((b = p(e, "move")) && !h(e)) return; y = b ? e : e.touches[0]; l(); t.x2 = y.pageX; t.y2 = y.pageY; m += Math.abs(t.x1 - t.x2); g += Math.abs(t.y1 - t.y2) }).on("touchend MSPointerUp pointerup", function (s) { if ((b = p(s, "up")) && !h(s)) return; l(); if (t.x2 && Math.abs(t.x1 - t.x2) > 30 || t.y2 && Math.abs(t.y1 - t.y2) > 30) i = setTimeout(function () { t.el.trigger("swipe"); t.el.trigger("swipe" + a(t.x1, t.x2, t.y1, t.y2)); t = {} }, 0); else if ("last" in t) if (m < 30 && g < 30) { r = setTimeout(function () { var r = e.Event("tap"); r.cancelTouch = c; t.el.trigger(r); if (t.isDoubleTap) { if (t.el) t.el.trigger("doubleTap"); t = {} } else { n = setTimeout(function () { n = null; if (t.el) t.el.trigger("singleTap"); t = {} }, 250) } }, 0) } else { t = {} } m = g = 0 }).on("touchcancel MSPointerCancel pointercancel", c); e(window).on("scroll", c) });["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (t) { e.fn[t] = function (e) { return this.on(t, e) } }) })(window.$)

function addRangeListeners() {
  console.log("added range listeners");
  $("body").on("input", "input.display-value", function () {
    console.log("display value");
    $(this).next().val($(this).val());
  });

  // see: http://stackoverflow.com/a/18389801/1148249
  $('body').on("input", 'input[type="range"]', function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min')) * 100;
    console.log("val = " + val);
  });
}

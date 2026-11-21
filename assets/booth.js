/* ==========================================================
   인융 ATTACK — 상품 설정 (모든 ATTACK이 이 파일을 같이 써요)
   상품 이름을 바꾸려면 여기만 고치면 돼요.
   ========================================================== */
window.BOOTH = (function(){
  const PRIZES = {
    "상":    {name:"보조 배터리",     cls:"p3"},
    "중":    {name:"키캡 키링",       cls:"p2"},
    "하":    {name:"리무버블 스티커", cls:"p1", note:"3종 중 마음에 드는 걸 골라요"},
    "참가상": {name:"참가상",          cls:"p0", note:"아쉽지만 도전해 줘서 고마워요!"}
  };
  const esc = t => String(t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  /* 보상 박스. grade: "상"|"중"|"하"|"참가상", note: 짧은 추가 안내(선택), attack: ATTACK 알파벳 "A"~"D" */
  function stamp(grade, note, attack){
    const p = PRIZES[grade] || PRIZES["하"];
    const say = attack ? `${attack} - ${grade}` : grade;
    return `<div class="reward ${p.cls}" role="status">
      <div class="rw-h">REWARD · 보상</div>
      <div class="rw-main"><span class="g">${esc(grade==="참가상"?"참":grade)}</span><b>${esc(grade==="참가상"?"참가상":p.name)}</b></div>
      <div class="rw-say">본부에서 말하기 · <b>${esc(say)}</b></div>
      ${note?`<div class="rw-note">${esc(note)}</div>`:""}
    </div>`;
  }
  return {PRIZES, stamp, esc};
})();

/* ==========================================================
   화면 맞춤: 노트북·모니터(가로 900px 이상)에서 내용이 화면보다 길면
   스크롤 없이 한 화면에 들어오도록 전체를 살짝 축소해요.
   ========================================================== */
(function(){
  const MIN = 0.5;                  // 이보다 작게는 줄이지 않아요
  function fit(){
    const b = document.documentElement; if(!document.body) return;
    b.style.zoom = "";
    if(innerWidth < 900) return;      // 휴대폰·세로 화면은 원래대로 스크롤
    const h = document.documentElement.scrollHeight;
    const z = Math.max(MIN, Math.min(1, (innerHeight - 2) / h));
    if(z < 0.995) b.style.zoom = z.toFixed(3);
  }
  let q = 0; const sched = () => { cancelAnimationFrame(q); q = requestAnimationFrame(fit); };
  addEventListener("load", sched); addEventListener("resize", sched);
  document.addEventListener("DOMContentLoaded", () => {
    sched();
    new MutationObserver(sched).observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:["class","hidden"]});
    document.querySelectorAll("img").forEach(i => i.addEventListener("load", sched));
  });
  window.BOOTH_FIT = sched;
})();

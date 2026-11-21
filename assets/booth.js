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
  /* grade: "상" | "중" | "하" | "참가상",  extra: 한 줄 추가 안내(선택),  attack: "CODE ATTACK" 등
     참가자는 이 화면의 문구를 기억했다가 본부(운영본부)에서 말하고 상품을 받아요. */
  function stamp(grade, extra, attack){
    const p = PRIZES[grade] || PRIZES["하"];
    const say = `${attack ? attack+" " : ""}${grade}`;
    const josa = /[상중]$/.test(grade) ? "이라고" : "라고";
    const prizeLine = grade==="참가상" ? "참가상" : `${grade} 상품 · ${p.name}`;
    const sub = [prizeLine, p.note, extra].filter(Boolean).map(esc).join(" · ");
    return `<div class="prize-stamp ${p.cls}" role="status">
      <div class="g${grade.length>1?" small":""}">${esc(grade)}</div>
      <div><small>본부에서 이렇게 말해 주세요</small><b>“${esc(say)}”</b><span>${sub}</span></div>
    </div>`;
  }
  return {PRIZES, stamp, esc};
})();

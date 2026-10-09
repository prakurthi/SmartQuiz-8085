const questions = [
  {q:"Which language is mainly used to structure a web page?", options:["Java","HTML","Python","C++"], answer:1},
  {q:"Which register is the main arithmetic register in the 8085?", options:["Accumulator (A)","Program Counter","Stack Pointer","Instruction Register"], answer:0},
  {q:"Which 8085 instruction reads data from an input port?", options:["OUT","STA","IN","MOV"], answer:2},
  {q:"Which number system uses only 0 and 1?", options:["Decimal","Octal","Hexadecimal","Binary"], answer:3},
  {q:"Which instruction can jump when the zero flag is set?", options:["JNZ","JZ","JNC","JMP"], answer:1}
];
let index=0, scores={A:0,B:0}, winner=null, started=false, answered=false, timeLeft=30, timerHandle=null;
const $=id=>document.getElementById(id);
function renderQuestion(){
  const item=questions[index]; $("questionCount").textContent=`Question ${index+1} / ${questions.length}`;
  $("questionText").textContent=item.q; $("feedback").textContent="Press Start Round, then buzz in!";
  $("answers").innerHTML="";
  item.options.forEach((opt,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=String.fromCharCode(65+i)+". "+opt;b.disabled=true;b.addEventListener("click",()=>chooseAnswer(i));$("answers").appendChild(b)});
  $("scoreA").textContent=scores.A;$("scoreB").textContent=scores.B;
  $("statusA").textContent="Ready to play";$("statusB").textContent="Ready to play";
  $("buzzA").disabled=true;$("buzzB").disabled=true;
  $("timer").textContent="--";$("roundStatus").textContent="NOT STARTED";
  winner=null;started=false;answered=false;clearInterval(timerHandle);
}
function startRound(){
  if(started)return;started=true;answered=false;winner=null;timeLeft=30;
  $("buzzA").disabled=false;$("buzzB").disabled=false;
  [...document.querySelectorAll(".answer")].forEach(b=>b.disabled=true);
  $("timer").textContent=timeLeft;$("roundStatus").textContent="BUZZERS OPEN";
  $("feedback").textContent="Round started — press your team's buzzer!";
  timerHandle=setInterval(()=>{if(!started||winner||answered){clearInterval(timerHandle);return;}timeLeft--;$("timer").textContent=timeLeft;if(timeLeft<=0){started=false;$("buzzA").disabled=true;$("buzzB").disabled=true;$("roundStatus").textContent="TIME UP";$("feedback").textContent="Time is up. Reset or go to the next question.";clearInterval(timerHandle)}},1000);
}
function buzz(team){
  if(!started||winner||answered)return;
  winner=team;started=false;clearInterval(timerHandle);
  $("buzzA").disabled=true;$("buzzB").disabled=true;
  $("roundStatus").textContent=`TEAM ${team} WON BUZZ`;
  $("status"+team).textContent="⚡ First to buzz!";
  $("status"+(team==="A"?"B":"A")).textContent="Locked out";
  $("feedback").textContent=`Team ${team} buzzed first! Select the answer for Team ${team}.`;
  [...document.querySelectorAll(".answer")].forEach(b=>b.disabled=false);
}
function chooseAnswer(choice){
  if(!winner||answered)return;answered=true;
  const correct=questions[index].answer;const buttons=[...document.querySelectorAll(".answer")];
  buttons.forEach((b,i)=>{b.disabled=true;if(i===correct)b.classList.add("correct");else if(i===choice)b.classList.add("wrong")});
  if(choice===correct){scores[winner]+=10;$("feedback").textContent=`Correct! Team ${winner} earns 10 points.`}
  else $("feedback").textContent=`Not quite. The correct answer is ${questions[index].options[correct]}.`;
  $("scoreA").textContent=scores.A;$("scoreB").textContent=scores.B;$("roundStatus").textContent="ROUND COMPLETE";
}
function resetRound(){renderQuestion()}
function nextQuestion(){
  if(index===questions.length-1){$("feedback").textContent=`Quiz finished! Final score — Team A: ${scores.A}, Team B: ${scores.B}.`; $("roundStatus").textContent="QUIZ FINISHED";$("buzzA").disabled=true;$("buzzB").disabled=true;clearInterval(timerHandle);return}
  index++;renderQuestion();
}
$("startBtn").addEventListener("click",startRound);$("resetBtn").addEventListener("click",resetRound);
$("nextBtn").addEventListener("click",nextQuestion);$("buzzA").addEventListener("click",()=>buzz("A"));$("buzzB").addEventListener("click",()=>buzz("B"));
renderQuestion();

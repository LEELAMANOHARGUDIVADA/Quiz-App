const startButton = document.getElementById("startButton");
const rulesBox = document.getElementById("rulesBox");
const exitButton = document.querySelector(".exit");
const quiz_box = document.querySelector(".quiz-box");
const option_list = document.querySelector(".options-list");
const timeCount = quiz_box.querySelector(".timer .time");
const timeLine = quiz_box.querySelector("header .time-line");

startButton.addEventListener("click", () => {
  rulesBox.style.display = "block";
});

exitButton.addEventListener("click", () => {
  rulesBox.style.display = "none";
});

const continueButton = document.getElementById("continue-button");
const quizBox = document.getElementById("quiz-box");

continueButton.addEventListener("click", () => {
  quizBox.style.display = "block";
  showQuestions(0);
  quesCounter(1);
  startTimer(15);
  startTimerLine(0);
});

let ques_count = 0;
let ques_number = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next");
const result_box = document.querySelector(".result-container");
const restart_quiz = result_box.querySelector(".button .restart");
const quit_quiz = result_box.querySelector(".button .quit");

quit_quiz.onclick = () =>{
  window.location.reload();
}
restart_quiz.onclick = () =>{
  window.location.reload();
}

next_btn.onclick = () => {
  rulesBox.style.display = "none";

  if (ques_count < questions.length - 1) {
    ques_count++;
    ques_number++;
    showQuestions(ques_count);
    quesCounter(ques_number);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
  } else {
    console.log("Questions Completed");
    showResultBox();
  }
};
function showQuestions(index) {
  const ques_text = document.querySelector(".question-header");
  let ques_tag =
    "<span>" +
    questions[index].number +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";
  ques_text.innerHTML = ques_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let rightIcon = '<div class="icon right"><i class="ri-check-line"></i></div>'
let wrongIcon = '<div class="icon wrong"><i class="ri-close-line"></i></div>'

function optionSelected(answer){
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[ques_count].answer;
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct");
  }else{
    answer.classList.add("incorrect");
    console.log("Incorrect Answer");
    answer.insertAdjacentHTML("beforeend", wrongIcon);
  }

  for (let i = 0; i < allOptions; i++) {
       if(option_list.children[i].textContent == correctAns){
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", rightIcon);
       }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); 
  }
  next_btn.style.display = "block";
}

function showResultBox(){
  quiz_box.classList.add("noactiveQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score");
  if (userScore > 3) {
    let scoreTag = '<span>Congrats, you scored <p>'+ userScore +'</p> Out Of <p>'+ questions.length +'</p>Points</span>';
    scoreText.innerHTML = scoreTag;
  }
  else if (userScore > 1) {
    let scoreTag = '<span>Sorry, you only scored <p>'+ userScore +'</p> Out Of <p>'+ questions.length +'</p>Points</span>';
    scoreText.innerHTML = scoreTag;
  }
  else{
    let scoreTag = '<span>Sorry, you only scored <p>'+ userScore +'</p> Out Of <p>'+ questions.length +'</p>Points</span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
      timeCount.textContent = time;
      time--;
      if(time < 9){
        let addZero = timeCount.textContent;
        timeCount.textContent = "0" + addZero;
      }
      if(time < 0){
        clearInterval(counter);
        timeCount.textContent = '00';

      }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
      time += 1;
      timeLine.style.width = time + "px";
      if(time > 549){
        clearInterval(counterLine);

      }
    }
}

function quesCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".series");
  let totalQuesCountTag =
    "<span><p>" +
    index +
    "</p>Of<p>" +
    questions.length +
    "</p>Questions</span>";
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}

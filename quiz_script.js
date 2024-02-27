const questions = [
  {
    question: "What is the approximate diameter of the largest known star, UY Scuti?",
    answer: [
      { text: "1,000,000 km", correct: false },
      { text: "2,000,000 km", correct: true },
      { text: "5,000,000 km", correct: false },
      { text: "10,000,000 km", correct: false },
    ],
  },
  {
    question: "Which planet in our solar system has the highest surface gravity?",
    answer: [
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Neptune", correct: false },
      { text: "Earth", correct: false },
    ],
  },
  {
    question: "What is the name of the first artificial satellite launched into space?",
    answer: [
      { text: "Sputnik 1", correct: true },
      { text: "Explorer 1", correct: false },
      { text: "Vanguard 1", correct: false },
      { text: "Luna 1", correct: false },
    ],
  },
  {
    question: "What phenomenon causes the tails of comets to always point away from the Sun?",
    answer: [
      { text: "Solar Wind", correct: false },
      { text: "Gravitational Pull", correct: false },
      { text: "Magnetic Field", correct: false },
      { text: "Radiation Pressure", correct: true },
    ],
  },
  {
    question: "Which of Saturn's moons is known for its heavily cratered surface resembling a Death Star from Star Wars?",
    answer: [
      { text: "Titan", correct: false },
      { text: "Enceladus", correct: false },
      { text: "Mimas", correct: true },
      { text: "Iapetus", correct: false },
    ],
  },
  {
    question: "What is the most abundant element in the universe by mass?",
    answer: [
      { text: "Hydrogen", correct: true },
      { text: "Helium", correct: false },
      { text: "Oxygen", correct: false },
      { text: "Carbon", correct: false },
    ],
  },
  {
    question: "Which spacecraft was the first to land humans on the Moon?",
    answer: [
      { text: "Apollo 10", correct: false },
      { text: "Apollo 13", correct: false },
      { text: "Apollo 14", correct: false },
      { text: "Apollo 11", correct: true },
    ],
  },
  {
    question: "What is the name of the nearest star to the Sun?",
    answer: [
      { text: "Alpha Centauri A", correct: false },
      { text: "Proxima Centauri", correct: true },
      { text: "Sirius", correct: false },
      { text: "Betelgeuse", correct: false },
    ],
  },
  {
    question: "Which planet in our solar system has the shortest day?",
    answer: [
      { text: "Mercury", correct: false },
      { text: "Venus", correct: true },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What is the name of the spacecraft launched by NASA in 1977 to study the outer planets of our solar system?",
    answer: [
      { text: "Voyager 1", correct: true },
      { text: "Pioneer 10", correct: false },
      { text: "New Horizons", correct: false },
      { text: "Juno", correct: false },
    ],
  },
  {
    question: "What causes the different phases of the Moon as seen from Earth?",
    answer: [
      { text: "Earth's Shadow", correct: false },
      { text: "Changes in the Moon's surface temperature", correct: false },
      { text: "Rotation of the moon on its axis", correct: false },
      { text: "The relative positions of the Sun, Moon and Earth", correct: true },
    ],
  },
  {
    question: "Which moon of Jupiter is known for its geysers of water vapor erupting from its surface?",
    answer: [
      { text: "Ganymede", correct: false },
      { text: "IO", correct: false },
      { text: "Europa", correct: true },
      { text: "Callisto", correct: false },
    ],
  },
  {
    question: "Which space mission successfully landed the first rover on Mars in 1997?",
    answer: [
      { text: "Mars Express", correct: false },
      { text: "Mars Pathfinder", correct: true },
      { text: "Mars Global Surveyor", correct: false },
      { text: "Mars Reconnaissance Orbiter", correct: false },
    ],
  },
  {
    question: "What is the name of the largest volcano in the solar system, located on Mars?",
    answer: [
      { text: "Mount Everest", correct: false },
      { text: "Mauna Loa", correct: false },
      { text: "Olympus Mons", correct: true },
      { text: "Krakatoa", correct: false },
    ],
  },
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML= "Next";
    showQuestion();
}
function showQuestion(){
  resetState();
  let randomIndex=Math.floor(Math.random()*questions.length);
  let currentQuestion=questions[currentQuestionIndex];
  let questionNo= currentQuestionIndex+1;
  questionElement.innerHTML=questionNo + ". " + currentQuestion.question;
  currentQuestion.answer.forEach(answer=>{
      const button=document.createElement("button"); // Corrected button creation
      button.innerHTML=answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
          button.dataset.correct=answer.correct;
      }
      button.addEventListener("click",selectAnswer);
      
  });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect=selectedBtn.dataset.correct==="true"; // Corrected dataset comparison
  if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
  }
  else{
      selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button=>{
      if(button.dataset.correct==="true"){ // Corrected dataset comparison
          button.classList.add("correct");
      }
      button.disabled=true;
  });
  nextButton.style.display="block";
}
function showScore(){
  resetState();
  questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
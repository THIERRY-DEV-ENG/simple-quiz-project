const startbutton = document.getElementById('start-btn')
const nextbutton = document.getElementById('next-btn')

const questioncontainer = document.getElementById('question-container')
const questionelement = document.getElementById('question')
const answerbuttons = document.getElementById('answer-buttons')

let shuffledquestions, currentquestionindex;
let quizScore =0;


startbutton.addEventListener('click', startGame)
nextbutton.addEventListener('click', () =>{
    currentquestionindex++
    setnextQuestion()
})            


function startGame(){
    startbutton.classList.add('hide')
    shuffledquestions = questions.sort(() => Math.random() - .5)
    currentquestionindex = 0
    questioncontainer.classList.remove('hide')
    setnextQuestion()
    quizScore = 0;
}

 
function setnextQuestion(){
    resetState()
    showQuestion(shuffledquestions[currentquestionindex])
}

function showQuestion(question){
    questionelement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button')     
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerbuttons.appendChild(button)
    })
}       

function resetState(){
    clearStatusClass(document.body)
    nextbutton.classList.add('hide')
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

function selectAnswer(e){
    const selectedbutton = e.target
    const correct = selectedbutton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerbuttons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledquestions.length > currentquestionindex + 1){
        nextbutton.classList.remove('hide')
    }else{
        startbutton.innerText = 'Restart'
        startbutton.classList.remove('hide')
        alert('Your score is ' + quizScore + ' out of ' + shuffledquestions.length)
    }
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
        quizScore++
    }else{
        element.classList.add('wrong')
    }
}


 function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
 }
const questions = [ 
 {

 
    question: 'Which one  of these is a JavaScript framwework?',
    answer : [
        {text: 'Python', correct: false},
        {text: 'D', correct: false},
        {text: 'React', correct: true},
        {text: 'Eclipse', correct: false}
    ],
},
{
    question: 'Who is the President of Rwanda?',
    answer : [
        {text: 'Paul Kagame', correct: true},
        {text: 'Donald Trump', correct: false},
        {text: 'Emmanuel Macron', correct: false},
        {text: 'Yoweri Museveni', correct: false}
    ],
},
{
    question: 'What is 2 + 2?',
    answer : [
        {text: '4', correct: true},
        {text: '22', correct: false},
        {text: '5', correct: false},
        {text: '6', correct: false}
    ],
},
]

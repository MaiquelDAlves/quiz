let questaoAtual = 0;
let respostasOk = 0;

exibirQuestão()


function exibirQuestão() {

    if(questions[questaoAtual]){
        let q = questions[questaoAtual];
        let progresso = Math.floor((questaoAtual / questions.length) * 100);
        

        document.querySelector('.progress--bar').style.width = `${progresso}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let opcoesHtml = '';
        for(let i in q.options) {
            opcoesHtml += `<div data-option="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = opcoesHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', clickOptions);
        });
    } else {
       finalQuiz()
    }   
}

function clickOptions(e) {
    let data = e.target.getAttribute('data-option');
    let q = questions[questaoAtual];
    
    if(data == q.answer) {
        document.querySelector("[data-option='"+data+"']").style.background = 'rgba(2,255,0,0.3)';
        respostasOk++  
        questaoAtual++
        setTimeout(exibirQuestão, 500)
    } else {
        document.querySelector("[data-option='"+data+"']").style.background = 'rgba(255,0,0,0.3)';
        questaoAtual++
        setTimeout(exibirQuestão, 500)
    }
    
}

function finalQuiz() {
    let pctAcerto = Math.floor((respostasOk / questions.length) * 100);

    document.querySelector('.progress--bar').style.width = '100%';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
    
    if(pctAcerto < 30) {
        document.querySelector('.prizeImage').src = './img/Atenção Red.png';
        document.querySelector('.scoreText1').innerHTML = 'Que Pena!'
        document.querySelector('.scorePct').innerHTML = `Acertou ${pctAcerto}%`;
        document.querySelector('.scorePct').style.color = '#A52536';
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${respostasOk}.`;
    } else if (pctAcerto >= 30 && pctAcerto < 70) {
        document.querySelector('.prizeImage').src = './img/Atenção Yellow.png';
        document.querySelector('.scoreText1').innerHTML = 'Atenção!'
        document.querySelector('.scorePct').innerHTML = `Acertou ${pctAcerto}%`;
        document.querySelector('.scorePct').style.color = '#FBDF52';
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${respostasOk}.`;
    } else if (pctAcerto >= 70) {
        document.querySelector('.prizeImage').src = './img/prize.png';
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').innerHTML = `Acertou ${pctAcerto}%`;
        document.querySelector('.scorePct').style.color = '#486138';
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${respostasOk}.`;
    }
    document.querySelector('.scoreArea button').addEventListener('click', reset);
}

function reset() {
    questaoAtual = 0;
    respostasOk = 0;

    exibirQuestão()
}

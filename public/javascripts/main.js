function amountOfQuestions() {
    $('.generated-input').remove();
    let e = document.querySelector("#amount-of-questions");
    let value = e.options[e.selectedIndex].value;
    let text = e.options[e.selectedIndex].text;
    for (let i = 1; i <= value; i++) {
        console.log(i);
        $('#data-submit-form').append(`
             <div id="${i}" class="generated-input input-field col s6">
                <input id="answer-${i}" name="answer-${i}" type="text" class="generated-input validate" style="width: 70%;" required>
                <label for="asnwer-${i}">${i}. Vastuse variant</label>
                <p id="${i}" class="generated-checkbox">
                    <label>
                        <input id="checkbox-${i}" type="checkbox" />
                        <span>Kas vastus on õige?</span>
                    </label>
                </p>
            </div>
         `)
    }
    console.log(value);
}

window.onload = function () {
    amountOfQuestions();
};

//Retain scroll location after reload
$(window).scroll(function () {
    sessionStorage.scrollTop = $(this).scrollTop();
});
$(document).ready(function () {
    if (sessionStorage.scrollTop !== "undefined") {
        $(window).scrollTop(sessionStorage.scrollTop);
    }
});

function sendDataToServer() {

    let awnserArray = [];
    const question = document.querySelector("#question").value;
    const awnserCountElement = document.querySelector("#amount-of-questions");
    const awnserCounts = awnserCountElement.options[awnserCountElement.selectedIndex].value;
    const topicElement = document.querySelector("#input-topic");
    const topic = topicElement.options[topicElement.selectedIndex].value;

    //generate objects
    for (let i = 1; i <= awnserCounts; i++) {
        console.log(i);
        let awnser = document.querySelector(`#answer-${i}`).value;
        let awnser_result = $(`#checkbox-${i}`).is(":checked");
        awnserArray.push({awnser: awnser, check: awnser_result});
    }
    console.log(awnserCounts);
    $.post('/add/eucip', {
        awnsers: awnserArray,
        awnser_amount: awnserCounts,
        topic: topic,
        question: question
    }, (data, status) => {
        console.log('sent')
    });


    $('.posted-element').remove();
    $('#last-time-posted').append(`
    <div class="posted-element">
    <p><u>Viimane postitus serverisse</u></p>
    <p><b>Teema</b>: ${topic}</p>
    <p><b>Küsimus</b>: ${question}</p>
    <p id="awnsers-test"></p>
    </div>
    `);
    awnserArray.forEach((awnser, i) => {
        $('#awnsers-test').append(`<p><b>${i + 1}.Vastus(${awnser.check})</b>:  ${awnser.awnser}`);
    });
}

function checkAwnsers() {
    const elements = document.querySelectorAll('.awnser').length;
    for(var i=0; i< elements; i++){
        document.querySelector('.a-'+i).classList.remove('hiddendiv');

        let awnsered = $(`.question-${i}`).is(":checked");
        let awnser = $(`.solution-${i}`).is(":checked");
        console.log(awnsered, awnser);
        if(awnsered === awnser){
            console.log('correct');
            $(`.question-${i}-container`).addClass('correct-awnser');
            $(`.question-label-${i}`).css('color','white');
        }
        if(awnsered !== awnser){
            console.log('wrong');
            $(`.question-${i}-container`).addClass('wrong-awnser');
            $(`.question-label-${i}`).css('color','white');
        }
    }
        $('.btn-anchor-next').removeClass("disabled");
    $.post('/add/count');
}
function nextQuestion(){
    location.reload();
}


$(document).ready(() => {
    let questions = [];

    checkAnswers = () => {
        let answers = document.querySelectorAll('.answer');
        for (let index = 0; index < answers.length; index++) {
            const element = answers[index];
            let mark = element.parentNode.querySelector('#mark');
            if (mark != null) {
                mark.remove();
            }
            if (
                questions[index]["answer"].toLowerCase() == element.value.toLowerCase()
            ) {
                let check = document.createElement('img');
                check.src = "/static/img/check-solid.svg";
                check.id = 'mark';
                check.style.width = "24px";
                check.style.height = "24px";
                element.parentNode.appendChild(check);
            } else {
                let xmark = document.createElement('img');
                xmark.src = "/static/img/xmark-solid.svg";
                xmark.id = 'mark';
                xmark.style.width = "24px";
                xmark.style.height = "24px";
                element.parentNode.appendChild(xmark);
            }
        }
    };

    $("#next")[0].addEventListener("click", () => {
        let question = $("#question");
        if (question.val().trim() != "") {
            let index = questions.push({
                'text': question.val().trim(),
                'answer': "",
                'keys': question.val().trim().split(' ')
            }) - 1;
            let id = 0;
            $('.keys').html('');
            question.val().trim().split(' ').forEach(element => {
                let key = document.createElement('div');
                let p = document.createElement('p');
                let close = document.createElement('span');
                close.innerHTML = 'x';
                p.innerText = element;
                key.classList.add('container');
                key.classList.add('key');
                key.id = id;
                key.appendChild(p);
                key.appendChild(close);
                document.querySelector('.keys').appendChild(key);
                id++;
            });
            removeKeys(index);
            $("#question").val("");
            $('.keys').css('display', 'flex');
            console.log(questions);
        } else {
            alert("Question can't be empty");
        }
    });

    removeKeys = (index) => {
        document.querySelectorAll('.key').forEach(element => {
            element.addEventListener('click', (event) => {
                let id = event.target.id != "" ? event.target.id : event.target.parentNode.id;
                questions[index]['keys'].splice(id, 1);
                element.remove();
                updateKeys(id);
                console.log(questions);
            });
        });
    }

    updateKeys = (id) => {
        document.querySelectorAll('.key').forEach(element => {
            console.log(element.id, id);
            if (element.id > id) {
                element.id--;
            }
        });
    };

    $("#start")[0].addEventListener("click", () => {
        if (questions.length == 0) {
            alert("There are no questions");
        } else {
            let quiz = $(".quiz");
            quiz.html("");
            for (let index = 0; index < questions.length; index++) {
                const element = questions[index];
                const words = element['text'].split(' ');
                const ndx = Math.floor(Math.random() * element['keys'].length);
                let answer = (questions[index]["answer"] = element['keys'][ndx]);
                let part1 = document.createElement("p");
                let part2 = document.createElement("p");
                let input = document.createElement("input");
                let container = document.createElement("div");
                container.classList.add("container");
                container.classList.add("question");
                input.type = "text";
                input.classList.add("answer");
                input.maxLength = answer.length;
                input.style.width = `${answer.length * 16}px`;
                part1.innerText = words.slice(0, words.indexOf(answer)).join(" ");
                part2.innerText = words.slice(words.indexOf(answer) + 1, words.length).join(" ");
                container.appendChild(part1);
                container.appendChild(input);
                container.appendChild(part2);
                quiz[0].appendChild(container);
            }
            let check = document.createElement("button");
            check.textContent = "Check results!";
            check.classList.add("btn");
            check.addEventListener("click", checkAnswers);
            quiz[0].appendChild(check);
            $(".answers").css("display", "flex");
            console.log(questions);
        }
    });
});

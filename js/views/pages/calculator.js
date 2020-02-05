import Component from '../../views/components.js';

class Calculator extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
             <form action="">

                <fieldset class="fieldset_info">
                    <legend>Информация</legend>
                    
                        <div class="sex">
                            <label for="select_sex">Пол: </label>
                            <select id="select_sex" name="select_sex" autocomplete="off">
                                <option value="Женский">Женский</option>
                                <option value="Мужской">Мужской</option>
                            </select>
                        </div>

                        <div class="main_parameters">
                            <div class="age_parameter">
                                <input type="text" id="age" name="age" required autocomplete="off"><span class="without_focus">Возраст (лет)</span>
                            </div>
                          
                            <div class="height_parameter">
                                <input type="text" id="height" name="height" required autocomplete="off"><span class="without_focus">Рост (см)</span>
                            </div>
                          
                            <div class="weight_parameter">
                                <input type="text" id="weight" name="weight" required autocomplete="off"><span class="without_focus">Вес (кг)</span>
                            </div>
                        </div>
                </fieldset>

                <fieldset class="fieldset_goal">
                    <legend>Основная цель</legend>
                    
                        <div class="activity">
                            <label for="activities">Активность: </label>
                            <input type="text" id="activities" name="activities" placeholder="Ваша активность?" readonly>

                            <ul class="none">
                                <li>
                                    <p>Сидячий образ жизни</p>
                                    <p>(Мало или совсем не делаете упражнения, сидячая работа.)</p>
                                </li>
                                <li>
                                    <p>Небольшая активность</p>
                                    <p>(Небольшая физическая нагрузка / занятия спортом<br>
                                        1 - 3 раза в неделю)</p>
                                </li>
                                <li>
                                    <p>Умеренная активность</p>
                                    <p>(Достаточно большая физическая нагрузка / занятия<br>
                                        спортом 3 - 5 раза в неделю)</p>
                                </li>
                                <li>
                                    <p>Высокая активность</p>
                                    <p>(Большая физическая нагрузка / занятия спортом<br>
                                        6 - 7 раз в неделю)</p>
                                </li>
                                <li>
                                    <p>Очень высокая активность</p>
                                    <p>(Очень большая ежедневная физическая нагрузка / занятия<br>
                                        спортом и физическая работа или тренировки 2 раза в день)</p>
                                </li>
                            </ul>
                        </div>

                        <div class="goal">
                            <label for="goals">Цель: </label>
                            <input type="text" id="goals" name="goals" placeholder="Ваша цель?" readonly>

                            <ul class="none">
                                <li>
                                    <p>Поддержание веса тела</p>
                                </li>
                                <li>
                                    <p>Уменьшение веса тела</p>
                                </li>
                                <li>
                                    <p>Увеличение веса тела</p>
                                </li>
                            </ul>

                            <div class="change_goal none">
                                <p></p>
                                <input type="text" id="change_goal" name="change_goal" placeholder="рекомендуемый %: 20..." autocomplete="off">
                            </div>
                        </div>
                </fieldset>

                <fieldset class="fieldset_PFC">
                    <legend>Соотношение БЖУ</legend>
                        
                        <div class="PFC">
                            <div class="PFC_proteins">
                                <label for="proteins">Белки, %: </label>
                                <input type="text" id="proteins" name="proteins" placeholder="30..." required autocomplete="off">
                            </div>

                            <div class="PFC_fats">
                                <label for="fats">Жиры, %: </label>
                                <input type="text" id="fats" name="fats" placeholder="20..." required autocomplete="off">
                            </div>

                            <div class="PFC_carbohydrates">
                                <label for="carbohydrates">Углеводы, %: </label>
                                <input type="text" id="carbohydrates" name="carbohydrates" placeholder="50..." required autocomplete="off">
                            </div>
                        </div>
                </fieldset>
                    
                <button class="button_calculate" type="submit"></button>
             </form>

            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        let mainParameters = document.getElementsByClassName('main_parameters')[0], //блок с тремя инпутами для роста, веса, возраста
            inputActivity = document.getElementById('activities'), //инпут активности
            activityBlock = document.getElementsByClassName('activity')[0],
            ulActivity = activityBlock.getElementsByTagName('ul')[0], //ul активностей
            inputGoal = document.getElementById('goals'), //инпут целей
            goalBlock = document.getElementsByClassName('goal')[0],
            ulGoal = goalBlock.getElementsByTagName('ul')[0], //ul целей
            changeGoalBlock = document.getElementsByClassName('change_goal')[0],
            changeGoalBlockParagraph = changeGoalBlock.getElementsByTagName('p')[0],
            changeGoalBlockInput = changeGoalBlock.getElementsByTagName('input')[0],
            form = document.getElementsByTagName('form')[0],
            inputs = form.getElementsByTagName('input'); //коллекция всех инпутов

        //Обработчики событий повесили
        this.gmbBtn.addEventListener('click', () => this.menu.classList.toggle('dsp_block')); //это открытие меню по гамбургеру
        this.menu.addEventListener('click', event => {
            const target = event.target, //то, на что мы попали при клике
                  targetClassList = target.classList; //обращаемся к списккку классов того, на что мы попали при клике

            switch (true) {
                case targetClassList.contains('application'):  //если нажали на кнопку add
                    location.href = "#/";
                    this.menu.classList.remove('dsp_block');
                    break;

                case targetClassList.contains('calculator'):
                    location.href = "#/calculator";
                    this.menu.classList.remove('dsp_block');
                    break;

                case targetClassList.contains('eating'):
                    location.href = "#/eating";
                    this.menu.classList.remove('dsp_block');
                    break;
            }
        });

         mainParameters.addEventListener('focusin', event => this.upPlaceholder(event, mainParameters));
         mainParameters.addEventListener('focusout', event => this.setAgeHeightWeight(event, mainParameters));

         inputActivity.addEventListener('click', event => this.showList(event));
         inputGoal.addEventListener('click', event => this.showList(event));

         ulGoal.addEventListener('click', event => this.chooseFromList(event, changeGoalBlock, changeGoalBlockParagraph,changeGoalBlockInput));
         ulActivity.addEventListener('click', event => this.chooseFromList(event, changeGoalBlock, changeGoalBlockParagraph,changeGoalBlockInput));

         form.addEventListener('submit', event => this.checkInputs(event,form, inputs,changeGoalBlock, changeGoalBlockInput, inputGoal));
    }

    //функция записи значений для роста, веса и возраста
    setAgeHeightWeight(event, mainParameters) {
        let target = event.target;

        while (target !== mainParameters) {

            if (target.tagName === 'INPUT') {
                let inputValue = target.value.trim(),
                    span = target.nextSibling;

                if (!inputValue) {
                    target.style.opacity = '0.7';
                    span.classList.remove('in_focus');
                    span.classList.add('without_focus');
                } else {
                    target.style.opacity = '1';
                }
            }
            target = target.parentNode;
        }
    }

    //функция для поднятия подсказки над инпутами
    upPlaceholder(event, mainParameters) {
        let target = event.target;

        while (target !== mainParameters) {
            if (target.tagName === 'INPUT') {
                let span = target.nextSibling;
                span.classList.remove('without_focus');
                span.classList.add('in_focus');
            }
            target = target.parentNode;
        }
    }

     //функция для всплывающего списка целей и активностей
     showList(event) {
        let current = event.currentTarget;
        current.nextElementSibling.classList.toggle('none');
    }

    //функция для выбора целей и активностей
    chooseFromList(event, changeGoalBlock, changeGoalBlockParagraph,changeGoalBlockInput) {
        let target = event.target,
            current = event.currentTarget;

        while (target !== current){
            if (target.tagName === 'LI') {
                current.previousElementSibling.value = target.firstElementChild.textContent; // нашли элемент, который нас интересует!
                current.classList.add('none');

                switch (true) {
                    case current.previousElementSibling.value === 'Уменьшение веса тела' :
                        changeGoalBlock.classList.remove('none');
                        changeGoalBlockParagraph.innerText = 'Дефицит калорий, %:';
                        break;

                    case current.previousElementSibling.value === 'Увеличение веса тела' :
                        changeGoalBlock.classList.remove('none');
                        changeGoalBlockParagraph.innerText = 'Профицит калорий, %:';
                        break;

                    case current.previousElementSibling.value === 'Поддержание веса тела' :
                        changeGoalBlock.classList.add('none');
                        break;
                }
                changeGoalBlockInput.value = '';
            }
            target = target.parentNode;
        }
    }

     //функция проверяет, заполнены ли все инпуты, в случае успеха вызывает функцию для записи в LS
     checkInputs(event, form, inputs,changeGoalBlock, changeGoalBlockInput, inputGoal) {
        event.preventDefault();
        //это мой объект со значениями из инпутов
        let user = {
                sex: form.querySelector('[name="select_sex"]').value,
                age: form.querySelector('[name="age"]').value,
                height: form.querySelector('[name="height"]').value,
                weight: form.querySelector('[name="weight"]').value,
                activity: form.querySelector('[name="activities"]').value,
                goal: form.querySelector('[name="goals"]').value,
                changeGoal: form.querySelector('[name="change_goal"]').value,
                proteins: form.querySelector('[name="proteins"]').value,
                fats: form.querySelector('[name="fats"]').value,
                carbohydrates: form.querySelector('[name="carbohydrates"]').value
            },
            emptyInput = 0;

        for (let input of inputs){    //здесь проверяем, сколько незаполненных инпутов
            if (input.value === '') {
                emptyInput += 1;
            }
        }

        if ((emptyInput > 1 && changeGoalBlockInput.value.trim() === '') || (emptyInput > 0 && changeGoalBlockInput.value.trim() !== '') || (emptyInput > 0 && changeGoalBlockInput.value.trim() === '' && inputGoal.value !== 'Поддержание веса тела' )) {
            alert('Заполните все поля!');
        } else {
            this.saveInLSUserAndResult(user, changeGoalBlock); //записали в LS user и result и почистили инпуты
            location.hash = `#/eating`; //перешли на другую страницу
        }
    }

    //функция записывает в LS и очищает инпуты после этого
    saveInLSUserAndResult(user, changeGoalBlock) {
        if (localStorage.getItem('user') && localStorage.getItem('result')) {
            localStorage.removeItem('user');
            localStorage.removeItem('result');
        }
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('result', JSON.stringify(this.calculateCPFC(user))); //записали в  LS наш объект result c КБЖУ
            document.querySelectorAll('input').forEach(el => el.value = '');
            changeGoalBlock.classList.add('none');
    }


    //функция РАССЧИТЫВАЕТ КАЛОРИИ И БЖУ и возвращает объект с результатами
    calculateCPFC(user) {
        let bmrForWomen = 447.6 + (9.2 * (+user.weight)) + (3.1 * (+user.height)) - (4.3 * (+user.age)),
            bmrForMen = 88.36 + (13.4 * (+user.weight)) + (4.8 * (+user.height)) - (5.7 * (+user.age)),
            calories = 0,

            rates = {
                ['Сидячий образ жизни']: 1.2,
                ['Небольшая активность']: 1.375,
                ['Умеренная активность']: 1.55,
                ['Высокая активность']: 1.725,
                ['Очень высокая активность']: 1.9
            };

        switch (true) {
            case user.sex === 'Женский' && user.goal === 'Поддержание веса тела':
                for (let key in rates) {
                    key === user.activity ? calories = bmrForWomen * rates[key] : calories;
                }
                break;

            case user.sex === 'Женский' && user.goal === 'Уменьшение веса тела':
                for (let key in rates) {
                    key === user.activity ? calories = (bmrForWomen * rates[key]) - (bmrForWomen * rates[key] * (+user.changeGoal) / 100) : calories;
                }
                break;

            case user.sex === 'Женский' && user.goal === 'Увеличение веса тела':
                for (let key in rates) {
                    key === user.activity ? calories = (bmrForWomen * rates[key]) + (bmrForWomen * rates[key] * (+user.changeGoal) / 100) : calories;
                }
                break;

            case user.sex === 'Мужской' && user.goal === 'Поддержание веса тела':
                for (let key in rates) {
                    key === user.activity ? calories = bmrForMen * rates[key] : calories;
                }
                break;

            case user.sex === 'Мужской' && user.goal === 'Уменьшение веса тела':
                for (let key in rates) {
                    key === user.activity ? calories = (bmrForMen * rates[key]) - (bmrForMen * rates[key] * (+user.changeGoal) / 100) : calories;
                }
                break;

            case user.sex === 'Мужской' && user.goal === 'Увеличение веса тела':
                for (let key in rates) {
                    key === user.activity ? calories = (bmrForMen * rates[key]) + (bmrForMen * rates[key] * (+user.changeGoal) / 100) : calories;
                }
                break;
        }

        return  {
            calories: Math.round(calories),
            proteins: Math.round(calories * user.proteins / 100 /4),
            fats: Math.round(calories * user.fats / 100 /9),
            carbohydrates: Math.round(calories * user.carbohydrates / 100 /4),
            water: user.weight * 30
        };
    }
}

export default Calculator;
import Component from '../../views/components.js';
import Utils from '../../helpers/utils.js';
import Products from "../../models/products.js";

class Eating extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                
                <h2>Дневная норма КБЖУ:</h2>
                
                <div class="calculated_PFC">
                    <div class="calculated_PFC_calories">
                        <div>
                            <label for="cal_norma">Калории: </label><input type="text" id="cal_norma" name="cal_norma" readonly>
                        </div>
                
                        <div>
                            <label for="cal_eat">Съедено: </label><input type="text" id="cal_eat" name="cal_eat" readonly>
                        </div>
                    </div>

                    <div class="calculated_PFC_proteins">
                        <div>
                            <label for="proteins_norma">Белки: </label><input type="text" id="proteins_norma" name="proteins_norma" readonly>
                        </div>
                        
                        <div>
                            <label for="proteins_eat">Съедено: </label><input type="text" id="proteins_eat" name="proteins_eat" readonly>
                        </div>
                    </div>

                    <div class="calculated_PFC_fats">
                        <div>
                            <label for="fats_norma">Жиры: </label><input type="text" id="fats_norma" name="fats_norma" readonly>
                        </div>
                        
                        <div>
                            <label for="fats_eat">Съедено: </label><input type="text" id="fats_eat" name="fats_eat" readonly>
                        </div>
                    </div>

                    <div class="calculated_PFC_carbohydrates">
                        <div>
                            <label for="carbohydrates_norma">Углеводы: </label><input type="text" id="carbohydrates_norma" name="carbohydrates_norma" readonly>
                        </div>
                        
                        <div>
                           <label for="carbohydrates_eat">Съедено: </label><input type="text" id="carbohydrates_eat" name="carbohydrates_eat" readonly>
                        </div>
                    </div>

                    <div class="calculated_PFC_water">
                        <div>
                            <label for="water_norma">Вода: </label><input type="text" id="water_norma" name="water_norma" readonly>
                        </div>
                    
                        <div>
                            <label for="water_drink">Выпито: </label><input type="text" id="water_drink" name="water_drink" readonly>
                        </div>
                    </div>
                </div>
   
                <div class="add_meals_and_products"> 
                    <div class="main_buttons">  <!--кнопки-->
                        <a><div class="button_clean_meal hover_reveal" data-tooltip="Очистить список дневного рациона"></div></a>
                        <a><div class="button_add_water hover_reveal" data-tooltip="Добавить количество воды"></div></a>
                        <a href="#/products" target=""><div class="button_add_product hover_reveal" data-tooltip="Перейти к списку продуктов"></div></a>
                
                        <div class="div_tooltip"></div>    <!--для тултипа-->
                
                        <div class="add_to_meals_list transform_none">
                            <div class="add_to_meals_list_input">
                                <label>Мл: <input type="text"></label>
                            </div>
                
                            <div class="add_to_meals_list_buttons">
                                <button class="water_btn_add">Добавить</button>
                                <button class="water_btn_edit">Изменить</button>
                                <button class="water_btn_back">Отмена</button>
                            </div>
                        </div>
                    </div>

                    <h2>Дневной рацион:</h2>

                    <div class="meals">
                        <div class="meals_list">
                            ${this.meals.map(meal => this.getTaskHTML(meal)).join('\n ')}
                        </div>
                    </div>
                </div>
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        let mealsContainer = document.getElementsByClassName('meals')[0], //обертка для всех meals
            addWaterBtn = document.getElementsByClassName('button_add_water')[0],
            mainBtns = document.getElementsByClassName('main_buttons')[0], //контейнер с нашими двумя большими кнопками для добавления воды и перехода к продуктам
            addWaterList = mainBtns.getElementsByClassName('add_to_meals_list')[0], //всплывающее окно для добавления воды
            addWaterListInput = addWaterList.getElementsByTagName('input')[0], //инпут во всплыв окне для добавления воды
            waterDrinkInput = document.getElementById('water_drink'), //инпут со значениями выпитой воды
            waterBtnAdd = addWaterList.getElementsByClassName('water_btn_add')[0], // кнопка во всплывающем окне для добавления воды "добавить"
            waterBtnEdit = addWaterList.getElementsByClassName('water_btn_edit')[0], // кнопка во всплывающем окне для добавления воды "именить"
            cleanMealsBtn = document.getElementsByClassName('button_clean_meal')[0]; // кнопка для очищения meals"

        window.addEventListener('load', this.writeCPFCW());
        window.addEventListener('load', this.writeMealCPFC());

        this.gmbBtn.addEventListener('click', () => this.menu.classList.toggle('dsp_block')); //это открытие меню по гамбургеру

        this.menu.addEventListener('click', event => {
            const target = event.target, //то, на что мы попали при клике
                  targetClassList = target.classList; //обращаемся к списккку классов того, на что мы попали при клике

            switch (true) {
                case targetClassList.contains('application'):  //если нажали на кнопку add, то
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

        //если нажать кнопку "Очистить дневной рацион"
        cleanMealsBtn.addEventListener('click', () => this.clearMealList());

        //если нажали на кнопку "Добавить воду"
        addWaterBtn.addEventListener('click', (event) => {
            event.preventDefault();
            addWaterList.classList.remove('transform_none'); //сделали контейнер видимым

            if (!addWaterListInput.value.trim()) {
                waterBtnAdd.disabled = waterBtnEdit.disabled = true;
            }
            addWaterListInput.addEventListener('keyup', event =>  Utils.disableBtn(event, waterBtnEdit, waterBtnAdd));
            addWaterListInput.addEventListener('keyup', event =>  Utils.disableBtn(event, waterBtnAdd));

            addWaterList.addEventListener('click', event => {
                const target = event.target, //то, на что мы попали при клике
                    targetClassList = target.classList; //обращаемся к списккку классов того, на что мы попали при клике

                switch (true) {
                    case targetClassList.contains('water_btn_add'):  //если нажали на кнопку добавить
                        waterDrinkInput.value = (+this.water) + (+addWaterListInput.value.trim());
                        Products.setWaterToLS( waterDrinkInput.value);
                        addWaterListInput.value = '';
                        addWaterList.classList.add('transform_none'); //сделали контейнер видимым
                        location.reload();
                        break;

                    case targetClassList.contains('water_btn_edit'): //если нажали на кнопку изменит
                        Products.setWaterToLS(addWaterListInput.value.trim());
                        waterDrinkInput.value = addWaterListInput.value.trim(); //записали введенное значение в нужный инпуть для выпитй воды
                        addWaterListInput.value = '';
                        addWaterList.classList.add('transform_none'); //сделали контейнер видимым
                        location.reload();
                        break;

                    case targetClassList.contains('water_btn_back'): //если нажали на кнопку отмена
                        addWaterList.classList.add('transform_none'); //сделали контейнер видимым
                        break;
                }
            });
        });

        //если жмем на кнопки на отрисованных продуктах
        mealsContainer.addEventListener('click', event => {
            const target = event.target, //то, на что мы попали при клике
                targetClassList = target.classList; //обращаемся к списккку классов того, на что мы попали при клике

            switch (true) {
                case targetClassList.contains('meal_btn_edit'):  //если нажали на кнопку add, то
                    this.editMealWeight(target.parentNode.parentNode);  //передали контейнер product
                    break;

                case targetClassList.contains('meal_btn_remove'):
                    this.removeMeal(target.parentNode.parentNode); //если нажали на кнопку remove, то
                    break;
            }
        });
    }

    // функция writeCPFCW();  записываем в форму рассчитанные данные (дневную норму кбжу) уже из LS (result) вместе с водой
    writeCPFCW() {
      let calculatedCPFCW = document.getElementsByClassName('calculated_PFC')[0], //блок, который содержит рассчитанные данные
          result = JSON.parse(localStorage.getItem('result'));

          calculatedCPFCW.querySelector('[name="cal_norma"]').value = result.calories;
          calculatedCPFCW.querySelector('[name="proteins_norma"]').value = result.proteins;
          calculatedCPFCW.querySelector('[name="fats_norma"]').value = result.fats;
          calculatedCPFCW.querySelector('[name="carbohydrates_norma"]').value = result.carbohydrates;
          calculatedCPFCW.querySelector('[name="water_norma"]').value = result.water;
    }

    // функция writeCPFCW();  записываем в форму рассчитанные данные (то что съели) уже из LS (meals) без воды
      writeMealCPFC() {
       let sumAllCalories = 0,
           sumAllFats = 0,
           sumAllCarbohydrates = 0,
           sumAllProteins = 0;

        for (let elem of this.meals) {
            sumAllCalories += +elem.product_calories;
            sumAllProteins += +elem.product_proteins;
            sumAllCarbohydrates+= +elem.product_carbohydrates;
            sumAllFats += +elem.product_fats;
        }

          document.querySelector('[name="cal_eat"]').value = sumAllCalories.toFixed(2);
          document.querySelector('[name="proteins_eat"]').value = sumAllProteins.toFixed(2);
          document.querySelector('[name="carbohydrates_eat"]').value = sumAllCarbohydrates.toFixed(2);
          document.querySelector('[name="fats_eat"]').value = sumAllFats.toFixed(2);
          document.querySelector('[name="water_drink"]').value = +this.water;
    }

    //функция изменяет вес в уже добавленном в рацион продукте
    editMealWeight(productContainer) {
        let editMealWeightListContainer = productContainer.getElementsByClassName('add_to_meals_list')[0], //всплывающая вкладка для добавления веса продукта в дневной рацион
            editMealWeightListContainerInput = editMealWeightListContainer.getElementsByTagName('input')[0],  //инпут для ввода веса
            editToMealListContainerBtnEdit = editMealWeightListContainer.getElementsByClassName('add_to_meals_list_btn_add')[0], //кнопка изменить
            editToMealListContainerBtnBack = editMealWeightListContainer.getElementsByClassName('add_to_meals_list_btn_back')[0]; //кнопка отмены

        editMealWeightListContainer.classList.remove('transform_none'); //сделали контейнер видимым

        if (!editMealWeightListContainerInput.value.trim()) {
            editToMealListContainerBtnEdit.disabled = true;
        }

        editMealWeightListContainer.addEventListener('keyup', event =>  Utils.disableBtn(event, editToMealListContainerBtnEdit)); //дизайблим кнопку изменить, если нечего в инпут не ввели
        editToMealListContainerBtnBack.addEventListener('click', () => editMealWeightListContainer.classList.add('transform_none'));//при нажатии на отмена скрываем нашу всплывающую вкладку добавления

        editToMealListContainerBtnEdit.addEventListener('click', () => {  //если жмем на кнопку изменить
           let productInMeal = this.products.find(product => product.id === productContainer.dataset.id); //выцеплли нужный прдукт из LS по id (из products)

            productInMeal.weight = editMealWeightListContainerInput.value.trim(); //вес  из инпута
            this.meals = this.meals.filter(meal => meal.id !== productInMeal.id); //в this.meals оставили продукты, кроме того, что сейчас добавляем
            this.countEditedProductToMeal(productInMeal);
            editMealWeightListContainer.classList.add('transform_none'); //сделали контейнер видимым
            location.reload();
        });
    }

    //функция считает кбжу в зависимости от веса продукта
    countEditedProductToMeal(product) {
        product.product_proteins = ((+product.product_proteins) * (+product.weight) / 100).toFixed(2);
        product.product_fats = ((+product.product_fats) * (+product.weight) / 100).toFixed(2);
        product.product_carbohydrates = ((+product.product_carbohydrates) * (+product.weight) / 100).toFixed(2);
        product.product_calories = ((+product.product_calories) * (+product.weight) / 100).toFixed(2);

        this.meals.push(product); //занесли в массив с melas новый продукт
        Products.setMealsToLS(this.meals); //записали в LS обновленный массив с meals
    }

    //функция удаляет продукт из meal
    removeMeal(mealContainer) {
        if (confirm('Вы действительно хотите удалить этот продукт?')) {
            this.meals = this.meals.filter(product => product.id !== mealContainer.dataset.id);
            Products.setMealsToLS(this.meals);
            mealContainer.remove();
            this.writeMealCPFC(); //пересчитываем и перезаписываем после удаления
        }
    }

    //функция очищает весь дневной рацион
    clearMealList() {
        if (confirm('Вы действительно хотите очистить ваш дневной рацион?')) {
            localStorage.setItem('meals', JSON.stringify([]));
            localStorage.setItem('water', JSON.stringify(0));

            document.getElementsByClassName('meals_list')[0].remove();
            document.getElementsByClassName('meals')[0].innerHTML += '<div class="meals_list"></div>';

            document.querySelector('[name="cal_eat"]').value = '';
            document.querySelector('[name="proteins_eat"]').value = '';
            document.querySelector('[name="carbohydrates_eat"]').value = '';
            document.querySelector('[name="fats_eat"]').value = '';
            document.querySelector('[name="water_drink"]').value = '';
        }
    }

    //ВОЗВРАЩАЕТ РАЗМЕТКУ НУЖНОЙ НАМ ПРОДУКТА С УЖЕ РАССЧИТАННЫМИ ПАРАМЕТРАМИ ИЗХОДЯ ИЗ ВВЕДЕННОГО ВЕСА
    getTaskHTML(meal) {
        return `
            <div class="meal" data-id="${meal.id}">
                <div class="meal_info">
                    <h3>${meal.product_name}</h3>
                    <p>${meal.weight} гр.</p>
                
                    <div class="meal_components">
                        <div class="meal_proteins">
                            <p>Б:</p>
                            <p>${meal.product_proteins}</p>
                        </div>
                  
                        <div class="meal_fats">
                            <p>Ж:</p>
                            <p>${meal.product_fats}</p>
                        </div>
                  
                        <div class="meal_carbohydrates">
                            <p>У:</p>
                            <p>${meal.product_carbohydrates}</p>
                        </div>
                    </div>
                  
                    <div class="meal_calories">
                        <p>Калории:</p>
                        <p>${meal.product_calories}</p>
                    </div>
                </div>   
                
                <div class="meal_buttons">
                    <a class="meal_btn_edit">Изменить</a>   
                    <a class="meal_btn_remove">Удалить</a> 
                </div>
                           
                <div class="add_to_meals_list transform_none">
                    <div class="add_to_meals_list_input">
                        <label>Грамм: <input type="text"></label>
                    </div>
                
                    <div class="add_to_meals_list_buttons">
                        <button class="add_to_meals_list_btn_add">Изменить</button>
                        <button class="add_to_meals_list_btn_back">Отмена</button>
                    </div>  
               </div>                           
            </div>
        `;
    }
}

export default Eating;


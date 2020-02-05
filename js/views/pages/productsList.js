import Component from '../../views/components.js';
import Utils from '../../helpers/utils.js';
import Products from '../../models/products.js';

class ProductsList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                
                  <h2>Добавить продукт</h2>
        
                  <div class="add_products">
                      <form class="form_add_products">
                          <div class="form_add_products_inputs">
                              <input type="text" id="product_name" name="product_name" placeholder="Наименование продукта" required autocomplete="off">
                              <input type="text" id="product_proteins" name="product_proteins" placeholder="Количество белков" required autocomplete="off">
                              <input type="text" id="product_fats" name="product_fats" placeholder="Количество жиров" required autocomplete="off">
                              <input type="text" id="product_carbohydrates" name="product_carbohydrates" placeholder="Количество углеводов" required autocomplete="off">
                              <input type="text" id="product_calories" name="product_calories" placeholder="Количество калорий" required autocomplete="off">
                          </div>

                          <button class="add_products_button" type="submit"></button>
                      </form>
        
                      <div class="products">
                          <div class="products_list">
                              ${this.products.map(product => this.getTaskHTML(product)).join('\n ')}
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
        const addProductName = document.getElementById('product_name'), //инпут для добавления названия продукта
            addProductProteins = document.getElementById('product_proteins'), //инпут для добавления белков продукта
            addProductFats = document.getElementById('product_fats'), //инпут для добавления жиров продукта
            addProductCarbohydrates = document.getElementById('product_carbohydrates'), //инпут для добавления углевоов продукта
            addProductCalories = document.getElementById('product_calories'), //инпут для добавления калорий продукта
            formAddProducts = document.getElementsByClassName('form_add_products')[0], //форма для заполнения составляющих у продукта
            addProductBtn = document.getElementsByClassName('add_products_button')[0], //кнопка добавить продукт (плюс большой)
            productsContainer = document.getElementsByClassName('products')[0]; //обертка для всех продуктов


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

        formAddProducts.addEventListener('submit', event => this.addProduct(event, addProductName, addProductCalories, addProductProteins, addProductFats, addProductCarbohydrates, addProductBtn)); //при нажатии на плюс добавляется новый продукт

        //вешаем обработчик событий на блок со всеми отрисованными продуктами
        productsContainer.addEventListener('click', event => {
            const target = event.target, //то, на что мы попали при клике
                targetClassList = target.classList; //обращаемся к списккку классов того, на что мы попали при клике

            switch (true) {
                 case targetClassList.contains('product_btn_add'):  //если нажали на кнопку add, то
                     this.addProductToMeal(target.parentNode.parentNode);  //передали контейнер product
                     break;

                 case targetClassList.contains('product_btn_remove'):
                    this.removeProduct(target.parentNode.parentNode); //если нажали на кнопку remove, то
                    break;
            }
        });
    }

    //ФУНКЦИЯ СОЗДАЕТ НОВЫЙ ПРОДУКТ
    addProduct (event, addProductName, addProductCalories, addProductProteins, addProductFats, addProductCarbohydrates, addProductBtn ) {
        event.preventDefault();

        //создали объект с новым продуктом со значениями из инпутов
        const newProduct = {
            id: Utils.generateID(),
            product_name: addProductName.value.trim(),
            product_calories: addProductCalories.value.trim(),
            product_proteins: addProductProteins.value.trim(),
            product_fats: addProductFats.value.trim(),
            product_carbohydrates: addProductCarbohydrates.value.trim()
        };

        this.products.push(newProduct);     //в массив products с объектами-продуктами (подтянули его из components) добавили новый продукт
        Products.setProductsToLS(this.products); //добавили обновленный массив с продуктами в LS
        this.clearAddProduct(addProductName, addProductCalories, addProductProteins, addProductFats, addProductCarbohydrates, addProductBtn);  //ОЧИЩАЕМ ИНПУТЫ И ЗАДИЗЭЙБЛИВАЕМ КНОПКУ
        document.getElementsByClassName('products_list')[0].insertAdjacentHTML('beforeEnd', this.getTaskHTML(newProduct)); //отрисовали новый продукт
        location.reload();
    }

    //ФНКЦИЯ ОЧИЩАЕТ ИНПУТЫ
    clearAddProduct(addProductName, addProductCalories, addProductProteins, addProductFats, addProductCarbohydrates) {
        addProductName.value = '';
        addProductCalories.value = '';
        addProductProteins.value = '';
        addProductFats.value = '';
        addProductCarbohydrates.value = '';
    }

    //функция открывает вкладку для добавления веса и вызывает функцию, которая подсчитывает новые значения продукта для дневного рациона
    addProductToMeal(productContainer) {
         let addToMealListContainer = productContainer.getElementsByClassName('add_to_meals_list')[0], //всплывающая вкладка для добавления веса продукта в дневной рацион
             addToMealListContainerInput = addToMealListContainer.getElementsByTagName('input')[0],  //инпут для ввода веса
             addToMealListContainerBtnAdd = addToMealListContainer.getElementsByClassName('add_to_meals_list_btn_add')[0], //кнопка добавить
             addToMealListContainerBtnBack = addToMealListContainer.getElementsByClassName('add_to_meals_list_btn_back')[0]; //кнопка отмены

         addToMealListContainer.classList.remove('transform_none'); //сделали контейнер видимым

        if (!addToMealListContainerInput.value.trim()) {
            addToMealListContainerBtnAdd.disabled = true;
        }

        addToMealListContainer.addEventListener('keyup', event =>  Utils.disableBtn(event, addToMealListContainerBtnAdd)); //дизайблим кнопку добавить, если нечего в инпут не ввели
        addToMealListContainerBtnBack.addEventListener('click', () => addToMealListContainer.classList.add('transform_none'));//при нажатии на отмена скрываем нашу всплывающую вкладку добавления

        addToMealListContainerBtnAdd.addEventListener('click', () => {  //если жмем на кнопку добавить
              let productToMeal = this.products.find(product => product.id === productContainer.dataset.id); //выцеплли нужный прдукт из LS по id
                  productToMeal.weight = addToMealListContainerInput.value.trim(); //добавили в наш объект с продуктом свойство вес, которое ввел в инпут пользователь

              if (this.meals.find(meal => meal.id === productToMeal.id)) {
                  let  productAddedToMealBefore = this.meals.find(meal => meal.id === productToMeal.id); //выцепили этот ранее добавленный продукт
                  this.meals = this.meals.filter(meal => meal.id !== productToMeal.id); //в this.meals оставили продукты, кроме того, что сейчас добавляем
                  productToMeal.weight = (+productToMeal.weight) + (+productAddedToMealBefore.weight); //сложили старый вес с новым добавленным
                  Products.setMealsToLS(this.meals); //записали в LS обновленный массив с meals
            }

            this.countAddedProductToMeal(productToMeal);
            addToMealListContainer.classList.add('transform_none'); //сделали контейнер видимым
            location.hash = `#/eating`; //переходим на страницу, где будут отрисовываться съеденные нами продукты
        });
    }

    //функция считает кбжу в зависимости от веса продукта
    countAddedProductToMeal(product) {
        product.product_proteins = ((+product.product_proteins) * (+product.weight) / 100).toFixed(2);
        product.product_fats = ((+product.product_fats) * (+product.weight) / 100).toFixed(2);
        product.product_carbohydrates = ((+product.product_carbohydrates) * (+product.weight) / 100).toFixed(2);
        product.product_calories = ((+product.product_calories) * (+product.weight) / 100).toFixed(2);

        this.meals.push(product); //занесли в массив с melas новый продукт
        Products.setMealsToLS(this.meals); //записали в LS обновленный массив с meals
    }

    removeProduct(productContainer) {
        if (confirm('Вы действительно хотите удалить этот продукт?')) {
            this.products = this.products.filter(product => product.id !== productContainer.dataset.id);
            Products.setProductsToLS(this.products);
            productContainer.remove();
        }
    }

    getTaskHTML(product) {  //ВОЗВРАЩАЕТ РАЗМЕТКУ НУЖНОЙ НАМ ТАСКИ В ЗАВИСИМОСТИ ОТ  ТОГО, ЧТО ПЕРЕДАНО В КАЧЕСТВЕ ПАРАМЕТРА
        return `
            <div class="product" data-id="${product.id}">
                <div class="product_info">
                    <h3>${product.product_name}</h3>
                    <p>В 100 гр. продукта: </p>
                
                    <div class="product_components">
                        <div class="product_proteins">
                            <p>Б:</p>
                            <p>${product.product_proteins}</p>
                        </div>
                  
                        <div class="product_fats">
                            <p>Ж:</p>
                            <p>${product.product_fats}</p>
                        </div>
                  
                        <div class="product_carbohydrates">
                            <p>У:</p>
                            <p>${product.product_carbohydrates}</p>
                        </div>
                    </div>
                  
                    <div class="product_calories">
                        <p>Калории:</p>
                        <p>${product.product_calories}</p>
                    </div>
                </div>   
              
                <div class="product_buttons">
                    <a class="product_btn_edit" href="#/product/${product.id}/edit">Изменить</a> 
                    <a class="product_btn_add">Добавить</a>   
                    <a class="product_btn_remove">Удалить</a> 
                </div>
                           
                <div class="add_to_meals_list transform_none">
                    <div class="add_to_meals_list_input">
                        <label>Грамм: <input type="text"></label>
                    </div>
                
                    <div class="add_to_meals_list_buttons">
                        <button class="add_to_meals_list_btn_add">Добавить</button>
                        <button class="add_to_meals_list_btn_back">Отмена</button>
                    </div>   
                </div>                           
            </div>
        `;
    }
}
export default ProductsList;
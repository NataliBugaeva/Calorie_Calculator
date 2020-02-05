import Component from '../../views/components.js';
import Products from '../../models/products.js';
import Utils from "../../helpers/utils.js";

class Edit extends Component {
    constructor() {
        super();
        this.product = this.products.find(product => product.id === this.request.id); //выцепили из LS продукт с нужным id, который будем редактировать
        this.productsWitoutEdited = this.products.filter(product => product.id !== this.product.id); //массив продуктов из LS из без того, который мы будем редактировать
    }

    render() {
        return new Promise(resolve => {
            let html;

            if (this.product) {
                const {product_name, product_calories, product_proteins, product_fats, product_carbohydrates} = this.product;

                html = `
					<h2>Изменить продукт:</h2>
					
					<div class="product_edit">
						<div class="product_edit_inputs">
						    <div>
						        <label for="edit_name">Продукт: </label><input id="edit_name"  type="text" value="${product_name}" autocomplete="off">
						    </div>
						    
						    <div>
						        <label for="edit_proteins">Белки: </label><input id="edit_proteins"  type="text" value="${product_proteins}" autocomplete="off">
						    </div>
						    
						    <div>
						        <label for="edit_fats"> Жиры: </label><input id="edit_fats"  type="text" value="${product_fats}" autocomplete="off">
						    </div>
						    
						    <div>
						       <label for="edit_carbohydrates">Углеводы: </label><input id="edit_carbohydrates"  type="text" value="${product_carbohydrates}" autocomplete="off">
						    </div>
						    
						    <div>
						       <label for="edit_calories">Калории: </label><input id="edit_calories" type="text" value="${product_calories}" autocomplete="off">
						    </div>  
                        </div>
						
						<div class="product_edit_buttons">
						     <button class="product_edit_btn_save"></button>
							 <a class="product_edit_btn_back" href="#/products"></a>
                        </div>
					</div>
				`;
            }
            resolve(html);
        });
    }

    afterRender() {
        this.product && this.productsWitoutEdited && this.setActions();
    }

    setActions() {
        const saveProductBtn = document.getElementsByClassName('product_edit_btn_save')[0],//кнопка сохранить изменения
              blockWithInputs = document.getElementsByClassName('product_edit_inputs')[0]; //блок где все инпуты находятся

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

        blockWithInputs.addEventListener('keyup', event =>  Utils.disableBtn(event, saveProductBtn));
        saveProductBtn.addEventListener('click', () => this.editProduct());
    }

    //функция вносит изменения в продукт
    editProduct() {
        this.product.product_name = document.getElementById('edit_name').value.trim();
        this.product.product_proteins = document.getElementById('edit_proteins').value.trim();
        this.product.product_fats = document.getElementById('edit_fats').value.trim();
        this.product.product_carbohydrates = document.getElementById('edit_carbohydrates').value.trim();
        this.product.product_calories = document.getElementById('edit_calories').value.trim();

        this.productsWitoutEdited.push(this.product); //заносим в массив измененный продукт
        Products.setProductsToLS(this.productsWitoutEdited);
        location.hash = `#/products`;
    }
}

export default Edit;
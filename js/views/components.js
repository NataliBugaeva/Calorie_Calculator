import Utils from '../helpers/utils.js';
import Products from '../models/products.js';

class Component {
    constructor() {
        this.request = Utils.parseRequestURL(); //наш объект с частями распаршенного урла
        this.products = new Products().getProductsFromLS(); //
        this.meals = new Products().getMealsFromLS();
        this.water = new Products().getWaterFromLS();
        this.gmbBtn = document.getElementsByClassName('gmb_container')[0];
        this.menu = document.getElementsByClassName('menu_container')[0];
    }

    afterRender() {}
}

export default Component;
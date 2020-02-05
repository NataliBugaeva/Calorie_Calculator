import Utils from '../helpers/utils.js';

class Products {
    constructor() {
        this.defaultProducts = [
            {
                id: Utils.generateID(),
                product_name: 'Куриное филе',
                product_calories: '145.4',
                product_proteins: '23.4',
                product_fats: '5',
                product_carbohydrates: '1.3'
            },
            {
                id: Utils.generateID(),
                product_name: 'Картофель',
                product_calories: '77',
                product_proteins: '2',
                product_fats: '0.4',
                product_carbohydrates: '16.3'
            },
            {
                id: Utils.generateID(),
                product_name: 'Гречневая каша',
                product_calories: '132.2',
                product_proteins: '5',
                product_fats: '1.6',
                product_carbohydrates: '24.6'
            },
            {
                id: Utils.generateID(),
                product_name: 'Сосиски',
                product_calories: '280.4',
                product_proteins: '11.5',
                product_fats: '25.5',
                product_carbohydrates: '1.2'
            },
            {
                id: Utils.generateID(),
                product_name: 'Хлопья кукурузные',
                product_calories: '325.3',
                product_proteins: '8.3',
                product_fats: '1.2',
                product_carbohydrates: '75'
            },
            {
                id: Utils.generateID(),
                product_name: 'Молоко 3.2%',
                product_calories: '58',
                product_proteins: '2.8',
                product_fats: '3.2',
                product_carbohydrates: '4.7'
            }
        ];

        this.defaultMeals = [];
        this.defaultWater = '0';
    }

    //достает из LS по ключу products массив с продуктами, а если их там нет, то записывает дефолтные продукты в LS с помощью метода setProductsToLS
    getProductsFromLS() {
        return JSON.parse(localStorage.getItem('products')) || this.defaultProducts && Products.setProductsToLS(this.defaultProducts);
    }

    static setProductsToLS(products) {
        //сортируем массив по названию
        products.sort((a, b) => {
            let nameA=a.product_name.toLowerCase(), nameB=b.product_name.toLowerCase();
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1;
            if (nameA > nameB)
                return 1;
            return 0 // Никакой сортировки
        });
        localStorage.setItem('products', JSON.stringify(products));
    }

    //достает из LS по ключу meals массив с продуктами из рациона, а если их там нет, то записывает дефолтные в LS с помощью метода setMealsToLS
    getMealsFromLS() {
        return JSON.parse(localStorage.getItem('meals')) || this.defaultMeals && Products.setMealsToLS(this.defaultMeals);
    }

    static setMealsToLS(meals) {
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    //достает из LS по ключу water Значение выпитой воды, а если  нет, то записывает дефолтное значение в LS с помощью метода setWaterToLS
    getWaterFromLS() {
        return JSON.parse(localStorage.getItem('water')) || this.defaultWater && Products.setWaterToLS(this.defaultWater);
    }

    static setWaterToLS(water) {
        localStorage.setItem('water', JSON.stringify(water));
    }
}

export default Products;
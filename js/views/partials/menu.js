import Component from '../../views/components.js'

class Menu extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                 <div class="application">О приложении</div>
                 <div class="calculator">Калькулятор калорий</div>
                 <div class="eating">Питание</div>
            `);
        });
    }
}

export default Menu;
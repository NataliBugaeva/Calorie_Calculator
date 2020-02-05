import Component from '../../views/components.js';

class Aside extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`
                 <ul>
                    <a class="aside_link ${!resource ? 'active' : ''}" href="/#/"> <li>О приложении</li></a>
                    <a class="aside_link ${resource === 'calculator' ? 'active' : ''}" href="/#/calculator"><li>Калькулятор калорий</li>
                    <a class="aside_link ${resource === 'eating' ? 'active' : ''}" href="/#/eating"><li>Питание</li>
                 </ul>
            `);
        });
    }
}

export default Aside;
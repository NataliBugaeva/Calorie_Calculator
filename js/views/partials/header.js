import Component from '../../views/components.js'

class Header extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                 <header class="header"></header>
            `);
        });
    }
}

export default Header;
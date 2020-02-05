import Component from '../../views/components.js';

class Footer extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <footer class="footer"></footer>
            `);
        });
    }
}

export default Footer;
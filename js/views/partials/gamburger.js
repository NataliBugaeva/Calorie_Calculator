import Component from '../../views/components.js'

class GMB extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                 <div class="gmb"></div>
            `);
        });
    }
}

export default GMB;
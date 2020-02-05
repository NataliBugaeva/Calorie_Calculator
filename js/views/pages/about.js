import Component from '../../views/components.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about">
                     <h2>Калькулятор калорий</h2>
                   
                     <p>Если вы решили всерьез заняться своей фигурой и привести себя в форму, то наше приложение станет для вас
                        отличным помощником! "Калькулятор калорий" не только рассчитает вашу суточную норму КБЖУ, но и поможет 
                        контролировать потребление продуктов питания.</p>
                   
                     <p>В основе приложения лежит формула Харриса-Бенедикта  – проверенный временем и специалистами метод.
                        Он позволяет индивидуально и достаточно точно определить вашу ежедневную потребность в килокалориях в зависимости
                        от вашей цели (похудение, набор массы или поддержание веса).</p>
               
                     <a class="button_calculate" href="#/calculator" ></a>
                </div>
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
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
    }
}

export default About;
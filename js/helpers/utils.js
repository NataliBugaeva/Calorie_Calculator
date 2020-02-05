class Utils {
    static parseRequestURL() { //этот метод возвращает объект request со свойствами, содержащими части урла после #/
        const url = location.hash.slice(2), // переменная, содержащая часть урла после #/
              request = {}; //создали пустой объект request

        [request.resource, request.id, request.action] = url.split('/'); //добавили в объект request св-ва resource, id и action

        return request; //возвращаем заполненный свойствами
    }

    static generateID() { //генерирует случайный ID
        return Math.random().toString(36).substr(2, 10);
    }

    //делегирование на все инпуты; дизэйблю кнопку сохранить, если хоть один инпут не заполнен
    static disableBtn(event, btn) {
        let target = event.target;

        if (target.tagName === 'INPUT') {
            btn.disabled = !target.value.trim();
        }
    }
}

export default Utils; //позволяет использовать наш класс Utils в других модулях
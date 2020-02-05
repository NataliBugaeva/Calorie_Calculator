import Utils from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';
import Aside from './views/partials/aside.js';
import GMB from './views/partials/gamburger.js';
import Menu from './views/partials/menu.js';

import About from './views/pages/about.js';
import  Calculator from './views/pages/calculator.js';
import  Eating from './views/pages/eating.js';
import  ProductsList from './views/pages/productsList.js';
import  Edit from './views/pages/edit.js';

const Routes = {  //это мы сами создаем объект с возможными ссылками
    '/': About,
    '/calculator': Calculator,
    '/eating': Eating,
    '/products': ProductsList,
    '/product/:id/edit': Edit
};

function router() {
    const headerContainer = document.getElementsByClassName('header_container')[0],
          mainContainer = document.getElementsByClassName('main')[0],
          footerContainer = document.getElementsByClassName('footer_container')[0],
          asideContainer = document.getElementsByClassName('aside')[0],
          gmbContainer = document.getElementsByClassName('gmb_container')[0],
          menuContainer = document.getElementsByClassName('menu_container')[0],
          aside = new Aside(),
          header = new Header(),
          gmb = new GMB(),
          menu = new Menu(),
          footer = new Footer();

    header.render().then(html => {
        headerContainer.innerHTML = html;
    });

    aside.render().then(html => {
        asideContainer.innerHTML = html;
    });

    const request = Utils.parseRequestURL(),
          parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
          page = Routes[parsedURL] ? new Routes[parsedURL]() : new About();

    page.render().then(html => {
        mainContainer.innerHTML = html;
        page.afterRender();
    });

    gmb.render().then(html => {
        gmbContainer.innerHTML = html;
    });

    menu.render().then(html => {
        menuContainer.innerHTML = html;
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
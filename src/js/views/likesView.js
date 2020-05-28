import { elements } from './base';
import { limitRecipeTitle } from './searchView'


export const toggleLikeBtn = isLiked => {
    // img/icons.svg#icon-heart-outlined
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`); //select the element where the icon is located (use is parent of recipe__love), set href attribute to icon name according to isLiked
};


export const toggleLikesMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};


export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.image}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};


export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement; //select the link and then the parent element of the link
    if (el) el.parentElement.removeChild(el); // now remove it
};


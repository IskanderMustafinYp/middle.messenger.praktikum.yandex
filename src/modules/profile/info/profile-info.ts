const modalChangeAvatar = document.querySelector('#modal-change-avatar');
const changeAvatarElem = document.querySelector('#change-avatar');
const submitAvatarElem = document.querySelector('#submit-avatar');

if (!modalChangeAvatar || !changeAvatarElem || !submitAvatarElem) {
    throw new Error(`Illegal state. Elements aren't initialized properly`);
}
const popupVisibilityHandler = (e: Event) => {
    e.preventDefault();
    modalChangeAvatar.classList.toggle('modal__hidden');
};
changeAvatarElem.addEventListener('click', popupVisibilityHandler);
submitAvatarElem.addEventListener('click', popupVisibilityHandler);

const modalChangeAvatar = document.querySelector('#modal-change-avatar');
const changeAvatarElem = document.querySelector('#change-avatar');
const submitAvatarElem = document.querySelector('#submit-avatar');

const popupVisibilityHandler = (e) => {
    e.preventDefault();
    modalChangeAvatar.classList.toggle('modal__hidden');
};

changeAvatarElem.addEventListener('click', popupVisibilityHandler);
submitAvatarElem.addEventListener('click', popupVisibilityHandler);

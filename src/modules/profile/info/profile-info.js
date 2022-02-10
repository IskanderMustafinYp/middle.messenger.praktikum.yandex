const modalChangeAvatar = document.querySelector('#modal-change-avatar');
const changeAvatarElem = document.querySelector('#change-avatar');
const submitAvatarElem = document.querySelector('#submit-avatar');

changeAvatarElem.addEventListener('click', function f(e) {
    e.preventDefault();
    modalChangeAvatar.classList.toggle('modal_hidden');
});

submitAvatarElem.addEventListener('click', function f(e) {
    e.preventDefault();
    modalChangeAvatar.classList.toggle('modal_hidden');
});

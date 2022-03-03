'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.querySelector('.input-message');
  const sendBtnWrapper = document.querySelector('.send-btn-wrapper');
  const chatBody = document.querySelector('.chat-body');
  const likeBtn = document.querySelector('.like-btn');

  function sendHandler(e) {
    const target = e.currentTarget;
    if (messageInput.value.trim() && target.classList.contains('send-btn')) {
      createMessage('message');
    } else {
      createMessage();
    }
  }

  function changeSendIconHandler(newClassName){
    const newBtn = document.createElement('div');
    const oldBtn = sendBtnWrapper.querySelector('.btn-icon');
    newBtn.classList.add(newClassName, 'btn-icon', 'hide');
    oldBtn.classList.add('hide');
    oldBtn.addEventListener('transitionend', () => {
      oldBtn.remove();
      sendBtnWrapper.append(newBtn);
      setTimeout(() => {
        newBtn.classList.remove('hide');
        newBtn.addEventListener('click', sendHandler);
      }, 0);
    });
  }

  function createMessage(messageType) {
    const newMessageItem = document.createElement('div');
    newMessageItem.classList.add('user-message-item');
    const newMessageBody = document.createElement('div');
    if (messageType === 'message') {
      newMessageBody.classList.add('message-body', 'user-message');
      newMessageBody.textContent = messageInput.value;
    } else {
      newMessageBody.classList.add('heart-item')
    }
    const checkIcon = document.createElement('div');
    checkIcon.classList.add('check-icon');
    newMessageItem.append(newMessageBody, checkIcon);
    console.log(newMessageItem)
    chatBody.append(newMessageItem);
    messageInput.value = '';
  }

  messageInput.addEventListener('focus', () => changeSendIconHandler('send-btn'));

  messageInput.addEventListener('blur', () => changeSendIconHandler('like-btn'));

  messageInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && messageInput.value.trim()) {
      createMessage('message');
    }
  })
  likeBtn.addEventListener('click', sendHandler);
});

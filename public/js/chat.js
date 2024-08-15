import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// Typing
const inputChat = document.querySelector(".chat .inner-form input[name='content']");
var typingTimeOut;
if(inputChat) {
  inputChat.addEventListener("keyup", () => {
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(typingTimeOut);

    typingTimeOut = setTimeout(() => {
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
  })
}
// End Typing

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
socket.on("SERVER_RETURN_TYPING", (data) => {
  if(data.type == "show") {
    const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if(!existTyping) {
      const boxTyping = document.createElement("div");
      boxTyping.classList.add("box-typing");
      boxTyping.setAttribute("user-id", data.userId);
      boxTyping.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        <div class="inner-dots"><span></span><span></span><span></span></div>
      `;
      elementListTyping.appendChild(boxTyping);
    }
  } else {
    const boxTypingDelete = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if(boxTypingDelete) {
      elementListTyping.removeChild(boxTypingDelete);
    }
  }
})
// End SERVER_RETURN_TYPING

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector(".chat .inner-form");
if(formChat) {
  const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
    multiple: true,
    maxFileCount: 6
  });

  formChat.addEventListener("submit", (event) => {
    event.preventDefault();

    const content = event.target.content.value || "";
    const images = upload.cachedFileArray;
    if(content || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images
      });
      event.target.content.value = "";
      upload.resetPreviewPanel();
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  })
}
// End CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");

  const div = document.createElement("div");
  let htmlFullName = "";
  let htmlContent = "";
  let htmlImages = "";

  if(data.userId == myId) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
  }

  if(data.content) {
    htmlContent = `<div class="inner-content">${data.content}</div>`;
  }

  if(data.images.length > 0) {
    htmlImages += `
      <div class="inner-images">
    `;

    for (const image of data.images) {
      htmlImages += `
        <img src="${image}">
      `;
    }

    htmlImages += `
      </div>
    `;
  }

  div.innerHTML = `
    ${htmlFullName}
    ${htmlContent}
    ${htmlImages}
  `;

  const body = document.querySelector(".chat .inner-body");
  body.insertBefore(div, elementListTyping);

  body.scrollTop = body.scrollHeight;

  new Viewer(div);
});
// End SERVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll Chat To Bottom

// Show Icon Chat
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker) {
  const inputChat = document.querySelector(".chat .inner-form input[name='content']");

  emojiPicker.addEventListener('emoji-click', (event) => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
// End Show Icon Chat

// Show Popup Icon
const buttonIcon = document.querySelector("[button-icon]");
if(buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.addEventListener("click", () => {
    tooltip.classList.toggle('shown');
  });
}
// End Show Popup Icon

// Preview Image
if(bodyChat) {
  new Viewer(bodyChat);
}
// End Preview Image
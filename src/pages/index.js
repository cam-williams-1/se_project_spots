import "./index.css";
import Api from "../utils/Api.js";
import {
  enableValidation,
  disableButton,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import logoSrc from "../images/spots-logo.svg";
// import avatarSrc from "../images/avatar.jpg";
import editIconSrc from "../images/edit-icon.svg";
import plusIconSrc from "../images/plus-icon.svg";
import closeIconSrc from "../images/close-icon.svg";
import avatarEdit from "../images/edit-icon-light.svg";

const avatarEditIcon = document.getElementById("avatar-edit");
avatarEditIcon.src = avatarEdit;
const spotsLogo = document.getElementById("spots-logo");
spotsLogo.src = logoSrc;
const profileAvatar = document.getElementById("avatar");
// avatar.src = avatarSrc;
const editIcon = document.getElementById("edit-icon");
editIcon.src = editIconSrc;
const plusIcon = document.getElementById("plus-icon");
plusIcon.src = plusIconSrc;
const closeIcon = document.getElementById("close-icon");
closeIcon.src = closeIconSrc;
const closeIconPost = document.getElementById("close-icon-post");
closeIconPost.src = closeIconSrc;
const closeIconAvatar = document.getElementById("close-icon-avatar");
closeIconAvatar.src = closeIconSrc;

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Books",
//     link: "https://plus.unsplash.com/premium_photo-1681488394409-5614ef55488c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Camping",
//     link: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Community",
//     link: "https://plus.unsplash.com/premium_photo-1681965550198-c1c039421905?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Music",
//     link: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Coding",
//     link: "https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

// instantiating the new Api class in Api.js
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "aeaf202d-9da7-4289-8a9e-e4d3d15adc7d",
    "Content-Type": "application/json",
  },
});

// using the methods from the Api Class
api
  .getAppInfo()
  .then(([cards, { about, avatar, name, _id }]) => {
    // how is this defined ??
    cards.forEach(function (card) {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });

    // handle user information
    profileName.textContent = name;
    profileAvatar.src = avatar;
    profileDescription.textContent = about;
  })
  .catch((err) => {
    // this is here because the last .then is here
    console.error(err);
  });

const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const profileName = document.querySelector(".profile__name");
const profileModalClose = document.querySelector(".modal__close-btn");
const editModalNameInput = document.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const editModalDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const editFormElement = document.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_preview"
);
const cardModal = document.querySelector("#card-modal");
const cardForm = cardModal.querySelector(".modal__container");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
const cardModalClose = cardModal.querySelector(".modal__close-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__buttons");
const deleteModalClose = deleteModal.querySelector(".modal__close-btn");
const deleteModalCancel = deleteModal.querySelector(".modal__card-cancel");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn"); // where does this come in ??
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardNameEl.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalCaption.textContent = data.name;
    previewModalImage.alt = data.name;
  });

  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  return cardElement;
}

function handleDeleteCard(cardElement, cardId) {
  openModal(deleteModal);
  selectedCard = cardElement;
  selectedCardId = cardId;
}

function handleLike(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-btn_liked");
  api
    .toggleLike(cardId, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch(console.error);
}
// CHANGE TEXT TO DELETING...
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Delete";
    });
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOutsideClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handleEscClose);
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
}

function handleOutsideClose(e) {
  const currentTarget = e.target;
  if (currentTarget.classList.contains("modal")) {
    closeModal(currentTarget);
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = editModalNameInput.value;
      profileDescription.textContent = editModalDescriptionInput.value;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .addNewCard({ name: cardNameInput.value, link: cardLinkInput.value })
    .then((data) => {
      const inputValues = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
      };
      const cardElement = getCardElement(inputValues);
      cardsList.prepend(cardElement);
      disableButton(cardSubmitBtn, settings);
      closeModal(cardModal);

      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  // before each api submission, change text to say "Saving..."

  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

profileEditButton.addEventListener("click", () => {
  openModal(editModal);
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
});

profileModalClose.addEventListener("click", () => {
  closeModal(editModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleNewCardSubmit);

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

avatarModalBtn.addEventListener("click", () => {
  console.log("Avatar button clicked");
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit); // using "submit" because it is a form submission
deleteForm.addEventListener("submit", handleDeleteSubmit);

cardModalClose.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

deleteModalClose.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCancel.addEventListener("click", () => {
  closeModal(deleteModal);
});

enableValidation(settings);

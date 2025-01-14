const initialCards = {
  objectOne: {
    name: "Coffee",
    link: "https://unsplash.com/photos/a-cup-of-coffee-sitting-on-top-of-a-counter-z2PDbBmL4xE",
  },

  objectTwo: {
    name: "Books",
    link: "https://unsplash.com/photos/elegant-reading-room-with-library-and-armchair-for-relaxing-space-for-text-3d-rendering-imdnMdUDomE",
  },

  objectThree: {
    name: "Camping",
    link: "https://unsplash.com/photos/orange-camping-tent-near-green-trees-y8Ngwq34_Ak",
  },

  objectFour: {
    name: "Community",
    link: "https://unsplash.com/photos/hands-of-unrecognizable-senior-couple-with-their-grandaughter-planting-a-seedling-on-the-allotment-man-woman-and-a-small-girl-gardening-laQlvA_rdJU",
  },

  objectFive: {
    name: "Music",
    link: "https://unsplash.com/photos/a-group-of-people-that-are-on-stage-1zNJUusB55E",
  },

  objectSix: {
    name: "Coding",
    link: "https://unsplash.com/photos/a-person-sitting-at-a-desk-with-two-computer-monitors-XY0Cx9QsK3s",
  },
};

const profileEditButton = document.querySelector(".profile__edit-btn");

const editProfileModal = document.querySelector("#edit-profile-modal");

profileEditButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_opened");
});

const profileModalClose = document.querySelector(".modal__close-btn");

profileModalClose.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_opened");
});

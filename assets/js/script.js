init()

/**
 * Récupère les infos du json
 */
function getModalData() {
    const path = '././projets.json'
    return fetch(path)
        .then(response => {
            return response.json()
        })
        .catch(error => console.error('Erreur lors de la récupération des données JSON :', error));
}
/**
 * Créé la modal 
 */
function createModal() {
    const modalBackground = document.querySelector(".modal_background");
    const modal = document.createElement("div")
    const titleModal = document.createElement("h1")
    const modalPicture = document.createElement("div")
    const imgModal = document.createElement("img")
    const closeModal = document.createElement("div")
    const imgCloseModal = document.createElement("img")
    const description = document.createElement("p")
    const skills = document.createElement("p")
    const link = document.createElement("a")

    modalBackground.classList.add("inactive")
    modal.classList.add("modal_content")
    titleModal.classList.add("title_modal")
    modalPicture.classList.add("modal_picture_content")
    imgModal.classList.add("modal_img")
    closeModal.classList.add("modal_close")
    description.classList.add("description")
    skills.classList.add("skills")
    link.classList.add("go_to")
    link.setAttribute("target", "_blank")
    link.setAttribute("title", "Cliquez pour ouvrir");

    modalBackground.append(modal)
    modal.append(titleModal)
    modal.append(modalPicture)
    modalPicture.append(link)
    link.append(imgModal)
    modal.append(closeModal)
    closeModal.append(imgCloseModal)
    imgCloseModal.src = './assets/img/works/svg/close.svg'
    modal.append(description)
    modal.append(skills)
}
/**
 * Gére les click sur les cards
 */
function cardsClick() {
    const cards = document.querySelectorAll(".gallery_cards");
    cards.forEach(card => {
        card.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            openModal();
            displayModalData(id);
        });
    });
}
/**
 * Affiche les infos du projet corespondant à la card
 */
function displayModalData(id) {
    const modalBackground = document.querySelector(".modal_background");
    const modal = document.querySelector(".modal_content")
    const titleModal = document.querySelector(".title_modal")
    const modalPicture = document.querySelector(".modal_img");
    const description = document.querySelector(".description");
    const skills = document.querySelector(".skills");
    const link = document.querySelector(".go_to");

    getModalData()
        .then(data => {
            console.log(data)
            for (let i = 0; i < data.length; i++)
                if (id == data[i].id) {
                    titleModal.innerText = data[i].title;
                    modalPicture.src = data[i].pictures;
                    modalPicture.alt = data[i].title;
                    description.textContent = data[i].decription;
                    skills.textContent = data[i].skills;
                    link.href = data[i].link;
                    break;
                }
            const closeModal = document.querySelector(".modal_close")
            closeModal.addEventListener("click", () => {
                modalBackground.classList.remove("active_background")
                modalBackground.classList.add("inactive")
                resetModal()
            })
        });
}
/**
 * Gestion du background de la modale
 */
function openModal() {
    const modalBackground = document.querySelector(".modal_background");
    modalBackground.classList.remove("inactive")
    modalBackground.classList.add("active_background")
}
/**
 * reset la Modale
 */
function resetModal() {
    const modal = document.querySelector(".modal_content")
    const titleModal = document.querySelector(".title_modal")
    const modalPicture = document.querySelector(".modal_img");
    const description = document.querySelector(".description");
    const skills = document.querySelector(".skills");
    const btnLink = document.querySelector(".goto");
    titleModal.innerText = "";
    modalPicture.src = "";
    modalPicture.alt = "";
    description.textContent = "";
    skills.textContent = "";
    btnLink.href = "";
}
/**
 * Initialise le demarrage du code
 */
function init() {
    createModal()
    cardsClick()
}
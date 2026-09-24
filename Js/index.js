var contactModel = document.getElementById("contactModel");
var overlay = document.getElementById("overlay");
var overlay2 = document.getElementById("overlay2");
var overlayInner = document.getElementById("overlayInner");
var contactNameInput = document.getElementById("contactNameInput");
var contactPhoneInput = document.getElementById("contactPhoneInput");
var contactEmailInput = document.getElementById("contactEmailInput");
var contactAddressInput = document.getElementById("contactAddressInput");
var contactCategoryInput = document.getElementById("contactCategoryInput");
var checkBoxFavorite = document.getElementById("checkBoxFavorite");
var checkBoxEmergency = document.getElementById("checkBoxEmergency");
var totalCount = document.getElementById("totalCount");
var favoriteCount = document.getElementById("favoriteCount");
var emergencyCount = document.getElementById("emergencyCount");
var contactsTextCount = document.getElementById("contactsTextCount");
var searchInput = document.getElementById("searchInput");
var totalEmptyState = document.getElementById("totalEmptyState");
var favoriteEmptyState = document.getElementById("favoriteEmptyState");
var emergencyEmptyState = document.getElementById("emergencyEmptyState");
var contactFormInTotal = document.getElementById("contactFormInTotal");
var contactFormInFavorite = document.getElementById("contactFormInFavorite");
var contactFormInEmergency = document.getElementById("contactFormInEmergency");
var wrongName = document.getElementById("wrongName");
var wrongPhone = document.getElementById("wrongPhone");
var invalidPhone = document.getElementById("invalidPhone");
var invalidEmail = document.getElementById("invalidEmail");
var completeData = document.getElementById("completeData");
var sureDelete = document.getElementById("sureDelete");
var deleted = document.getElementById("deleted");
var editIndex = -1;
var contactToDelete = -1;

var contacts = [];

function loadContacts() {
    var savedContacts = localStorage.getItem("contacts");
    if (savedContacts != null) {
        contacts = JSON.parse(savedContacts);
    }
    displayContacts();
}
function saveContactsInLocalStorage() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
function openContactModel() {
    contactModel.style.display = "block";
    overlay.style.display = "block";
}
function closeContactModel() {
    contactModel.style.display = "none";
    overlay.style.display = "none";
    clearForm();
}
function clearForm() {
    contactNameInput.value = "";
    contactPhoneInput.value = "";
    contactEmailInput.value = "";
    contactAddressInput.value = "";
    contactCategoryInput.value = "";
    checkBoxFavorite.checked = false;
    checkBoxEmergency.checked = false;
    editIndex = -1;
}
function saveContact() {
    var name = contactNameInput.value;
    var phone = contactPhoneInput.value;
    var email = contactEmailInput.value;
    var address = contactAddressInput.value;
    var category = contactCategoryInput.value;
    var favorite = checkBoxFavorite.checked;
    var emergency = checkBoxEmergency.checked;
    if (name == "") {
        wrongName.style.display = "block";
        overlayInner.style.display = "block";
        return;
    }
    if (phone == "") {
        wrongPhone.style.display = "block";
        overlayInner.style.display = "block";
        return;
    }
    var phonePattern = /^01[0125][0-9]{8}$/;
    if (!phonePattern.test(phone)) {
        invalidPhone.style.display = "block";
        overlayInner.style.display = "block";
        return;
    }
    if (email == "") {
        completeData.style.display = "block";
        overlayInner.style.display = "block";
        return;
    }
    var emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
        invalidEmail.style.display = "block";
        overlayInner.style.display = "block";
        return;
    }
    if (category == "") {
        completeData.style.display = "block";
        overlayInner.style.display = "block";
        return;
    }
    if (address == "") {
        completeData.style.display = "block";
        overlayInner.style.display = "block";
        return;
    }
    var contact = {
        name: name,
        phone: phone,
        email: email,
        address: address,
        category: category,
        favorite: favorite,
        emergency: emergency
    };
    if (editIndex == -1) {
        contacts.push(contact);
    }
    else {
        contacts[editIndex] = contact;
        editIndex = -1;
    }
    saveContactsInLocalStorage();
    displayContacts();
    contactModel.style.display = "none";
    overlay.style.display = "none";
    overlayInner.style.display = "none";
    clearForm()
}
function closeWrongName() {
    wrongName.style.display = "none";
    overlayInner.style.display = "none";
}
function closeWrongPhone() {
    wrongPhone.style.display = "none";
    overlayInner.style.display = "none";
}
function closeInvalidPhone() {
    invalidPhone.style.display = "none";
    overlayInner.style.display = "none";
}
function closeInvalidEmail() {
    invalidEmail.style.display = "none";
    overlayInner.style.display = "none";
}
function closeCompleteData() {
    completeData.style.display = "none";
    overlayInner.style.display = "none";
}
function closeDeleted() {
    deleted.style.display = "none";
    overlay.style.display = "none";
}
function displayContacts() {
    displayTotalContacts();
    displayFavoriteContacts();
    displayEmergencyContacts();
    updateCounters();
}
function displayTotalContacts() {
    if (contacts.length == 0) {
        totalEmptyState.style.display = "flex";
        contactFormInTotal.style.display = "none";
        return;
    }
    totalEmptyState.style.display = "none";
    contactFormInTotal.style.display = "block";
    var totalHTML = "";
    for (var i = 0; i < contacts.length; i++) {
        totalHTML += createContactCard(contacts[i], i);
    }
    contactFormInTotal.innerHTML = totalHTML;
}
function displayFavoriteContacts() {
    var favoriteContacts = "";
    var favoriteNumber = 0;
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].favorite == true) {
            favoriteContacts += createFavoriteCard(contacts[i], i);
            favoriteNumber++;
        }
    }
    if (favoriteNumber == 0) {
        favoriteEmptyState.style.display = "flex";
        contactFormInFavorite.style.display = "none";
    }
    else {
        favoriteEmptyState.style.display = "none";
        contactFormInFavorite.style.display = "block";
        contactFormInFavorite.innerHTML = favoriteContacts;
    }
}
function displayEmergencyContacts() {
    var emergencyContacts = "";
    var emergencyNumber = 0;
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].emergency == true) {
            emergencyContacts += createEmergencyCard(contacts[i], i);
            emergencyNumber++;
        }
    }
    if (emergencyNumber == 0) {
        emergencyEmptyState.style.display = "flex";
        contactFormInEmergency.style.display = "none";
    }
    else {
        emergencyEmptyState.style.display = "none";
        contactFormInEmergency.style.display = "block";
        contactFormInEmergency.innerHTML = emergencyContacts;
    }
}
function createContactCard(contact, index) {
    var html = "";
    html += `
    <div class="card mb-3">
        <div class="card-body">
            <h4 class="fw-bold" >${contact.name}</h4>
            <p class="fw-bold text-muted">
                <i class="text-black fa-solid fa-phone"></i>
                ${contact.phone}
            </p>
            <p class="fw-bold text-muted">
                <i class="text-black fa-solid fa-envelope"></i>
                ${contact.email}
            </p>
            <p class="fw-bold text-muted">
                <i class="text-black fa-solid fa-location-dot"></i>
                ${contact.address}
            </p>
            <span class="badge bg-primary">
                ${contact.category}
            </span>
            <div class="mt-3">
                <button
                    onclick="toggleFavorite(${index})"
                    class="btn btn-warning fw-bold text-white">
                    <i class="fa-solid fa-star"></i>
                </button>
                <button
                    onclick="toggleEmergency(${index})"
                    class="btn btn-danger fw-bold text-white">
                    <i class="fa-solid fa-hand-holding-heart"></i>
                </button>
                <button
                    onclick="editContact(${index})"
                    class="btn btn-primary fw-bold text-white">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button
                    onclick="showDeleteConfirmation(${index})"
                    class="btn btn-dark fw-bold text-white">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </div>
    `;
    return html;
}
function createFavoriteCard(contact, index) {
    var html = "";
    html += `
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="fw-bold">${contact.name}</h5>
            <p class="fw-bold text-muted">${contact.phone}</p>
            <div class="mt-3">
                <button
                    onclick="toggleFavorite(${index})"
                    class="btn btn-warning fw-bold text-white">
                    <i class="fa-solid fa-star"></i>
                </button>
            </div>
        </div>
    </div>
    `;
    return html;
}
function createEmergencyCard(contact, index) {
    var html = "";
    html += `
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="fw-bold">${contact.name}</h5>
            <p class="fw-bold text-muted">${contact.phone}</p>
            <div class="mt-3">
                <button
                    onclick="toggleEmergency(${index})"
                    class="btn btn-danger fw-bold text-white">
                    <i class="fa-solid fa-hand-holding-heart"></i>
                </button>
            </div>
        </div>
    </div>
    `;
    return html;
}
function searchContacts() {
    var searchValue = searchInput.value.toLowerCase();
    var searchHTML = "";
    var searchNumber = 0;
    for (var i = 0; i < contacts.length; i++) {
        var contactName = contacts[i].name.toLowerCase();
        var contactPhone = contacts[i].phone.toLowerCase();
        if (
            contactName.includes(searchValue) ||
            contactPhone.includes(searchValue)
        ) {
            searchHTML += createContactCard(contacts[i], i);
            searchNumber++;
        }
    }
    if (searchNumber == 0) {
        contactFormInTotal.style.display = "none";
        totalEmptyState.style.display = "flex";
    }
    else {
        totalEmptyState.style.display = "none";
        contactFormInTotal.style.display = "block";
        contactFormInTotal.innerHTML = searchHTML;
    }
}
function updateCounters() {
    var favoriteNumber = 0;
    var emergencyNumber = 0;
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].favorite == true) {
            favoriteNumber++;
        }
        if (contacts[i].emergency == true) {
            emergencyNumber++;
        }
    }
    totalCount.innerHTML = contacts.length;
    contactsTextCount.innerHTML = contacts.length;
    favoriteCount.innerHTML = favoriteNumber;
    emergencyCount.innerHTML = emergencyNumber;
}
function toggleFavorite(index) {
    if (contacts[index].favorite == true) {
        contacts[index].favorite = false;
    }
    else {
        contacts[index].favorite = true;
    }
    saveContactsInLocalStorage();
    displayContacts();
}
function toggleEmergency(index) {
    if (contacts[index].emergency == true) {
        contacts[index].emergency = false;
    }
    else {
        contacts[index].emergency = true;
    }
    saveContactsInLocalStorage();
    displayContacts();
}
function editContact(index) {
    editIndex = index;
    contactNameInput.value = contacts[index].name;
    contactPhoneInput.value = contacts[index].phone;
    contactEmailInput.value = contacts[index].email;
    contactAddressInput.value = contacts[index].address;
    contactCategoryInput.value = contacts[index].category;
    checkBoxFavorite.checked = contacts[index].favorite;
    checkBoxEmergency.checked = contacts[index].emergency;
    contactModel.style.display = "block";
    overlay.style.display = "block";
}  
function showDeleteConfirmation(index) {
    contactToDelete = index;
    sureDelete.style.display = "block";
    overlay2.style.display = "block";
}
function confirmDelete() {
    if (contactToDelete != -1) {
        contacts.splice(contactToDelete, 1);
        contactToDelete = -1;
        saveContactsInLocalStorage();
        displayContacts();
        sureDelete.style.display = "none";
        overlay2.style.display = "none";
    }
}
function cancelDelete() {
    contactToDelete = -1;
    sureDelete.style.display = "none";
    overlay2.style.display = "none";
}
loadContacts();


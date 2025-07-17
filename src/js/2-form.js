let formData = {
    email: "",
    message: ""
};

let form = document.querySelector(".feedback-form");
form.addEventListener("input", save);

function save(e) {
    e.preventDefault();

    formData[e.target.name] = e.target.value;

    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

function pageStart() {
    let locEmail = JSON.parse(localStorage.getItem("feedback-form-state")).email;
    let locMessage = JSON.parse(localStorage.getItem("feedback-form-state")).message;


    if (locEmail != "" || locMessage != "") {
        form.elements.email.value = locEmail;
        form.elements.message.value = locMessage;
        formData.email = locEmail;
        formData.message = locMessage;
    }
}


try {

    pageStart();
} catch (e) {

}

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    if (formData.email == "" || formData.message == "") {
        alert("Fill please all fields");
        return;
    }
    console.log(formData);

    formData.email = "";
    formData.message = "";
    form.elements.email.value = "";
    form.elements.message.value = "";
    localStorage.removeItem("feedback-form-state");
}
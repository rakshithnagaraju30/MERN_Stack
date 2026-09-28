// import emailjs from "@emailjs/browser";
// const emailjs = require("@emailjs/browser");

export function sendEmail(form = document.getElementById("book-form")) {
    if (!form) {
        return Promise.reject(new Error("Book form not found."));
    }

    emailjs.init({
        publicKey: "5xiRIGgtanvFTWrjM"
    });

    const serviceID = "service_v66s60p";
    const templateID = "template_fuhxh24";

    return emailjs
        .sendForm(serviceID, templateID, form)
        .then((response) => {
            form.reset();
            return response;
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            throw error;
        });
}

export function subscribtionMail(form = document.getElementById("newsletter-form")) {
    if (!form) {
        return Promise.reject(new Error("Newsletter form not found."));
    }

    emailjs.init({
        publicKey: "5xiRIGgtanvFTWrjM"
    });

    const serviceID = "service_v66s60p";
    const templateID = "template_byqyfp6";

    return emailjs
        .sendForm(serviceID, templateID, form)
        .then((response) => {
            form.reset();
            return response;
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            throw error;
        });
}

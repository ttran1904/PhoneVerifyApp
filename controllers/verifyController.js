import validator from "validator";
import Firebase from "./firebase";

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

/** Validate all the input parameters.*/
const validate = (value, rules) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'isValidPhone': isValid = isValid && validatePhoneNumber(value); break;
            case 'isRequired': isValid = isValid && requiredValidator(value); break;
            default: isValid = true;
        }
    }
    return isValid;
}

/** Validate phone number is true.*/
const validatePhoneNumber = (number) => {
    return validator.isMobilePhone(number)
}

/** Check to confirm that feild is required.*/
const requiredValidator = (value) => {
    return value.trim() !== '';
}

/** Validate the User-input access code.
 * Also reset validation to empty string*/
function ValidateAccessCode (phoneNumber, accessCode) {
    if (!(Firebase.getAccessCode() == accessCode)) {
        alert("Incorrect access code. Please try again!");
        return {"success": true}
    }
    alert("Success: Your Phone is Verified!");
    return {"success": false};
}

/** Create a store new access code.
 * Additional function of saving to Fire base is
 * passed on to the handle function in 'firebase.js'.*/
function CreateNewAccessCode (phoneNumber) {
    if (!validatePhoneNumber(phoneNumber)) {
        alert("Please enter a valid phone number.")
    }
    const min = Math.ceil(100000);
    const max = Math.floor(999999);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// /** Create a new access code.*/
// exports.CreateNewAccessCode = async (req, res) => {
//     client
//         .verify
//         .services(process.env.VERIFY_SERVICE_SID)
//         .verifications
//         .create({
//             to: `+${req.query.phoneNumber}`,
//             channel: req.query.channel
//         })
//         .then(data => {
//             res.status(200).send(data);
//         })
// };
//
// /** Validate the Access Code from the Firebase DB.*/
// exports.ValidateAccessCode = async (req, res) => {
//     client
//         .verify
//         .services(process.env.VERIFY_SERVICE_SID)
//         .verificationChecks
//         .create({
//             to: `+${req.query.phoneNumber}`,
//             code: req.query.code
//         })
//         .then(data => {
//             res.status(200).send(data);
//         });
// };

export default validate;


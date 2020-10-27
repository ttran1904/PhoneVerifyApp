import validator from "validator";

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

/** Validate all the input parameters.*/
const validate = (value, rules) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'isValidPhone': isValid = isValid && () && validatePhoneNumber(value); break;
            case 'isRequired': isValid = isValid && requiredValidator(value); break;
            default: isValid = true;
        }
    }
    return isValid;
}

/** Validate phone number is true.*/
const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
}

/** Check to confirm that feild is required
 */
const requiredValidator = (value) => {
    return value.trim() !== '';
}

export default validate;


/** Create a new access code.*/
exports.CreateNewAccessCode = async (req, res) => {
    client
        .verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verifications
        .create({
            to: `+${req.query.phoneNumber}`,
            channel: req.query.channel
        })
        .then(data => {
            res.status(200).send(data);
        })
};

/** Validate the Access Code from the Firebase DB.*/
exports.ValidateAccessCode = async (req, res) => {
    client
        .verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: `+${req.query.phoneNumber}`,
            code: req.query.code
        })
        .then(data => {
            res.status(200).send(data);
        });
};


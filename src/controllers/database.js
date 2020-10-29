import React from "react";
import Firebase from "firebase";
import config from "../config";
import verifyController from "./verifyController";

class Database extends React.Component {
    /** Firebase Constructor.*/
    constructor(props) {
        super(props);
        Firebase.initializeApp(config);
        this.state = {
            phoneData: []
        };
    }

    /** Handle input from App.*/
    handle (pno, code, showCode) {
        if (!this.state.showCode) {
            const { phoneData } = this.state;
            const acode = verifyController.CreateNewAccessCode(pno);
                phoneData.push({'phoneNumber': pno, 'accessCode': acode});
            this.setState({ phoneData });
            this.writePhoneData();
        } else {
            verifyController.ValidateAccessCode(pno, code)
        }
    }

    /** Save phone data into Firebase.*/
    writePhoneData = () => {
        Firebase.database()
            .ref("/")
            .set(this.state);
    };

    /** Get phone data from Firebase.*/
    getPhoneData = () => {
        let ref = Firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    };
    /** Get data.*/
    componentDidMount() {
        this.getPhoneData();
    }
    /** Update when state is change.*/
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.writePhoneData();
        }
    }
    /** Remove data*/
    removeData = (pno) => {
        const { phoneData } = this.state;
        const newState = phoneData.filter(data => {
            return data.uid !== pno.uid;
        });
        this.setState({ phoneData: newState });
    };
    /** Update data*/
    updateData = (pno) => {
        this.refs.uid.value = pno.uid;
        this.refs.name.value = pno.name;
        this.refs.role.value = pno.role;
    };

}

/** Get access code from a phone number.*/
const getAccessCode = (pno) => {
    let ref = Firebase.database().ref("/");
    ref.orderByChild("phoneNumber").equalTo(pno).on("value", snapshot => {
        if (snapshot.exists()) {
            return snapshot.val().accessCode.value;
        } else {
            alert("Phone number have not been input!")
            return null;
        }
    });
};
export default Database;


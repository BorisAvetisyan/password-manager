
class PasswordManager {

    constructor(props) {
        if(props.length < 6) {
            throw new Error("Password manager instance cannot be constructed because of missing fields")
        }

        this.id = props[0];
        this.url = props[1];
        this.name = props[2];
        this.password = props[3];
        this.created_date = props[4];
        this.updated_date = props[5];
    }

    static getFields() {
        return 'id,url,name,password,created_date,updated_date'
    }

}

module.exports = PasswordManager;
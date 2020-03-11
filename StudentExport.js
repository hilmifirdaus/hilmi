class Student {
    constructor(name, matricNo, major) {
        this.name = name;
        this.matricNo = matricNo;
        this.major = major;
    }
    
    set Name(name) {
        this.name = name;
    }

    set MatricNo(matricNo) {
        this.matricNo = matricNo;
    }

    set Major(major) {
        this.major = major;
    }

    get Name() {
        return this.name;
    }

    get MatricNo() {
        return this.matricNo;
    }

    get Major() {
        return this.major;
    }

    display = () => {
        console.log(`NAME: ${this.name}`);
        console.log(`MATRIC NO: ${this.matricNo}`);
        console.log(`MAJORING: ${this.major}`);
    }
}

module.exports = Student;










    
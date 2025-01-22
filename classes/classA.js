class A {

     

    constructor(name, age){
        this.name = name;
        this.age = age;
        this.hobbies = ["Football", "Fitness", "Gaming", "Anime", "Music"];
    };

    greet(){
        console.log(`Hello my name is ${this.name} and i am ${this.age} years old.`);
    };

    hobby(){
        console.log(`I like ${this.hobbies[Math.floor(Math.random() * this.hobbies.length)]}`);
    };


}

module.exports = A;
const { indexOf, includes } = require("./people")

module.exports = {
    title: function (){
        return `
$$$$$$$$\\        $$\\           $$\\                           $$\\                               
\\__$$  __|       \\__|          $$ |                          $$ |                              
   $$ | $$$$$$\\  $$\\ $$$$$$$\\  $$ |  $$\\  $$$$$$\\   $$$$$$\\  $$ | $$$$$$\\ $$\\    $$\\  $$$$$$\\  
   $$ |$$  __$$\\ $$ |$$  __$$\\ $$ | $$  |$$  __$$\\ $$  __$$\\ $$ |$$  __$$\\\\$$\\  $$  |$$  __$$\\ 
   $$ |$$ |  \\__|$$ |$$ |  $$ |$$$$$$  / $$$$$$$$ |$$ |  \\__|$$ |$$ /  $$ |\\$$\\$$  / $$$$$$$$ |
   $$ |$$ |      $$ |$$ |  $$ |$$  _$$<  $$   ____|$$ |      $$ |$$ |  $$ | \\$$$  /  $$   ____|
   $$ |$$ |      $$ |$$ |  $$ |$$ | \\$$\\ \\$$$$$$$\\ $$ |$$\\   $$ |\\$$$$$$  |  \\$  /   \\$$$$$$$\\ 
   \\__|\\__|      \\__|\\__|  \\__|\\__|  \\__| \\_______|\\__|\\__|  \\__| \\______/    \\_/     \\_______|
================================================================================================
   `.yellow
    },

    line: function(title = "="){
        return title.padStart(48, "=").padEnd(96, "=").bgBrightYellow.black
    },

    allMale: function(p){
        /* 
        let count = 0
        p.forEach(element => {
            if (element.gender === "Male"){
                count ++
            }
        }); 
        return console.log(count) 
        */
        return p.filter( obj => obj.gender === "Male");
    },

    allFemale: function(p){
        /*  
        let count = 0
        p.forEach(element => {
            if (element.gender === "Female"){
                count ++
            }
        }); 
        return console.log(count) 
        */
        return p.filter( index => index.gender === "Female");
    },

    nbOfMale: function(p){
        return this.allMale(p).length
    },

    nbOfFemale: function(p){
        return this.allFemale(p).length
    },

    nbOfMaleInterest: function(p){
        return (p.filter( index => index.looking_for === "M")).length;
    },

    nbOfFemaleInterest: function(p){
        return (p.filter( index => index.looking_for === "F")).length;
    },

    nBOfPeopleGettingMore2000: function(p){
        return (p.filter( index => index.income.substring(1) >= 2000.00)).length;
    },

    nBOfPeopleLikeDrama: function(p){
        return (p.filter( index => (index.pref_movie).includes("Drama"))).length
    },
    
    nBOfPeopleLikeSf: function(p){
        return (p.filter( index => (index.pref_movie).includes("Sci-Fi"))).length
    },
    
    nBOfFemaleLikeSf: function(p){
        let temp = this.allFemale(p)
        return (temp.filter( index => (index.pref_movie).includes("Sci-Fi"))).length
    },

    /* LEVEL 2 */

    nBoPeopleLikeDoc: function(p){
        return (p.filter( index => (index.pref_movie).includes("Documentary")))
    }, 

    nBoPeopleGettingMore1482: function(p){
        return (p.filter( index => index.income.substring(1) > 1482.00));
    }, 
    
    nBoPeopleGet1482andLikeDoc: function(p){
        let temp = this.nBoPeopleLikeDoc(p)
        return this.nBoPeopleGettingMore1482(temp).length
    }, 

    nBOfPeopleGettingMore4000: function(p){
        let group = []
        temp = (p.filter( index => index.income.substring(1) >= 4000.00));
        temp.forEach(element => {
            group.push("nom : " + element.last_name + ", prenom : " + element.first_name + ", id : " + element.id + ",income : " + element.income);
        });
        return group
    },

    richestMan: function(p){
        array = this.allMale(p)
        array.sort((a, b) => parseFloat(b.income.substring(1)) - parseFloat(a.income.substring(1)));
        return (array[0].first_name +" "+ array[0].last_name + " id : " + array[0].id).yellow
    },

    averageSalary: function(p){
        let total = 0
        p.forEach(element => {
            total = total + parseFloat(element.income.substring(1))
            
        });
        return ((total/p.length).toFixed(2)+ " $").yellow
    },

    medianSalary: function(p){
        let median = 0
        p = p.sort((a, b) => parseFloat(b.income.substring(1)) - parseFloat(a.income.substring(1)));
        if (p.length % 2 == 0) {
            //pair
            median = ( parseFloat(p[(p.length/2)].income.substring(1)) + parseFloat(p[(p.length/2)].income.substring(1)) )/2
        } else if (p.length % 2 != 0) {
            // impair
            median = parseFloat(p[(p.length/2)].income.substring(1))
        }
        return median
    },

    nBOfPeopleinNorth: function(p) {
       return (p.filter( index => index.latitude > 0)).length
    },
    
    PeopleinSouth: function(p) {
       return (p.filter( index => index.latitude < 0))
    },

    averageSalaryInSounth: function(p) {
        let temp = this.PeopleinSouth(p)
        return this.averageSalary(temp)
    },

    /* LEVEL 3 */

    // closest people to Bérénice Cawt (name and id)
    closestToberenice: function(p){
        let Berenice = p.filter( index => index.first_name == "Bérénice")
        MrsCawt_B = Berenice.filter( index => index.last_name == "Cawt")
        l = p.splice(MrsCawt_B[0].id, 0, )
        return MrsCawt_B[0].id
    },


    /* MATCH */

    match: function(p){
        return "not implemented".red;
    }
}
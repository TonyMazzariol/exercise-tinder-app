const { indexOf, includes, forEach } = require("./people")

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

    allMale: function([...p]){
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

    allFemale: function([...p]){
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

    nbOfMale: function([...p]){
        return this.allMale(p).length
    },

    nbOfFemale: function([...p]){
        return this.allFemale(p).length
    },

    nbOfMaleInterest: function([...p]){
        return (p.filter( index => index.looking_for === "M")).length;
    },

    nbOfFemaleInterest: function([...p]){
        return (p.filter( index => index.looking_for === "F")).length;
    },

    nBOfPeopleGettingMore2000: function([...p]){
        return (p.filter( index => index.income.substring(1) >= 2000.00)).length;
    },

    nBOfPeopleLikeDrama: function([...p]){
        return (p.filter( index => (index.pref_movie).includes("Drama"))).length
    },
    
    nBOfPeopleLikeSf: function([...p]){
        return (p.filter( index => (index.pref_movie).includes("Sci-Fi"))).length
    },
    
    nBOfFemaleLikeSf: function([...p]){
        let temp = this.allFemale(p)
        return (temp.filter( index => (index.pref_movie).includes("Sci-Fi"))).length
    },

/* LEVEL 2 */

    nBoPeopleLikeDoc: function([...p]){
        return (p.filter( index => (index.pref_movie).includes("Documentary")))
    }, 

    nBoPeopleGettingMore1482: function([...p]){
        return (p.filter( index => index.income.substring(1) > 1482.00));
    }, 
    
    nBoPeopleGet1482andLikeDoc: function([...p]){
        let temp = this.nBoPeopleLikeDoc(p)
        return this.nBoPeopleGettingMore1482(temp).length
    }, 

    nBOfPeopleGettingMore4000: function([...p]){
        let group = []
        temp = (p.filter( index => index.income.substring(1) >= 4000.00));
        temp.forEach(element => {
            group.push(element.last_name+" "+element.first_name+", id : "+element.id+" ,income : "+element.income);
        });
        return group
    },

    richestMan: function([...p]){
        array = this.allMale(p)
        array.sort((a, b) => parseFloat(b.income.substring(1)) - parseFloat(a.income.substring(1)));
        return (array[0].first_name +" "+ array[0].last_name + " id : " + array[0].id).yellow
    },

    averageSalary: function([...p]){
        let total = 0
        p.forEach(element => {
            total = total + parseFloat(element.income.substring(1))
        });
        return ((total/p.length).toFixed(2)+ " $").yellow
        // for (let i = 0; i < p.length; i++) {
        //     total += parseFloat(p[i].income.substring(1))            
        // }
        // return total/1000
    },

    medianSalary: function([...p]){
        p = p.sort((a, b) => parseFloat(b.income.substring(1)) - parseFloat(a.income.substring(1)));
        if (p.length % 2 == 0) {
            //pair
            return (( parseFloat(p[(p.length/2)].income.substring(1)) + parseFloat(p[(p.length/2)].income.substring(1)) )/2 + " $").yellow
        } else if (p.length % 2 != 0) {
            // impair
            return (parseFloat(p[(p.length + 1)/2].income.substring(1)) + " $").yellow
        }
    },

    nBOfPeopleinNorth: function([...p]) {
       return (p.filter( index => index.latitude > 0)).length
    },
    
    PeopleinSouth: function([...p]) {
       return (p.filter( index => index.latitude < 0))
    },

    averageSalaryInSounth: function([...p]) {
        return this.averageSalary( this.PeopleinSouth(p) )
    },

/* LEVEL 3 */

    /* DISTANCE FUNCTION */

    getDistanceFromLatLonInKm: function(lat1, lon1, lat2, lon2) {
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
        
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d ;
    },

    // closest people to Bérénice Cawt (name and id)
    closestToberenice: function([...p]){        
        let Cawt_B = p.filter( index => index.last_name == "Cawt" && index.first_name == "Bérénice")
     
        p = p.filter( index => index.id !== Cawt_B[0].id)
       
        lat1 = parseFloat(Cawt_B[0].latitude) 
        lon1 = parseFloat(Cawt_B[0].longitude) 
        
        tab = []
        let distance = 999999
        let closestPerson = 0
        let temp = 0

        p.forEach(element => {
            lat2 = parseFloat(element.latitude) 
            lon2 = parseFloat(element.longitude) 
            temp = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
            tab.push(temp.toFixed(2))
            if  (temp  < distance){
                distance = temp
                closestPerson = element
            }
        });
       return  (closestPerson.last_name+" "+closestPerson.first_name+" id : "+closestPerson.id).yellow
    },

    // closest people to Ruì Brach(name and id)
    closestToRuì: function([...p]){        
        let Brach_R = p.filter( index => index.last_name == "Brach" && index.first_name == "Ruì")
     
        p = p.filter( index => index.id !== Brach_R[0].id)
       
        lat1 = parseFloat(Brach_R[0].latitude) 
        lon1 = parseFloat(Brach_R[0].longitude) 
        
        tab = []
        let distance = 999999
        let closestPerson = 0
        let temp = 0

        p.forEach(element => {
            lat2 = parseFloat(element.latitude) 
            lon2 = parseFloat(element.longitude) 
            temp = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
            tab.push(temp.toFixed(2))
            if  (temp  < distance){
                distance = temp
                closestPerson = element
            }
        });
       return  (closestPerson.last_name+" "+closestPerson.first_name+" id : "+closestPerson.id).yellow
    },

    //les 10 personnes qui habite les plus près de Josée Boshard
    tenClosestToJosee: function([...p]){        
        let Boshard_J = p.filter( index => index.last_name == "Boshard" && index.first_name == "Josée")
     
        p = p.filter( index => index.id !== Boshard_J[0].id)
       
        lat1 = parseFloat(Boshard_J[0].latitude) 
        lon1 = parseFloat(Boshard_J[0].longitude) 
        
        tab = []
        let temp = 0

        p.forEach(element => {
            lat2 = parseFloat(element.latitude) 
            lon2 = parseFloat(element.longitude) 
            temp = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)    
            element.distance = temp 
        });
        p.sort((a, b) => a.distance - b.distance)
        for(let i=0; i<10; i++) {
            tab.push(p[i])                
        }
        // (closestPerson.last_name+" "+closestPerson.first_name+" id : "+closestPerson.id).yellow
       return tab.map(name => `${name.first_name} `+`${name.last_name}`+`id : ${name.id}`)
    },

    //Les noms et ids des 23 personnes qui travaillent chez google
    googleWorker: function([...p]){
        p = p.filter( index => (index.email).includes("google"))
        p = p.map(name => `${name.first_name} `+`${name.last_name}`+`id : ${name.id}`)
        return p
    },

    // AGE ORDER FUNCTION 
    ageOrder: function([...p]){
        let year = 0
        let month = 0
        let day = 0

        for (let i = 0; i < p.length; i++) {
            year = p[i].date_of_birth.substring(4,0)
            month = p[i].date_of_birth.substring(5,7)
            day = p[i].date_of_birth.substring(8,10)
            let anniv = new Date(Date.UTC(year, month, day))
            p[i].timeAlive = Date.parse(anniv.toUTCString())
        }
        p.sort((a, b) => a.timeAlive - b.timeAlive)
        return p
    },

    // Personne la plus agée
    oldestPersonn: function([...p]){
        p = this.ageOrder(p)
        return (p[0].last_name+" "+p[0].first_name+" id : "+p[0].id).yellow
    },

    //Personne la plus jeune
    youngestPersonn: function([...p]) {
        p = this.ageOrder(p)
        l = p.length-1
        return (p[l].last_name+" "+p[l].first_name+" id : "+p[l].id).yellow
    }, 

    //Moyenne des différences d'age
    averageAge: function([...p]){
        let year = 0
        let total = 0

        for (let i = 0; i < p.length; i++) {
            year = p[i].date_of_birth.substring(4,0)
            // let anniv = new Date(Date.UTC(year))
            // p[i].year = Date.parse(anniv.toUTCString())
            p[i].age = 2021 - (+year)
        }    
        p.forEach(element => {
            total = total + element.age
        });
        return ((total/p.length).toFixed(2)+ " year").yellow
    },

    /* LEVEL 4  */

    // most popular movie genre
    mostPopuMovieGenre: function([...p]){
        let tab = []
        let tab2 = []
        let a = 0
        for (let i = 0; i < p.length; i++) {
            p[i].pref_movie = (p[i].pref_movie.split('|'))
            tab.push(p[i].pref_movie)
        }
        for (let i = 0; i < tab.length; i++) {
            for (let u = 0; u < tab[i].length; u++) {
                a = tab[i][u]
                tab2.push(a)
            }           
        }
        let b = ""
        let c = ""
        let array = ["Hello"]

        for (let i = 0; i < tab2.length; i++) {
            c = tab2[i]
            for (let u = 0; u < array.length; u++) {
                b = array[u]
                if ( c !== b ){
                    array.push(c)
                    break
                }                
            }
        }

        return array
    }, 

/* MATCH */

    match: function(p){
        return "not implemented".red;
    }
}
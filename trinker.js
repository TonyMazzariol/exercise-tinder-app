const { indexOf, includes, forEach, keys } = require("./people")

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
        return p.filter( obj => obj.gender === "Male");
    },

    allFemale: function(p){
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
        let temp = (p.filter( index => index.income.substring(1) >= 4000.00));
        temp.forEach(element => {
            group.push(element.last_name+" "+element.first_name+", id : "+element.id+" ,income : "+element.income);
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
        p.slice().sort((a, b) => parseFloat(b.income.substring(1)) - parseFloat(a.income.substring(1)));

        if (p.length % 2 == 0) {
            //pair
            return (( parseFloat(p[(p.length/2)].income.substring(1)) + parseFloat(p[(p.length/2)].income.substring(1)) )/2 + " $").yellow
        } else if (p.length % 2 != 0) {
            // impair
            return (parseFloat(p[(p.length + 1)/2].income.substring(1)) + " $").yellow
        }
    },

    nBOfPeopleinNorth: function(p) {
       return (p.filter( index => index.latitude > 0)).length
    },
    
    PeopleinSouth: function(p) {
       return (p.filter( index => index.latitude < 0))
    },

    averageSalaryInSounth: function(p) {
        return this.averageSalary( this.PeopleinSouth(p) )
    },

/* LEVEL 3 */

    /* DISTANCE FUNCTION */

    getDistanceFromLatLonInKm: function(person, element) {
               
        lat1 = parseFloat(person[0].latitude) 
        lon1 = parseFloat(person[0].longitude) 

        lat2 = parseFloat(element.latitude) 
        lon2 = parseFloat(element.longitude) 

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

    closestPerson: function(p, person){
        p = p.filter( index => index.id !== person[0].id)

        // tab = []
        let distance = 999999
        let closestPerson = 0
        let temp = 0

        p.forEach(element => { 
            temp = this.getDistanceFromLatLonInKm(person, element)
            // tab.push(temp.toFixed(2))
            if  (temp  < distance  ){
                distance = temp
                closestPerson = element
            }
        });
       return  (closestPerson.last_name+" "+closestPerson.first_name+" id : "+closestPerson.id).yellow
    },

    closestPerson2: function(p, person){
        let men = this.allMale(p)
        men = men.filter( index => index.looking_for === "M")

        // tab = []
        let distance = 999999
        let closestPerson = 0
        let temp = 0

        men.forEach(element => { 
            temp = this.getDistanceFromLatLonInKm(person, element)
            // tab.push(temp.toFixed(2))
            if  (temp  < distance  ){
                distance = temp
                closestPerson = element
            }
        });
       return closestPerson
    },

    // closest people to Bérénice Cawt (name and id)
    closestToberenice: function(p){        
        let person = p.filter( index => index.last_name == "Cawt" && index.first_name == "Bérénice")
        return this.closestPerson(p, person)
    },

    // closest people to Ruì Brach(name and id)
    closestToRuì: function(p){    
        let person = p.filter( index => index.last_name == "Brach" && index.first_name == "Ruì")
        return this.closestPerson(p, person)
    },

    //les 10 personnes qui habite les plus près de Josée Boshard
    tenClosestToJosee: function(p){        
        let person = p.filter( index => index.last_name == "Boshard" && index.first_name == "Josée")
     
        array = p.filter( index => index.id !== person[0].id)

        tab = []

        array.forEach(element => {
            element.distance = this.getDistanceFromLatLonInKm(person , element)     
        });
        array.sort((a, b) => a.distance - b.distance)
        for(let i=0; i<10; i++) {
            tab.push(array[i])                
        }
       return tab.map(name => `${name.first_name} `+`${name.last_name}`+`id : ${name.id}`)
    },

    //Les noms et ids des 23 personnes qui travaillent chez google
    googleWorker: function(p){
        p = p.filter( index => (index.email).includes("google"))
        p = p.map(name => `${name.first_name} `+`${name.last_name}`+`id : ${name.id}`)
        return p
    },

    // AGE ORDER FUNCTION 
    ageOrder: function(p){
        let year = 0
        let month = 0
        let day = 0

        let array = [] 
        array = p.slice()

        for (let i = 0; i < array.length; i++) {
            year = array[i].date_of_birth.substring(4,0)
            month = array[i].date_of_birth.substring(5,7)
            day = array[i].date_of_birth.substring(8,10)
            let anniv = new Date(Date.UTC(year, month, day))
            array[i].timeAlive = Date.parse(anniv.toUTCString())
        }
        array.sort((a, b) => a.timeAlive - b.timeAlive)
        return array
    },

    // Personne la plus agée
    oldestPersonn: function(p){
        let array = this.ageOrder(p)
        return (array[0].last_name+" "+array[0].first_name+", id : "+array[0].id).yellow
    },

    //Personne la plus jeune
    youngestPersonn: function(p) {
        let array = this.ageOrder(p)
        l = array.length-1
        return (array[l].last_name+" "+array[l].first_name+", id : "+array[l].id).yellow
    }, 

    // AJOUT DE L'AGE
    AddAge: function(p){
        let year = 0
        for (let i = 0; i < p.length; i++) {
            year = p[i].date_of_birth.substring(4,0)
            // let anniv = new Date(Date.UTC(year))
            // p[i].year = Date.parse(anniv.toUTCString())
            p[i].age = 2021 - (+year)
        }    
        return p
    },

    //Moyenne des différences d'age
    averageAge: function(p){
        let total = 0
        p = this.AddAge(p)
        p.forEach(element => {
            total = total + element.age
        })
        return ((total/p.length).toFixed(2)+ " ans").yellow
    },

    /* LEVEL 4  */

    // most popular movie genre
    mostPopuMovieGenre: function(p){
        let orderMovieList = this.OrderMoviePopularGenreAndOccurence(p)
        return orderMovieList[0][0].yellow
    }, 
    
    //Genres de film par ordre de popularité :
    OrderMoviePopularGenre: function(p){
        let List = ""
        let orderMovieList = this.OrderMoviePopularGenreAndOccurence(p)
        for (let i = 0; i < orderMovieList.length; i++) {
            List = List.concat(" > "+orderMovieList[i][0])           
        }
        return List.yellow
 },

    //Liste des genres de film et nombre de personnes qui les préfèrent
    OrderMoviePopularGenreAndOccurence: function(p) {
        let array = []
        array = p
        array = array.slice().filter( index => index.pref_movie !== "(no genres listed)")
        
        let listOfGenreandOccurence = []   
        let tab = []
        let tab2 = []
        let a = 0

        for (let i = 0; i < array.length; i++) {
            tab.push(array[i].pref_movie.split('|'))
        }
        for (let i = 0; i < tab.length; i++) {
            for (let u = 0; u < tab[i].length; u++) {
                a = tab[i][u]
                tab2.push(a)
            }           
        }
        // list of every kind of Movie Genre
        const set = new Set(tab2)
        const counts = {};
        // Array with list and occurence of movie genre
        for (const num of tab2) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        // Cleaning and Order Array list
        for (let variable in counts) {
            listOfGenreandOccurence.push([variable, counts[variable]]);
        }
        listOfGenreandOccurence.sort(function(a, b) { return b[1] - a[1];})
        return  listOfGenreandOccurence
    },

    //Age moyen des hommes qui aiment les films noirs :", 
    averageAgeMenLikefilmsNoirs: function(p){
        let tab = []
        let Age = 0
        let array = this.allMale(p)
        for (let i = 0; i < array.length; i++) {
            (array[i].pref_movie) = (array[i].pref_movie.split('|'))
        }
        for (let i = 0; i < array.length; i++) {
            (array[i].pref_movie).forEach(element => {
                if (element === "Film-Noir") {
                    tab.push(array[i])
                }
            });
        }      
        // tab.forEach(element => {
        //    Age += element.age 
        // });
        // return (Age/tab.length + " ans").yellow
        return this.averageAge(tab)
    },
       
    //Age moyen des femmes qui aiment les films noirs, habitent sur le fuseau horaire de Paris et gagnent moins que la moyenne des hommes.
    // wikipedia : UTC+1 correspond en théorie à une zone où les longitudes sont comprises entre 7,5° E et 22,5° E (-9.2931061 WestSpain > East Poland 23.8891785)
    averageAgewomenLikefilmsNoirsTimeZone: function(p){
        let array = this.allFemale(p)
        let tab = []

        for (let i = 0; i < array.length; i++) {
            (array[i].pref_movie) = (array[i].pref_movie.split('|'))
        }
        for (let i = 0; i < array.length; i++) {
            (array[i].pref_movie).forEach(element => {
                if (element === "Film-Noir") {
                    tab.push(array[i])
                }
            });
        } 
        tab = tab.filter(index => index.longitude > -9.2931061 && index.longitude < 23.8891785)
        let averageWomenLikefilmsNoirsTimeZoneSalary = this.averageSalary(tab)
        let menSalary = this.averageSalary(this.allMale(p))

        if (averageWomenLikefilmsNoirsTimeZoneSalary < menSalary) {
            return this.averageAge(tab)
        } else {
            return "There is no one."
        }      
    },
    SameMovieGenre: function(a, b){
        let tab = undefined
        a.forEach(person => {
            b.forEach(item => {
                if (person === item) {
                    tab = true
                }   
            });
        });
        return tab
    },
    /* Homme qui cherche un homme et habite le plus proche d'un homme qui a au moins une 
    préférence de film en commun (afficher les deux et la distance entre les deux): */
    MenLookingforMen: function(p){
        let men = this.allMale(p)
        men = men.filter( index => index.looking_for === "M")
        let tableau = []
        let answer = 0
        let person = undefined
        let a = []
        let b = []
        
        for (let i = 0; i < men.length; i++) {
            
            for (let u = 0; u < men.length; u++) {
                
                if ((men[i]) != (men[u])) {
                    
                    a = (men[i].pref_movie)
                    b = (men[u].pref_movie)

                    answer = this.SameMovieGenre(a, b)
                    
                    if(answer) {
                        person = men[i]
                        if (this.closestPerson2(person, men) === b) { tableau.push(men[i].first_name+" "+men[i].pref_movie+" match "+men[u].first_name+" "+men[u].pref_movie)} 
                    }
                }
            }           
        }
        return tableau
    },

/* MATCH */

    match: function(p){
        return "not implemented".red;
    }
}
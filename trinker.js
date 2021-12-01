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
        p = p.sort((a, b) => parseFloat(b.income.substring(1)) - parseFloat(a.income.substring(1)));
        if (p.length % 2 == 0) {
            //pair
            return ( parseFloat(p[(p.length/2)].income.substring(1)) + parseFloat(p[(p.length/2)].income.substring(1)) )/2
        } else if (p.length % 2 != 0) {
            // impair
            return parseFloat(p[(p.length + 1)/2].income.substring(1))
        }
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
        // let Berenice = p.filter( index => index.first_name == "Bérénice")
        // MrsCawt_B = Berenice.filter( index => index.last_name == "Cawt")
        // l = p.splice(MrsCawt_B[0].id )

        /* 
        let Cawt_B = p.filter( index => index.last_name == "Cawt" && index.first_name == "Bérénice")
        let close = []
        p.sort((a, b) => parseFloat(b.latitude) - parseFloat(a.latitude) );
        for(let i=0; i<p.length; i++){
            if( p[i].latitude == Cawt_B[0].latitude ){
                close.push(p[i-1])
                close.push(p[i+1])
            }
        }
        p.sort((a, b) => parseFloat(b.longitude) - parseFloat(a.longitude) );
        for(let i=0; i<p.length; i++){
            if( p[i].longitude == Cawt_B[0].longitude ){
                close.push(p[i-1])
                close.push(p[i+1])
            }
        }
        return close
        let Cawt_B = p.filter( index => index.last_name == "Cawt" && index.first_name == "Bérénice")
        let close = []
        let close2 = []
        
        
        p.sort((a, b) => parseFloat(b.longitude) - parseFloat(a.longitude) );
        p.forEach(element => {
            if( element.longitude < Cawt_B[0].longitude + 1 && element.longitude > Cawt_B[0].longitude - 1 ){
                close.push(element.id)
            }
        });
        p.sort((a, b) => parseFloat(b.latitude) - parseFloat(a.latitude) );
        p.forEach(element => {
            if( element.latitude < Cawt_B[0].latitude + 0.5 && element.latitude > Cawt_B[0].latitude - 0.5 ){
                close2.push(element.id)
            }
        });
        return close
        */
       
       // let B = p.filter( index => index.id == 12)
       // lat2 = B[0].latitude
       // lon2 = B[0].longitude

       
       
       let Cawt_B = p.filter( index => index.last_name == "Cawt" && index.first_name == "Bérénice")
     
       p = p.filter( index => index.id !== 61)
       
        lat1 = Cawt_B[0].latitude
        lon1 = Cawt_B[0].latitude
        tab = []

        let distance = 999999
        let One = 0
        let temp = 0

        p.forEach(element => {
            lat2 = element.latitude
            lon2 = element.latitude
            temp = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
            if  (temp  < distance){
                distance = temp
                One = element
            }
        });
        
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
        
        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            
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
        }
       return  One
    },



/* MATCH */

    match: function(p){
        return "not implemented".red;
    }
}
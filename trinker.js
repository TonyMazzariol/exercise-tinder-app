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
        return "not implemented".red;
    },

    allFemale: function(p){
        return "not implemented".red;
    },

    nbOfMale: function(p){
        return this.allMale(p).length
    },

    nbOfFemale: function(p){
        return "not implemented".red;
    },

    nbOfMaleInterest: function(p){
        return "not implemented".red;
    },

    nbOfFemaleInterest: function(p){
        return "not implemented".red;
    },

    match: function(p){
        return "not implemented".red;
    }
}
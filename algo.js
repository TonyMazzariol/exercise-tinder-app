var colors = require('colors');
const people = require('./people');
const tr = require('./trinker');

console.log(tr.title());
console.log("Model des données : ");
console.log(people[0]);
console.log(tr.line('LEVEL 1'));

console.log("Nombre d'hommes : ",                                                                   tr.nbOfMale(people));
console.log("Nombre de femmes : ",                                                                  tr.nbOfFemale(people));
console.log("Nombre de personnes qui cherchent un homme :",                                         tr.nbOfMaleInterest(people));
console.log("Nombre de personnes qui cherchent une femme :",                                        tr.nbOfFemaleInterest(people));
console.log("Nombre de personnes qui gagnent plus de 2000$ :",                                      tr.nBOfPeopleGettingMore2000(people));
console.log("Nombre de personnes qui aiment les Drama :",                                           tr.nBOfPeopleLikeDrama(people));
console.log("Nombre de personnes qui aiment la science-fiction :",                                  tr.nBOfPeopleLikeSf(people));
console.log("Nombre de femmes qui aiment la science-fiction :",                                     tr.nBOfFemaleLikeSf(people));
console.log(tr.line('LEVEL 2'));
//console.log("Nombre de personnes qui gagnent plus de 1482$ :",                                      tr.nBoPeopleGettingMore1482(people));
// console.log("Nombre de personnes qui aiment les documentaires  :",                                  tr.nBoPeopleLikeDoc(people));
console.log("Nombre de personnes qui aiment les documentaires et gagnent plus de 1482$ :",          tr.nBoPeopleGet1482andLikeDoc(people ));
console.log("Liste des noms, prénoms, id et revenu des personnes qui gagnent plus de 4000$ :",      tr.nBOfPeopleGettingMore4000(people));
console.log("Homme le plus riche (nom et id) :",                                                    tr.richestMan(people));
console.log("Salaire moyen :",                                                                      tr.averageSalary(people));
console.log("Salaire médian :",                                                                     tr.medianSalary(people));
console.log("Nombre de personnes qui habitent dans l'hémisphère nord :",                            tr.nBOfPeopleinNorth(people));
console.log("Salaire moyen des personnes qui habitent dans l'hémisphère sud :",                     tr.averageSalaryInSounth(people));
console.log(tr.line('LEVEL 3'));            
console.log("Personne qui habite le plus près de Bérénice Cawt (nom et id) :",                      tr.closestToberenice(people));
console.log("Personne qui habite le plus près de Ruì Brach (nom et id) :",                          tr.closestToRuì(people));
console.log("les 10 personnes qui habite les plus près de Josée Boshard (nom et id) :",             tr.tenClosestToJosee(people));
console.log("Les noms et ids des 23 personnes qui travaillent chez google :",                       tr.googleWorker(people));
console.log("Personne la plus agée :",                                                              tr.oldestPersonn(people));
console.log("Personne la plus jeune :",                                                             tr.youngestPersonn(people));
console.log("Moyenne des différences d'age :",                                                      tr.averageAge(people));
console.log(tr.line('LEVEL 4'));            
console.log("Genre de film le plus populaire :",                                                    tr.mostPopuMovieGenre(people));
console.log("Genres de film par ordre de popularité :",                                             "create function".blue);
console.log("Liste des genres de film et nombre de personnes qui les préfèrent :",                  "create function".blue);
console.log("Age moyen des hommes qui aiment les films noirs :",                                    "create function".blue);
console.log(`Age moyen des femmes qui aiment les films noirs, habitent sur le fuseau horaire 
de Paris et gagnent moins que la moyenne des hommes :`,                                                 "create function".blue);
console.log(`Homme qui cherche un homme et habite le plus proche d'un homme qui a au moins une 
préférence de film en commun (afficher les deux et la distance entre les deux):`,                   "create function".blue);
console.log("Liste des couples femmes / hommes qui ont les même préférences de films :",            "create function".blue);
console.log(tr.line('MATCH'));
/* 
On match les gens avec ce qu'ils cherchent (homme ou femme).
On prend en priorité ceux qui sont les plus proches.
Puis ceux qui ont le plus de goût en commun.
Les gens qui travaillent chez google ne peuvent qu'être en couple entre eux.
Quelqu'un qui n'aime pas les Drama ne peux pas être en couple avec quelqu'un qui les aime.
Quelqu'un qui aime les films d'aventure doit forcement être en couple avec quelqu'un qui aime aussi les films d'aventure.
Le différences d'age dans un couple doit être inférieure à 25% (de l'age du plus agée des deux)
߷    ߷    ߷    Créer le plus de couples possibles.   ߷    ߷    ߷    
߷    ߷    ߷    Mesurez le temps de calcul de votre fonction   ߷    ߷    ߷    
߷    ߷    ߷    Essayez de réduire le temps de calcul au maximum   ߷    ߷    ߷    
*/

console.log("liste de couples à matcher (nom et id pour chaque membre du couple) :",             tr.match(people));



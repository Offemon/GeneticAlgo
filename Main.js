// const ccsCurricula = new Curricula(curriculum);
// console.log(ccsCurricula.getByDepartment("ccs"));

// const cssProfs = new Professors(professors);
// console.log(cssProfs.getPartTime().getByAvailability("saturday").professors)

// console.log(sections[1][2])
// const subjects = curriculum[0].contents.find(content=>content.level=="1st_year").firstSem;
// const roomsToBeUsed = new Rooms(rooms);
// const professorsToBeAssigned = new Professors(professors);

console.log(initializePopulation(sections));
// console.log(subjectSessionPrep(subjects));
// console.log(subjectSessionPrep(assignProfToSubject(professorsToBeAssigned,subjects)))
// for(let i = 0; i<20;i++){
//     console.log(fisherYatesShuffler(days));
// }
// let nstpArray = []
// const checkNSTP = (generatedSched) => {
//     initializePopulation(generatedSched).forEach(sched=>{
//         if(sched.filter(sched=>sched.subjName=="National Service Training Program 1")){
//             nstpArray.push(sched)
//         }
//     });
// }

// checkNSTP(sections);
// console.log(nstpArray);
const initializePopulation = (popSize, curriculum,professors,rooms,sectionsArray) => {  // returns a group classes by section
    let initialPopulation = [];                                     //this is an array of all generated initial schedules for GA
    let overAllSched;                                               //An array that holds a single generated schedule from first year to fourth year
    let chosenCurriculum = curriculum;
    const sections = sectionsArray
    let days = ["monday","tuesday","wednesday","thursday","friday","saturday"]
    const levels = ["1st_year","2nd_year","3rd_year","4th_year"];
    const roomsToBeUsed = new Rooms(rooms);                         //a variable for the room object
    const professorsToBeAssigned = new Professors(professors);      //avariable for the professors object

    for(let i = 0; i < popSize; i++){                               //loops for nth number of times depending on the value of the populationSize constant
            overAllSched = [];                                      //an array that holds all classes from a single course from first year to fourth year
            //TO-DO
            //create a foreach loop for every course - I still dont have a BSIT Curriculum
            //create a foreach loop for every level - RESOLVED
            for(let l = 0; l<levels.length;l++){                                                                //loop that goes through each level in the levels array
                const subjects = chosenCurriculum.contents.find(content=>content.level==levels[l]).firstSem;    //this line needs to be refactored
                let prepdSubjects = subjectSessionPrep(assignProfToSubject(professorsToBeAssigned,subjects));   //this line needs to be refactored
                for (let j = 0; j < sections[l].length ; j++){                                                  //loop that goes through each section per level
                    let sectionLevelSched = [];         //an array that holds multiple classes for a section
                    days = fisherYatesShuffler(days);   //shuffle the order of days as an added element of randomness
                    prepdSubjects.forEach(subject=>{    //resets the assigned state to false for another section
                        subject.assigned=false;
                    });

                    for(let k = 0; k<days.length;k++){  //loop through the days of the week
                        let day = days[k];              //variable that holds the current day of the week
                        let section = sections[l][j]    //variable that holds the current section
                        let schoolHourTolerance = 8;    //variable that holds the maximum number of hours that a section can have per day
                        let schoolHours=0;              //variable that holds the initial value of hours
                        let unassignedSubjects = prepdSubjects.filter(subject=>subject.assigned===false);   //an array of unassigned subjects
                        if(schoolHours<schoolHourTolerance){
                            let chosenRoom;             //variable that holds the chosen room for a section's subject
                            let timeSlot;               //variable that holds a timeslot for a section's subject
                            let startTime;              //variable that holds a start time value for a section's subject
                            let endTime;                //variable that holds a end time value for a section's subject
                            //TO-DO
                            //Fix subjects with professors that are only available every saturday kept being contested and end up not being assigned - RESOLVED!
                            fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session!="async").filter(subject=>subject.professor.employmentType=="part-time").filter(subject=>subject.professor.availability.includes(day))).forEach(subject => { // loop through each shuffled non-async subjects
                                if(schoolHours<schoolHourTolerance){
                                    if(subject.session=="sync"){
                                        chosenRoom = "-"
                                    }
                                    else{
                                        switch(subject.classType){ // this needs to have its own function
                                            case "lec":
                                                roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("lec").rooms;
                                                chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                                                break;
                                            case "lab":
                                                roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("comp_lab").rooms;
                                                chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                                                break;
                                            case "gym":
                                                roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("gym").rooms;
                                                chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                                                break;
                                            case "out":
                                                chosenRoom = "TBA";
                                                break;
                                            default:
                                                chosenRoom = "TBA"
                                                break;
                                        }
                                    }

                                    timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                                    startTime = time.find(slot=>slot.slot==timeSlot);
                                    endTime = time.find(slot=>slot.slot==(timeSlot+subject.duration));
                                    sectionLevelSched.push({...subject,section:section,day:day,professor:subject.professor,session:subject.session,room:chosenRoom, startTime:startTime,endTime:endTime});
                                    subject.assigned = true;
                                    schoolHours = schoolHours+subject.duration;
                                }
                            });
                            fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session!="async").filter(subject=>subject.professor.availability.includes(day)).filter(subject=>subject.professor.employmentType=="full-time")).forEach(subject => { // loop through each shuffled non-async subjects
                                if(schoolHours<schoolHourTolerance){
                                    if(subject.session=="sync"){
                                        chosenRoom = "-"
                                    }
                                    else{
                                        switch(subject.classType){ // this needs to have its own function
                                            case "lec":
                                                roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("lec").rooms;
                                                chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                                                break;
                                            case "lab":
                                                roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("comp_lab").rooms;
                                                chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                                                break;
                                            case "gym":
                                                roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("gym").rooms;
                                                chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                                                break;
                                            case "out":
                                                chosenRoom = "TBA";
                                                break;
                                            default:
                                                chosenRoom = "TBA"
                                                break;
                                        }
                                    }
                                    timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                                    startTime = time.find(slot=>slot.slot==timeSlot);
                                    endTime = time.find(slot=>slot.slot==(timeSlot+subject.duration));
                                    sectionLevelSched.push({...subject,section:section,day:day,professor:subject.professor,session:subject.session,room:chosenRoom, startTime:startTime,endTime:endTime});
                                    subject.assigned = true;
                                    schoolHours = schoolHours+subject.duration;
                                }
                            });
                            fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session=="async")).forEach(subject => { // loop through each shuffled async subjects
                                if(schoolHours<schoolHourTolerance){
                                    chosenRoom = "-"
                                    timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                                    startTime = time.find(slot=>slot.slot==timeSlot);
                                    endTime = time.find(slot=>slot.slot==(timeSlot+subject.duration));
                                    sectionLevelSched.push({...subject,section:section,day:day,professor:subject.professor,session:subject.session,room:chosenRoom, startTime:startTime,endTime:endTime});
                                    subject.assigned = true;
                                    schoolHours = schoolHours+subject.duration;
                                }
                            });
                        }
                    }
                    let sortedSectionLevelSched = sectionLevelSched.sort((a,b)=>{ // sorting the section-level sched is important during the crossover operation
                        if(a.subjCode.toLowerCase() < b.subjCode.toLowerCase()) return -1;
                        if(a.subjCode.toLowerCase() > b.subjCode.toLowerCase()) return 1;
                        return 0;
                    });
                    overAllSched.push(sortedSectionLevelSched);
                }
            }
            initialPopulation.push(overAllSched);
        }
    return initialPopulation;
}

const fitnessFunction = (scheduleArray) => {        //this function evaluates the fitness of a single generated schedule - NEEDS CONSTANT REFINING
    //TO-DO
    //create evaluation criterias that will determine the fitness of a generated schedule (lower accumulated points is better)
    //criterias:
        //NSTP classes should be on Saturdays (+50 penalty points)
        //No two or more classes of share the same classroom at the same time (+10 penalty points)
        //No two or more classes of share the same professor at the same time (+30 penalty points)
        //No two or more classes share or has overlapping time slot (+20 penalty points)
    //this function should assign whether a single class is considered recessive or dominant
        //recessive traits are less likely to be used for crossovers but is more likely to mutate ro reroll some favorable properties
        //dominant trains are more likely to be used for crossovers but is less likely to mutate ro reroll some favorable properties
    
    let evaluatedSchedule;          //an array that holds a variable for the fitness evaluation and the schedule that is being evaluated
    let conflictingTimeSlot=0;      //a variable that is incremented if there are conflicting time slots
    let conflictingRooms=0;         //a variable that is incremented if there are conflicting rooms
    let conflictingProfessor=0;     //a variable that is incremented if there are professors that are needed be 2 or more different classes at the same time
    let weekDayNSTP=0;              //a variable that is incremented if there are NSTP Classes on weekdays
    let maximumOopsiePoints=0;      //a variable that contains the maximum number of negative points that a schedule can have
    let totalOopsiePoints=0;        //a variable that contains the accumulated number of negative points  of a schedule
    let spreadedClasses=[];         //an array that holds the spreaded classes of each section. i.e. the classes will no longer be grouped per section
    scheduleArray.forEach(section=>{
        spreadedClasses.push(...section);
    });
    //TO-DO
    //calculate maximum oopsies - RESOLVED
    //count the number of classes that are NSTP - RESOLVED
    //count the number of classes that are not NSTP - RESOLVED
    const nstpClassCount = spreadedClasses.filter(selectedClass=> selectedClass.subjCode=="NSTP1" || selectedClass.subjCode=="NSTP2").length;
    const nonNSTPClassCount = spreadedClasses.filter(selectedClass=> selectedClass.subjCode!="NSTP1" && selectedClass.subjCode!="NSTP2").length;
    maximumOopsiePoints = (nstpClassCount*100)+(nonNSTPClassCount*60);

    for(let currentClassIndex = 0; currentClassIndex< spreadedClasses.length; currentClassIndex++){ //loop through all subjects to assign a default trait value of "dominant"
        spreadedClasses[currentClassIndex].trait = "dominant";
    }

    for(let currentClassIndex = 0; currentClassIndex< spreadedClasses.filter(selectedClass=>selectedClass.trait=="dominant").length-1; currentClassIndex++){

        for(let comparedToIndex = currentClassIndex+1; comparedToIndex<spreadedClasses.length;comparedToIndex++){
            //check time conflict
            if((spreadedClasses[currentClassIndex].day == spreadedClasses[comparedToIndex].day) && ((spreadedClasses[currentClassIndex].startTime.slot>=spreadedClasses[comparedToIndex].startTime.slot) && (spreadedClasses[currentClassIndex].endTime.slot<spreadedClasses[comparedToIndex].endTime.slot))){
                conflictingTimeSlot += 20;
                spreadedClasses[currentClassIndex].trait = "recessive";
                spreadedClasses[comparedToIndex].trait = "recessive"
            }

            //check professor conflict
            if((spreadedClasses[currentClassIndex].professor.name == spreadedClasses[comparedToIndex].professor.name) && (spreadedClasses[currentClassIndex].day == spreadedClasses[comparedToIndex].day) && ((spreadedClasses[currentClassIndex].startTime.slot>=spreadedClasses[comparedToIndex].startTime.slot) && (spreadedClasses[currentClassIndex].endTime.slot<spreadedClasses[comparedToIndex].endTime.slot))){
                conflictingProfessor += 30;
                spreadedClasses[currentClassIndex].trait = "recessive";
                spreadedClasses[comparedToIndex].trait = "recessive"
            }

            //check room conflict
            if(spreadedClasses[currentClassIndex].day == spreadedClasses[comparedToIndex].day && (spreadedClasses[currentClassIndex].session == "f2f" && spreadedClasses[comparedToIndex].session == "f2f") && (spreadedClasses[currentClassIndex].room == spreadedClasses[comparedToIndex].room) && ((spreadedClasses[currentClassIndex].startTime.slot>=spreadedClasses[comparedToIndex].startTime.slot) && (spreadedClasses[currentClassIndex].endTime.slot<spreadedClasses[comparedToIndex].endTime.slot))){
                conflictingRooms += 10;
                spreadedClasses[currentClassIndex].trait = "recessive";
                spreadedClasses[comparedToIndex].trait = "recessive"
            }
        }
    }

    for(let currentClassIndex = 0; currentClassIndex< spreadedClasses.length; currentClassIndex++){ //loop through all subjects to search for an NSTP Subject
        //check if NSTP is on a weekday
        if((spreadedClasses[currentClassIndex].subjCode == "NSTP1" || spreadedClasses[currentClassIndex].subjCode == "NSTP2") && spreadedClasses[currentClassIndex].day!="saturday"){
            weekDayNSTP += 100;
            spreadedClasses[currentClassIndex].trait = "recessive";
        }
    }
    // const recessiveCount = spreadedClasses.filter(selectedClass=>selectedClass.trait=="recessive").length;
    totalOopsiePoints = conflictingProfessor + conflictingRooms + conflictingTimeSlot + weekDayNSTP;
    // evaluatedSchedule = (1/(1+(totalOopsiePoints/maximumOopsiePoints)))
    // evaluatedSchedule = (1/(1+(totalOopsiePoints)))
    evaluatedSchedule = (1-(totalOopsiePoints/maximumOopsiePoints)); //simple fitness formula

    //For Debugging purposes only
    // console.log(`Classes Count: ${spreadedClasses.length}, total oopsies: ${totalOopsiePoints}, maximum oopsies: ${maximumOopsiePoints}, NSTP Classes: ${nstpClassCount}, non-NSTP Classes ${nonNSTPClassCount}`);
    // console.log(`Fitness: ${evaluatedSchedule*100}%, No. of recessive traits: ${recessiveCount}`);
    return {fitness:evaluatedSchedule, schedule:spreadedClasses};
}

const evaluatePopulation = (schedPopulation) => {   //this function evaluates an entire generated population of schedules and returns a spreaded classes with fitness values attached to each schedule
    let evaluatedPopulation = [];
    schedPopulation.forEach(sched=>{
        evaluatedPopulation.push(fitnessFunction(sched));
    })
    return evaluatedPopulation;
}

const crossOverFunction = (schedule) => {           //this function splices the genomes of the best schedule - 2 at a time
    //TO-DO
    //get the top half of the sorted array - RESOLVED!
    //create an operation that that creates an offspring of the top half from the previous operation - RESOLVED!
    let sortedSchedArray = evaluatePopulation(schedule).sort((a,b)=>b.fitness-a.fitness);
    let bestHalf = sortedSchedArray.slice(0,sortedSchedArray.length/2);
    let crossOveredSched = [];
    bestHalf.forEach(evaluatedSched=>{      // the first half of the new population will the be the best half of the previous population
        crossOveredSched.push(evaluatedSched.schedule);
    })
    bestHalfArr=bestHalf.map(evaluatedSched=>evaluatedSched.schedule);
    for(let schedCurrentIndex = 0;schedCurrentIndex<bestHalfArr.length;schedCurrentIndex+=2){     //this loop will generate a new population but the dominant traits are in favor of Parent A
        let parentA = bestHalfArr[schedCurrentIndex];
        let parentB = bestHalfArr[schedCurrentIndex+1];
        let offSpringSchedule = [];
        for(let classCurrentIndex=0;classCurrentIndex<parentA.length;classCurrentIndex++){
            if(parentA[classCurrentIndex].trait=="dominant"){
                offSpringSchedule.push(parentA[classCurrentIndex]);
            }
            else{
                offSpringSchedule.push(parentB[classCurrentIndex]);
            }
        }
        crossOveredSched.push(offSpringSchedule);
    }

    for(let schedCurrentIndex = 0;schedCurrentIndex<bestHalfArr.length;schedCurrentIndex+=2){     //this loop will generate a new population but the dominant traits are in favor of Parent B
        let parentA = bestHalfArr[schedCurrentIndex];
        let parentB = bestHalfArr[schedCurrentIndex+1];
        let offSpringSchedule = [];
        for(let classCurrentIndex=0;classCurrentIndex<parentB.length;classCurrentIndex++){
            if(parentB[classCurrentIndex].trait=="dominant"){
                offSpringSchedule.push(parentB[classCurrentIndex]);
            }
            else{
                offSpringSchedule.push(parentA[classCurrentIndex]);
            }
        }
        crossOveredSched.push(offSpringSchedule);
    }
    // console.log("asdf")
    // console.log("Crossover Function: ",evaluatePopulation(reconstructGroupingBySections(crossOveredSched)).sort((a,b)=>b.fitness-a.fitness));  //for debugging purposes only
    return evaluatePopulation(reconstructGroupingBySections(crossOveredSched)).sort((a,b)=>b.fitness-a.fitness);
}

const mutationFunction = (mutationProb,schedGeneration) => {                    //[WORK IN PROGRESS]this function enables a schedule to reroll some of it's recessive genomes
    // mutatedGeneration = [];
    // mutatedOverallSched = [];
    // console.log("pre-mutation",schedGeneration);
    const roomsToBeUsed = new Rooms(rooms);
    schedGeneration.forEach(overAllSched=>{
        let spreadedClasses = []
        overAllSched.forEach(level=>{

            spreadedClasses.push(...level);

        })
        let defectiveClasses = spreadedClasses.filter(selectedClass=>selectedClass.trait=="recessive");
        defectiveClasses.forEach(selectedClass => {
            //reroll Room
            if(Math.random() < mutationProb){
                timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                startTime = timeSlot
                endTime = timeSlot+selectedClass.duration;
                selectedClass.startTime = startTime;
                selectedClass.endTime = endTime;
                // console.log("rerolled time");
            }
            if(Math.random() < mutationProb){
                if(selectedClass.session=="f2f"){
                    switch(selectedClass.classType){ // this needs to have its own function
                        case "lec":
                            roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("lec").rooms;
                            chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                            break;
                        case "lab":
                            roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("comp_lab").rooms;
                            chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                            break;
                        case "gym":
                            roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("gym").rooms;
                            chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                            break;
                        case "out":
                            chosenRoom = "TBA";
                            break;
                        default:
                            chosenRoom = "TBA"
                            break;
                    }
                }
                // console.log("rerolled room");
            }
        })
    })
    // console.log("post-mutation",schedGeneration);
    return schedGeneration;
}

const generationLoop = (mutationProb,generationCount, scheduleArray) => {   //[WORK IN PROGRESS - Mutation Function not yet Implemented]this function will perform the crossover functions and mutations to generate a new generation of schedules.
    let newGeneration = scheduleArray
    let fittestSched = evaluatePopulation(scheduleArray).sort((a,b)=>b.fitness-a.fitness)[0];

    // for(let nthGeneration = 1; nthGeneration <= generationCount; nthGeneration++){                           // Loop for User Defined number of Generations
    //     console.log(`Generation: ${nthGeneration}, Best Fitness: ${(fittestSched.fitness*100).toFixed(2)}%`);
    //     let currentGeneration = crossOverFunction(newGeneration).sort((a,b)=>b.fitness-a.fitness);
    //     newGeneration = reconstructGroupingBySections(currentGeneration.map(sched=>sched.schedule));
    //     // console.log("pre-mutation: ",evaluatePopulation(newGeneration));
    //     //the mutation should occur here then re-evaluate the fitness
    //     newGeneration = mutationFunction(mutationProb,newGeneration);
    //     // console.log("post-mutation: ",evaluatePopulation(newGeneration));
    //     if(fittestSched.fitness < currentGeneration[0].fitness){
    //         fittestSched = currentGeneration[0];
    //     }
    //     console.log("Fittest Sched: ", fittestSched);
    //     // console.log(reconstructGroupingBySections(currentGeneration.map(sched=>sched.schedule)));
    // }

    let nthGeneration = 1;
    while(fittestSched.fitness != 1){                                                                           //loop that only stops when it finds a 100% fitness schedule
        let currentGeneration = crossOverFunction(newGeneration).sort((a,b)=>b.fitness-a.fitness);
        newGeneration = reconstructGroupingBySections(currentGeneration.map(sched=>sched.schedule));
        //the mutation should occur here then re-evaluate the fitness
        //the mutated population is still not being evalutated but it still works though
        newGeneration = mutationFunction(mutationProb,newGeneration);
        if(fittestSched.fitness < currentGeneration[0].fitness){
            fittestSched = currentGeneration[0];
        }
        console.log(`Generation: ${nthGeneration}, Best Fitness: ${(fittestSched.fitness*100).toFixed(2)}%`);
        console.log("Fittest Sched: ", fittestSched);
        nthGeneration++;
    }
    return fittestSched;
}

const geneticAlgorithm = (populationSize,maxGenerationCount,mutationProbability,sectionsArray,curriculumObj,roomsArray,profsArray) => {     //[WORK IN PROGRESS]this is hte Main Genetic Algorithm function
    let initPopArray = initializePopulation(populationSize,curriculumObj,profsArray,roomsArray,sectionsArray);
    // console.log("Sorted Initial Population:",initPopArray);
    // console.log(evaluatePopulation(initPopArray).sort((a,b)=>b.fitness-a.fitness));  //for debugging purposes only
    // console.log(reconstructGroupingBySections(initPopArray));                        //for debugging purposes only
    let fittestSched = generationLoop(mutationProbability,maxGenerationCount,initPopArray);
    //TO-DO
    //The Generation loop should retain the best fit that it could find and only stop when it finds a 99%-100% fit schedule or until it reaches the maximum allowable Generation count
    return fittestSched.schedule;
}



//utility/non-GA functions section
const fisherYatesShuffler = (array) => {                        //a function that uses Fisher-Yates algorithm to shuffle an array
    for (let i = array.length-1; i> 0; i--){
        const randomIndex = Math.floor(Math.random()*(i+1));
        [array[i],array[randomIndex]]=[array[randomIndex],array[i]]
    }
    return array;
}

const subjectSessionPrep = (subjectArray) => {                  //a function that attaches an assignment variable and session property based on its classType
    let newsubjectArray = [];
    // let series = 1                                              //a variable that holds an integer to be used for matching during the crossover operation
    subjectArray.forEach(subject=>{
        duration = subject.duration
        subject.assigned = false;
        // subject.series=series

        if(subject.classType==="lec"){
            subject.duration = 1.5;
            newsubjectArray.push({...subject,session:"sync"});
            newsubjectArray.push({...subject,session:"async"});
        }
        else if(subject.classType==="lab"){
            newsubjectArray.push({...subject,session:"f2f",duration:3});
            newsubjectArray.push({...subject,session:"async",duration:1.5});
        }
        else{
            newsubjectArray.push({...subject,session:"f2f",duration:3});
        }
        // series+=1;
    })
    return newsubjectArray;
}

const addProfessorDailyLoad = (professorsArray) => {            //a function that attaches a variable to hold the number of time that a professor can spend per day and a variable to hold a priority value
    let newProfessorArray = [];
    professorsArray.forEach(professor=>{
        newProfessorArray.push({...professor,dailyHours:0,priority:1});
    })
    return newProfessorArray
}

const assignProfToSubject = (professorsObj,subjArray) => {      //a function that assigns a professor to a subject based on the expertise requirement of the subject
    let newSubjArr = []
    subjArray.forEach(subject=>{
        let chosenProf
        let professorForThisSubject = professorsObj.getByExpertise(subject.expertiseReq).professors;
        let partTimeProfs = professorForThisSubject.filter(prof => prof.employmentType === "part-time");
        let fullTimeProfs = professorForThisSubject.filter(prof => prof.employmentType === "full-time");
        if(partTimeProfs.length >=1){
            chosenProf = partTimeProfs[Math.floor(Math.random()*(partTimeProfs.length-1))];
            newSubjArr.push({...subject,professor:chosenProf});
        }
        else{
            chosenProf = fullTimeProfs[Math.floor(Math.random()*(fullTimeProfs.length-1))];
            newSubjArr.push({...subject,professor:chosenProf});
        }
    })
    return newSubjArr
}

const reconstructGroupingBySections = (schedArray) => {         //a function that groups a spreaded schedules by sections
    reconstructedGroupings = [];                                                                //an array that will hold the groupings
    extractedSections = Array.from(new Set(schedArray[0].map(sched=>sched.section)));           // to reconstruct the groupings by sections we must need to extract unique sections
    schedArray.forEach(sched=>{                                                                 //loop through each schedule population
        let sectiongrouping = []                                                                //an array that will hold the classes of a single section
        extractedSections.forEach(section=>{                                                    //loop through each existing section
            sectiongrouping.push(sched.filter(selectedClass=>selectedClass.section==section));  //get all classes that matches the current section of the loop
        })
        reconstructedGroupings.push(sectiongrouping);                                           //add it to the array for the section
    });
    return reconstructedGroupings;
}

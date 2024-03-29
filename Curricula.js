const curriculum = [
    {curriculumID:"LOA-CCS-BSCS-2324",
    schoolYear: "2023-2024",
    department:"ccs",
    contents: [
            {level:"1st_year",
            firstSem:[
                {subjCode:"GEC103",subjName:"Understanding the Self", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"GEC102",subjName:"Mathematics in the Modern World", duration: 3, classType: "lec", expertiseReq:"Mathematics"},
                {subjCode:"CC113-1",subjName:"Introduction to Computing with Productivity Tools", duration: 3, classType: "lab", expertiseReq:"Programming"},
                {subjCode:"CC113-2",subjName:"Fundamentals of Programming", duration: 3, classType: "lab", expertiseReq:"Programming"},
                {subjCode:"VDG113",subjName:"Visual Design Graphics", duration: 3, classType: "lab", expertiseReq:"Multimedia"},
                {subjCode:"BP113",subjName:"Basic Photography", duration: 3, classType: "lec", expertiseReq:"Photography"},
                {subjCode:"PE101",subjName:"Physical Fitness 1", duration: 3, classType: "gym", expertiseReq:"Physical Education"},
                {subjCode:"NSTP1",subjName:"National Service Training Program 1", duration: 3, classType: "out", expertiseReq:"General Education"}
            ],
            secondSem:[
                {subjCode:"GEC108",subjName:"Ethics", duration: 3, classType: "lec", expertiseReq:"Psychology"},
                {subjCode:"GEC104",subjName:"Readings in the Philippine History", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"DS123",subjName:"Discrete Structures 1", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"CC123",subjName:"Intermediate Programming", duration: 3, classType: "lec", expertiseReq:"Programming"},
                {subjCode:"DA123",subjName:"Digital Animation", duration: 3, classType: "lec", expertiseReq:"Animation"},
                {subjCode:"HCH123",subjName:"Human Computer Interaction", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"PE102",subjName:"Physical Fitness 2", duration: 3, classType: "gym", expertiseReq:"Physical Education"},
                {subjCode:"NSTP2",subjName:"National Service Training Program 1", duration: 3, classType: "out", expertiseReq:"General Education"}
            ]
            },
            {level:"2nd_year",
            firstSem:[
                {subjCode:"GEC107",subjName:"Art Appreciation", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"GEC101",subjName:"Purposive Communication", duration: 3, classType: "lab", expertiseReq:"General Education"},
                {subjCode:"DS213",subjName:"Discrete Structures 2", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"SDF213",subjName:"Object-Oriented Programming", duration: 3, classType: "lab", expertiseReq:"Programming"},
                {subjCode:"CC213",subjName:"Data Structures & Algorithms", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"GAD213",subjName:"2D Game Art Development", duration: 3, classType: "lab", expertiseReq:"Game Development"},
                {subjCode:"MAT103",subjName:"Calculus", duration: 3, classType: "lec", expertiseReq:"Mathematics"},
                {subjCode:"PE103",subjName:"Physical Fitness 3", duration: 3, classType: "gym", expertiseReq:"Physical Education"}

            ],
            secondSem:[
                {subjCode:"GEC105",subjName:"Science, Technology, and Society", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"GEC106",subjName:"The Contemporary World", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"CC223",subjName:"Information Management", duration: 3, classType: "lab", expertiseReq:"Database"},
                {subjCode:"AL223",subjName:"Algorithms and Complexity", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"WST213",subjName:"Web System and Technologoes", duration: 3, classType: "lab", expertiseReq:"Web Development"},
                {subjCode:"CSS221",subjName:"Computer System Servicing", duration: 3, classType: "lab", expertiseReq:"Hardware"},
                {subjCode:"GAD223",subjName:"3d Game Art Development", duration: 3, classType: "Lab", expertiseReq:"Game Development"},
                {subjCode:"PE104",subjName:"", duration: 3, classType: "gym", expertiseReq:"Physical Education"}
            ]
            },
            {level:"3rd_year",
            firstSem:[
                {subjCode:"FIL101",subjName:"Kontekstwalizasong Komunikasyon sa Filipino", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"AL313",subjName:"Automata Theory and Formal Languages", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"AR313",subjName:"Architecture and Organization", duration: 3, classType: "lab", expertiseReq:"Hardware"},
                {subjCode:"CC313",subjName:"Application Dev't and Emerging Technologies", duration: 3, classType: "Lab", expertiseReq:"Web Development"},
                {subjCode:"IAS313",subjName:"Information Assurance and Security", duration: 3, classType: "lec", expertiseReq:"Cybersecurity"},
                {subjCode:"ELEC313",subjName:"CS Elective 1", duration: 3, classType: "lab", expertiseReq:"Computer Science"}
            ],
            secondSem:[
                {subjCode:"FIL103",subjName:"Panitikan", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"PL323",subjName:"Programming Languages", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"SE323",subjName:"Software Engineering 1", duration: 3, classType: "lab", expertiseReq:"Software Engineering"},
                {subjCode:"SP323",subjName:"Social Issues and Professional Practice", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"IM323",subjName:"Database Management System", duration: 3, classType: "lab", expertiseReq:"Database"},
                {subjCode:"ELEC323",subjName:"CS Elective 2", duration: 3, classType: "lab", expertiseReq:"Computer Science"}
            ]
            },
            {level:"4th_year",
            firstSem:[
                {subjCode:"THS413",subjName:"Thesis 1", duration: 3, classType: "lab", expertiseReq:"Computer Science"},
                {subjCode:"ELEC413",subjName:"CS Elective 3", duration: 3, classType: "lab", expertiseReq:"Computer Science"},
                {subjCode:"DS413",subjName:"Principles of Operating Systems", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"LIT102",subjName:"The Entrpreneurial Mind", duration: 3, classType: "lec", expertiseReq:"General Education"}
            ],
            secondSem:[
                {subjCode:"THS423",subjName:"Thesis 2", duration: 3, classType: "lab", expertiseReq:"Computer Science"},
                {subjCode:"GEC109",subjName:"Life and Works of Rizal", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"NC423",subjName:"Networks and Communications", duration: 3, classType: "lec", expertiseReq:"Networking"},
                {subjCode:"SAP423",subjName:"MIS with ERP (SAP B1)", duration: 3, classType: "lab", expertiseReq:"Computer Science"}
            ]
            }
    ]},
    {curriculumID:"LOA-CCS-BSCS-2223",
    schoolYear: "2022-2023",
    department:"ccs",
    contents: [
            {level:"1st_year",
            firstSem:[
                {subjCode:"GEC103",subjName:"Understanding the Self", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"GEC102",subjName:"Mathematics in the Modern World", duration: 3, classType: "lec", expertiseReq:"Mathematics"},
                {subjCode:"CC113-1",subjName:"Introduction to Computing with Productivity Tools", duration: 3, classType: "lab", expertiseReq:"Programming"},
                {subjCode:"CC113-2",subjName:"Fundamentals of Programming", duration: 3, classType: "lab", expertiseReq:"Programming"},
                {subjCode:"VDG113",subjName:"Visual Design Graphics", duration: 3, classType: "lab", expertiseReq:"Multimedia"},
                {subjCode:"BP113",subjName:"Basic Photography", duration: 3, classType: "lec", expertiseReq:"Photography"},
                {subjCode:"PE101",subjName:"Physical Fitness 1", duration: 3, classType: "gym", expertiseReq:"Physical Education"},
                {subjCode:"NSTP1",subjName:"National Service Training Program 1", duration: 3, classType: "out", expertiseReq:"General Education"}
            ],
            secondSem:[
                {subjCode:"GEC108",subjName:"Ethics", duration: 3, classType: "lec", expertiseReq:"Psychology"},
                {subjCode:"GEC104",subjName:"Readings in the Philippine History", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"DS123",subjName:"Discrete Structures 1", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"CC123",subjName:"Intermediate Programming", duration: 3, classType: "lec", expertiseReq:"Programming"},
                {subjCode:"DA123",subjName:"Digital Animation", duration: 3, classType: "lec", expertiseReq:"Animation"},
                {subjCode:"HCH123",subjName:"Human Computer Interaction", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"PE102",subjName:"Physical Fitness 2", duration: 3, classType: "gym", expertiseReq:"Physical Education"},
                {subjCode:"NSTP2",subjName:"National Service Training Program 1", duration: 3, classType: "out", expertiseReq:"General Education"}
            ]
            },
            {level:"2nd_year",
            firstSem:[
                {subjCode:"GEC107",subjName:"Art Appreciation", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"GEC101",subjName:"Purposive Communication", duration: 3, classType: "lab", expertiseReq:"General Education"},
                {subjCode:"DS213",subjName:"Discrete Structures 2", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"SDF213",subjName:"Object-Oriented Programming", duration: 3, classType: "lab", expertiseReq:"Programming"},
                {subjCode:"CC213",subjName:"Data Structures & Algorithms", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"GAD213",subjName:"2D Game Art Development", duration: 3, classType: "lab", expertiseReq:"Game Development"},
                {subjCode:"MAT103",subjName:"Calculus", duration: 3, classType: "lec", expertiseReq:"Mathematics"},
                {subjCode:"PE103",subjName:"Physical Fitness 3", duration: 3, classType: "gym", expertiseReq:"Physical Education"}

            ],
            secondSem:[
                {subjCode:"GEC105",subjName:"Science, Technology, and Society", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"GEC106",subjName:"The Contemporary World", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"CC223",subjName:"Information Management", duration: 3, classType: "lab", expertiseReq:"Database"},
                {subjCode:"AL223",subjName:"Algorithms and Complexity", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"WST213",subjName:"Web System and Technologoes", duration: 3, classType: "lab", expertiseReq:"Web Development"},
                {subjCode:"CSS221",subjName:"Computer System Servicing", duration: 3, classType: "lab", expertiseReq:"Hardware"},
                {subjCode:"GAD223",subjName:"3d Game Art Development", duration: 3, classType: "Lab", expertiseReq:"Game Development"},
                {subjCode:"PE104",subjName:"", duration: 3, classType: "gym", expertiseReq:"Physical Education"}
            ]
            },
            {level:"3rd_year",
            firstSem:[
                {subjCode:"FIL101",subjName:"Kontekstwalizasong Komunikasyon sa Filipino", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"AL313",subjName:"Automata Theory and Formal Languages", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"AR313",subjName:"Architecture and Organization", duration: 3, classType: "lab", expertiseReq:"Hardware"},
                {subjCode:"CC313",subjName:"Application Dev't and Emerging Technologies", duration: 3, classType: "Lab", expertiseReq:"Web Development"},
                {subjCode:"IAS313",subjName:"Information Assurance and Security", duration: 3, classType: "lec", expertiseReq:"Cybersecurity"},
                {subjCode:"ELEC313",subjName:"CS Elective 1", duration: 3, classType: "lab", expertiseReq:"Computer Science"}
            ],
            secondSem:[
                {subjCode:"FIL103",subjName:"Panitikan", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"PL323",subjName:"Programming Languages", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"SE323",subjName:"Software Engineering 1", duration: 3, classType: "lab", expertiseReq:"Software Engineering"},
                {subjCode:"SP323",subjName:"Social Issues and Professional Practice", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"IM323",subjName:"Database Management System", duration: 3, classType: "lab", expertiseReq:"Database"},
                {subjCode:"ELEC323",subjName:"CS Elective 2", duration: 3, classType: "lab", expertiseReq:"Computer Science"}
            ]
            },
            {level:"4th_year",
            firstSem:[
                {subjCode:"THS413",subjName:"Thesis 1", duration: 3, classType: "lab", expertiseReq:"Computer Science"},
                {subjCode:"ELEC413",subjName:"CS Elective 3", duration: 3, classType: "lab", expertiseReq:"Computer Science"},
                {subjCode:"DS413",subjName:"Principles of Operating Systems", duration: 3, classType: "lec", expertiseReq:"Computer Science"},
                {subjCode:"LIT102",subjName:"The Entrpreneurial Mind", duration: 3, classType: "lec", expertiseReq:"General Education"}
            ],
            secondSem:[
                {subjCode:"THS423",subjName:"Thesis 2", duration: 3, classType: "lab", expertiseReq:"Computer Science"},
                {subjCode:"GEC109",subjName:"Life and Works of Rizal", duration: 3, classType: "lec", expertiseReq:"General Education"},
                {subjCode:"NC423",subjName:"Networks and Communications", duration: 3, classType: "lec", expertiseReq:"Networking"},
                {subjCode:"SAP423",subjName:"MIS with ERP (SAP B1)", duration: 3, classType: "lab", expertiseReq:"Computer Science"}
            ]
            }
    ]}
]


//subject template
// {subjName:"", duration: 3, classType: "", expertiseReq:""},
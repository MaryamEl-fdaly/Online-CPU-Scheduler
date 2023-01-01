// Shortest Job First Algorithm
export const SJF = (arrivalTime, burstTime) => {
  let processes = [];
  const calcProcesses = [];
  const readyQ = []; //Ready Queue
  const doneJobs = [];
  let completeTime = [];
  let ganttChartInfo = [];
  let totalTurnAroundT = 0,totalWaitingT = 0;

  // Create an array of objects containing the pID, arrival time, and burst time
  let i = 0;
  while (i < arrivalTime.length) {
    processes.push({
      pID: "P" + i, 
      aT: arrivalTime[i],
      bT: burstTime[i],
    });
    i++;
  }


  // Sort the processes by arrival and burst time
  processes.sort((a, b) => {
    if (a.aT > b.aT) {
      return 1;
    } else if (a.aT < b.aT) {
      return -1;
    } else if (a.bT > b.bT) {
        return 1;
      } else if (a.bT < b.bT) {
        return -1;
      } else {
        return 0;
      }
    }
  );
  

  readyQ.push(processes[0]);
  completeTime.push(processes[0].bT + processes[0].aT);
  let tatV = completeTime[0] - processes[0].aT,
  wtV = completeTime[0] - processes[0].aT - processes[0].bT;

  calcProcesses.push({
    ...processes[0],
    ft: completeTime[0], //completing time
    tat: tatV, //turn around time
    wt: wtV, //waiting time
  });


  totalTurnAroundT += tatV;
  totalWaitingT += wtV;

  for (let i = 0; i < processes.length; i++) {
    if (!readyQ.includes(processes[i]) && processes[i].aT <= completeTime[0]) {
      readyQ.push(processes[i]);
    }
  }

  readyQ.shift();
  doneJobs.push(processes[0]);

  //Draw Ganttchart of done process
  ganttChartInfo.push({
    pID: processes[0].pID,
    start: processes[0].aT,
    stop: completeTime[0],
  });

  for (let i = 1; i < processes.length; i++) {
    if (readyQ.length === 0 && doneJobs.length !== processes.length) {
      const undoneJobs = processes
        .filter((p) => {
          return !doneJobs.includes(p);
        })
        .sort((ele1, ele2) => {
          if (ele1.aT > ele2.aT) {
            return 1;
          } else if (ele1.aT < ele2.aT) {
            return -1;
          } else if (ele1.bT > ele2.bT) {
              return 1;
            } else if (ele1.bT < ele2.bT) {
              return -1;
            } else {
              return 0;
            }
          
        });
      readyQ.push(undoneJobs[0]);
    }
    

    const rqSortedByBT = [...readyQ].sort((ele1, ele2) => {
      if (ele1.bT > ele2.bT) {
        return 1;
      } else if (ele1.bT < ele2.bT) {
        return -1;
      } else if(ele1.aT > ele2.aT) {
          return 1;
        } else if (ele1.aT < ele2.aT) {
          return -1;
        } else {
          return 0;
        }
      }
    );
    

    const execProcess = rqSortedByBT[0];

    const preCompleteT = completeTime[completeTime.length - 1];

    if (execProcess.aT > preCompleteT) {
      completeTime.push(execProcess.aT + execProcess.bT);
      const latestFtime = completeTime[completeTime.length - 1];
      ganttChartInfo.push({
        pID: execProcess.pID,
        start: execProcess.aT,
        stop: latestFtime,
      });
    } else {
      completeTime.push(preCompleteT + execProcess.bT);
      const latestFtime = completeTime[completeTime.length - 1];
      ganttChartInfo.push({
        pID: execProcess.pID,
        start: preCompleteT,
        stop: latestFtime,
      });
    }

    const latestFtime = completeTime[completeTime.length - 1];
    tatV = latestFtime - execProcess.aT;
    wtV = latestFtime - execProcess.aT - execProcess.bT;

    calcProcesses.push({
      ...execProcess,
      ft: latestFtime,
      tat: tatV,
      wt: wtV,
    });


    totalTurnAroundT += tatV;
    totalWaitingT += wtV;

    let j=0;
    while(j< processes.length){
      if (
        processes[j].aT <= latestFtime &&
        !readyQ.includes(processes[j]) &&
        !doneJobs.includes(processes[j])
      ) {
        readyQ.push(processes[j]);
      }
      j++;
    }

    const indexToRemove = readyQ.indexOf(execProcess);
    if (indexToRemove > -1) {
      readyQ.splice(indexToRemove, 1);
    }

    doneJobs.push(execProcess);
  }

  // Sort the processes by arrival time
  calcProcesses.sort((ele1, ele2) => {
    if (ele1.aT > ele2.aT) {
      return 1;
    } else if (ele1.aT < ele2.aT) {
      return -1;
    } else if (ele1.pID > ele2.pID) {
        return 1;
      } else if (ele1.pID < ele2.pID) {
        return -1;
      } else {
        return 0;
      }
    }
  );
  
    
  // Calculating avy by dividing total by array length
  const avgTurnAroundT = totalTurnAroundT / processes.length;
  const avgWaitingT = totalWaitingT / processes.length;

  return { calcProcesses, ganttChartInfo, avgTurnAroundT, avgWaitingT };
};



/********************************************************************************************************************/
/******************* Shortest Job First Preemptive Algorithm***************/
export const SJFP = (arrivalTime, burstTime) => {
  let processes = [];
  const calcProcesses = [];
  const ganttChartInfo = [];
  const readyQ = [];
  let totalTurnAroundT = 0;
  let totalWaitingT = 0;
  let tatV = 0,
    wtV = 0;

  let i=0;
  while( i < arrivalTime.length){
    processes.push({
      pID: "P" + i,
      aT: arrivalTime[i],
      bT: burstTime[i],
    });

    i++;
  }

  processes.sort((ele1, ele2) => {
    if (ele1.aT > ele2.aT) {
      return 1;
    } else if (ele1.aT < ele2.aT) {
      return -1;
    } else if (ele1.bT > ele2.bT) {
        return 1;
      } else if (ele1.bT < ele2.bT) {
        return -1;
      } else {
        return 0;
      }
    });


  let currTime = processes[0].aT;
  const undoneJobs = [...processes];

  const tFinish = processes.reduce((acc, process) => {
    acc[process.pID] = process.bT;
    return acc;
  }, {});

  readyQ.push(undoneJobs[0]);

  while (true) {
    if (
      !Object.values(tFinish).reduce((acc, cur) => {
        return acc + cur;
      }, 0) ||
      !undoneJobs.length > 0
    )
      break;

    let isIdl = undoneJobs.length > 0 && readyQ.length === 0;
    let latestIdle = isIdl ? true : false;
    if (isIdl) {
      readyQ.push(undoneJobs[0]);
    }

    readyQ.sort((ele1, ele2) => {
      // Equal-priority processes are scheduled in FCFS order.
      if (tFinish[ele1.pID] > tFinish[ele2.pID]) {
      return 1;
    } else if (tFinish[ele1.pID] < tFinish[ele2.pID]) {
      return -1;
    } else {
      return 0;
}
    });

    const execProcess = readyQ[0];

    // eslint-disable-next-line no-loop-func
    const pLessThanBT = processes.filter((process) => {
      let curr = currTime;
      if (latestIdle) {
        curr = execProcess.aT;
      }

      return (
        process.aT <= tFinish[execProcess.pID] + curr &&
        !readyQ.includes(process) &&
        undoneJobs.includes(process) &&
        process !== execProcess
      );
    });

    let interrupted = false;
    let j=0;

    while(j < pLessThanBT.length) {
      if (latestIdle) {
        currTime = execProcess.aT;
      }

      const amount = pLessThanBT[j].aT - currTime;

      if (currTime >= pLessThanBT[j].aT) {
        readyQ.push(pLessThanBT[j]);
      }

      if (pLessThanBT[j].bT < tFinish[execProcess.pID] - amount) {
        tFinish[execProcess.pID] -= amount;
        readyQ.push(pLessThanBT[j]);
        const prevcurrTime = currTime;
        currTime += amount;
        ganttChartInfo.push({
          pID: execProcess.pID,
          start: prevcurrTime,
          stop: currTime,
        });

        interrupted = true;
        pLessThanBT[j] = true;
      }

      j++;
    }


    // eslint-disable-next-line no-loop-func
    const arrivedJobs = processes.filter((process) => {
      return (
        process.aT <= currTime &&
        process !== execProcess &&
        !readyQ.includes(process) &&
        undoneJobs.includes(process)
      );
    });

    // Push new processes to readyQ
    readyQ.push(...arrivedJobs);

    if (!interrupted) {
      if (latestIdle) {
        const remT = tFinish[execProcess.pID];
        tFinish[execProcess.pID] -= remT;
        currTime = execProcess.aT + remT;

        for (let i = 0; i < pLessThanBT.length; i++) {
          if (pLessThanBT[i] <= currTime) readyQ.push(pLessThanBT[i]);
        }

        ganttChartInfo.push({
          pID: execProcess.pID,
          start: execProcess.aT,
          stop: currTime,
        });
      } else {
        const remT = tFinish[execProcess.pID];
        tFinish[execProcess.pID] -= remT;
        const prevcurrTime = currTime;
        currTime += remT;

        // eslint-disable-next-line no-loop-func
        for (let i = 0; i < pLessThanBT.length; i++) {
          if (
            currTime >= pLessThanBT[i].aT &&
            !readyQ.includes(pLessThanBT[i])
          ) {
            readyQ.push(pLessThanBT[i]);
          }
        }

        ganttChartInfo.push({
          pID: execProcess.pID,
          start: prevcurrTime,
          stop: currTime,
        });
      }
    }

    // Requeueing (move head/first item to tail/last)
    readyQ.push(readyQ.shift());

    // When the process finished executing
    if (tFinish[execProcess.pID] === 0) {
      const indexToRemoveUJ = undoneJobs.indexOf(execProcess);
      if (indexToRemoveUJ > -1) {
        undoneJobs.splice(indexToRemoveUJ, 1);
      }
      const indexToRemoveRQ = readyQ.indexOf(execProcess);
      if (indexToRemoveRQ > -1) {
        readyQ.splice(indexToRemoveRQ, 1);
      }

      //Calculating turn around and waiting time
      tatV = currTime - execProcess.aT;
      wtV = currTime - execProcess.aT - execProcess.bT;


      calcProcesses.push({
        ...execProcess,
        ft: currTime,
        tat: tatV,
        wat: wtV,
      });
      
    //accumulate time to total
      totalTurnAroundT += tatV;
      totalWaitingT += wtV;
    }
  }

  // Sort the processes by job name within arrival time
  calcProcesses.sort((ele1, ele2) => {
    if (ele1.aTime > ele2.aTime) {
      return 1;
    } else if (ele1.aTime < ele2.aTime) {
      return -1;
    } else if(ele1.processID > ele2.processID) {
        return 1;
      } else if (ele1.processID < ele2.processID) {
        return -1;
      } else {
        return 0;
      }
    
    
  });

    // Calculating avy by dividing total by array length
  const avgTurnAroundT = totalTurnAroundT / arrivalTime.length;
  const avgWaitingT = totalWaitingT / arrivalTime.length;

  return { calcProcesses, ganttChartInfo, avgTurnAroundT, avgWaitingT };
};

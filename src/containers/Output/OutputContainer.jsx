import React from "react";
import { FCFS } from "../../components/Algorithms/FCFS";
import { PS } from "../../components/Algorithms/PS_RR";
import { RR } from "../../components/Algorithms/PS_RR";
import { SJF } from "../../components/Algorithms/SJF_SJFP";
import { SJFP } from "../../components/Algorithms/SJF_SJFP";
import { GanttChart } from "./GanttChart"
import { Table } from "./Table";

const OutputPage = ({
  algorithm,
  arrivalTimes,
  burstTimes,
  priorities,
  quantumTime,
  showOutput,
}) => {
  let result;
  if (showOutput) {
    switch (algorithm) {
      case "First Come First Serve, FCFS":
        result = FCFS(arrivalTimes, burstTimes);
        break;
      case "Shortest Job First, SJF":
        result = SJF(arrivalTimes, burstTimes);
        break;
      case "Shortest Job First, SJF (P)":
        result = SJFP(arrivalTimes, burstTimes);
        break;
      case "Priority Scheduling":
        result = PS(arrivalTimes, burstTimes, priorities);
        break;
      case "Round Robin, RR":
        result = RR(arrivalTimes, burstTimes, quantumTime);
        break;
      default:
        result = 0;
        break;
    }
  }

  console.log(algorithm, result);
  return (
    <div style={{backgroundColor: '#e8f9fd'}}className="flex flex-col mb-6 h-fit w-4/5 md:w-3/5 px-6 py-6 border-2 border-grey-100 rounded-lg shadow-lg">
      <p className="mb-6 font-extrabold  font-noto text-2xl">Output</p>
      {showOutput && (
        <div>
          <GanttChart ganttChartInfo={result.ganttChartInfo} />
          <Table data={result.calcProcesses} algorithm={algorithm}/>
          <div className="mt-8 flex justify-between">
            <div className="text-center">
              <p  style={{color:'#ff1e00'}}className="mb-2 font-bold font-noto text-lg ">
                Average Turn Around Time = <span style={{color:'black'}} className="font-bold font-noto text-lg">{result.avgTurnAroundT.toFixed(2)} ms</span>
              </p>
            </div>
            <div className="text-center">
              <p  style={{color:'#ff1e00'}} className="mb-2 font-bold font-noto text-lg ">
                Average Waiting Time = <span style={{color:'black'}} className="font-bold font-noto text-lg">{result.avgWaitingT.toFixed(2)} ms</span>
              </p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPage;

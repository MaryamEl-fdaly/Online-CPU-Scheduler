import React, { useState } from "react";
import InputTextField from "./InputField";
import DropdownMenu from "./Dropdown";
import ErrorMessage from "../../components/ErrorMessage";

const InputPage = ({
  algorithm,
  setAlgorithm,
  setArrivalTimes,
  setBurstTimes,
  setPriorities,
  setQuantumTime,
  setShowOutput
}) => {
  const [error, setError] = useState(false);

  const handleSubmission = () => {
    const arrivalInput = document.getElementById("arrivalInput"),
      burstInput = document.getElementById("burstInput"),
      priorityInput = document.getElementById("priorityInput"),
      quantumInput = document.getElementById("quantumInput");
    let arrivalArray = 0,
      burstArray = 0,
      priorityArray = 0,
      quantumValue = 0;
    arrivalArray = arrivalInput?.value?.match(/\d+/g)?.map(Number);
    burstArray = burstInput?.value?.match(/\d+/g)?.map(Number);
    priorityArray = priorityInput?.value?.match(/\d+/g)?.map(Number);
    quantumValue = quantumInput?.value?.match(/\d+/g)?.map(Number);
    console.log(
      algorithm,
      arrivalArray,
      burstArray,
      priorityArray,
      quantumValue
    );

    if (
      !arrivalArray ||
      !burstArray ||
      arrivalArray.length !== burstArray.length ||
      (algorithm === "Priority Scheduling" &&
        (!priorityArray || arrivalArray.length !== priorityArray.length)) ||
      (algorithm === "Round Robin, RR" &&
        (!quantumValue || quantumValue[0] <= 0 || quantumValue.length > 1))
    ) {
      setError(true);
      setShowOutput(false);
      return;
    }
    setError(false);
    setShowOutput(true);
    setArrivalTimes(arrivalArray);
    setBurstTimes(burstArray);
    setPriorities(priorityArray);
    setQuantumTime(quantumValue[0]);
  };

  return (
    <div style={{backgroundColor:'#e8f9fd'}}className="flex flex-col mb-6 h-min w-72 px-6 py-6 border-2 border-gray-100 rounded-lg shadow-lg">
      <p className="mb-6 font-extrabold font-noto text-2xl">Input</p>
      <DropdownMenu algorithm={algorithm} setAlgorithm={setAlgorithm} setShowOutput={setShowOutput} />
      <InputTextField
        setBurstTimes={setBurstTimes}
        title="Burst Times"
        id="burstInput"
        placeholder="e.g. 4,2,7,2 (in ms)"
      />
      <InputTextField
        setArrivalTimes={setArrivalTimes}
        title="Arrival Times"
        id="arrivalInput"
        placeholder="e.g. 1,4,5,6 (in ms)"
      />
      {algorithm === "Priority Scheduling" && (
        <InputTextField
          setPriorities={setPriorities}
          title="Priorities"
          id="priorityInput"
          placeholder="Lower no. = higher priority"
        />
      )}
      {algorithm === "Round Robin, RR" && (
        <InputTextField
          setQuantumTime={setQuantumTime}
          title="Time Quantum"
          id="quantumInput"
          placeholder="e.g. 4"
        />
      )}
      <div className="relative mb-8">
        {error && <ErrorMessage />}
        <button
          onClick={handleSubmission}
          style={{backgroundColor:'#ff1e00'}}className="absolute right-0 500 hover:bg-indigo-700 text-white py-1 px-3 rounded font-noto"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default InputPage;

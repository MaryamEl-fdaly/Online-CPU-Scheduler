import { useState } from "react";
import InputPage from "./containers/Input/InputContainer";
import OutputPage from "./containers/Output/OutputContainer";
import { Title } from "./containers/Title";

const App = () => {
  const [algorithm, setAlgorithm] = useState("First Come First Serve, FCFS");
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [burstTimes, setBurstTimes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [quantumTime, setQuantumTime] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  console.log(showOutput);

  return (
    <div>

    <div style={{backgroundColor: 'white',height: 80}} className="flex items-center md:items-start justify-around shadow-lg">
    <Title/>
    </div>

    <div className="flex items-center md:items-start flex-col md:flex-row justify-around pt-8">
    <OutputPage
        algorithm={algorithm}
        arrivalTimes={arrivalTimes}
        burstTimes={burstTimes}
        priorities={priorities}
        quantumTime={quantumTime}
        showOutput={showOutput}
      />
        <InputPage
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setArrivalTimes={setArrivalTimes}
        setBurstTimes={setBurstTimes}
        setPriorities={setPriorities}
        setQuantumTime={setQuantumTime}
        setShowOutput={setShowOutput}
      />
    </div>
    </div>
  );
}

export default App;

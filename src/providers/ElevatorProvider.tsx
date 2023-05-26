import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ElevatorDirection, ElevatorStatus } from '../types';
import { ElevatorBuilder } from '../models';

type ElevatorSystemProviderProps = {
  children: ReactNode;
};

export interface IElevatorSystemContext {
  floorCount: number;
  elevators: ElevatorStatus[];
  paused: boolean;
  delay: number;
  setFloorCount: (floorCount: number) => void;
  togglePaused: () => void;
  requestPickup: (sourceFloor: number, direction: ElevatorDirection) => void;
  requestDropOff: (elevatorID: number, targetFloor: number) => void;
  step: () => void;
  addElevator: () => void;
  removeElevator: (id: number) => void;
  reset: () => void;
  setDelay: (newVal: number) => void;
}

const initValues = {
  floorCount: 7,
  startingElevators: 2,
  paused: false,
  buildings: [1],
  delay: 1500,
};

export const ElevatorSystemContext = React.createContext<IElevatorSystemContext | null>(null);

function useInterval(elevatorSystem: ElevatorBuilder, floorCount: number, step: () => void) {
  const [delay, setDelay] = useState(initValues.delay);
  const [paused, setPaused] = useState(initValues.paused);
  const intervalID = useRef(-1);

  const nextStep = useCallback(() => {
    step();
  }, [step]);

  useEffect(() => {
    clearInterval(intervalID.current);
    intervalID.current = window.setInterval(nextStep, delay);
  }, [nextStep, delay]);

  const togglePaused = useCallback(() => {
    clearInterval(intervalID.current);
    if (paused) intervalID.current = window.setInterval(nextStep, delay);

    setPaused(!paused);
  }, [nextStep, paused, intervalID, delay]);

  return useMemo(() => ({ togglePaused, paused, delay, setDelay }), [paused, togglePaused, delay]);
}
function useElevatorSystem() {
  const elevatorSystem = useMemo(() => new ElevatorBuilder(initValues.startingElevators), []);
  const [elevators, setElevators] = useState([...elevatorSystem.status()]);

  const update = useCallback(() => setElevators([...elevatorSystem.status()]), [elevatorSystem]);

  const requestPickup = useCallback(
    (sourceFloor: number, direction: ElevatorDirection) => {
      elevatorSystem.pickup(sourceFloor, direction);
      update();
    },
    [elevatorSystem, update],
  );

  const requestDropOff = useCallback(
    (elevatorID: number, targetFloor: number) => {
      elevatorSystem.dropOff(elevatorID, targetFloor);
      update();
    },
    [elevatorSystem, update],
  );

  const step = useCallback(() => {
    elevatorSystem.step();
    update();
  }, [elevatorSystem, update]);

  const addElevator = useCallback(() => {
    elevatorSystem.addElevator();
    update();
  }, [elevatorSystem, update]);

  const removeElevator = useCallback(
    (id: number) => {
      elevatorSystem.removeElevator(id);
      update();
    },
    [elevatorSystem, update],
  );

  const reset = useCallback(() => {
    elevatorSystem.resetElevators();
    update();
  }, [elevatorSystem, update]);

  return useMemo(
    () => ({
      elevatorSystem,
      elevators,
      update,
      requestPickup,
      requestDropOff,
      step,
      addElevator,
      removeElevator,
      reset,
    }),
    [elevatorSystem, elevators, update, requestPickup, requestDropOff, step, addElevator, removeElevator, reset],
  );
}

function useFloorCount(elevatorSystem: ElevatorBuilder, update: () => void) {
  const [floorCount, setFloors] = useState(initValues.floorCount);

  const setFloorCount = useCallback(
    (newValue: number) => {
      setFloors(newValue);
      elevatorSystem.resetElevators();
      update();
    },
    [elevatorSystem, setFloors, update],
  );

  return useMemo(() => ({ floorCount, setFloorCount }), [floorCount, setFloorCount]);
}

export const ElevatorProvider = ({ children }: ElevatorSystemProviderProps) => {
  const { elevatorSystem, elevators, update, requestPickup, requestDropOff, step, addElevator, removeElevator, reset } =
    useElevatorSystem();

  const { floorCount, setFloorCount } = useFloorCount(elevatorSystem, update);
  const { paused, togglePaused, delay, setDelay } = useInterval(elevatorSystem, floorCount, step);

  const data: IElevatorSystemContext = {
    elevators,
    paused,
    floorCount,
    setFloorCount,
    togglePaused,
    requestPickup,
    requestDropOff,
    step,
    addElevator,
    removeElevator,
    reset,
    setDelay,
    delay,
  };

  return <ElevatorSystemContext.Provider value={data}>{children}</ElevatorSystemContext.Provider>;
};

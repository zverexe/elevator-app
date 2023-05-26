import { useContext } from 'react';
import { ElevatorSystemContext, IElevatorSystemContext } from '../providers/ElevatorProvider';

export function useElevatorSystem(): IElevatorSystemContext {
  const context = useContext(ElevatorSystemContext);
  if (context === null) throw new ReferenceError('Context not initialised!');
  return context;
}

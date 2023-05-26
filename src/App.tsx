import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThemeProvider, Button, Flex } from 'theme-ui';
import { ElevatorProvider } from './providers';
import { ElevatorContainer } from './components/ElevatorContainer';
import React, { useState } from 'react';
import { theme } from './theme/theme';

type TBuilding = {
  id: number;
};

function App() {
  const [buildings, addBuilding] = useState<Array<TBuilding>>([]);
  const handleAddBuilding = React.useCallback(
    () => addBuilding((oldBuildings) => [...oldBuildings, { id: oldBuildings.length + 1 }]),
    [],
  );
  return (
    <ThemeProvider theme={theme}>
      {buildings.map((building) => (
        <ElevatorProvider key={building.id}>
          <ElevatorContainer />
        </ElevatorProvider>
      ))}
      <Flex sx={{ flex: '1', justifyContent: 'center' }} mt={buildings.length ? 100 : 250}>
        <Button backgroundColor="secondary" onClick={handleAddBuilding}>
          Add Building
        </Button>
      </Flex>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import ItemsGrid from './components/ItemsGrid/ItemsGrid';
import { IMAGES } from './images';

function App() {
  return (
    <div>
      <ItemsGrid data={IMAGES} />
    </div>
  );
}

export default App;

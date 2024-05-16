import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchNpmPackages from './Components/SearchNpmPackages';
import ViewFavoritePackages from './Components/ViewFavoritePackages';
import EditFavoritePackage from './Components/EditFavoritePackage';

function App() {
  const [favoritePackages, setFavoritePackages] = useState([]);

  const addFavoritePackage = (packageName) => {
    setFavoritePackages([...favoritePackages, { packageName, whyFavorite: '' }]);
  };

  const updateFavoritePackage = (updatedPackage) => {
    setFavoritePackages(favoritePackages.map((pkg) => (pkg.packageName === updatedPackage.packageName ? updatedPackage : pkg)));
  };

  return (
    <div className='container ml-3'>
      <Router>
        <Switch>
          <Route exact path="/">
            <SearchNpmPackages onAdd={addFavoritePackage} />
          </Route>
          <Route path="/favorites">
            <ViewFavoritePackages favoritePackages={favoritePackages} />
          </Route>
          <Route path="/favorites/:packageName/edit">
            <EditFavoritePackage onSave={updateFavoritePackage} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
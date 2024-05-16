import React from 'react';

function ViewFavoritePackages({ favoritePackages }) {
  return (
    <div >
      <div>
        <h1>My Favorite NPM Packages</h1>
        {favoritePackages.length === 0 && <p>You don't have any favs yet. Please add.</p>}
      </div>
      
      <ul>
        {favoritePackages.map((pkg) => (
          <li key={pkg.packageName}>
            <strong>{pkg.packageName}</strong>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default ViewFavoritePackages;
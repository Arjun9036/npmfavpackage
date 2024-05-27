import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchNpmPackages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favoritePackages, setFavoritePackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [whyFavorite, setWhyFavorite] = useState('');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritePackages'));
    if (storedFavorites) {
      setFavoritePackages(storedFavorites);
    }
  }, []);

  useEffect(() => {
    if (favoritePackages.length > 0) {
      localStorage.setItem('favoritePackages', JSON.stringify(favoritePackages));
    }
  }, [favoritePackages]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        const response = await fetch(`https://api.npms.io/v2/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.results);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePackageSelect = (event) => {
    setSelectedPackage(event.target.value);
  };

  const handleWhyFavoriteChange = (event) => {
    setWhyFavorite(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedPackage && whyFavorite) {
      if (!favoritePackages.includes(selectedPackage)) {
        const newFavorites = [...favoritePackages, selectedPackage];
        setFavoritePackages(newFavorites);
        setSelectedPackage(null);
        setWhyFavorite('');
      }
    }
  };

  const handleDeleteFavorite = (packageName) => {
    if (window.confirm(`Are you sure you want to delete ${packageName} from favorites?`)) {
      const updatedFavorites = favoritePackages.filter((pkg) => pkg !== packageName);
      setFavoritePackages(updatedFavorites);
      localStorage.setItem('favoritePackages', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className='container mb-3' style={{ margin: 40 }}>
      <h1>Welcome to Favorite NPM Packages</h1>
      <Link to="/favorites">View Favorites</Link>
      {favoritePackages.length === 0 && <p>You don't have any favs yet. Please add.</p>}
      <ul>
        {favoritePackages.map((pkg) => (
          <li key={pkg}>
            {pkg}
            <button onClick={() => handleDeleteFavorite(pkg)}>Delete</button>
            <button>
              <Link to={`/favorites/${pkg}/edit`}>Edit</Link>
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h4>Search for Favorite NPM package</h4>
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search"
          style={{ width: "500px" }}
        />
        <ul>
          {searchResults.map((result) => (
            <li key={result.package.name}>
              <input
                type="radio"
                name="package"
                value={result.package.name}
                onChange={handlePackageSelect}
              />
              {result.package.name}
            </li>
          ))}
        </ul>
        <h4>Why is this your favorite?</h4>
        <textarea
          value={whyFavorite}
          onChange={handleWhyFavoriteChange}
          rows="4"
          cols={60}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchNpmPackages;

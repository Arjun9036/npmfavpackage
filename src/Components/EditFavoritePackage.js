import React, { useState } from 'react';

function EditFavoritePackage({ favoritePackage, onSave }) {
  const [whyFavorite, setWhyFavorite] = useState(favoritePackage.whyFavorite);

  const handleSave = (event) => {
    event.preventDefault();
    if (whyFavorite) {
      onSave({ ...favoritePackage, whyFavorite });
    }
  };

  return (
    <div>
      <h1>Edit Favorite NPM Package</h1>
      <form onSubmit={handleSave}>
        <textarea
          value={whyFavorite}
          onChange={(event) => setWhyFavorite(event.target.value)}
          placeholder="Why is this your favorite?"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditFavoritePackage;
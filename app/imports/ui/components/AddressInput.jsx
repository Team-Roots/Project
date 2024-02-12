import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// eslint-disable-next-line react/prop-types
const AddressInput = ({ onAddressSelect }) => {
  const [address, setAddress] = useState('');

  // eslint-disable-next-line no-shadow
  const handleChange = (address) => {
    setAddress(address);
  };

  // eslint-disable-next-line no-shadow
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        onAddressSelect(address, latLng); // Pass the address and coordinates upwards
      })
      .catch(error => console.error('Error', error));
    setAddress(address);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input form-control',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              return (
                <div
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...getSuggestionItemProps(suggestion, { className })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressInput;

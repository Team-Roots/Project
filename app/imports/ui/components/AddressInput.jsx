import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';

const AddressInput = ({ onAddressSelect }) => {
  const [inputAddress, setInputAddress] = useState(''); // Correctly setting state variable and its setter

  const handleChange = (newAddress) => {
    setInputAddress(newAddress);
  };

  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        onAddressSelect(selectedAddress, latLng); // Pass the selected address and coordinates upwards
      })
      .catch(error => console.error('Error', error));
    setInputAddress(selectedAddress);
  };

  return (
    <PlacesAutocomplete
      value={inputAddress}
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
              // Note: Ensure you have a key prop for each item in a list
              return (
                <div
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...getSuggestionItemProps(suggestion, { className })}
                  key={suggestion.placeId} // Assuming `placeId` is available. Adjust as needed.
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

AddressInput.propTypes = {
  onAddressSelect: PropTypes.func.isRequired,
};

export default AddressInput;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AddressInput = ({ onAddressSelect }) => {
  const [address, setAddress] = useState('');

  const handleChange = (newAddress) => setAddress(newAddress);

  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => onAddressSelect(selectedAddress, latLng))
      .catch(error => console.error('Error', error));
    setAddress(selectedAddress);
  };

  const handleKeyDown = (event) => {
    // Example: trigger select on Enter key
    if (event.key === 'Enter') {
      handleSelect(address);
    }
  };

  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            placeholder={getInputProps().placeholder}
            className={getInputProps().className}
            onChange={getInputProps().onChange}
            onBlur={getInputProps().onBlur}
            onFocus={getInputProps().onFocus}
            // Add other necessary props manually
          />

          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const suggestionItemProps = getSuggestionItemProps(suggestion);
              return (
                <div
                  key={index}
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...suggestionItemProps}
                  role="button"
                  tabIndex="0"
                  onKeyDown={handleKeyDown}
                  onFocus={suggestionItemProps.onMouseOver} // Repurpose mouse events for keyboard focus
                  onBlur={suggestionItemProps.onMouseOut}
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

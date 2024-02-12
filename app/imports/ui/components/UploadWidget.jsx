import React, { useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

const UploadWidget = ({ setUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: Meteor.settings.public.cloudinary.cloud_name,
        uploadPreset: Meteor.settings.public.cloudinary.upload_preset,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setUrl(result.info.secure_url);
        }
      },
    );
  }, [setUrl]);

  return (
    <button type="button" onClick={() => widgetRef.current && widgetRef.current.open()}>
      Upload Image
    </button>
  );
};

UploadWidget.propTypes = {
  setUrl: PropTypes.func.isRequired,
};

export default UploadWidget;

import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const CloudinaryPage = () => {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dlqixfg1f',
    },
  });
  // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
  const myImage = cld.image('nzf0rlc8dyod33gscsut');

  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImage.resize(fill().width(50).height(50));

  // Render the image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};
export default CloudinaryPage;

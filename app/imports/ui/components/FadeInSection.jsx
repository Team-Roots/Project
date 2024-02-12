import React, { useState, useRef, useEffect } from 'react';

/** Renders a single row in the List Event table with Bootstrap styling. */
const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);

  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);

        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });

    observer.observe(domRef.current);

    return () => observer.unobserve(domRef.current);
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
      {props.children}
    </div>
  );
};

export default FadeInSection;

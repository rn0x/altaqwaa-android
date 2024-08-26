import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

/**
 * SlideShow component to display a carousel of slides.
 *
 * @component
 * @example
 * const slides = [
 *   { id: 1, image: 'url1', alt: 'Image 1' },
 *   { id: 2, image: 'url2', alt: 'Image 2' }
 * ];
 * return (
 *   <SlideShow slides={slides} settings={{}} />
 * );
 * @param {Object} props - The component props.
 * @param {Array} props.slides - Array of slide objects.
 * @param {Object} [props.settings] - Optional settings to override default AliceCarousel settings.
 */
const SlideShow = ({ slides, settings = {} }) => {
  const defaultSettings = {
    responsive: {
      0: { items: 1 },
      568: { items: 1 },
      1024: { items: 1 },
    },
    autoPlay: true,
    autoPlayInterval: 3000,
    infinite: true,
    ...settings,
  };

  return (
    <div className="slide-show">
      <AliceCarousel {...defaultSettings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img
              src={slide.image}
              alt={slide.alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        ))}
      </AliceCarousel>
    </div>
  );
};

export default SlideShow;
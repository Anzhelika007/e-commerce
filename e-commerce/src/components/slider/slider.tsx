import React, { useState } from 'react';
import Modal from 'react-modal';
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

type ProductSliderProps = {
  images: { src: string; id: string }[];
};

function ProductSliderWithModal({
  images,
}: ProductSliderProps): React.ReactElement {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="slider">
      <div className="slider-box">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImageIndex(index)}
            className={
              selectedImageIndex === index
                ? 'slider-images slider-images-active'
                : 'slider-images'
            }
            onKeyDown={(e) => e.key === 'Enter' && setSelectedImageIndex(index)}
            role="button"
            tabIndex={0}
          />
        ))}
      </div>
      <div className="slider-main-box">
        <CarouselProvider
          naturalSlideWidth={300}
          naturalSlideHeight={325}
          totalSlides={images.length}
          visibleSlides={1}
          infinite
          isPlaying={false}
          currentSlide={selectedImageIndex}
        >
          <Slider>
            {images.map((image, index) => (
              <Slide key={image.id} index={index}>
                <img
                  src={image.src}
                  alt={`Product ${index + 1}`}
                  className="slider-main-img"
                  onClick={() => openModal(index)}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(index)}
                  role="button"
                  tabIndex={0}
                />
              </Slide>
            ))}
          </Slider>
          <DotGroup className="slider-dots" />
        </CarouselProvider>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modalContent"
      >
        <CarouselProvider
          naturalSlideWidth={300}
          naturalSlideHeight={325}
          totalSlides={images.length}
          visibleSlides={1}
          infinite
          isPlaying={false}
          currentSlide={selectedImageIndex}
        >
          <Slider>
            {images.map((image, index) => (
              <Slide key={image.id} index={index}>
                <img
                  src={image.src}
                  alt={`Product ${index + 1}`}
                  style={{ height: '100%', margin: '0px auto' }}
                />
              </Slide>
            ))}
          </Slider>
          <DotGroup className="slider-dots" />
        </CarouselProvider>
        <button
          onClick={closeModal}
          style={{ display: 'block', margin: '10px auto' }}
          type="button"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default ProductSliderWithModal;

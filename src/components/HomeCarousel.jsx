import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function HomeCarousel() {
  return (
    <Container>
      <Carousel
        slide={false}
        style={{ width: "80%" }}
        className='m-auto shadow-sm border rounded border-warning border-3 '
      >
        <Carousel.Item>
          <img
            height={300}
            className='d-block w-100 rounded'
            src='https://hips.hearstapps.com/hmg-prod/images/best-cheap-laptops-646786e23599f.png'
            alt='First slide'
          />
          <Carousel.Caption>
            <h4 className='text-warning'>buy goods</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            height={300}
            className='d-block w-100 rounded'
            src='https://cdn.mos.cms.futurecdn.net/HNnXnoyFqKhJKQJfPDp4HV-1024-80.jpg.webp'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            height={300}
            className='d-block w-100 rounded'
            src='https://hips.hearstapps.com/hmg-prod/images/new-ghost-white-fr-3-4-1-1598911711.jpg'
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default HomeCarousel;

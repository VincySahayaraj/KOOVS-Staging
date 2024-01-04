import React from "react";
import "./socialmedia.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import videolink from "../../assets/images/videosample1.mp4";
import videoimage from "../../assets/images/thumbnail.png";
import dmgvideoicon from "../../assets/images/playbutton.png";
import insta1 from "../../assets/images/insta1.png";
import insta2 from "../../assets/images/insta2.png";
import insta3 from "../../assets/images/insta3.png";
import insta4 from "../../assets/images/insta4.png";
import insta5 from "../../assets/images/insta5.png";
import insta6 from "../../assets/images/insta6.png";
import insta7 from "../../assets/images/insta7.png";
import insta8 from "../../assets/images/insta8.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
class SocialMedia extends React.Component {
  // Create state
  state = {
    isPlaying: false,
    opacity: 1,
    controls: "",
  };

  playPause = () => {
    let isPlaying = this.state.isPlaying;
    let opacity = this.state.opacity;
    let controls = this.state.controls;

    if (isPlaying) {
      this.refs.vidRef.pause();
    } else {
      this.refs.vidRef.play();
    }

    // Change the state of the video
    this.setState({
      isPlaying: !isPlaying,
      opacity: !!this.state.opacity ? 0 : 1,
      controls: !!this.state.controls ? "" : "controls",
    });
  };

  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        partialVisibilityGutter: 30,
        slidesToSlide: 1, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        partialVisibilityGutter: 30,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        partialVisibilityGutter: 90,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    return (
      <section className="SocialMedia py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="future-collaboration pb-5 d-none d-lg-block">
                <h5>
                  <b>
                    Future <i>collaborations</i>
                  </b>
                </h5>
                <br />
                <div className="d-flex gap-4 align-items-center">
                  <h5>28/04</h5>
                  <h5>Ira Voo</h5>
                  <span className="flex-grow-1 border-bottom"></span>
                  <p>
                    <a>
                      <u>sign up</u>
                    </a>
                  </p>
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>03/05</h5>
                  <h5>MBW x KOOVS </h5>
                  <span className="flex-grow-1 border-bottom"></span>
                  <p>
                    <a>
                      <u>sign up</u>
                    </a>
                  </p>
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>09/05</h5>
                  <h5>Caro Reinholdt </h5>
                  <span className="flex-grow-1 border-bottom"></span>
                  <p>
                    <a>
                      <u>sign up</u>
                    </a>
                  </p>
                </div>
                <div className="d-flex gap-4 align-items-center">
                  <h5>22/05</h5>
                  <h5>Christopher </h5>
                  <span className="flex-grow-1 border-bottom"></span>
                  <p>
                    <a>
                      <u>sign up</u>
                    </a>
                  </p>
                </div>
              </div>
              <div className="future-collaboration d-block d-lg-none pb-5">
                <h5>
                  <b>
                    Future <i>collaborations</i>
                  </b>
                </h5>
                <p>Collections you can't afford to miss</p>
                <div className="row  ms-2 ms-lg-0 g-5" id="carousel-slide">
                  <Carousel
                    infinite="true"
                    partialVisible={true}
                    interval={3000}
                    touch={true}
                    arrows={false}
                    responsive={responsive}
                    renderButtonGroupOutside={true}
                    swipeable={true}
                    draggable={false}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                  >
                    <div className="cards overflow-hidden">
                      <div className="img-content">
                        <div className="green-card">
                          <p>MBW x KOOVS </p>{" "}
                        </div>
                        <p>03/05</p>
                        <p>
                          <a>
                            <u>sign up</u>
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="cards overflow-hidden">
                      <div className="img-content">
                        <div className="green-card">
                          <p>MBW x KOOVS </p>{" "}
                        </div>
                        <p>03/05</p>
                        <p>
                          <a>
                            <u>sign up</u>
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="cards overflow-hidden">
                      <div className="img-content">
                        <div className="green-card">
                          <p>MBW x KOOVS </p>{" "}
                        </div>
                        <p>03/05</p>
                        <p>
                          <a>
                            <u>sign up</u>
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="cards overflow-hidden">
                      <div className="img-content">
                        <div className="green-card">
                          <p>MBW x KOOVS </p>{" "}
                        </div>
                        <p>03/05</p>
                        <p>
                          <a>
                            <u>sign up</u>
                          </a>
                        </p>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
              <h5 className="d-none d-lg-block">
                <b>Live Shopping</b>
              </h5>
              <br />
              <div className="row d-none d-lg-flex">
                <div className="col-12 col-lg-6 position-relative">
                  <video
                    ref="vidRef"
                    controls={this.state.controls}
                    src={videolink}
                    type="video/mp4"
                    poster={videoimage}
                  />
                  <button
                    type="button"
                    id="play_button"
                    className="video-play-button"
                    style={{ opacity: this.state.opacity }}
                    onClick={this.playPause}
                  >
                    <span>
                      <img alt="video play icon" src={dmgvideoicon} />
                    </span>
                  </button>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="px-0 py-4 py-lg-0 px-lg-4">
                    <h5 className="fw-bold">Live with Hannie</h5>
                    <p className="py-4">
                      Spend the afternoon with photographer, Hannie as he lorem
                      ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua
                    </p>
                    <button className="btn btn-light btn-outline-dark px-5 rounded-0">
                      WATCH AND SHOP
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="insta-koovs col-12 col-lg-6">
              <h5>
                <b>KOOVS on Instagram </b>
              </h5>{" "}
              <br />
              <div className="row g-1">
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta1}
                    className="img-fluid"
                    alt="instagram photo"
                    effect=""
                  />
                </div>
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta2}
                    className="img-fluid"
                    alt="instagram photo"
                    effect="blur"
                  />
                </div>
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta3}
                    className="img-fluid"
                    alt="instagram photo"
                    effect="blur"
                  />
                </div>
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta4}
                    className="img-fluid"
                    alt="instagram photo"
                    effect="blur"
                  />
                </div>
                <div className="col-4 col-lg-4 d-flex align-items-center">
                  <p className="grid-text p-3  fw-bold mt-5">
                    Tag @Koovs + #KOOVS on IG for a chance to be featured.
                  </p>
                </div>
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta5}
                    className="img-fluid"
                    alt="instagram photo"
                    effect="blur"
                  />
                </div>
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta6}
                    className="img-fluid"
                    alt="instagram photo"
                    effect="blur"
                  />
                </div>
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta7}
                    className="img-fluid"
                    alt="instagram photo"
                    effect="blur"
                  />
                </div>
                <div className="col-4 col-lg-4">
                  <LazyLoadImage
                    src={insta8}
                    className="img-fluid"
                    alt="instagram photo"
                    effect="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SocialMedia;

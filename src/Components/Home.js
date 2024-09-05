import React from "react"
const Home = () => {
  return (
    <>
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src="https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg?size=626&ext=jpg&ga=GA1.1.1887574231.1711670400&semt=ais"  className="vh-100 vw-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="https://hips.hearstapps.com/hmg-prod/images/is-pizza-healthy-1671729626.jpg"  className="vh-100 vw-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg"  className="vh-100 vw-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
};

export default Home;

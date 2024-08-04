import React from "react"
const Home = () => {
  return (
    <>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg?size=626&ext=jpg&ga=GA1.1.1887574231.1711670400&semt=ais" class="d-block w-100" alt="..." width={500} height={550}/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://hips.hearstapps.com/hmg-prod/images/is-pizza-healthy-1671729626.jpg" class="d-block w-100" alt="..." width={400} height={550}/>
    </div>
    <div class="carousel-item">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg" class="d-block w-100" alt="..." width={550} height={550}/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
};

export default Home;

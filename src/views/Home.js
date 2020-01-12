import frog from "assets/images/host.png";

const Home = {
  render: async () => /*html*/ `
           <section class="frog">
              <img src=${frog} alt="I am a host" />
              <p>WELCOME . . <a href="#/merong">.</a></p>
           </section>
       `,
  after_render: async () => {}
};

export default Home;

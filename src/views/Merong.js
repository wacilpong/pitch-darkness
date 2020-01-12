const rainbow = Array(10).fill("rainbow");

const Merong = {
  render: async () => /*html*/ `
              <section class="merong">
              ${rainbow
                .map(className => /*html*/ `<div class="${className}"></div>`)
                .join("\n ")}

                <div class="text">⊙</div>
              </section>
          `,
  after_render: async () => {}
};

export default Merong;

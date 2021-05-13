import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.$state = { items: ["item1", "item2"] };
  }
  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${filteredItems
          .map(
            ({ contents, active, seq }) => `
          <li data-seq="${seq}">
            ${contents}
            <button class="toggleBtn" style="color: ${
              active ? "#09F" : "#F09"
            }">
              ${active ? "활성" : "비활성"}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  setEvent() {
    // this.$target.querySelector(".addBtn").addEventListener("click", () => {
    //   const { items } = this.$state;
    //   this.setState({ items: [...items, `item${items.length + 1}`] });
    // });

    // this.$target.querySelectorAll(".deleteBtn").forEach((deleteBtn) =>
    //   deleteBtn.addEventListener("click", ({ target }) => {
    //     const items = [...this.$state.items];
    //     items.splice(target.dataset.index, 1);
    //     this.setState({ items });
    //   })
    // );

    // 이벤트 버블링 - 모든 이벤트를 this.$target에 등록
    // this.$target.addEventListener("click", ({ target }) => {
    //   const items = [...this.$state.items];

    //   if (target.classList.contains("addBtn")) {
    //     this.setState({ items: [...items, `item${items.length + 1}`] });
    //   }

    //   if (target.classList.contains("deleteBtn")) {
    //     items.splice(target.dataset.index, 1);
    //     this.setState({ items });
    //   }
    // });

    // 이벤트 버블링 추상화된 메서드 사용
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      console.log("asdf", target.closest("[data-seq]"));
      deleteItem(Number(target.closest("[data-seq]").dataset.seq));
    });

    this.addEvent("click", ".toggleBtn", ({ target }) => {
      toggleItem(Number(target.closest("[data-seq]").dataset.seq));
    });
  }
}

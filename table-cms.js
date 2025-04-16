(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const richTextBlocks = document.querySelectorAll('[rich-text-table]');

    richTextBlocks.forEach(block => {
      const attr = block.getAttribute('rich-text-table');

      if (attr !== "enable") return;

      const tables = block.querySelectorAll("table");
      if (tables.length === 0) return;

      block.classList.add("text-rich-text");

      tables.forEach(table => {
        if (!table.parentElement.classList.contains("table-wrapper")) {
          const wrapper = document.createElement("div");
          wrapper.className = "table-wrapper";
          wrapper.style.overflowX = "auto";
          wrapper.appendChild(table.cloneNode(true));
          table.parentElement.replaceChild(wrapper, table);
        }
      });
    });

    // Inyecta el CSS solo una vez
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .text-rich-text {
        width: 100%;
        overflow-x: auto;
      }

      .text-rich-text table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
      }

      .text-rich-text th,
      .text-rich-text td {
        padding: 0.75rem;
        border: 1px solid #ccc;
        text-align: left;
      }

      .text-rich-text thead {
        background-color: #f7f7f7;
        font-weight: bold;
      }

      @media (max-width: 768px) {
        .text-rich-text {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .text-rich-text .table-wrapper {
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
      }
    `;
    document.head.appendChild(styleTag);
  });
})();

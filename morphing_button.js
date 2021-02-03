(function () {
  const morphing_buttons = Array.from(
    document.querySelectorAll(".morphing_button")
  );

  const children = morphing_buttons.map((b) =>
    b.getElementsByClassName("hidden")
  );

  const morph = (button) => {
    morphing_buttons.map((b) => {
      if (b !== button) return;
      b.classList.add("morphing");
      b.classList.remove("reverting");
    });
    children.map((c) => c.classList.remove("hidden"));
  };

  const revert = (button) => {
    morphing_buttons.map((b) => {
      if (b !== button) return;
      b.classList.remove("morphing");
      b.classList.add("reverting");
    });
    children.map((c) => c.classList.add("hidden"));
  };

  morphing_buttons.map((b) =>
    b.addEventListener("click", function (e) {
      if (this !== e.target) return;
      b.isExpanding = !b.isExpanding;
      if (b.isExpanding) {
        morph(this);
      } else {
        revert(this);
      }
    })
  );

  // const x = document.querySelector("button .x");
  // x.addEventListener("click", revert);
  // x.addEventListener("keyup", function (e) {
  //   if (e.code !== "Space" && e.code !== "Enter") return;
  //   revert(this);
  // });

  var styles = `
    .morphing_button {
      width: 10ch;
      height: 5ch;
      transition: 0.2s;
      overflow: hidden;
    }
    
    .fill-screen {
      width: 12ch;
    }
    
    .morphing {
      animation: morph 1s forwards;
      margin: 0;
      outline: none;
      border: none;
    }
    
    .morphing.fill-screen {
      position: absolute;
      z-index: 9001;
    }
    
    .reverting {
      animation: revert_morph 0.3s forwards !important;
      border: none;
    }
    
    .morphing *,
    .reverting * {
      visibility: collapse;
      height: 0;
    }
    
    .morphing * {
      animation: show_children_after_morph 1s forwards;
    }
    
    @keyframes morph {
      0% {
        color: transparent;
        clip-path: circle(75%);
      }
      50% {
        clip-path: circle(25%);
        width: 7ch;
        height: 7ch;
      }
      90% {
        /* defer showing text: */
        color: transparent;
      }
      100% {
        clip-path: circle(75%);
        width: 100vw;
        height: 100vh;
      }
    }
    
    @keyframes show_children_after_morph {
      0% {
        visibility: collapse;
        height: 0;
        display: none;
      }
      90% {
        visibility: collapse;
        height: 0;
        display: none;
      }
      100% {
        visibility: visible;
        height: auto;
        display: block;
      }
    }
    
    @keyframes revert_morph {
      0% {
        /* copy of 100% of morph: */
        clip-path: circle(75%);
        width: 100vw;
        height: 100vh;
        color: transparent;
      }
      90% {
        /* defer showing text: */
        color: transparent;
      }
    }
    
    .collapsed {
      visibility: collapse;
    }

    `;

  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.className = "flying-focus-ring-style-sheet";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
})();

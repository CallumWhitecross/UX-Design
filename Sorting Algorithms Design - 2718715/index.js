/* Source code is taken from https://codesandbox.io/s/zen-minsky-bwyr9?from-embed=&file=/index.html */

const container = document.querySelector(".data-container");

function generatingBars(num = 20) {
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 100);

    const group = document.createElement("div");
    group.classList.add("block");
    group.style.height = `${value * 3}px`;
    group.style.transform = `translateX(${i * 30}px)`;

    const groupLabel = document.createElement("label");
    groupLabel.classList.add("block__id");
    groupLabel.innerHTML = value;

    group.appendChild(groupLabel);
    container.appendChild(group);
  }
}

async function bubbleSort(delay = 100) {
  let bars = document.querySelectorAll(".block");
  for (let i = 0; i < bars.length - 1; i += 1) {
    for (let j = 0; j < bars.length - i - 1; j += 1) {
      bars[j].style.backgroundColor = "#ff7749";
      bars[j + 1].style.backgroundColor = "#ff7749";

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(bars[j].childNodes[0].innerHTML);
      const value2 = Number(bars[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(bars[j], bars[j + 1]);
        bars = document.querySelectorAll(".block");
      }

      bars[j].style.backgroundColor = "#58B7FF";
      bars[j + 1].style.backgroundColor = "#58B7FF";
    }

    bars[bars.length - i - 1].style.backgroundColor = "#13CE66";
  }
}

function swap(fBar, sBar) {
  return new Promise(resolve => {
    const form1 = window.getComputedStyle(fBar);
    const form2 = window.getComputedStyle(sBar);

    const transform1 = form1.getPropertyValue("transform");
    const transform2 = form2.getPropertyValue("transform");

    fBar.style.transform = transform2;
    sBar.style.transform = transform1;

    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(sBar, fBar);
        resolve();
      }, 250);
    });
  });
}

generatingBars();
bubbleSort();

"use strict";

let data = [];
let cells = 1; // マスの数
const board = document.getElementById("board");
document.querySelectorAll(".select").forEach((value) => {
  value.addEventListener("click", start);
});

// スタート画面でマスの数が選択された時の処理
function start(e) {
  cells = Number(e.target.id);
  board.innerHTML = "";
  modal.classList.add("hide");
  init();
}

// 初期化
function init(){
  for (let i = 0; i < cells; i++) {
    const tr = document.createElement("tr");
    data[i] = Array(cells).fill(-1);
    for (let j = 0; j < cells; j++) {
      const td = document.createElement("td");
      td.className = "lighton";
      td.onclick = clicked;
      tr.appendChild(td);
    }
    board.appendChild(tr);
  }
}

// マスがクリックされた時の処理
function clicked() {
    // 周囲4方向を調べる配列
    const direction = [
      [-1, 0], // 左
      [0, 1], // 下
      [1, 0], // 右
      [0, -1], // 上
    ];

  const y = this.parentNode.rowIndex;
  const x = this.cellIndex;
  data[y][x] *= -1;

  for (let i = 0; i < direction.length; i++) {
    const dx = direction[i][0] + x;
    const dy = direction[i][1] + y;
    if (dx >= 0 && dy >= 0 && dx <= cells - 1 && dy <= cells - 1) {
        data[dy][dx] *= -1;
    }
  }

  lighting();
}

// ライトのオン・オフ
function lighting() {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (data[i][j] === 1) {
        board.rows[i].cells[j].className = "lightoff";
      } else {
        board.rows[i].cells[j].className = "lighton";
      }
    }
  }
  check();
}

// ライトがすべて消えてるかチェック
function check() {
    if(!data.some(e => e.includes(-1))){
      board.style.pointerEvents = "none";
      showEnd();
    }
}

// ゲーム終了画面表示
function showEnd() {
  end.classList.remove("hide");
  end.animate({ opacity: [0, 0.4] }, { duration: 1500 })
  .finished.then(() => {
    end.animate({ color: ["yellowgreen", "black"] }, { duration: 1500, iterations: Infinity })
  });
}
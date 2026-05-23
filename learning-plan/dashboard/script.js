const plans = {
  p4: [
    {
      week: "Week 1",
      title: "TypeScript基礎を業務目線で固める",
      focus: "型注釈、Union、Generics、型ガード、strict",
      tasks: [
        "在庫アイテム/入出庫/レスポンスの型を定義",
        "型ガードで不正データを弾く関数を実装",
        "anyを使った箇所をゼロにする"
      ]
    },
    {
      week: "Week 2",
      title: "Next.js App Routerで画面を作る",
      focus: "レイアウト、Server/Client Components、フォーム",
      tasks: [
        "在庫一覧・商品登録・商品詳細の3画面を作成",
        "入力バリデーションと画面遷移を実装",
        "型エラー0でビルドできる状態にする"
      ]
    },
    {
      week: "Week 3",
      title: "API / DB連携",
      focus: "Route Handlers、Prisma、CRUD、異常系",
      tasks: [
        "商品マスタCRUDを実装",
        "在庫増減APIと検索APIを実装",
        "在庫がマイナスにならない制約を実装"
      ]
    },
    {
      week: "Week 4",
      title: "最小品質担保とリリース準備",
      focus: "テスト、環境変数、README",
      tasks: [
        "在庫加減算ロジックの単体テストを追加",
        "主要導線のE2Eテストを1本以上作成",
        "READMEにセットアップと設計方針を記載"
      ]
    }
  ],
  p8: [
    {
      week: "Week 1-2",
      title: "TypeScript強化",
      focus: "DTO/Domain Model設計、Zod連携",
      tasks: [
        "API契約の型を統一しフロントと共有",
        "Zodで入力スキーマと型を同期",
        "型ガードとバリデーション責務を分離"
      ]
    },
    {
      week: "Week 3-4",
      title: "Next.js実践",
      focus: "App Router深掘り、認証導入",
      tasks: [
        "Server ActionsとRoute Handlersを使い分け",
        "認証を導入して在庫更新を保護",
        "UIを再利用可能コンポーネントへ分割"
      ]
    },
    {
      week: "Week 5-6",
      title: "DB設計と業務ロジック",
      focus: "ER設計、整合性、トランザクション",
      tasks: [
        "items/stocks/stock_movements/usersを設計",
        "履歴と在庫一覧の整合を担保",
        "同時更新時の競合を想定して対策を検討"
      ]
    },
    {
      week: "Week 7",
      title: "テストと品質",
      focus: "Unit/Integration/E2E、CI",
      tasks: [
        "lint/typecheck/testをCIで自動化",
        "重要ロジックに回帰テストを追加",
        "エラー設計方針をドキュメント化"
      ]
    },
    {
      week: "Week 8",
      title: "ミニ本番想定",
      focus: "デプロイ、運用、振り返り",
      tasks: [
        "Vercel想定でデプロイを実施",
        "ログ確認観点と障害時手順を整理",
        "要件定義〜デプロイを通しで再実施"
      ]
    }
  ]
};

const timeline = document.getElementById("timeline");
const plan4 = document.getElementById("plan4");
const plan8 = document.getElementById("plan8");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const today = document.getElementById("today");

const storageKey = "ts-nextjs-learning-progress";
let currentPlan = "p4";
let checked = loadState();

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(checked));
}

function togglePlan(plan) {
  currentPlan = plan;
  plan4.classList.toggle("active", plan === "p4");
  plan8.classList.toggle("active", plan === "p8");
  render();
}

function render() {
  const list = plans[currentPlan];
  timeline.innerHTML = "";

  list.forEach((item, wIndex) => {
    const box = document.createElement("article");
    box.className = "week";

    const title = document.createElement("h3");
    title.textContent = `${item.week}: ${item.title}`;

    const focus = document.createElement("p");
    focus.textContent = `テーマ: ${item.focus}`;

    box.appendChild(title);
    box.appendChild(focus);

    item.tasks.forEach((task, tIndex) => {
      const key = `${currentPlan}-${wIndex}-${tIndex}`;

      const row = document.createElement("label");
      row.className = "task";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = Boolean(checked[key]);
      input.addEventListener("change", () => {
        checked[key] = input.checked;
        saveState();
        updateProgress();
      });

      const span = document.createElement("span");
      span.textContent = task;

      row.appendChild(input);
      row.appendChild(span);
      box.appendChild(row);
    });

    timeline.appendChild(box);
  });

  updateProgress();
}

function updateProgress() {
  const total = plans[currentPlan].reduce((sum, w) => sum + w.tasks.length, 0);
  let done = 0;

  plans[currentPlan].forEach((item, wIndex) => {
    item.tasks.forEach((_, tIndex) => {
      const key = `${currentPlan}-${wIndex}-${tIndex}`;
      if (checked[key]) {
        done += 1;
      }
    });
  });

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  progressBar.value = percent;
  progressText.textContent = `${percent}% (${done}/${total})`;
}

function setToday() {
  const now = new Date();
  const text = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  today.textContent = `作成日: ${text}`;
}

plan4.addEventListener("click", () => togglePlan("p4"));
plan8.addEventListener("click", () => togglePlan("p8"));

setToday();
render();

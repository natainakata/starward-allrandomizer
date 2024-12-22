import { useState } from "react";
import Data from "./charactors.json";
import { Charactor } from "./types/charactor";
import RollButton from "./components/rollButton";
import RolledCharactorList from "./components/rolledCharactorList";
import Charactors from "./components/charactors";

const bursts = ["F", "S", "M", "D", "B"];

function App() {
  const charactors = Data as Record<string, Charactor>;
  const defaultCharactors = Object.keys(charactors).filter(
    (keys) => charactors[keys].rarity === 0
  );
  const [getedCharactors, setGetedCharactors] = useState<string[]>(
    localStorage.getItem("getedCharactors")
      ? JSON.parse(localStorage.getItem("getedCharactors") as string)
      : [...defaultCharactors]
  );
  const [rolledCharactors, setRolledCharactors] = useState<Charactor[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const charactor = e.target.value;
    if (!getedCharactors.includes(charactor)) {
      localStorage.setItem(
        "getedCharactors",
        JSON.stringify([...getedCharactors, charactor])
      );
      setGetedCharactors([...getedCharactors, charactor]);
    } else if (charactors[charactor].rarity > 0) {
      localStorage.setItem(
        "getedCharactors",
        JSON.stringify(
          getedCharactors.filter(
            (getedCharactor) => getedCharactor !== charactor
          )
        )
      );
      setGetedCharactors(
        getedCharactors.filter((getedCharactor) => getedCharactor !== charactor)
      );
    }
  };

  const rollChallactors = () => {
    const temp = getedCharactors.slice();
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    const result = temp.slice(0, 4).map((charactor) => {
      const rolled = charactors[charactor] as Charactor;
      return {
        ...rolled,
        burst: bursts[Math.floor(Math.random() * bursts.length)],
      };
    });
    setRolledCharactors([...result]);
  };

  return (
    <div className="App">
      <div className="About">
        <h1>星の翼オールランダム抽選器</h1>
        <h2>使い方</h2>
        <ol>
          <li>所持しているキャラクターにチェックを付けてください。</li>
          <li>抽選ボタンを押すと、キャラクター4名とその覚醒を抽選します。</li>
          <li>ゲームの編成画面で順序通りに配置してください。</li>
          <li>地獄が始まります。</li>
        </ol>
      </div>
      <Charactors
        onChange={handleChange}
        getedCharactors={getedCharactors}
        charactors={charactors}
      />
      <RollButton onClick={rollChallactors} charactors={getedCharactors} />
      <RolledCharactorList charactors={rolledCharactors} />
      <div className="ChangeLog">
        <h2>更新履歴</h2>
        <ul>
          <li>2024/12/22: v1.0.1 選択したキャラクターを保持するようにした</li>
          <li>2024/12/16: v1.0.0 公開</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

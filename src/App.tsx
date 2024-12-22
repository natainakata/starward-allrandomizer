import { useState } from "react";
import Data from "./charactors.json";
import { Charactor } from "./types/charactor";
import RollButton from "./components/rollButton";
import RolledCharactorList from "./components/rolledCharactorList";
import Charactors from "./components/charactors";

const bursts = ["F", "S", "M", "D", "B"];

function App() {
  const charactors = Data as Record<string, Charactor>;
  const [getedCharactors, setGetedCharactors] = useState<Charactor[]>([
    charactors.beta,
    charactors.deucalion,
  ]);
  const [rolledCharactors, setRolledCharactors] = useState<Charactor[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const charactor = charactors[e.target.value];
    if (!getedCharactors.includes(charactor)) {
      setGetedCharactors([...getedCharactors, charactor]);
    } else if (charactor.rarity > 0) {
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
      return {
        ...charactor,
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
    </div>
  );
}

export default App;

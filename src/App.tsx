import { useState } from "react";
import Data from "./charactors.json";
type Charactor = {
  name: string;
  cost: 1.5 | 2 | 2.5 | 3;
  rarity: 0 | 1 | 2 | 3;
  burst?: string;
};
const bursts = ["F", "S", "M", "D", "B"];

function App() {
  const charactors = Data as Record<string, Charactor>;
  const [getedCharactors, setGetedCharactors] = useState<Charactor[]>([
    charactors.beta,
    charactors.deucalion,
  ]);
  const [rolledCharactors, setRolledCharactors] = useState<Charactor[]>([]);

  const rollChallactors = (array: Charactor[]) => {
    const temp = array.slice();
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    const result = temp.slice(0, 4);
    result.map((charactor) => {
      charactor.burst = bursts[Math.floor(Math.random() * bursts.length)];
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
      <div
        className="Charactors"
        style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
      >
        {Object.keys(charactors).map((key) => {
          const charactor = charactors[key] as Charactor;
          return (
            <div className="Charactor" key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={
                    charactor.rarity === 0 ||
                    getedCharactors.includes(charactor)
                  }
                  onChange={() => {
                    if (!getedCharactors.includes(charactor)) {
                      setGetedCharactors([...getedCharactors, charactor]);
                    } else if (charactor.rarity > 0) {
                      setGetedCharactors(
                        getedCharactors.filter(
                          (getedCharactor) => getedCharactor !== charactor
                        )
                      );
                    }
                  }}
                />
                {charactor.name}
              </label>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          rollChallactors(getedCharactors);
        }}
      >
        抽選
      </button>
      {rolledCharactors.length > 0 && (
        <div className="RolledCharactors">
          {rolledCharactors.map((charactor) => {
            return (
              <div className="RolledCharactor" key={charactor.name}>
                {charactor.name} {charactor.burst}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;

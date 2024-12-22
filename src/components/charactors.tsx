import { Charactor } from "../types/charactor";
import CharactorCheckbox from "./charactorCheckbox";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getedCharactors: string[];
  charactors: Record<string, Charactor>;
};

const Charactors = ({ onChange, getedCharactors, charactors }: Props) => {
  return (
    <div
      className="Charactors"
      style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
    >
      {Object.keys(charactors).map((key) => {
        const charactor = charactors[key] as Charactor;
        return (
          <div className="Charactor" key={key}>
            {charactor.rarity > 0 ? (
              <CharactorCheckbox
                onChange={onChange}
                charactorKey={key}
                children={charactor.name}
                defaultChecked={getedCharactors.includes(key)}
              />
            ) : (
              <CharactorCheckbox
                onChange={() => {}}
                charactorKey={key}
                children={charactor.name}
                checked={true}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Charactors;

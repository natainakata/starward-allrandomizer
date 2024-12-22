import { Charactor } from "../types/charactor";

type Props = {
  charactors: Charactor[];
};

const RolledCharactorList = ({ charactors }: Props) => {
  return (
    <>
      {charactors.length > 0 && (
        <ol className="RolledCharactors">
          {charactors.map((charactor) => {
            return (
              <li className="RolledCharactor" key={charactor.name}>
                {charactor.name} {charactor.burst}覚醒
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
};

export default RolledCharactorList;

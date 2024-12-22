import { Charactor } from "../types/charactor";

type Props = {
  onClick: () => void;
  charactors: Charactor[];
};

const RollButton = ({ onClick, charactors }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={charactors.length < 4}
      className="roll-button"
    >
      抽選
    </button>
  );
};

export default RollButton;

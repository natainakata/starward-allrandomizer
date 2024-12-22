interface BaseProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  charactorKey: string;
}

interface ControlProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: never;
}

interface UncontrolledProps extends BaseProps {
  checked?: never;
  defaultChecked?: boolean;
}

type Props = ControlProps | UncontrolledProps;

const CharactorCheckbox = ({
  onChange,
  checked,
  defaultChecked,
  children,
  charactorKey,
}: Props) => {
  return (
    <div className="Charactor">
      <label>
        <input
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          value={charactorKey}
          className="charactor-checkbox"
        />
        <span className="charactor-name">{children}</span>
      </label>
    </div>
  );
};

export default CharactorCheckbox;

export interface CheckboxProps {
  type: string;
  status: boolean | undefined;
  handleStatus: () => void;
  className: string;
}

export const Checkbox = ({
  className,
  type,
  status,
  handleStatus,
}: CheckboxProps) => {
  return (
    <input
      name="checked"
      className={`checkbox mr-2 shadow-inner w-5 h-5 border-2 border-black hover:border-sky-300 ${className}`}
      type={type}
      checked={status}
      onChange={handleStatus}
    />
  );
};

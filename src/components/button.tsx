

type Props = {
  id?: string;
  type?: "button" | "submit" | "reset";
  containerClass?: string;
  children: React.ReactNode;
  leftIcon?:  React.ReactNode;
  rightIcon?:  React.ReactNode;
};

function Button({ id = "", type = "button", containerClass = "", children, leftIcon, rightIcon }: Props) {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`} type={type}>
      {leftIcon }
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>
          {children}
        </div>
      </span>
      {rightIcon }
    </button>
  );
}

export default Button;

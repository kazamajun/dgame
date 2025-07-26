type NameTagProps = {
  name: string;
};

export default function NameTag({ name }: NameTagProps) {
  return (
    <div
      className={`
        inline-block bg-white text-black
        font-bold rounded shadow-md
        px-4 py-1.5 text-xl
      `}
    >
      {name}
    </div>
  );
}

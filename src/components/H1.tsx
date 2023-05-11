export default function H1({ title }: { title: string | undefined }) {
  return (
    <h1 className={`rick-morty-font text-7xl text-center my-4 text-cyan-500 `}>
      {title}
    </h1>
  );
}

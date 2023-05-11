interface Props {
  info: string;
  data: string | undefined;
  underline?: string;
  symbol?: string;
}

export default function H3Span({ info, data, underline, symbol }: Props) {
  return (
    <h3>
      <span className="text-cyan-300">{info} </span>
      <b className={underline}>{data}</b>
      {symbol}
    </h3>
  );
}

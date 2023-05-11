interface Props {
  info: string;
  data: string | undefined;
  classN?: string;
  symbol?: string;
}

export default function H3Span({ info, data, classN, symbol }: Props) {
  return (
    <h3>
      <span className="text-cyan-300">{info} </span>
      <b className={classN}>{data}</b>
      {symbol}
    </h3>
  );
}

interface Props {
  name: string;
  description: string;
}

const CoinDescription = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 md:w-2/3">
      <h1 className="text-2xl font-semibold">About {props.name}</h1>
      <p className="text-sm">{props.description}</p>
    </div>
  );
};

export default CoinDescription;

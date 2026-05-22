type Props = {
  title: string;
  value: string;
};

const StatsCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-gray-500 text-sm">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
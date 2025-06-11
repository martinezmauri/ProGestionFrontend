const StepIndicator = ({
  step,
  title,
  active = false,
}: {
  step: number;
  title: string;
  active?: boolean;
}) => (
  <div className="flex items-center">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        active ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-600"
      }`}
    >
      {step}
    </div>
    <span
      className={`ml-2 text-sm font-medium ${
        active ? "text-gray-700" : "text-gray-500"
      }`}
    >
      {title}
    </span>
    {step < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>}
  </div>
);

export default StepIndicator;

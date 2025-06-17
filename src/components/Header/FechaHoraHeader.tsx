import { useEffect, useState } from "react";

function FechaHoraHeader() {
  const [hora, setHora] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-right text-sm text-muted-foreground col-span-full">
      {hora.toLocaleString()}
    </div>
  );
}

export default FechaHoraHeader;

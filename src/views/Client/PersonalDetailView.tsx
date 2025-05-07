import { Dashboard } from "@components/Sidebar/Dashboard";
import { PersonalForm } from "@components/Forms/PersonalForm";

export const PersonalDetailView = () => {
  return (
    <main className="flex w-full">
      <Dashboard />
      <div className="flex justify-center items-center flex-col m-auto gap-[20px]">
        <PersonalForm />
      </div>
    </main>
  );
};

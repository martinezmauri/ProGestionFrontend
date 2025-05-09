import { PersonalEditForm } from "@components/Forms/PersonalEditForm";
import { Dashboard } from "@components/Sidebar/Dashboard";

export const PersonalDetailView = () => {
  return (
    <main className="flex w-full">
      <Dashboard />
      <div className="flex justify-center items-center flex-col m-auto gap-[20px]">
        <PersonalEditForm />
      </div>
    </main>
  );
};

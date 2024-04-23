import { InputExcel } from "@/shared/components/inputExcel/inputExcel";

export const RechazosModule = () => {
  return (
    <main className="w-full h-full py-10 flex flex-col items-center gap-20">
      <h1 className="text-4xl font-semibold">RECHAZOS</h1>
      <InputExcel />
    </main>
  );
};

import { Header } from "@/components/header";
import RequestDetail from "@/components/RequestDetail";

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string };
  }) {
  
  return (
    <div className="flex flex-col w-screen overflow-y-scroll">
      <Header />
      <RequestDetail id={params.id as string} />
    </div>
  );
}

import { Header } from "@/components/header";
import RequestDetail from "@/components/RequestDetail";

type tParams = Promise<{ id: string }>;

export default async function RequestDetailsPage({ params }: { params: tParams }) {
  return (
    <div className="flex flex-col w-screen overflow-y-scroll">
      <Header />
      <RequestDetail id={(await params).id as string} />
    </div>
  );
}

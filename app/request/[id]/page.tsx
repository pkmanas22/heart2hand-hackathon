import { Header } from "@/components/header";
import RequestDetail from "@/components/RequestDetail";

export default async function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  let requestData;
  let errorMessage = "";

  try {
    const { id } = await params;

    // Fetch data from API
    const response = await fetch(`http://localhost:3000/api/request/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the response is not okay, throw an error
    if (!response.ok) {
      throw Error(`Failed to fetch request. Status: ${response.status}`);
    }

    // Parse the response as JSON
    const result = await response.json();
    const data = result.data;
    // console.log("Fetched data:", result); // Log the result
    requestData = {
      id,
      title: "N/A",
      requesterName: data.name,
      category: data.category,
      dateCreated: data.createdAt.toLocaleString(),
      status: "Verified",
      amountNeeded: data.amount,
      amountAchieved: data.amount,
      story: data.story,
      updates: [],
      gratitudeVideo: data.youtubeUrl,
      supportingDocuments: data.supportingDocuments,
    };
  } catch (error) {
    console.error("Fetch error:", error); // Log the error
    errorMessage = error.message || "Something went wrong. Please try again.";

    // Fallback data in case of an error
    requestData = {
      id: "N/A",
      title: "Error",
      requesterName: "",
      category: "",
      dateCreated: "",
      status: "Pending",
      amountNeeded: 0,
      amountAchieved: 0,
      story: "Unable to fetch the request data.",
      updates: [],
      supportingDocuments: [],
      gratitudeVideo: undefined,
    };
  }

  return (
    <div className="flex flex-col w-screen overflow-y-scroll">
      <Header />
      {errorMessage ? (
        <div className="error-message text-center">{errorMessage}</div>
      ) : (
        <RequestDetail requestData={requestData} />
      )}
    </div>
  );
}

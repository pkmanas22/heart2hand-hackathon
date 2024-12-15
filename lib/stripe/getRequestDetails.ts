// This is a mock function. In a real application, you'd fetch this data from your database.

export const getRequestDetails = (id: string) => {
    // Simulate API call
    console.log(`Fetching details for request with ID: ${id}`);
    return {
        recipientName: "Seema",
        requestTitle: "Help Seema's Child's Surgery",
        amount: 50000, // Amount in smallest currency unit (e.g., paise for INR)
    }
}


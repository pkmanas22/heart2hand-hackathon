// This is a mock function. In a real application, you'd fetch this data from your database.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRequestDetails = (id: string) => {
    // Simulate API call

    return {
        recipientName: "Seema",
        requestTitle: "Help Seema's Child's Surgery",
        amount: 50000, // Amount in smallest currency unit (e.g., paise for INR)
    }
}


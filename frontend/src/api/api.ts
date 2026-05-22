export const API_BASE_URL =
  "http://127.0.0.1:8000";

export async function submitCheckIn(
  formData: object
) {
  const response =
    await fetch(
      `${API_BASE_URL}/checkin`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            formData
          ),
      }
    );

  if (
    !response.ok
  ) {
    const error =
      await response.text();

    throw new Error(
      error
    );
  }

  return response.json();
}

export async function getCheckins() {
  const response =
    await fetch(
      `${API_BASE_URL}/checkins`
    );

  return response.json();
}
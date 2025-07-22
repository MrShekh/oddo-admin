const BASE_URL = "https://oddo-hackathon.onrender.com";

const getToken = () => localStorage.getItem("token");

export const downloadReport = async (type) => {
  const res = await fetch(`${BASE_URL}/api/reports/${type}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to download report");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${type}_report.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export default function createDatabase(name, loading) {
  fetch("/api/admin", {
    method: "POST",
    body: JSON.stringify({ departmentName: name }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      alert(data.message);
      loading(false);
    });
}

export async function getPatientData() {
  const response = await fetch("/api/patient");
  const data = await response.json();
  return data.message;
}

export async function getSearchedPatient(name, loading) {
  const allPatients = await getPatientData();

  const filteredPatient = allPatients.find((patient) => patient.name == name);
  loading(false);
  return filteredPatient;
}

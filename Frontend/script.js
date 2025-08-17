document.getElementById("regForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const formData = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    course: document.getElementById("course").value,
    year: document.getElementById("year").value,
    skills: document.getElementById("skills").value.trim(),
  };

  // Simple validation
  if (formData.fullName.length < 3) {
    alert("Name must be at least 3 characters long");
    return;
  }
  if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(formData.email)) {
    alert("Invalid email format");
    return;
  }
  if (!/^[0-9]{10}$/.test(formData.phone)) {
    alert("Phone must be 10 digits");
    return;
  }

  // Send data to backend
  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  alert(data.message);
  document.getElementById("regForm").reset();
});

async function loadMeetings() {
  const list = document.getElementById("meetings-list");
  const data = await fetchData("/meetings"); // Calls your backend API

  list.innerHTML = data
    .map(
      (m, index) => `
        <div class="mtg-card ${m.isPriority ? "priority" : ""} anim d${5 + index}">
            <div class="mtg-time-col">
                <div class="mtg-hour">${m.hour}</div>
                <div class="mtg-ampm">${m.ampm}</div>
            </div>
            <div class="mtg-divider"></div>
            <div class="mtg-info">
                <div class="mtg-name">${m.title}</div>
                <div class="mtg-with">${m.participants}</div>
                <div class="mtg-tags">
                    ${m.tags.map((t) => `<span class="mtg-tag tag-${t.toLowerCase()}">${t}</span>`).join("")}
                </div>
            </div>
            <div class="mtg-actions">
                <button class="btn-prep" onclick="location.href='${m.prepLink}'">Prep</button>
                <button class="btn-join" onclick="location.href='${m.joinLink}'">Join</button>
            </div>
        </div>
    `,
    )
    .join("");
}
document
  .getElementById("meeting-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Gather data
    const payload = {
      title: document.getElementById("title").value,
      time: document.getElementById("time").value,
    };

    // 2. Send to Backend
    // Using your 'apiCall' helper
    const result = await apiCall("/meetings", "POST", payload);

    // 3. Handle success
    if (result.success) {
      alert("Meeting Saved!");
      location.reload(); // Refresh the list
    } else {
      alert("Failed to save.");
    }
  });
document
  .getElementById("doc-upload-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("fileInput").files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Call API with multipart/form-data
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://nexus-platform-production-0625.up.railway.app/api/upload",
      {
        method: "POST",
        headers: { Authorization: token },
        body: formData, // Browser sets Content-Type automatically
      },
    );

    if (res.ok) {
      alert("Upload Successful!");
      location.reload();
    }
  });
const socket = io("https://nexus-platform-production-0625.up.railway.app");

socket.on("connect", () => {
  console.log("Connected to Signaling Server:", socket.id);
});

// Example: Join a room
function joinVideoRoom(roomId) {
  const userId = "user123"; // Get this from your auth token
  socket.emit("join-room", roomId, userId);
}
// Call this on page load
loadMeetings();

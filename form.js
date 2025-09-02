document.getElementById("add-content").addEventListener("click", function () {
  const contentContainer = document.getElementById("content-container");
  const newContent = document.createElement("div");
  newContent.className = "content-card p-4 mb-4";
  newContent.innerHTML = `
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
      <div>
          <label class="block text-sm mb-1">Platform</label>
          <select name="content-platform" class="cute-input px-3 py-2 w-full">
              <option value="">Select platform</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="VGen">VGen</option>
          </select>
      </div>
      <div>
          <label class="block text-sm mb-1">Content Type</label>
          <input name="content-type" type="text" class="cute-input px-3 py-2 w-full" placeholder="e.g., Reel, Post, Video">
      </div>
      <div>
          <label class="block text-sm mb-1">Engagement</label>
          <input name="content-engagement" type="number" class="cute-input px-3 py-2 w-full" placeholder="Total engagement">
      </div>
  </div>
  <div>
      <label class="block text-sm mb-1">Content Description</label>
      <textarea name="content-description" class="cute-input px-3 py-2 w-full" rows="2" placeholder="Brief description of the content"></textarea>
  </div>
  <button class="remove-content text-pink-500 text-sm mt-2 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      Remove
  </button>
`;

  contentContainer.appendChild(newContent);

  // Add event listener to the new remove button
  newContent
    .querySelector(".remove-content")
    .addEventListener("click", function () {
      contentContainer.removeChild(newContent);
    });
});

document.getElementById("report-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Collect all data as an object
  const data = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  // Save to localStorage
  localStorage.setItem("monthlyReport", JSON.stringify(data));

  // Show confirmation
  const month = data.month || "this month";
  alert("Your report for " + month + " was saved!");

  console.log(data);
});

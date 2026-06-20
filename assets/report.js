(function () {
  const repoNewIssueUrl = "https://github.com/go-manga/GoMangaApp/issues/new";
  const form = document.querySelector("[data-issue-form]");
  const preview = document.querySelector("[data-preview]");

  if (!form || !preview) {
    return;
  }

  function field(name) {
    const input = form.elements[name];
    if (!input) return "";
    if (input.type === "checkbox") return input.checked ? "Yes" : "No";
    return String(input.value || "").trim();
  }

  function line(label, value) {
    return `- ${label}: ${value || "_Not provided_"}`;
  }

  function section(title, value) {
    return `## ${title}\n${value || "_Not provided_"}\n`;
  }

  function buildBody() {
    const diagnosticsAvailable = field("diagnosticsAvailable") === "Yes"
      ? "User can attach diagnostics/screenshots"
      : "No diagnostics confirmed yet";

    return [
      "## Environment",
      line("Area", field("area")),
      line("Severity", field("severity")),
      line("App version", field("appVersion")),
      line("OS version", field("osVersion")),
      line("Device", field("device")),
      line("Source / host", field("source")),
      line("Diagnostics", diagnosticsAvailable),
      "",
      section("Steps to reproduce", field("steps")),
      section("Expected result", field("expected")),
      section("Actual result", field("actual")),
      section("Diagnostics or notes", field("diagnostics")),
      "## Privacy check",
      "- I removed passwords, private tokens, full cookies, paid content, and personal information before posting."
    ].join("\n");
  }

  function issueTitle() {
    const title = field("title") || "GoManga issue";
    const area = field("area") || "App";
    return `[${area}] ${title}`;
  }

  function updatePreview() {
    preview.textContent = buildBody();
  }

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const params = new URLSearchParams({
      title: issueTitle(),
      body: buildBody(),
      labels: "bug,needs-triage"
    });
    window.location.href = `${repoNewIssueUrl}?${params.toString()}`;
  });

  updatePreview();
})();

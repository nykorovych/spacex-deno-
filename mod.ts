async function downloadLaunchData() {
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });
}

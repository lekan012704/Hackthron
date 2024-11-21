const userData = {
    phone: "1234567890",
    pin: "1234",
    balance: 0,
    badge: "Newbie",
    activities: []
};
document.getElementById("trash-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const type = document.getElementById("type").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const pointsPerKg = { "paper": 2, "plastic": 3, "iron": 4, "e-waste": 5, "organic": 1 };
    const pointsEarned = pointsPerKg[type] * weight;

    userData.balance += pointsEarned;
    const badge = getBadgeStars(userData.balance);
    userData.badge = badge;

    
    const activity = `Disposed ${weight}kg of ${type} for ${pointsEarned} points.`;
    userData.activities = userData.activities || [];
    userData.activities.push(activity);

    localStorage.setItem("userData", JSON.stringify(userData));

    document.getElementById("balance").innerText = `${userData.balance} Points (${(userData.balance * 0.5).toFixed(2)} Naira)`;
    document.getElementById("badge-stars").innerText = badge;

    alert(`You disposed of ${weight}kg of ${type} and earned ${pointsEarned} points!`);
});
document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
        document.getElementById("balance").innerText = `${userData.balance} Points`;
        document.getElementById("badge").innerText = userData.badge;

        const activitiesList = document.getElementById("activities");
        if (userData.activities && userData.activities.length > 0) {
            activitiesList.innerHTML = userData.activities
                .map(activity => `<li>${activity}</li>`)
                .join("");
        } else {
            activitiesList.innerHTML = "<li>No activities yet.</li>";
        }
    } else {
        alert("No user data found. Please log in first.");
        window.location.href = "index.html";
    }
});
function getBadgeStars(points) {
    if (points >= 100) {
        return "⭐⭐⭐⭐⭐";
    } else if (points >= 75) {
        return "⭐⭐⭐⭐";
    } else if (points >= 50) {
        return "⭐⭐⭐";
    } else if (points >= 25) {
        return "⭐⭐";
    } else {
        return "⭐";
    }
}

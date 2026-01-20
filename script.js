setInterval(() => {
    const d = new Date();
    document.getElementById("india").innerText = d.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    }).split(", ")[1]

    document.getElementById("usa").innerText = d.toLocaleString("en-US", {
        timeZone: "America/Chicago"
    }).split(", ")[1]

    document.getElementById("australia").innerText = d.toLocaleString("en-US", {
        timeZone: "Australia/Sydney",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })

    // console.log(d.getHours(), d.getMinutes(), d.getSeconds())
    const alarmHour = document.getElementById("alarm").value.split(":")[0]
    const alarmMinute = document.getElementById("alarm").value.split(":")[1]
    // console.log(alarmHour,alarmMinute)
    if (d.getHours() == alarmHour && d.getMinutes() == alarmMinute && d.getSeconds() == 0) {
        console.log("Alarm is Ringing");
        var audio = new Audio('Alarm_Sound.mp3');
        audio.play();
    }
}, 1000);

/*document.getElementById("allcountry").addEventListener('change', async (e) => {
    if (e.target.value === 'Select A Country') {
        changeName.innerText = "India";
    } else {
        changeName.innerText = e.target.value;
    }
    const response = await fetch("sampledata.json");
    const data = await response.json();
    if (e.target.value === 'Select A Country') {
        changeLink.href = "https://en.wikipedia.org/wiki/India";
    } else {
        changeLink.href = data[e.target.value]?.Link;
    }

    setInterval(() => {
        let d = new Date();
        document.getElementById("changeTime").innerText = d.toLocaleString("en-US", {
            timeZone: data[e.target.value]?.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
    }, 1000);
})*/

let intervalId; // global variable to store the current interval
const gettime = async (city) => {
    try {
        // Capitalize first letter
        city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        // Clear previous interval if any
        if (intervalId) {
            clearInterval(intervalId);
        }
        const zone = await fetch(`https://api.weatherapi.com/v1/timezone.json?key=58c54d36b90b429bbbe55846250612&q=${city}`);
        const data = await zone.json();
        console.log(data.location.tz_id);
        // document.getElementById("time").innerHTML = `<h3>Time Now At ${city}: ${data.location.localtime.split(" ")[1]}</h3>`;

        // Start a new interval
        intervalId = setInterval(() => {
            let d = new Date();
            document.getElementById("time").innerHTML = `<h3>Time Now At ${city}: ${d.toLocaleString("en-US", {
                timeZone: data.location.tz_id,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })}</h3>`;
        }, 1000);
    }
    catch (error) { console.log(error.message); }
}

document.getElementById("btn").addEventListener("click", () => {
    const v = document.getElementById("cityname").value;
    gettime(v);
})
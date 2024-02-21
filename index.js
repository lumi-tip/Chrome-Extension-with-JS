fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
		document.getElementById('author').textContent = 'Author: ' + data.user.name
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1502790671504-542ad42d5189?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDg0NjUzMzh8&ixlib=rb-4.0.3&q=85)`
    })

fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(res =>{
        if(!res.ok) throw Error("Ocurrio un error inesperado")
        return res.json()
    })
    .then(data => {
        document.getElementById('bit-image').src = `${data.image.small}`
        document.getElementById('bit-name').textContent = data.id
        document.getElementById('bit-price').textContent = data.market_data.current_price.usd + ' USD'
    })
    .catch(err => console.log(err))

function getCurrentTime(){
    let updateDate = new Date;
    let updateLocalTime = updateDate.toLocaleTimeString("es-ve", {timeStyle: "short"})
    document.getElementById('time-el').textContent = updateLocalTime
}
 
getCurrentTime()
setInterval(getCurrentTime,1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <div class="wrapper">
                    <img src=${iconUrl} />
                    <p id="temp">${Math.round(data.main.temp)}º</p>
                </div>
                <p id="city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});
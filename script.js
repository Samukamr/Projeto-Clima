// usando requisições internas

// manipulação de API
// requisição interna a API 

document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); // ela previni o comportamento padrão que o formúlario deveria ter

    let input = document.querySelector('#searchInput').value; // na minha variável input eu tenho o que foi digitado

    if(input !== '') {
        clearInfo();
        showWarning('carregando...');
        // encodeURI: formata o texto pro formato url

        //`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}4a650671eecdc4013d9ce58dbe6193ab&units=metric&lang=pt_br`

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`);
        let json = await results.json(); // tranformar em um objeto do javascript "json"

        if(json.cod === 200) {
            showInfo({
                name: json.name, //nome da cidade
                country: json.sys.country, // nome do país
                temp: json.main.temp, // temperatura
                tempIcon: json.weather[0].icon, // ícone da temperatura
                windSpeed: json.wind.speed, // Velocidade do vento
                windAngle: json.wind.deg // ângulo
            });
        } else { 
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }
});

// função pra mostrar as informações
function showInfo(obj) {
    showWarning(''); // pra tirar o "carregando..."

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`; // nome e país

    document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`; // temperatura
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;  // Velocidade do vento

    //Img
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function  clearInfo() { // "limpar a tela"
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) { //function de aviso
    document.querySelector('.aviso').innerHTML = msg;
}
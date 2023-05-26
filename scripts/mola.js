const carga = document.querySelector('#cargaEsperada');

function calculo() {
    const CompriTotalMola = document.querySelector('#compMola').value;
    const totalMolaCompri = document.querySelector('#totalMola').value;
    const resultadoCompressao = document.querySelector('#resultCompressao');
    const resultadoConstante = document.querySelector('#resultConstante');
    const compressao_mm = CompriTotalMola - totalMolaCompri

    const constante = 400 / compressao_mm
    resultadoCompressao.innerHTML = `Compressão / mm: ${constante.toFixed(0)}`
    resultadoConstante.innerHTML = `Constante: ${compressao_mm}`

    return (compressao_mm)
}

function testaValor() {
    const cargaEsperadaMin = document.querySelector('#cargaEsperadaMin').value
    const cargaEsperadaMax = document.querySelector('#cargaEsperadaMax').value
    const CompriTotalMola = document.querySelector('#compMola').value;
    const totalMolaCompri = document.querySelector('#totalMola').value;
    if (cargaEsperadaMax.length == 0 || cargaEsperadaMin.length == 0 || CompriTotalMola.length == 0 || totalMolaCompri.length == 0) {
        alert('Por favor, digite os valores necessários!!')
    } else {
        if (cargaEsperadaMax <= cargaEsperadaMin) {
            alert('A carga esperada máxima deve ser maior do que a mínima')
        } else {
            let cargaTotalTeste = 0

            let potencia = 0;
            let potencia2 = 0;
            let potencia3 = 0;
            let constante = 0;

            for (let i = 0.1; i <= 2; i += 0.05) {
                potencia = i
                if (cargaTotalTeste >= cargaEsperadaMin && cargaTotalTeste <= cargaEsperadaMax) break

                for (let i2 = 2; i2 <= 15; i2 += 0.5) {
                    potencia2 = i2
                    if (cargaTotalTeste >= cargaEsperadaMin && cargaTotalTeste <= cargaEsperadaMax) break

                    for (let i3 = 1; i3 <= 20; i3 += 0.1) {
                        potencia3 = i3
                        constante = recebeConstante(potencia ** 4, potencia2, potencia3 ** 3)
                        cargaTotalTeste = constante * calculo()
                        //console.log({ potencia1: potencia, potencia2: potencia2, potencia3: potencia3 })
                        //console.log({ cargaTotalTeste })
                        if (cargaTotalTeste >= cargaEsperadaMin && cargaTotalTeste <= cargaEsperadaMax) {
                            const diametroFio = document.querySelector('#diametroFioh1');
                            const numEspiraisUteis = document.querySelector('#numEspiraisUteis');
                            const diametroMedio = document.querySelector('#diametroMedio');
                            const cargaTotalh1 = document.querySelector('#cargoTotal');

                            diametroFio.textContent = `Diametro do fio: ${potencia.toFixed(2)}`
                            numEspiraisUteis.textContent = `Numero de espirais uteis: ${potencia2}`
                            diametroMedio.textContent = `Diametro medio: ${potencia3.toFixed(1)}`
                            cargaTotalh1.textContent = `Carga total: ${cargaTotalTeste}`
                            break

                        }
                    }
                }
            }
        }
    }



}

function recebeConstante(potencia1, potencia2, potencia3) {
    return Math.floor((8200 * potencia1) / 8 / potencia3 / potencia2)
}


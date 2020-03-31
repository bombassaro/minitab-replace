# Minitab replacer
Para substituir os cálculos pré importação no minitab

### Requisitos
*  Instalar o NodeJS
*  Instalar o Yarn

### Comandos
*  Para instalar o projeto execute
*  `yarn install`
*  Para rodar o projeto execute
*  `yarn dev`

### Cálculos

i = MEDIA DO ITEM
b = MEDIA DAS MEDIAS DO PERIODO
n = NUMERO DE ITEMS

s = SOMA (i - b).(i - b)
DP = raiz(s / n - 1)

Especificacao
(Filme, Exame, Alvo, Min, Max)

Calculos: Cp Cpk

Cp = eMax - eMin / 6 * DP
if(!e) return null

# b = media das medias

CpkX1 = eMax - b / 3 * DP
CpkX2 = b - eMin / 3 * DP
Cpk = CpkX1 > CpkX2 ? CpkX2 : CpkX1

Especificacao
desvio padrao
desvio dentro
Amplitude
===
NORMALIZADOR
===
INTERFACE CONSULTA
INTERFACE ESPECIFICADORA

const btnNode = document.getElementById('btn');

btnNode.addEventListener('click', () => {
    alert('Ширина экрана: ' + window.innerWidth + ',' + ' ' + 'Высота экрана: ' + window.innerHeight);
});
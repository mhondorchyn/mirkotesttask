const $ = require('jquery');

$(document).ready(() => {
    const button = $('.js-button');
    button.on('click', (e) => alert('Hello'));
});
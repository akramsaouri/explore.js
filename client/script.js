$(document).ready(() => {
    (function () {
        fetchFiles();
    })();

    $('.file').click(() => {
        fetchFiles($(this).text());
    })
});


function fetchFiles(path = null) {
    $.get('/explore', {path}, (files) => {
        console.log(files);
        renderFiles(files);
    })
}

function renderFiles(files) {
    let $container = $('#files');
    $container.empty();
    files.forEach((file) => {
        let str = `<li><a href="#" class="file">${file}</a></li>`;
        $container.append(str);
    });
}
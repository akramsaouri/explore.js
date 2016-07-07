$(document).ready(() => {
    (function () {
        fetchFiles();
    })();

    // get sub files
    $(document).on('click', '.file', () => {
        let dir = $(event.target).text() || '.';
        fetchFiles(dir);
    });
});

/**
 * fetch files of the current directory
 * @param cwd
 */
function fetchFiles(cwd = '.') {
    $.get('/explore', { cwd }, files => {
        renderFiles(files);
    });
}

/**
 * render fetched files to views
 * @param files
 */
function renderFiles(files) {
    let $container = $('#files');
    $container.empty();
    files.forEach(file => {
        let str = `<li><a href="#" class="file">${ file }</a></li>`;
        $container.append(str);
    });
}

//# sourceMappingURL=script-compiled.js.map
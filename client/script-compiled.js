$(document).ready(() => {
    (function () {
        fetchFiles('.'); // fetch file of current dir // todo : avoid magic strs
        $.get('/explore/unlink', { file: 'E:/Explore.js/test/ok.txt' }, data => {
            console.log(data);
        });
    })();

    // get sub files
    $(document).on('click', '.file', () => {
        let cwd = $(event.target).text(); // get file basename
        fetchFiles(cwd);
    });

    // go back in the dir tree
    $('#back').click(() => {
        let dirname = $('#dirname').text();
        $.get('/explore/scan', { dirname }, renderFiles);
    });

    // on search
    $('#search').keyup(() => {
        var key = $('#search').val();
        search(key);
    });
});

/**
 * fetch files of the current directory
 * @param cwd
 */
function fetchFiles(cwd = '') {
    $.get('/explore/scan', { cwd }, renderFiles);
}

/**
 * render fetched files to the view
 * @param data : files + resolved dirname
 */
function renderFiles(data = {}) {
    let files = data.files || [],
        dirname = data.dirname || '',
        $container = $('#files');
    $container.empty();
    files.forEach(file => {
        let str = `<li><a href="#" class="file">${ file }</a></li>`;
        $container.append(str);
    });
    $('#dirname').text(dirname);
}

/**
 * Search file by key
 * @param key
 */
function search(key = '') {
    let files = $('#files li');
    files.each((index, elm) => {
        $(elm).text().indexOf(key) !== -1 ? $(elm).show() : $(elm).hide();
    });
}

//# sourceMappingURL=script-compiled.js.map
$(document).ready(() => {
    (function () {
        fetchFiles('.'); // fetch file of current dir // todo : avoid magic strs
    })();

    // get sub files
    $(document).on('click', '.file', () => {
        let cwd = $(event.target).parent().attr('id'); // get file basename
        fetchFiles(cwd);
    });

    // go back in the dir tree
    $('#back').click(() => {
        let dirname = $('#dirname').text();
        $.get('/explore/scan', {dirname}, renderFiles);
    });

    // on search
    $('#search').keyup(() => {
        var key = $('#search').val();
        search(key);
    });

    // on delete click
    $(document).on('click', '.delete', () => {
        const file = $(event.target).parent().attr('id');
        $.get('/explore/unlink', {file}); // todo : ajax laod
    })
});


/**
 * fetch files of the current directory
 * @param cwd
 */
function fetchFiles(cwd = '') {
    $.get('/explore/scan', {cwd}, renderFiles);
}

/**
 * render fetched files to the view
 * @param files
 */
function renderFiles(files = []) {
    const $container = $('#files');
    $container.empty();
    files.forEach((file) => {
        let str = `
        <li class="list-group-item" id="${file.dir}\\${file.base}">
        <a href="#" class="file">
        ${file.base}
        </a>
        <a href="#" class="delete btn btn-danger btn-xs pull-right">delete</a>
        </li>`;
        $container.append(str);
    });
    $('#dirname').text(files[0].dir);
}

/**
 * Search file by key
 * @param key
 */
function search(key = '') {
    let files = $('#files').find('li');
    files.each((index, elm) => {
        ($(elm).text().indexOf(key) !== -1) ? $(elm).show() : $(elm).hide();
    })
}
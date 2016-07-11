$(document).ready(() => {
    (function () {
        fetchFiles(); // fetch file of current dir
    })();

    // get sub files
    $(document).on('click', '.file', () => {
        let cwd = $(event.target).parent().attr('id'); // get file basename
        fetchFiles(cwd);
    });

    // go back in the dir tree
    $('#back').click(() => {
        let dirname = $('#dirname').text(); // get the directory name
        $.get('/explore/scan', {dirname}, renderFiles);
    });

    // on search
    $('#search').keyup(search);

    // on delete click
    $(document).on('click', '.delete', () => {
        if (confirm("Are you sure ?")) {
            const file = $(event.target).parent().attr('id');
            $.get('/explore/unlink', {file}, () => fetchFiles());
        }
    });

    $.fn.editable.defaults.mode = 'inline'; // prefer inline mode in the x-editable

});


/**
 * fetch files of the current directory
 * @param cwd
 */
function fetchFiles(cwd = '.') {
    $.get('/explore/scan', {cwd}, renderFiles);
}

/**
 * render fetched files to the view
 * @param files
 */
function renderFiles(files = []) {

    console.log(files);

    const $container = $('#files');
    $container.empty(); // empty the container
    files.forEach((file) => {
        // build the dom element : file has name,extention and basename
        let str = `
        <li class="list-group-item" id="${file.dir}\\${file.base}">
        <a href="#" class="file"> ${file.name} </a>
        <span class="label label-default">${file.ext}</span>
        <a href="#" class="rename btn btn-warning btn-xs pull-right"
        data-type="text" data-pk="${file.dir}\\${file.base}" data-url="/explore/rename"
         data-value="${file.name}">rename
        </a>
        <a href="#" class="delete btn btn-danger btn-xs pull-right">delete</a>
        </li>`;
        // attach it to the dom
        $container.append(str);
    });
    $('#dirname').text(files[0].dir); // attach dir name to the dom
    $('.rename').editable(); // setup the editable component
}

/**
 * Search file by key
 */
function search() {
    const search = $('#search').val(),
        files = $('#files').find('li');
    files.each((index, elm) => {
        ($(elm).text().indexOf(search) !== -1) ? $(elm).show() : $(elm).hide();
    });
    // if (search.length === 0) console.log('ok')//files.all.show();
}